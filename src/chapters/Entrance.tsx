import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Volume2, VolumeX, Pause, Play } from 'lucide-react'

interface EntranceProps {
  onEnter: () => void
}

export default function Entrance({ onEnter }: EntranceProps) {
  const [phase, setPhase] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicMuted, setMusicMuted] = useState(false)
  const [showMusicControl, setShowMusicControl] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const driftRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 1.0
    audio.preload = 'auto'
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  // Phase timeline
  useEffect(() => {
    const tl = gsap.timeline()
    tl.to({}, { duration: 1.0 })
      .call(() => setPhase(1))
      .to({}, { duration: 2.0 })
      .call(() => setPhase(2))
      .to({}, { duration: 6.0 })
      .call(() => setPhase(3))
      .to({}, { duration: 6.0 })
      .call(() => setPhase(4))
      .to({}, { duration: 4.5 })
      .call(() => setPhase(5))
      .to({}, { duration: 3.5 })
      .call(() => setPhase(6))
      .to({}, { duration: 4.0 })
      .call(() => setPhase(7))
    return () => { tl.kill() }
  }, [])

  // Fade black overlay
  useEffect(() => {
    if (phase >= 1 && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 2.5, ease: 'power2.inOut' })
    }
  }, [phase])

  // Ken Burns
  useEffect(() => {
    if (bgRef.current) {
      gsap.fromTo(bgRef.current, { scale: 1 }, { scale: 1.12, duration: 55, ease: 'none' })
    }
  }, [])

  // Camera drift
  useEffect(() => {
    if (driftRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(driftRef.current, { x: 4, y: -3, duration: 14, ease: 'sine.inOut' })
        .to(driftRef.current, { x: -3, y: 4, duration: 16, ease: 'sine.inOut' })
        .to(driftRef.current, { x: 2, y: -2, duration: 12, ease: 'sine.inOut' })
    }
  }, [])

  // Music controls
  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
    } else {
      audio.play().then(() => {
        setMusicPlaying(true)
        setShowMusicControl(true)
      }).catch(() => {})
    }
  }, [musicPlaying])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMusicMuted(!musicMuted)
  }, [musicMuted])

  // Start music on enter click
  const handleEnter = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().then(() => {
        setMusicPlaying(true)
        setShowMusicControl(true)
      }).catch(() => {})
    }
    onEnter()
  }, [onEnter])

  const textFade = {
    hidden: { opacity: 0, y: 35, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* cine.png with Ken Burns + drift */}
      <div ref={driftRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        <div ref={bgRef} className="absolute inset-0" style={{
          backgroundImage: 'url(/cine.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }} />
      </div>

      {/* Initial black overlay that fades */}
      <div ref={overlayRef} className="absolute inset-0 bg-black z-10" style={{ willChange: 'opacity' }} />

      {/* ── Overlay Layer 1: Black vertical gradient ── */}
      <div className="absolute inset-0 z-[2]" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 35%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* ── Overlay Layer 2: Radial glow behind text ── */}
      <div className="absolute inset-0 z-[3]" style={{
        background: 'radial-gradient(ellipse 65% 50% at 50% 48%, rgba(196,162,101,0.12) 0%, transparent 70%)',
      }} />

      {/* ── Overlay Layer 3: Soft vignette ── */}
      <div className="absolute inset-0 z-[3]" style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* ── Atmospheric haze at bottom ── */}
      <div className="absolute inset-0 z-[4]" style={{
        background: 'linear-gradient(180deg, transparent 55%, rgba(245,240,232,0.05) 80%, rgba(245,240,232,0.1) 100%)',
      }} />

      {/* ── Music Control (top-right) ── */}
      <AnimatePresence>
        {showMusicControl && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-6 right-6 z-[100] flex items-center gap-2 px-3 py-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            }}>
            <button onClick={toggleMusic}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10"
              style={{ color: '#FDF8F0' }}>
              {musicPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10"
              style={{ color: '#FDF8F0' }}>
              {musicMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Content ── */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 text-center flex flex-col items-center justify-center min-h-screen py-16">

        <AnimatePresence mode="wait">
          {phase === 2 && (
            <motion.p key="l1" variants={textFade} initial="hidden" animate="visible" exit="exit"
              transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading italic text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.12em] md:tracking-[0.15em]"
              style={{ color: 'rgba(253,248,240,0.85)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              For someone who makes every season more beautiful...
            </motion.p>
          )}

          {phase === 3 && (
            <motion.p key="l2" variants={textFade} initial="hidden" animate="visible" exit="exit"
              transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading italic text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.12em] md:tracking-[0.15em]"
              style={{ color: 'rgba(253,248,240,0.85)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              Today the flowers bloom for only one person.
            </motion.p>
          )}

          {phase >= 4 && (
            <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center">

              {/* Small label */}
              <motion.p initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="uppercase tracking-[0.35em] md:tracking-[0.45em] mb-6 md:mb-8"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                  fontWeight: 900,
                  color: 'rgba(196,162,101,0.8)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                }}>
                With all my love
              </motion.p>

              {/* HAPPY BIRTHDAY */}
              <motion.h2 initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="uppercase leading-none mb-4 md:mb-6"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(1.6rem, 5vw, 3.8rem)',
                  fontWeight: 900,
                  letterSpacing: '0.18em',
                  color: '#FFFFFF',
                  textShadow: '0 2px 30px rgba(0,0,0,0.6), 0 0 80px rgba(196,162,101,0.15)',
                }}>
                Happy Birthday
              </motion.h2>

              {/* LOVEYY JILLIAN */}
              <motion.h1 initial={{ opacity: 0, scale: 0.92, y: 40, filter: 'blur(16px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="uppercase leading-none mb-8 md:mb-10"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF8F0 30%, #C4A265 65%, #D4B878 85%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 60px rgba(196,162,101,0.25)) drop-shadow(0 4px 40px rgba(0,0,0,0.4))',
                }}>
                Loveyy Jillian
              </motion.h1>

              {/* Subtitle */}
              <motion.p initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 2.5, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading italic text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.08em] md:tracking-[0.1em] mb-14 md:mb-16"
                style={{ color: 'rgba(253,248,240,0.7)', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
                A flower blooms for someone truly special.
              </motion.p>

              {/* Enter button */}
              {phase >= 6 && (
                <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={handleEnter}
                  className="group relative px-10 sm:px-14 py-4 sm:py-5 rounded-full cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(196,162,101,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(196,162,101,0.35)'
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12), 0 0 60px rgba(196,162,101,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}>
                  <span className="relative z-10 flex items-center gap-3"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)',
                      fontWeight: 500,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#FDF8F0',
                    }}>
                    Enter the Garden
                    <ArrowRight size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                      style={{ color: '#C4A265' }} />
                  </span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
