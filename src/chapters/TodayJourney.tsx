import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stop {
  emoji: string
  title: string
  subtitle: string
  description: string
  decoration: 'home' | 'film' | 'shop' | 'lantern' | 'moon'
}

const stops: Stop[] = [
  {
    emoji: '\uD83C\uDFE1',
    title: "I'll Pick You Up",
    subtitle: "Our day begins at your home.",
    description: "I can't wait to see your smile and begin this special day together.",
    decoration: 'home',
  },
  {
    emoji: '\uD83C\uDFAC',
    title: 'Movie Date',
    subtitle: 'Our first adventure together.',
    description: "We'll relax, laugh, enjoy our favorite snacks, and create another memory we'll always treasure.",
    decoration: 'film',
  },
  {
    emoji: '\uD83D\uDECD\uFE0F',
    title: 'Ukay at Bayan',
    subtitle: 'A little treasure hunt together.',
    description: "We'll explore different shops, laugh at funny outfits, and maybe discover something unexpectedly beautiful.",
    decoration: 'shop',
  },
  {
    emoji: '\uD83C\uDF03',
    title: 'Night Market',
    subtitle: 'As the sun sets...',
    description: "We'll walk beneath the city lights, enjoy delicious food, and simply enjoy spending time together.",
    decoration: 'lantern',
  },
  {
    emoji: '\uD83C\uDFE1',
    title: 'Home',
    subtitle: 'The perfect ending.',
    description: "No matter where we go today, my favorite part will always be spending it with you.",
    decoration: 'moon',
  },
]

function DecorationIcon({ type }: { type: Stop['decoration'] }) {
  const s = { width: 24, height: 24, opacity: 0.4 }
  switch (type) {
    case 'home':
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
          <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
        </svg>
      )
    case 'film':
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8h20M2 16h20M7 4v16M17 4v16" />
        </svg>
      )
    case 'shop':
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
          <path d="M6 2L3 7v13a1 1 0 001 1h16a1 1 0 001-1V7l-3-5H6z" />
          <path d="M3 7h18" />
          <path d="M16 11a4 4 0 01-8 0" />
        </svg>
      )
    case 'lantern':
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
          <path d="M9 2h6l1 5H8l1-5z" />
          <path d="M8 7c0 5 2 15 4 15s4-10 4-15H8z" />
        </svg>
      )
    case 'moon':
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )
  }
}

function TimelineFlower({ y }: { y: string }) {
  return (
    <svg className="absolute left-1/2 -translate-x-1/2" width="14" height="14" viewBox="0 0 14 14"
      style={{ top: y }}>
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse key={i} cx="7" cy="3" rx="1.8" ry="3" fill="#D4A5A5" opacity="0.4"
          transform={`rotate(${a}, 7, 7)`} />
      ))}
      <circle cx="7" cy="7" r="1.2" fill="#C4A265" opacity="0.4" />
    </svg>
  )
}

function JourneyCard({ stop, index }: { stop: Stop; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: true })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(6px)', scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : {}}
      transition={{ duration: 2.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl mx-auto">

      <div className="relative rounded-2xl p-7 md:p-9 transition-all duration-700 group hover:scale-[1.015]"
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}>

        {/* Subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <span className="text-2xl mb-2" role="img">{stop.emoji}</span>
          <h3 className="font-display text-xl md:text-2xl font-medium tracking-[0.02em]"
            style={{ color: '#FDF8F0', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
            {stop.title}
          </h3>
          <p className="font-heading text-sm italic tracking-[0.04em] mt-0.5"
            style={{ color: '#C4A265' }}>
            {stop.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-sm md:text-base leading-[1.9] tracking-[0.01em] text-center"
          style={{ color: 'rgba(253,248,240,0.75)' }}>
          {stop.description}
        </p>

        {/* Decorative element */}
        <div className="mt-5 flex justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-700">
          <DecorationIcon type={stop.decoration} />
        </div>
      </div>
    </motion.div>
  )
}

function JourneyStop({ stop, index }: { stop: Stop; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: true })
  return (
    <div ref={ref} className="relative pl-16 md:pl-0">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-3.5 md:left-1/2 md:-translate-x-1/2 top-8 z-10 flex items-center justify-center"
        style={{ width: 16, height: 16 }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{
          background: 'radial-gradient(circle, #D4A5A5 30%, rgba(212,165,165,0.3) 100%)',
          boxShadow: '0 0 12px rgba(212,165,165,0.4)',
        }} />
      </motion.div>
      <JourneyCard stop={stop} index={index} />
    </div>
  )
}

export default function TodayJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.05 })

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-32 md:py-40" style={{ zIndex: 2 }}>
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(196,162,101,0.06) 0%, transparent 60%)',
      }} />

      {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-24 md:mb-32 px-6">
        <p className="font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{ color: '#C4A265' }}>Chapter Two</p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] mb-4"
          style={{ color: '#FDF8F0' }}>Today's Journey</h2>
        <p className="font-heading text-base md:text-lg italic tracking-[0.06em]"
          style={{ color: 'rgba(253,248,240,0.5)' }}>A little adventure made just for you.</p>
      </motion.div>

      {/* Centered timeline */}
      <div className="relative max-w-2xl mx-auto px-6">
        {/* Center vertical line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(212,165,165,0.25) 10%, rgba(212,165,165,0.25) 90%, transparent)' }} />

        {/* Flowers on the line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0">
          {[8, 24, 40, 56, 72, 88].map((pct, i) => (
            <TimelineFlower key={i} y={`${pct}%`} />
          ))}
        </div>

        {/* Journey stops - centered */}
        <div className="space-y-16 md:space-y-20">
          {stops.map((stop, i) => (
            <JourneyStop key={i} stop={stop} index={i} />
          ))}
        </div>
      </div>

      {/* Ending quote */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5, once: true }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mt-32 md:mt-44 px-6">
        <p className="font-heading text-xl md:text-2xl lg:text-3xl font-light italic tracking-[0.04em] leading-relaxed mb-3"
          style={{ color: 'rgba(253,248,240,0.8)' }}>
          "I hope today becomes one of your favorite memories."
        </p>
        <p className="font-heading text-lg md:text-xl italic tracking-[0.04em] mb-14"
          style={{ color: '#C4A265', opacity: 0.7 }}>
          Our little adventure is waiting...
        </p>

        <motion.div animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto opacity-40">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="#C4A265" strokeWidth="1.5">
            <rect x="1" y="1" width="22" height="38" rx="11" />
            <motion.circle cx="12" cy="12" r="3" fill="#C4A265" stroke="none"
              animate={{ cy: [10, 22, 10] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
