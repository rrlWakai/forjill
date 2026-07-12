import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const paragraphs = [
  { text: "My dearest Jillian,", style: 'salutation' },
  { text: "There are moments in life when words feel too small for what the heart holds. This is one of those moments. But I'll try, because you deserve to know what you mean to me.", style: 'body' },
  { text: "You walked into my life and suddenly everything felt more vivid. Colors were brighter. Days were warmer. Even silence became something beautiful when shared with you.", style: 'body' },
  { text: "I love the way you laugh. I love the way you think. I love the quiet moments when we don't need to say anything at all. I love who I am when I'm with you.", style: 'body' },
  { text: "Today is your day. And I want you to know that every single day with you is a gift I don't take for granted.", style: 'body' },
  { text: "Happy Birthday, my love.", style: 'closing' },
  { text: "Forever yours", style: 'signature' },
]

function FlowerBranch({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const t: Record<string, string> = {
    'top-left': 'rotate(0deg)', 'top-right': 'rotate(90deg)',
    'bottom-left': 'rotate(-90deg)', 'bottom-right': 'rotate(180deg)',
  }
  const p: Record<string, string> = {
    'top-left': '-top-2 -left-2', 'top-right': '-top-2 -right-2',
    'bottom-left': '-bottom-2 -left-2', 'bottom-right': '-bottom-2 -right-2',
  }
  return (
    <svg className={`absolute ${p[position]} w-24 h-24 md:w-32 md:h-32 opacity-30`} viewBox="0 0 100 100" style={{ transform: t[position] }}>
      <path d="M10,10 Q30,15 50,10 Q70,5 90,10" stroke="#B5C4B1" strokeWidth="1" fill="none" />
      <path d="M10,10 Q15,30 10,50" stroke="#B5C4B1" strokeWidth="1" fill="none" />
      {[20, 40, 60, 80].map((x, i) => (
        <ellipse key={i} cx={x} cy={10 + Math.sin(i) * 3} rx="3" ry="5" fill="#F2D7D9" opacity="0.5"
          transform={`rotate(${-20 + i * 10}, ${x}, 10)`} />
      ))}
      <circle cx="15" cy="30" r="3" fill="#C4A265" opacity="0.4" />
      <ellipse cx="25" cy="25" rx="4" ry="7" fill="#F2D7D9" opacity="0.3" transform="rotate(-30, 25, 25)" />
    </svg>
  )
}

function PressedFlower({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '30%', zIndex: 30 }}
      initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.8, 0.6, 0], y: [0, 80, 160], rotate: [0, 45, 120], scale: [0.5, 0.8, 0.3] }}
      transition={{ duration: 3, delay, ease: 'easeOut' }}>
      <svg width="14" height="14" viewBox="0 0 14 14">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx="7" cy="3" rx="2" ry="3.5" fill={['#F2D7D9', '#D4A5A5', '#C9B1BD'][i % 3]} opacity="0.7"
            transform={`rotate(${a}, 7, 7)`} />
        ))}
        <circle cx="7" cy="7" r="1.2" fill="#C4A265" opacity="0.6" />
      </svg>
    </motion.div>
  )
}

type EnvelopeState = 'sealed' | 'opening' | 'opened' | 'reading'

