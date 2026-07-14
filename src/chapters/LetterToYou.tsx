import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const letterParagraphs = [
  "Happy Birthday, Loveyy Jill. 🌸❤️",
  "I don't even know where to start because there are so many things I want to say to you.",
  "First of all, thank you for being you. Thank you for your love, your patience, your laughter, and for making even the simplest moments feel special. Meeting you is something I'll always be thankful to God for because you became one of the biggest blessings in my life.",
  "Today is your special day, and I honestly just hope you're happy. You deserve all the love, peace, and happiness this world can offer. I pray that God continues to guide you in everything you do, protects you wherever you go, gives you good health, and blesses every dream you're working so hard for. I know He has great plans for your life, and I hope you never stop trusting Him, even when things don't always make sense.",
  "There's one thing I want you to always remember.",
  "Life won't always go the way we expect, and there will be days when everything feels heavy. On those days, don't be too hard on yourself. It's okay to slow down. It's okay to rest. It's okay if you don't have everything figured out yet. Just keep moving forward one step at a time and trust that God is leading you where you're meant to be.",
  "And whatever happens, I hope you never forget that I'm here for you.",
  "Whether you're having the best day ever or one of the hardest ones, I'll always be here to listen, support you, cheer you on, or simply stay beside you. I may not always know the right words to say, but I'll always try my best to make sure you never feel like you're facing things alone.",
  "Thank you for letting me be part of your life and for allowing me to make memories with you. Every moment we've shared means so much to me, and I'm excited for all the memories we haven't made yet.",
  "I hope today brings you lots of smiles, laughter, good food, and moments that you'll always remember. More than anything, I hope you feel how loved and appreciated you are—not just today, but every single day.",
  "Happy Birthday again, my love.",
  "Keep smiling, keep chasing your dreams, and keep being the amazing person that you are.",
  "I love you so much, Jill. Always. ❤️",
  "\"The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace.\"",
  "— Numbers 6:24–26"
]

function FloralDivider() {
  return (
    <svg width="140" height="32" viewBox="0 0 120 32" fill="none" className="mx-auto mb-6 opacity-80">
      <path d="M60 28 C50 20, 20 18, 2 16" stroke="#C4A265" strokeWidth="0.8" opacity="0.5" />
      <path d="M60 28 C70 20, 100 18, 118 16" stroke="#C4A265" strokeWidth="0.8" opacity="0.5" />
      {[8, 18, 28, 38].map((x, i) => (
        <g key={`l${i}`}>
          <ellipse cx={x} cy={16 - i * 0.5} rx="3" ry="5" fill="#F2D7D9" opacity={0.45 + i * 0.05}
            transform={`rotate(${-15 + i * 8}, ${x}, ${16 - i * 0.5})`} />
        </g>
      ))}
      {[82, 92, 102, 112].map((x, i) => (
        <g key={`r${i}`}>
          <ellipse cx={x} cy={16 - i * 0.5} rx="3" ry="5" fill="#F2D7D9" opacity={0.45 + i * 0.05}
            transform={`rotate(${15 - i * 8}, ${x}, ${16 - i * 0.5})`} />
        </g>
      ))}
      <circle cx="60" cy="14" r="4" fill="#F2D7D9" opacity="0.6" />
      <circle cx="56" cy="12" r="3" fill="#D4A5A5" opacity="0.4" />
      <circle cx="64" cy="12" r="3" fill="#D4A5A5" opacity="0.4" />
      <circle cx="60" cy="10" r="2.5" fill="#E8C4C8" opacity="0.5" />
      <circle cx="60" cy="14" r="1.5" fill="#C4A265" opacity="0.6" />
    </svg>
  )
}

function FloralCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: 'rotate(0deg)',
    tr: 'rotate(90deg)',
    bl: 'rotate(-90deg)',
    br: 'rotate(180deg)',
  }
  const positions: Record<string, string> = {
    tl: 'top-3 left-3 sm:top-5 sm:left-5',
    tr: 'top-3 right-3 sm:top-5 sm:right-5',
    bl: 'bottom-3 left-3 sm:bottom-5 sm:left-5',
    br: 'bottom-3 right-3 sm:bottom-5 sm:right-5',
  }
  return (
    <svg className={`absolute ${positions[position]} w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 opacity-35`}
      viewBox="0 0 60 60" style={{ transform: transforms[position] }}>
      <path d="M5,5 Q15,8 25,5 Q35,2 45,5" stroke="#8FA58B" strokeWidth="0.8" fill="none" />
      <path d="M5,5 Q8,15 5,25" stroke="#8FA58B" strokeWidth="0.8" fill="none" />
      {[12, 22, 32, 42].map((x, i) => (
        <ellipse key={i} cx={x} cy={5 + Math.sin(i) * 2} rx="2.5" ry="4" fill="#F2D7D9" opacity="0.55"
          transform={`rotate(${-20 + i * 10}, ${x}, 5)`} />
      ))}
      <circle cx="10" cy="18" r="2.5" fill="#C4A265" opacity="0.4" />
      <ellipse cx="18" cy="14" rx="3" ry="5" fill="#F2D7D9" opacity="0.4" transform="rotate(-30, 18, 14)" />
    </svg>
  )
}

interface BurstPetal {
  id: number
  tx: number
  ty: number
  rot: number
  scale: number
  color: string
}

function LetterParagraph({ text, index, isOpened }: { text: string; index: number; isOpened: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" })
  
  // First 4 paragraphs (0, 1, 2, 3) stagger in automatically.
  // Later paragraphs animate when they scroll into view.
  const shouldAnimate = isOpened && (index <= 3 ? true : isInView)
  const delay = index <= 3 ? index * 1.2 : 0

  const isTitle = index === 0
  const isBible = index === letterParagraphs.length - 2
  const isRef = index === letterParagraphs.length - 1
  const isShortEmphasis = text === "There's one thing I want you to always remember." || text === "And whatever happens, I hope you never forget that I'm here for you."

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22, filter: 'blur(3px)' }}
      animate={shouldAnimate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 1.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="w-full"
    >
      {isTitle && (
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal font-light tracking-wide mb-6 sm:mb-8 md:mb-10 text-center leading-tight">
          {text}
        </h3>
      )}

      {isBible && (
        <p className="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal-soft italic leading-relaxed text-center py-6 sm:py-8 mt-8 sm:mt-10 border-t border-[rgba(196,162,101,0.18)]">
          {text}
        </p>
      )}

      {isRef && (
        <p className="font-heading text-xs sm:text-sm md:text-base text-gold text-center tracking-widest mt-3 opacity-90 uppercase">
          {text}
        </p>
      )}

      {!isTitle && !isBible && !isRef && (
        <p className={`font-body text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.95] sm:leading-[2.1] tracking-[0.012em] mb-4 sm:mb-6 ${isShortEmphasis ? 'font-semibold text-charcoal' : 'text-charcoal-soft opacity-90'}`}>
          {text}
        </p>
      )}
    </motion.div>
  )
}

type EnvelopeState = 'sealed' | 'breaking' | 'opening-flap' | 'sliding-letter' | 'zooming' | 'reading'

