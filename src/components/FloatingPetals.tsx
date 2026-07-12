import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'

interface Petal {
  id: number
  startX: number
  startY: number
  size: number
  color: string
  delay: number
  duration: number
  driftX: number
  driftY: number
  rotation: number
  wobble: number
}

export default function FloatingPetals({ count = 25, intensity = 1 }: { count?: number; intensity?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const petals = useMemo(() => {
    const colors = [
      'rgba(242, 215, 217, 0.6)',
      'rgba(212, 165, 165, 0.5)',
      'rgba(201, 177, 189, 0.5)',
      'rgba(245, 240, 232, 0.5)',
      'rgba(196, 162, 101, 0.3)',
      'rgba(232, 222, 208, 0.4)',
    ]
    return Array.from({ length: Math.floor(count * intensity) }, (_, i): Petal => ({
      id: i,
      startX: Math.random() * 100,
      startY: -10 - Math.random() * 20,
      size: 8 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 14,
      driftX: (Math.random() - 0.5) * 300,
      driftY: window.innerHeight + 200,
      rotation: Math.random() * 720 - 360,
      wobble: 30 + Math.random() * 60,
    }))
  }, [count, intensity])

  useEffect(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.querySelectorAll<HTMLDivElement>('.petal')

    elements.forEach((el, i) => {
      const petal = petals[i]
      if (!petal) return

      gsap.set(el, {
        x: `${petal.startX}vw`,
        y: `${petal.startY}vh`,
        width: petal.size,
        height: petal.size * 1.4,
        rotate: 0,
        opacity: 0,
      })

      const tl = gsap.timeline({ repeat: -1, delay: petal.delay })

      tl.to(el, {
        opacity: 0.8,
        duration: 1.5,
        ease: 'power2.in',
      })
      .to(el, {
        y: `+=${petal.driftY}`,
        x: `+=${petal.driftX}`,
        rotation: petal.rotation,
        duration: petal.duration,
        ease: 'none',
      }, 0)
      .to(el, {
        x: `+=${petal.wobble}`,
        duration: petal.duration * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 3,
      }, 0)
      .to(el, {
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
      }, petal.duration - 2)
    })
  }, [petals])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ willChange: 'transform' }}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal absolute"
          style={{
            willChange: 'transform, opacity',
            borderRadius: '50% 0 50% 0',
            background: `radial-gradient(ellipse at 30% 30%, ${petal.color}, transparent)`,
            boxShadow: `inset 0 0 4px rgba(212, 165, 165, 0.2)`,
          }}
        />
      ))}
    </div>
  )
}
