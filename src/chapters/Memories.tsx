import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const memories = [
  { caption: 'My favorite smile.', rotation: -3, x: -5, y: 0, width: 'w-64 md:w-80', height: 'h-72 md:h-96', gradient: 'from-blush/30 to-rose/20' },
  { caption: 'Our happiest day.', rotation: 2, x: 8, y: -10, width: 'w-56 md:w-72', height: 'h-64 md:h-80', gradient: 'from-lavender/30 to-beige/20' },
  { caption: "I'll always remember this.", rotation: -1.5, x: -10, y: 5, width: 'w-60 md:w-76', height: 'h-68 md:h-88', gradient: 'from-sage/30 to-cream/20' },
  { caption: 'The way you laugh.', rotation: 3, x: 5, y: -5, width: 'w-52 md:w-68', height: 'h-60 md:h-76', gradient: 'from-gold/20 to-cream/20' },
  { caption: 'You, being you.', rotation: -2, x: -3, y: 8, width: 'w-58 md:w-74', height: 'h-66 md:h-84', gradient: 'from-rose/30 to-blush/20' },
  { caption: 'This moment was perfect.', rotation: 1.5, x: 7, y: -3, width: 'w-54 md:w-70', height: 'h-62 md:h-80', gradient: 'from-beige/40 to-sage/20' },
]

function MemoryCard({ caption, rotation, x, y, width, height, gradient, index }: {
  caption: string
  rotation: number
  x: number
  y: number
  width: string
  height: string
  gradient: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: true })

  const floatY = Math.sin(index * 1.5) * 15

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: rotation * 2, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: floatY, rotate: rotation, filter: 'blur(0px)' } : {}}
      transition={{ duration: 2.5, delay: index * 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${width} ${height} cursor-default group`}
      style={{
        transform: `translateX(${x}%) rotate(${rotation}deg)`,
        willChange: 'transform',
      }}
    >
      {/* Photo placeholder with beautiful gradient */}
      <div
        className={`absolute inset-0 rounded-sm bg-gradient-to-br ${gradient} overflow-hidden transition-all duration-700`}
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Inner texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at ${30 + index * 10}% ${40 + index * 5}%, rgba(255,255,255,0.2), transparent 60%)`,
          }}
        />

        {/* Decorative flower silhouette */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <circle cx={50 + index * 3} cy={50 - index * 2} r={15 + index * 2} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-charcoal" />
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <ellipse key={i} cx="50" cy="30" rx="5" ry="12" fill="currentColor" className="text-charcoal" opacity="0.3"
              transform={`rotate(${a + index * 15}, 50, 50)`} />
          ))}
        </svg>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700" />
      </div>

      {/* Caption - appears on hover */}
      <div
        className="absolute -bottom-10 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      >
        <p
          className="font-heading text-base md:text-lg italic tracking-[0.05em]"
          style={{ color: '#FDF8F0', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
        >
          {caption}
        </p>
      </div>
    </motion.div>
  )
}

export default function Memories() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[160vh] flex flex-col items-center justify-center overflow-hidden py-32"
      style={{ zIndex: 2 }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-24 px-6"
      >
        <p
          className="font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{ color: '#C4A265' }}
        >
          Chapter Three
        </p>
        <h2
          className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em]"
          style={{ color: '#FDF8F0' }}
        >
          Our Memories
        </h2>
        <p
          className="font-body text-sm md:text-base mt-4 tracking-[0.1em] font-light"
          style={{ color: 'rgba(253, 248, 240, 0.5)' }}
        >
          hover to reveal
        </p>
      </motion.div>

      {/* Editorial collage layout */}
      <div className="relative w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {memories.map((memory, i) => (
            <MemoryCard key={i} index={i} {...memory} />
          ))}
        </div>
      </div>
    </section>
  )
}