export default function LetterToYou() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.1 })
  const [state, setState] = useState<EnvelopeState>('sealed')
  const [flapBehind, setFlapBehind] = useState(false)
  const [burstPetals, setBurstPetals] = useState<BurstPetal[]>([])

  const handleOpen = useCallback(() => {
    if (state !== 'sealed') return
    setState('breaking')

    // Spawn 20 random petals flying out from center
    const newPetals = Array.from({ length: 20 }, (_, i) => {
      const angle = (Math.random() * 140 - 70) * (Math.PI / 180) // -70 to 70 deg
      const speed = 120 + Math.random() * 160
      return {
        id: i,
        tx: Math.sin(angle) * speed,
        ty: -Math.cos(angle) * speed - (60 + Math.random() * 120),
        rot: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.7,
        color: ['#F2D7D9', '#D4A5A5', '#C9B1BD', '#E8C4C8'][Math.floor(Math.random() * 4)],
      }
    })
    setBurstPetals(newPetals)

    // Sequence timing
    // 1.0s: Wax seal is broken, top flap starts opening
    setTimeout(() => {
      setState('opening-flap')
    }, 1000)

    // 1.9s: Flap has rotated past 90 degrees, place it behind the letter
    setTimeout(() => {
      setFlapBehind(true)
    }, 1900)

    // 2.5s: Top flap is open, letter starts sliding up
    setTimeout(() => {
      setState('sliding-letter')
    }, 2500)

    // 4.5s: Letter is fully up, zoom in and fade out envelope to enter full screen stationery
    setTimeout(() => {
      setState('reading')
    }, 4500)
  }, [state])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center py-16 sm:py-24 md:py-36 px-4 sm:px-6 overflow-hidden"
      style={{ zIndex: 2 }}>

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(196,162,101,0.08) 0%, transparent 60%)',
        opacity: state === 'reading' ? 1 : 0.5,
      }} />

      {/* Warm golden sunlight overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-1500" style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(212,165,165,0.12) 0%, rgba(196,162,101,0.1) 30%, transparent 60%)',
        opacity: state === 'reading' ? 0.7 : 0,
      }} />

      {/* Blurred decorative botanical elements in the background */}
      {state === 'reading' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 select-none">
          {/* Blurred top-left leaves */}
          <div className="absolute -top-12 -left-12 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full filter blur-[50px]" style={{
            background: 'radial-gradient(circle, rgba(143,165,139,0.2) 0%, transparent 70%)'
          }} />
          {/* Blurred bottom-right roses */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-full filter blur-[60px]" style={{
            background: 'radial-gradient(circle, rgba(212,165,165,0.25) 0%, transparent 70%)'
          }} />
          {/* Subtle sunlight ray overlay */}
          <div className="absolute top-0 right-4 sm:right-10 w-[180px] sm:w-[300px] h-screen bg-gradient-to-b from-gold/5 to-transparent transform -skew-x-12 filter blur-[40px]" />
        </div>
      )}

      {/* Gentle particles inside reading view */}
      {state === 'reading' && (
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => {
            const size = 3 + Math.random() * 4
            const delay = Math.random() * 10
            const duration = 15 + Math.random() * 10
            const left = Math.random() * 100
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gold-light/30 filter blur-[1px]"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: '-5%',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [`0px`, `${(Math.random() - 0.5) * 60}px`],
                  opacity: [0, 0.5, 0.3, 0],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )
          })}
        </div>
      )}

      {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14 sm:mb-20 md:mb-28 lg:mb-32 z-10 px-2">
        <FloralDivider />
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] mb-4 sm:mb-6"
          style={{ color: '#FDF8F0' }}>My Letter To You</h2>
        <p className="font-heading text-base sm:text-lg md:text-xl italic tracking-[0.08em]"
          style={{ color: 'rgba(253,248,240,0.6)' }}>A few words from my heart.</p>
      </motion.div>

      <AnimatePresence>
        {/* ── ENVELOPE VIEW ── */}
        {state !== 'reading' && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.82, y: 60, filter: 'blur(8px)' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center relative z-10 w-full px-2"
          >
            {/* Envelope container — fluid width with fixed aspect ratio */}
            <div
              className="relative w-full"
              style={{
                perspective: '1200px',
                maxWidth: 420,
                aspectRatio: '380 / 260',
                animation: state === 'sealed' ? 'float 6s ease-in-out infinite' : 'none',
              }}
            >
              {/* Glow behind envelope */}
              <div
                className="absolute -inset-16 rounded-full opacity-70 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(212,165,165,0.2) 0%, rgba(196,162,101,0.12) 45%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
              />

              {/* Envelope Back */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border border-[rgba(196,162,101,0.15)]"
                style={{
                  background: '#FAF5EC',
                  boxShadow: 'inset 0 0 40px rgba(196,162,101,0.06)',
                  zIndex: 10,
                }}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }} />
                {/* Elegant lining */}
                <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 Q50,45 100,0 M0,100 Q50,55 100,100" fill="none" stroke="#C4A265" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>

              {/* The Letter Preview (inside the envelope) */}
              <motion.div
                className="absolute left-[5%] right-[5%] rounded-none p-6 flex flex-col justify-between"
                style={{
                  height: '88%',
                  bottom: '6%',
                  background: 'linear-gradient(170deg, #FDF8F0 0%, #FAF3E8 100%)',
                  border: '1px solid rgba(196,162,101,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 0 20px rgba(196,162,101,0.03)',
                  zIndex: state === 'sliding-letter' || state === 'zooming' ? 35 : 15,
                  originY: 1,
                }}
                animate={
                  state === 'sealed' || state === 'breaking' || state === 'opening-flap'
                    ? { y: 0, scale: 0.96 }
                    : { y: '-75%', scale: 1.02 }
                }
                transition={{
                  duration: 2.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Letter decorations preview */}
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-35">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="text-sage">
                    <path d="M2,2 Q10,4 12,12 Q4,10 2,2" fill="none" stroke="currentColor" strokeWidth="0.6" />
                  </svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" className="text-sage transform rotate-90">
                    <path d="M2,2 Q10,4 12,12 Q4,10 2,2" fill="none" stroke="currentColor" strokeWidth="0.6" />
                  </svg>
                </div>

                {/* Letter content mock */}
                <div className="space-y-2 mt-4 opacity-40">
                  <div className="h-3 w-1/3 bg-charcoal-soft/50 rounded" />
                  <div className="h-2 w-full bg-charcoal-soft/30 rounded" />
                  <div className="h-2 w-5/6 bg-charcoal-soft/30 rounded" />
                  <div className="h-2 w-4/5 bg-charcoal-soft/30 rounded" />
                </div>

                {/* Monogram closing phrase mock */}
                <div className="flex justify-end opacity-40">
                  <div className="h-2 w-1/4 bg-gold/50 rounded" />
                </div>
              </motion.div>

              {/* Envelope Front Pocket */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
                <svg width="100%" height="100%" viewBox="0 0 380 260" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  {/* Left flap */}
                  <path d="M0,0 L195,130 L0,260 Z" fill="#F4EBD9" stroke="#FAF5EB" strokeWidth="1" />
                  {/* Right flap */}
                  <path d="M380,0 L185,130 L380,260 Z" fill="#F4EBD9" stroke="#FAF5EB" strokeWidth="1" />
                  {/* Bottom flap */}
                  <path d="M0,260 L190,125 L380,260 Z" fill="#EFE5D0" stroke="#FAF5EB" strokeWidth="1" />
                  
                  {/* Delicate gold foil detail line */}
                  <path d="M0,260 L190,125 L380,260" fill="none" stroke="rgba(196,162,101,0.25)" strokeWidth="0.8" />
                  <path d="M0,0 L195,130" fill="none" stroke="rgba(196,162,101,0.15)" strokeWidth="0.8" />
                  <path d="M380,0 L185,130" fill="none" stroke="rgba(196,162,101,0.15)" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Envelope Top Flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 origin-top pointer-events-none"
                style={{
                  height: '50%',
                  zIndex: (state === 'sealed' || state === 'breaking' || (state === 'opening-flap' && !flapBehind)) ? 40 : 12,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotateX: (state === 'sealed' || state === 'breaking') ? 0 : -180
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 380 130" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)]">
                  {/* Top flap shape */}
                  <path d="M0,0 L380,0 L190,130 Z" fill="#EFE5D0" stroke="#FAF5EB" strokeWidth="1" />
                  {/* Gold foil border */}
                  <path d="M10,5 L190,120 L370,5" fill="none" stroke="rgba(196,162,101,0.35)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M0,0 L190,130 L380,0" fill="none" stroke="rgba(196,162,101,0.2)" strokeWidth="0.8" />
                </svg>
              </motion.div>

              {/* Wax Seal Group */}
              <div
                className="absolute cursor-pointer"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 56,
                  height: 56,
                  zIndex: 50,
                  display: state === 'sliding-letter' || state === 'zooming' ? 'none' : 'block',
                }}
                onClick={handleOpen}
              >
                {/* Left seal half */}
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-full overflow-hidden origin-left"
                  animate={
                    state !== 'sealed'
                      ? { x: -25, y: 15, rotate: -35, opacity: 0 }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-[56px] h-[56px]" style={{
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #D4A5A5 0%, #C9929B 45%, #B57A82 100%)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.4)',
                  }}>
                    {/* Gold emblem center (left half) */}
                    <div className="absolute inset-0 flex items-center justify-center text-[#D4B878] opacity-80" style={{ transform: 'translateX(2px)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24">
                        <path d="M12,4 C14,8 18,8 18,12 C18,16 14,20 12,20 C10,20 6,16 6,12 C6,8 10,8 12,4 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Right seal half */}
                <motion.div
                  className="absolute top-0 right-0 w-1/2 h-full overflow-hidden origin-right"
                  animate={
                    state !== 'sealed'
                      ? { x: 25, y: 15, rotate: 35, opacity: 0 }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-[56px] h-[56px] -ml-[28px]" style={{
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #D4A5A5 0%, #C9929B 45%, #B57A82 100%)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.4)',
                  }}>
                    {/* Gold emblem center (right half) */}
                    <div className="absolute inset-0 flex items-center justify-center text-[#D4B878] opacity-80" style={{ transform: 'translateX(-2px)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24">
                        <path d="M12,4 C14,8 18,8 18,12 C18,16 14,20 12,20 C10,20 6,16 6,12 C6,8 10,8 12,4 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Opening flower petals burst */}
              {burstPetals.map(p => (
                <motion.div
                  key={p.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: -8,
                    marginTop: -8,
                    zIndex: 45,
                  }}
                  initial={{ x: 0, y: 0, rotate: 0, scale: 0.1, opacity: 1 }}
                  animate={{
                    x: p.tx,
                    y: [0, p.ty * 0.4, p.ty * 0.8, p.ty + 350],
                    rotate: p.rot + 360,
                    scale: [0.1, p.scale, p.scale * 0.8, p.scale * 0.3],
                    opacity: [1, 1, 0.9, 0],
                  }}
                  transition={{
                    duration: 3.0 + Math.random() * 1.5,
                    ease: [0.1, 0.8, 0.3, 1],
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8,1 Q15,4 12,12 Q8,15 4,12 Q1,4 8,1 Z" fill={p.color} opacity="0.8" />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Click to open text */}
            {state === 'sealed' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="mt-12 font-heading text-sm md:text-base italic tracking-[0.1em]"
                style={{ color: 'rgba(253,248,240,0.5)' }}
              >
                <motion.span
                  animate={{ opacity: [0.35, 0.8, 0.35], y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  Click to open
                </motion.span>
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ── LETTER VIEW ── */}
        {state === 'reading' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.95, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[850px] mx-auto mt-4 md:mt-8 px-2 sm:px-4 z-10"
          >
            <div
              className="relative rounded-none p-5 sm:p-8 md:p-14 lg:p-20 border border-[rgba(196,162,101,0.15)] overflow-hidden"
              style={{
                background: 'linear-gradient(170deg, #FDF8F0 0%, #FAF3E8 60%, #F5ECE0 100%)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.06), inset 0 0 60px rgba(196,162,101,0.04)',
                minHeight: 'min(1150px, 85vh)',
              }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 rounded-none opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }} />

              {/* Inner gold frame border — hidden on very small screens to avoid overlap */}
              <div className="absolute inset-2 sm:inset-4 rounded-none pointer-events-none border border-[rgba(196,162,101,0.22)]" />
              <div className="hidden sm:block absolute inset-3 sm:inset-5 rounded-none pointer-events-none border border-[rgba(196,162,101,0.1)] border-dashed" />

              {/* Floral corners — hidden on xs screens */}
              <div className="hidden xs:block">
                <FloralCorner position="tl" />
                <FloralCorner position="tr" />
                <FloralCorner position="bl" />
                <FloralCorner position="br" />
              </div>

              {/* Letter content — padding accounts for corner decorations */}
              <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-7 mt-4 sm:mt-6 mb-8 sm:mb-12
                             px-2 sm:px-4 md:px-2">
                {letterParagraphs.map((text, i) => (
                  <LetterParagraph key={i} text={text} index={i} isOpened={true} />
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
