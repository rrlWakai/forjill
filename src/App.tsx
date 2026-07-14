import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Entrance from './chapters/Entrance'
import TodayJourney from './chapters/TodayJourney'
import LetterToYou from './chapters/LetterToYou'
import PrayerForYou from './chapters/PrayerForYou'
import GardenBlooms from './chapters/GardenBlooms'
import FloatingPetals from './components/FloatingPetals'
import Particles from './components/Particles'
import GardenBackground from './components/GardenBackground'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [entered, setEntered] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef<Lenis | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleEnter = useCallback(() => {
    setEntered(true)
    setTimeout(() => setShowMain(true), 2500)
    setTimeout(() => { if (lenisRef.current) lenisRef.current.start() }, 3500)
  }, [])

  useEffect(() => {
    if (!showMain) return
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true, touchMultiplier: 1.2,
    })
    lenisRef.current = lenis
    lenis.stop()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    const updateProgress = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', updateProgress)
    }
  }, [showMain])

  return (
    <div className="relative bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {!entered && (
          <motion.div key="intro" exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}>
            <FloatingPetals count={15} intensity={0.5} />
            <Particles count={20} />
            <Entrance onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {showMain && (
        <motion.div ref={mainRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}>
          <GardenBackground scrollProgress={scrollProgress} />
          <FloatingPetals count={30} intensity={0.8} />
          <Particles count={40} />

          <main className="relative">
            <div className="h-screen" />

            <TodayJourney />
            <div className="h-[25vh]" />

            <LetterToYou />
            <div className="h-[20vh]" />

            <PrayerForYou />
            <div className="h-[15vh]" />

            <GardenBlooms />
            <div className="h-[25vh]" />
          </main>
        </motion.div>
      )}
    </div>
  )
}
