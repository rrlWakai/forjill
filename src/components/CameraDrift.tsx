import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CameraDrift() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(el, {
      x: 3,
      y: -2,
      scale: 1.005,
      duration: 12,
      ease: 'sine.inOut',
    })
    .to(el, {
      x: -2,
      y: 3,
      scale: 1.003,
      duration: 14,
      ease: 'sine.inOut',
    })
    .to(el, {
      x: 1,
      y: -1,
      scale: 1.004,
      duration: 10,
      ease: 'sine.inOut',
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  )
}
