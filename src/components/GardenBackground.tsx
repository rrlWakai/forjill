import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function FlowerSVG({ x, y, scale, color, delay }: { x: number; y: number; scale: number; color: string; delay: number }) {
  const ref = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      rotation: 3,
      transformOrigin: `${x}px ${y + 30}px`,
      duration: 5 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })
  }, [delay, x, y])

  return (
    <g ref={ref} transform={`translate(${x}, ${y}) scale(${scale})`}>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse key={i} cx="0" cy="-12" rx="6" ry="12" fill={color} opacity="0.7" transform={`rotate(${angle})`} />
      ))}
      <circle cx="0" cy="0" r="5" fill="#C4A265" opacity="0.8" />
    </g>
  )
}

function StemSVG({ x, y, height, delay }: { x: number; y: number; height: number; delay: number }) {
  const ref = useRef<SVGPathElement>(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      attr: { d: `M${x},${y} Q${x + 8},${y - height / 2} ${x + 3},${y - height}` },
      duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay,
    })
  }, [delay, x, y, height])
  return (
    <path ref={ref} d={`M${x},${y} Q${x + 5},${y - height / 2} ${x + 2},${y - height}`}
      stroke="#8FA58B" strokeWidth="2" fill="none" opacity="0.5" />
  )
}

function LeafSVG({ x, y, scale, flip, delay }: { x: number; y: number; scale: number; flip: boolean; delay: number }) {
  const ref = useRef<SVGPathElement>(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      rotation: flip ? -8 : 8,
      transformOrigin: `${x}px ${y}px`,
      duration: 5 + Math.random() * 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay,
    })
  }, [delay, flip, x, y])
  return (
    <path ref={ref}
      d={`M${x},${y} Q${x + (flip ? -20 : 20) * scale},${y - 15 * scale} ${x + (flip ? -35 : 35) * scale},${y - 5 * scale}`}
      stroke="#B5C4B1" strokeWidth="1.5" fill="#B5C4B1" opacity="0.3" />
  )
}

export default function GardenBackground({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const parallaxOffset = scrollProgress * -100

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      {/* hero.png with Ken Burns */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxOffset * 0.3}px) scale(1.08)`,
          willChange: 'transform',
          animation: 'breathe 25s ease-in-out infinite',
        }}
      />

      {/* Black overlay over hero image */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Layer 1: Top dark gradient for text readability */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(20,12,8,0.55) 0%, rgba(45,24,16,0.3) 25%, transparent 55%)',
      }} />

      {/* Layer 2: Warm golden-hour tint to preserve garden warmth */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(196,162,101,0.06) 0%, rgba(232,200,122,0.04) 50%, rgba(181,196,177,0.06) 100%)',
      }} />

      {/* Layer 3: Soft radial glow behind text area */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,162,101,0.12) 0%, transparent 70%)',
      }} />

      {/* Layer 4: Atmospheric haze at bottom */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, transparent 45%, rgba(245,240,232,0.08) 75%, rgba(245,240,232,0.15) 100%)',
        transform: `translateY(${parallaxOffset * 0.5}px)`,
        willChange: 'transform',
      }} />

      {/* Layer 5: Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Garden SVG overlay */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
        style={{
          height: '70vh',
          transform: `translateY(${parallaxOffset * 0.1}px)`,
          willChange: 'transform',
        }}
      >
        <defs>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8FA58B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5a6e56" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="mistGrad">
            <stop offset="0%" stopColor="rgba(245,240,232,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <ellipse cx="400" cy="350" rx="500" ry="80" fill="url(#mistGrad)" opacity="0.6">
          <animate attributeName="cx" values="400;520;400" dur="25s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1000" cy="380" rx="400" ry="60" fill="url(#mistGrad)" opacity="0.4">
          <animate attributeName="cx" values="1000;880;1000" dur="20s" repeatCount="indefinite" />
        </ellipse>

        <path d="M0,450 Q200,350 400,400 Q600,350 800,380 Q1000,340 1200,370 Q1400,350 1440,360 L1440,600 L0,600 Z" fill="url(#groundGrad)" opacity="0.7" />
        <path d="M0,480 Q300,420 600,450 Q900,410 1200,440 L1440,430 L1440,600 L0,600 Z" fill="#6b7d67" opacity="0.5" />

        {[200, 500, 900, 1250].map((tx, i) => (
          <g key={`tree-${i}`} opacity={0.3 + i * 0.05}>
            <rect x={tx - 3} y={250} width="6" height="120" fill="#5a4a3a" opacity="0.4" />
            <ellipse cx={tx} cy={220} rx={40 + i * 5} ry={50 + i * 5} fill="#7a9a72" opacity="0.3" />
          </g>
        ))}

        {[80, 160, 250, 340, 1100, 1180, 1270, 1360].map((fx, i) => (
          <g key={`sg-${i}`}>
            <StemSVG x={fx} y={450 + Math.sin(i) * 20} height={80 + Math.random() * 60} delay={i * 0.3} />
            <FlowerSVG x={fx + 2} y={370 + Math.sin(i) * 20} scale={0.8 + Math.random() * 0.4}
              color={['#F2D7D9', '#D4A5A5', '#C9B1BD', '#E8B4B8'][i % 4]} delay={i * 0.2} />
          </g>
        ))}

        {[120, 400, 700, 1000, 1300].map((fx, i) => (
          <g key={`fs-${i}`}>
            <StemSVG x={fx} y={470} height={50 + Math.random() * 40} delay={i * 0.5} />
            <FlowerSVG x={fx} y={420} scale={0.5 + Math.random() * 0.3}
              color={['#F2D7D9', '#C9B1BD', '#D4A5A5'][i % 3]} delay={i * 0.4} />
          </g>
        ))}

        {[100, 300, 600, 800, 1100, 1350].map((lx, i) => (
          <LeafSVG key={`l-${i}`} x={lx} y={440 + Math.sin(i * 2) * 15}
            scale={0.8 + Math.random() * 0.5} flip={i % 2 === 0} delay={i * 0.3} />
        ))}
      </svg>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  )
}