export default function LetterToYou() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.05 })
  const [state, setState] = useState<EnvelopeState>('sealed')
  const [visibleParagraphs, setVisibleParagraphs] = useState(0)

  const handleOpen = () => {
    if (state !== 'sealed') return
    setState('opening')
    // Cinematic opening sequence
    setTimeout(() => setState('opened'), 1800)
    setTimeout(() => {
      setState('reading')
      // Reveal paragraphs one by one
      let i = 0
      const interval = setInterval(() => {
        i++
        setVisibleParagraphs(i)
        if (i >= paragraphs.length) clearInterval(interval)
      }, 1200)
    }, 3200)
  }

  return (
    <section ref={sectionRef} className="relative min-h-[140vh] flex flex-col items-center justify-center py-32 px-6"
      style={{ zIndex: 2 }}>

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(196,162,101,0.04) 0%, transparent 60%)',
      }} />

      {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 md:mb-24">
        <p className="font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{ color: '#C4A265' }}>Chapter Three</p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em]"
          style={{ color: '#FDF8F0' }}>My Letter To You</h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ENVELOPE VIEW */}
        {state !== 'reading' && (
          <motion.div key="envelope" exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center">

            {state === 'sealed' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="font-heading text-base md:text-lg italic tracking-[0.08em] mb-10"
                style={{ color: 'rgba(253,248,240,0.5)' }}>
                Click the envelope to open.
              </motion.p>
            )}

            {/* Envelope */}
            <motion.div
              animate={state === 'sealed' ? { y: [0, -6, 0] } : {}}
              transition={state === 'sealed' ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : {}}
              onClick={handleOpen}
              className={`relative ${state === 'sealed' ? 'cursor-pointer' : ''}`}
              style={{ perspective: '1000px', width: 320, height: 220 }}>

              {/* Golden glow behind envelope */}
              <div className="absolute -inset-8 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(196,162,101,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />

              {/* Envelope body */}
              <motion.div className="relative w-full h-full rounded-lg overflow-hidden"
                whileHover={state === 'sealed' ? { y: -6, rotateX: -2, scale: 1.02 } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'linear-gradient(145deg, #F5EDE0 0%, #EDE3D3 50%, #E8DED0 100%)',
                  boxShadow: state === 'sealed'
                    ? '0 8px 32px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
                    : '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
                  transformStyle: 'preserve-3d',
                }}>

                {/* Paper texture */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }} />

                {/* Gold border trim */}
                <div className="absolute inset-0 rounded-lg" style={{
                  border: '1px solid rgba(196,162,101,0.25)',
                  boxShadow: 'inset 0 0 30px rgba(196,162,101,0.05)',
                }} />

                {/* Flap */}
                <motion.div className="absolute top-0 left-0 right-0 origin-top"
                  animate={state === 'opening' || state === 'opened' ? { rotateX: 180, opacity: 0 } : { rotateX: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: '50%', transformStyle: 'preserve-3d', zIndex: 2 }}>
                  <div className="w-full h-full" style={{
                    background: 'linear-gradient(180deg, #EDE3D3 0%, #E0D5C5 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}>
                    <div className="absolute inset-0" style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      border: '1px solid rgba(196,162,101,0.2)',
                    }} />
                  </div>
                </motion.div>

                {/* Wax seal */}
                <motion.div className="absolute z-10"
                  style={{ top: '38%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  animate={state === 'opening' ? { scale: [1, 1.1, 0], opacity: [1, 1, 0], rotate: [0, 10, 30] } : {}}
                  transition={{ duration: 1.2, ease: 'easeOut' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle at 40% 40%, #D4A5A5 0%, #C9929B 50%, #B57A82 100%)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.3)',
                    }}>
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      {[0, 72, 144, 216, 288].map((a, i) => (
                        <ellipse key={i} cx="10" cy="5" rx="3" ry="5" fill="rgba(255,255,255,0.4)"
                          transform={`rotate(${a}, 10, 10)`} />
                      ))}
                      <circle cx="10" cy="10" r="2.5" fill="rgba(255,255,255,0.3)" />
                    </svg>
                  </div>
                </motion.div>

                {/* Inner lines pattern */}
                <div className="absolute bottom-4 left-6 right-6 space-y-2 opacity-15">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-px rounded" style={{
                      background: '#C4A265',
                      width: `${100 - i * 15}%`,
                    }} />
                  ))}
                </div>
              </motion.div>

              {/* Pressed flowers falling on open */}
              {(state === 'opening' || state === 'opened') && (
                <>
                  <PressedFlower delay={0.3} x={20} />
                  <PressedFlower delay={0.5} x={45} />
                  <PressedFlower delay={0.7} x={70} />
                  <PressedFlower delay={0.4} x={35} />
                  <PressedFlower delay={0.6} x={60} />
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* LETTER VIEW */}
        {state === 'reading' && (
          <motion.div key="letter"
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl mx-auto">

            <div className="paper-texture letter-shadow relative rounded-sm p-8 md:p-14 lg:p-16"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>

              <FlowerBranch position="top-left" />
              <FlowerBranch position="top-right" />
              <FlowerBranch position="bottom-left" />
              <FlowerBranch position="bottom-right" />

              <div className="relative z-10 space-y-8">
                {paragraphs.map((para, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={i < visibleParagraphs ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}>
                    {para.style === 'salutation' && (
                      <p className="font-heading text-xl md:text-2xl italic mb-8" style={{ color: '#4A4A4A' }}>{para.text}</p>
                    )}
                    {para.style === 'body' && (
                      <p className="font-body text-base md:text-lg leading-[1.9] tracking-[0.02em]"
                        style={{ color: '#2C2C2C', opacity: 0.85 }}>{para.text}</p>
                    )}
                    {para.style === 'closing' && (
                      <p className="font-heading text-xl md:text-2xl italic mt-10 mb-4" style={{ color: '#4A4A4A' }}>{para.text}</p>
                    )}
                    {para.style === 'signature' && (
                      <p className="font-display text-lg md:text-xl italic text-right" style={{ color: '#C4A265' }}>{para.text}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-0 rounded-sm pointer-events-none"
                style={{ boxShadow: 'inset 0 0 60px rgba(210,180,140,0.1)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
