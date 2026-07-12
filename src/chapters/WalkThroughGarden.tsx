import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const gardenLines = [
  "Each step we take together",
  "feels like walking through",
  "the most beautiful garden",
  "the world has ever known.",
]

const sideFlowers = [
  { side: 'left' as const, color: '#F2D7D9', y: 20 },
  { side: 'right' as const, color: '#D4A5A5', y: 30 },
  { side: 'left' as const, color: '#C9B1BD', y: 50 },
  { side: 'right' as const, color: '#F2D7D9', y: 70 },
]

function GardenFlower({ side, color, delay }: { side: 'left' | 'right'; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      rotation: side === 'left' ? 5 : -5,
      transformOrigin: 'bottom center',
      duration: 6 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })
  }, [delay, side])

  return (
    <div
      ref={ref}
      className={`absolute ${side === 'left' ? 'left-4 md:left-12 lg:left-24' : 'right-4 md:right-12 lg:right-24'}`}
      style={{ willChange: 'transform' }}
    >
      <svg width="60" height="120" viewBox="0 0 60 120">
        <path d="M30,120 Q28,80 30,40" stroke="#8FA58B" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M30,80 Q15,70 10,60" stroke="#B5C4B1" strokeWidth="1.5" fill="none" opacity="0.4" />
        <ellipse cx="12" cy="58" rx="8" ry="5" fill="#B5C4B1" opacity="0.3" transform="rotate(-30, 12, 58)" />
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="30"
            cy="28"
            rx="7"
            ry="14"
            fill={color}
            opacity="0.6"
            transform={`rotate(${angle}, 30, 38)`}
          />
        ))}
        <circle cx="30" cy="38" r="5" fill="#C4A265" opacity="0.7" />
      </svg>
    </div>
  )
}

export default function WalkThroughGarden() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Walking path atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(90, 110, 86, 0.15) 100%)`,
        }}
      />

      {/* Side flowers */}
      <div className="absolute inset-0 pointer-events-none">
        {sideFlowers.map((f, i) => (
          <GardenFlower
            key={i}
            side={f.side}
            color={f.color}
            delay={i * 0.5}
          />
        ))}
      </div>

      {/* Central text */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4"
            style={{ color: '#C4A265' }}
          >
            Chapter Two
          </p>
          <h2
            className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.06em]"
            style={{ color: '#FDF8F0' }}
          >
            A Walk Through Our Garden
          </h2>
        </motion.div>

        <div className="space-y-10">
          {gardenLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 2.5,
                delay: 1.2 + i * 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-heading text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-[0.05em]"
              style={{ color: '#FDF8F0', opacity: 0.9 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 3, delay: 5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 mx-auto flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(90deg, transparent, #C4A265)' }} />
          <svg width="20" height="20" viewBox="0 0 20 20">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <ellipse key={i} cx="10" cy="5" rx="3" ry="5" fill="#C4A265" opacity="0.5" transform={`rotate(${angle}, 10, 10)`} />
            ))}
          </svg>
          <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(90deg, #C4A265, transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}
