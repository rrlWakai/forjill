import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

export default function GardenBlooms() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  const petalCount = 60

  useEffect(() => {
    if (!sectionRef.current || !isInView) return
    const petals = sectionRef.current.querySelectorAll('.bloom-petal-final')
    petals.forEach((petal) => {
      gsap.fromTo(petal, { y: '100vh', opacity: 0, rotation: 0 }, {
        y: '-50vh', rotation: 360, duration: 14 + Math.random() * 8, repeat: -1, ease: 'none',
        keyframes: [
          { opacity: 0, duration: 0 },
          { opacity: 0.8, duration: 0.15 },
          { opacity: 0.6, duration: 0.7 },
          { opacity: 0, duration: 0.15 },
        ],
      })
    })
  }, [isInView])

  useEffect(() => {
    if (!sectionRef.current || !isInView) return
    const glow = sectionRef.current.querySelector('.final-glow')
    if (glow) gsap.to(glow, { opacity: 0.3, scale: 1.1, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [isInView])

  return (
    <section ref={sectionRef} className="relative min-h-[140vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 2 }}>
      <div className="final-glow absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgba(196,162,101,0.15) 0%, rgba(232,200,122,0.08) 40%, transparent 70%)',
        willChange: 'transform, opacity',
      }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: petalCount }, (_, i) => (
          <div key={i} className="bloom-petal-final absolute" style={{
            left: `${Math.random() * 100}%`,
            width: 4 + Math.random() * 10, height: 6 + Math.random() * 14,
            borderRadius: '50% 0 50% 0',
            background: ['#F2D7D9', '#D4A5A5', '#C9B1BD', '#FDF8F0', '#C4A265'][i % 5],
            opacity: 0, willChange: 'transform, opacity',
          }} />
        ))}
      </div>

      <div className="relative z-10 text-center px-8 max-w-3xl">
        <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.06em] mb-4"
          style={{
            background: 'linear-gradient(135deg, #FDF8F0 0%, #C4A265 35%, #D4B878 65%, #FDF8F0 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(196,162,101,0.3))',
          }}>Happy Birthday</motion.h2>

        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 3.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-[0.04em] leading-none mb-20"
          style={{
            background: 'linear-gradient(135deg, #FDF8F0 0%, #C4A265 30%, #D4B878 60%, #FDF8F0 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 80px rgba(196,162,101,0.4))',
          }}>Jillian</motion.h1>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 3, delay: 2, ease: [0.22, 1, 0.36, 1] }} className="space-y-8">
          <p className="font-heading text-lg md:text-xl lg:text-2xl font-light leading-[1.9] tracking-[0.03em]"
            style={{ color: 'rgba(253,248,240,0.8)' }}>
            Thank you for making my world brighter every single day.</p>
          <p className="font-heading text-base md:text-lg lg:text-xl font-light leading-[1.9] tracking-[0.03em]"
            style={{ color: 'rgba(253,248,240,0.65)' }}>
            I hope this new year of your life brings you happiness, peace,
            beautiful memories, and dreams that come true.</p>
          <p className="font-heading text-base md:text-lg lg:text-xl font-light leading-[1.9] tracking-[0.03em]"
            style={{ color: 'rgba(253,248,240,0.65)' }}>
            I'll always be cheering for you.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 3, delay: 3.5, ease: [0.22, 1, 0.36, 1] }}
          className="my-16 mx-auto flex items-center justify-center gap-4">
          <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #C4A265)' }} />
          <svg width="16" height="16" viewBox="0 0 16 16">
            {[0, 72, 144, 216, 288].map((a, i) => (
              <ellipse key={i} cx="8" cy="3" rx="2.5" ry="4" fill="#C4A265" opacity="0.6"
                transform={`rotate(${a}, 8, 8)`} />
            ))}
          </svg>
          <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, #C4A265, transparent)' }} />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 3, delay: 4 }}
          className="font-body text-xs md:text-sm tracking-[0.2em] uppercase"
          style={{ color: 'rgba(196,162,101,0.5)' }}>Made with all my love</motion.p>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, transparent 60%, rgba(253,248,240,0.08) 80%, rgba(253,248,240,0.15) 100%)',
      }} />
    </section>
  )
}
