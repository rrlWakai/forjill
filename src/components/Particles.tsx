import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export default function Particles({ count = 40, color = 'rgba(196, 162, 101, 0.4)' }: { count?: number; color?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i): Particle => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      opacity: 0.1 + Math.random() * 0.5,
    })),
  [count])

  useEffect(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.querySelectorAll<HTMLDivElement>('.particle')

    elements.forEach((el, i) => {
      const p = particles[i]
      if (!p) return

      gsap.set(el, {
        x: `${p.x}vw`,
        y: `${p.y}vh`,
        width: p.size,
        height: p.size,
        opacity: 0,
      })

      gsap.to(el, {
        opacity: p.opacity,
        duration: p.duration,
        delay: p.delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(el, {
        y: `+=${20 + Math.random() * 40}`,
        x: `+=${(Math.random() - 0.5) * 30}`,
        duration: p.duration * 1.5,
        delay: p.delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [particles])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[4]"
      style={{ willChange: 'transform' }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full"
          style={{
            willChange: 'transform, opacity',
            background: `radial-gradient(circle, ${color}, transparent)`,
            filter: `blur(${p.size > 4 ? 1 : 0}px)`,
          }}
        />
      ))}
    </div>
  )
}
