import { useRef, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

function BloomFlower({ x, y, delay, size, color }: { x: number; y: number; delay: number; size: number; color: string }) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const petals = ref.current.querySelectorAll('.bloom-petal')
    gsap.set(petals, { scale: 0, opacity: 0, transformOrigin: '50% 100%' })
    gsap.to(petals, { scale: 1, opacity: 0.7, duration: 3, delay, ease: 'elastic.out(1, 0.6)', stagger: 0.2 })
    gsap.to(ref.current, {
      rotation: 3, transformOrigin: 'center bottom', duration: 6 + Math.random() * 3,
      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: delay + 1,
    })
  }, [delay])
  return (
    <g ref={ref} transform={`translate(${x}, ${y}) scale(${size})`}>
      {[0, 51, 102, 153, 204, 255, 306].map((angle, i) => (
        <ellipse key={i} className="bloom-petal" cx="0" cy="-14" rx="6" ry="14" fill={color} opacity="0"
          transform={`rotate(${angle})`} />
      ))}
      <circle cx="0" cy="0" r="5" fill="#C4A265" opacity="0.8" />
    </g>
  )
}

export default function WishForFuture() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.15 })

  const bloomFlowers = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      x: 50 + (Math.random() * 1340),
      y: 350 + Math.random() * 200,
      delay: 1.0 + i * 0.25,
      size: 0.6 + Math.random() * 0.8,
      color: ['#F2D7D9', '#D4A5A5', '#C9B1BD', '#E8B4B8', '#FDF8F0'][i % 5],
    })), [])

  useEffect(() => {
    if (!sectionRef.current || !isInView) return
    const particles = sectionRef.current.querySelectorAll('.float-petal')
    gsap.fromTo(particles, { y: 0, opacity: 0 }, {
      y: -200, opacity: 0.6, duration: 12, repeat: -1,
      stagger: { each: 0.5, from: 'random' }, ease: 'none',
    })
  }, [isInView])

  return (
    <section ref={sectionRef} className="relative min-h-[160vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 2 }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(196,162,101,0.05) 50%, rgba(232,200,122,0.1) 100%)',
      }} />

      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice" style={{ height: '50vh' }}>
        <path d="M0,400 Q360,350 720,380 Q1080,350 1440,370 L1440,600 L0,600 Z" fill="rgba(143,165,139,0.3)" />
        <path d="M0,430 Q360,410 720,420 Q1080,400 1440,415 L1440,600 L0,600 Z" fill="rgba(107,125,103,0.25)" />
        {bloomFlowers.map((f, i) => <BloomFlower key={i} {...f} />)}
        {Array.from({ length: 15 }, (_, i) => (
          <circle key={`fp-${i}`} className="float-petal"
            cx={100 + Math.random() * 1240} cy={200 + Math.random() * 200}
            r={2 + Math.random() * 3} fill={['#F2D7D9', '#D4A5A5', '#FDF8F0'][i % 3]} opacity="0" />
        ))}
      </svg>

      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        background: 'linear-gradient(135deg, transparent 30%, rgba(196,162,101,0.08) 50%, transparent 70%), linear-gradient(225deg, transparent 30%, rgba(232,200,122,0.06) 50%, transparent 70%)',
      }} />

      <div className="relative z-10 text-center px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }} className="mb-20">
          <p className="font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4"
            style={{ color: '#C4A265' }}>Chapter Four</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em]"
            style={{ color: '#FDF8F0' }}>A Wish For Your Future</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 3, delay: 1.5, ease: [0.22, 1, 0.36, 1] }} className="space-y-10">
          {["I wish you mornings filled with soft sunlight and gentle music.",
            "Afternoons that bring you joy in the smallest things.",
            "Evenings that leave you grateful for the day you've had."
          ].map((text, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 2.5, delay: i * 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-lg md:text-xl lg:text-2xl font-light leading-[2] tracking-[0.04em]"
              style={{ color: 'rgba(253,248,240,0.85)' }}>{text}</motion.p>
          ))}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-lg md:text-xl lg:text-2xl font-light leading-[2] tracking-[0.04em] italic mt-14"
            style={{ color: '#C4A265' }}>And a heart that always knows how loved it is.</motion.p>
        </motion.div>
      </div>
    </section>
  )
}
