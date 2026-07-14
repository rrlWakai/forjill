import { useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

function FloatingPetal({
  delay,
  x,
  size,
}: {
  delay: number;
  x: number;
  size: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 30, opacity: 0, rotation: 0 },
      {
        y: -60,
        opacity: 0.5,
        rotation: 40 + Math.random() * 60,
        duration: 14 + Math.random() * 6,
        repeat: -1,
        delay,
        ease: "sine.inOut",
      },
    );
  }, [delay]);
  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: "15%" }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse
            key={i}
            cx="6"
            cy="2.5"
            rx="1.8"
            ry="3"
            fill={["#F2D7D9", "#D4A5A5", "#FDF8F0"][i % 3]}
            opacity="0.6"
            transform={`rotate(${a}, 6, 6)`}
          />
        ))}
        <circle cx="6" cy="6" r="1" fill="#C4A265" opacity="0.4" />
      </svg>
    </div>
  );
}

function SunRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2"
        style={{
          width: "140%",
          height: "50vh",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,200,122,0.12) 0%, rgba(196,162,101,0.04) 40%, transparent 70%)",
        }}
      />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: 0,
            left: `${15 + i * 18}%`,
            width: "2px",
            height: "40vh",
            background: `linear-gradient(180deg, rgba(232,200,122,${0.06 + i * 0.01}) 0%, transparent 100%)`,
            transform: `rotate(${-8 + i * 4}deg)`,
            transformOrigin: "top center",
            filter: "blur(4px)",
          }}
        />
      ))}
    </div>
  );
}

function GardenFlowers() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      style={{ height: "25vh" }}
    >
      <path
        d="M0,200 Q360,170 720,190 Q1080,165 1440,185 L1440,300 L0,300 Z"
        fill="rgba(143,165,139,0.2)"
      />
      <path
        d="M0,230 Q360,210 720,220 Q1080,200 1440,215 L1440,300 L0,300 Z"
        fill="rgba(107,125,103,0.15)"
      />
      {Array.from({ length: 20 }, (_, i) => {
        const x = 60 + i * 70;
        const h = 30 + Math.random() * 40;
        const y = 210 - Math.random() * 20;
        return (
          <g key={i} opacity={0.25 + Math.random() * 0.15}>
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={y + h}
              stroke="#8FA58B"
              strokeWidth="1.2"
            />
            {[0, 72, 144, 216, 288].map((a, j) => (
              <ellipse
                key={j}
                cx={x}
                cy={y - 5}
                rx="4"
                ry="7"
                fill={
                  ["#F2D7D9", "#D4A5A5", "#C9B1BD", "#E8B4B8", "#FDF8F0"][j % 5]
                }
                transform={`rotate(${a + i * 12}, ${x}, ${y - 5})`}
                opacity="0.5"
              />
            ))}
            <circle cx={x} cy={y - 5} r="2.5" fill="#C4A265" opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

function FloralBorder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 700 900"
      preserveAspectRatio="none"
    >
      {/* Top border */}
      <path
        d="M50,30 Q200,15 350,25 Q500,15 650,30"
        stroke="rgba(181,196,177,0.3)"
        strokeWidth="0.8"
        fill="none"
      />
      {[100, 180, 260, 340, 420, 500, 580].map((x, i) => (
        <ellipse
          key={`tt${i}`}
          cx={x}
          cy={22 + Math.sin(i * 0.8) * 4}
          rx="3"
          ry="5"
          fill="#F2D7D9"
          opacity="0.25"
          transform={`rotate(${-15 + i * 5}, ${x}, 22)`}
        />
      ))}
      {/* Bottom border */}
      <path
        d="M50,870 Q200,885 350,875 Q500,885 650,870"
        stroke="rgba(181,196,177,0.3)"
        strokeWidth="0.8"
        fill="none"
      />
      {[100, 180, 260, 340, 420, 500, 580].map((x, i) => (
        <ellipse
          key={`tb${i}`}
          cx={x}
          cy={878 + Math.sin(i * 0.8) * 4}
          rx="3"
          ry="5"
          fill="#F2D7D9"
          opacity="0.25"
          transform={`rotate(${15 - i * 5}, ${x}, 878)`}
        />
      ))}
      {/* Left border */}
      <path
        d="M25,60 Q15,200 20,350 Q15,500 25,650 Q15,750 25,840"
        stroke="rgba(181,196,177,0.25)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Right border */}
      <path
        d="M675,60 Q685,200 680,350 Q685,500 675,650 Q685,750 675,840"
        stroke="rgba(181,196,177,0.25)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Corner flowers */}
      {[
        [35, 40],
        [665, 40],
        [35, 860],
        [665, 860],
      ].map(([cx, cy], i) => (
        <g key={`cf${i}`}>
          {[0, 72, 144, 216, 288].map((a, j) => (
            <ellipse
              key={j}
              cx={cx}
              cy={cy}
              rx="4"
              ry="7"
              fill={["#F2D7D9", "#D4A5A5"][j % 2]}
              opacity="0.3"
              transform={`rotate(${a + i * 30}, ${cx}, ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r="2" fill="#C4A265" opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

export default function PrayerForYou() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: 5 + i * 8,
        delay: i * 0.8,
        size: 8 + Math.random() * 6,
      })),
    [],
  );

  useEffect(() => {
    if (!sectionRef.current || !isInView) return;
    const els = sectionRef.current.querySelectorAll(".float-glow");
    gsap.fromTo(
      els,
      { opacity: 0 },
      {
        opacity: 0.4,
        duration: 6,
        repeat: -1,
        yoyo: true,
        stagger: 1.5,
        ease: "sine.inOut",
      },
    );
  }, [isInView]);

  const prayerParagraphs = [
    { text: "Aming Diyos na makapangyarihan sa lahat", style: "opening" },
    {
      text: "Thank You for today because it's the day You gave Jill another year of life. Thank You for allowing me to meet someone as kind, caring, and beautiful as her. I know meeting her wasn't just by chance, and I'm really grateful that You allowed our paths to cross.",
      style: "body",
    },
    {
      text: "Lord, today I simply want to lift her up to You.",
      style: "emphasis",
    },
    {
      text: "Please continue to watch over her wherever she goes. Protect her from anything that could harm her, guide every decision she makes, and remind her that she's never facing life alone because You're always with her.",
      style: "body",
    },
    {
      text: "I pray that You bless her with good health, a peaceful heart, and genuine happiness—not just today because it's her birthday, but every single day. When life gets difficult or overwhelming, remind her to rest in You and trust Your plans, even when she doesn't understand everything that's happening.",
      style: "body",
    },
    {
      text: "Help her continue chasing the dreams You've placed in her heart. Give her wisdom when she doesn't know what to do, strength when she feels tired, and courage whenever fear tries to hold her back.",
      style: "body",
    },
    {
      text: "And Lord... thank You for letting me be part of her life.",
      style: "emphasis",
    },
    {
      text: "I know I'm not perfect, and I know I'll make mistakes, but I pray that You help me become the kind of man who loves her the way she deserves to be loved. Teach me to be patient, understanding, and someone who always points her closer to You.",
      style: "body",
    },
    {
      text: "Please continue to be at the center of our relationship. Help us grow not only together, but closer to You every day. I pray that whatever future You have prepared for us, we'll continue trusting You and walking in Your purpose.",
      style: "body",
    },
    {
      text: "Lastly, Lord, I pray that today she'll feel loved—not because of gifts or surprises, but because she's surrounded by people who genuinely care about her, and because she'll always know how deeply You love her.",
      style: "body",
    },
    { text: "Thank You for everything.", style: "emphasis" },
    { text: "In Jesus' name,", style: "closing" },
    { text: "Amen. ❤️", style: "amen" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden py-28 md:py-40 px-6"
      style={{ zIndex: 2 }}
    >
      {/* Sunset atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(232,200,122,0.06) 30%, rgba(196,162,101,0.1) 60%, rgba(232,200,122,0.14) 100%)",
        }}
      />

      <SunRays />
      <GardenFlowers />

      {/* Floating glow particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="float-glow absolute rounded-full pointer-events-none"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 4 + i * 2,
            height: 4 + i * 2,
            background:
              "radial-gradient(circle, rgba(232,200,122,0.5) 0%, transparent 70%)",
            filter: "blur(3px)",
          }}
        />
      ))}

      {/* Floating petals */}
      {petals.map((p, i) => (
        <FloatingPetal key={i} {...p} />
      ))}

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 md:mb-24 relative z-10"
      >
        <p
          className="font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{ color: "#C4A265" }}
        >
          Chapter Four
        </p>
        <h2
          className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] mb-4"
          style={{ color: "#FDF8F0" }}
        >
          A Prayer For You
        </h2>
        <p
          className="font-heading text-base md:text-lg italic tracking-[0.06em]"
          style={{ color: "rgba(253,248,240,0.5)" }}
        >
          My birthday prayer for the woman I love.
        </p>
      </motion.div>

      {/* Prayer card */}
      <motion.div
        initial={{ opacity: 0, y: 60, filter: "blur(8px)", scale: 0.97 }}
        animate={
          isInView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}
        }
        transition={{ duration: 3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-720px z-10"
      >
        {/* Glassmorphism glow behind card */}
        <div
          className="absolute -inset-8 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl p-7 sm:p-10 md:p-14 lg:p-16"
          style={{
            background:
              "linear-gradient(170deg, rgba(250,245,236,0.96) 0%, rgba(245,237,224,0.93) 40%, rgba(240,232,219,0.91) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 20px 70px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          {/* Paper texture */}
          <div
            className="absolute inset-0 rounded-2xl opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gold border */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              border: "1px solid rgba(196,162,101,0.15)",
              boxShadow: "inset 0 0 60px rgba(210,180,140,0.05)",
            }}
          />

          {/* Floral border decoration */}
          <FloralBorder />

          {/* Prayer content */}
          <div className="relative z-10 space-y-5 sm:space-y-6">
            {prayerParagraphs.map((para, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18, filter: "blur(3px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 2.2,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {para.style === "opening" && (
                  <p
                    className="font-display text-lg md:text-xl font-medium tracking-[0.02em] mb-2"
                    style={{ color: "#2C2C2C" }}
                  >
                    {para.text}
                  </p>
                )}

                {para.style === "body" && (
                  <p
                    className="font-body text-[15px] md:text-base leading-2 tracking-[0.015em]"
                    style={{ color: "rgba(44,44,44,0.85)" }}
                  >
                    {para.text}
                  </p>
                )}

                {para.style === "emphasis" && (
                  <p
                    className="font-body text-[15px] md:text-base leading-2 tracking-[0.015em] font-medium"
                    style={{ color: "#2C2C2C" }}
                  >
                    {para.text}
                  </p>
                )}

                {para.style === "closing" && (
                  <p
                    className="font-display text-base md:text-lg italic tracking-[0.02em] mt-4"
                    style={{ color: "#4A4A4A" }}
                  >
                    {para.text}
                  </p>
                )}

                {para.style === "amen" && (
                  <p
                    className="font-display text-xl md:text-2xl font-medium tracking-[0.03em]"
                    style={{ color: "#C4A265" }}
                  >
                    {para.text}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Proverbs verse */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 pt-8"
              style={{ borderTop: "1px solid rgba(196,162,101,0.15)" }}
            >
              <p
                className="font-display text-sm md:text-base italic leading-[1.9] tracking-[0.02em]"
                style={{ color: "#4A4A4A" }}
              >
                "Trust in the Lord with all your heart and lean not on your own
                understanding; in all your ways submit to Him, and He will make
                your paths straight."
              </p>
              <p
                className="font-display text-sm italic tracking-[0.04em] mt-2"
                style={{ color: "#C4A265" }}
              >
                — Proverbs 3:5–6
              </p>
            </motion.div>
          </div>

          {/* Inner shadow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: "inset 0 2px 30px rgba(210,180,140,0.06)",
            }}
          />
        </div>
      </motion.div>

      {/* Ending section */}
      <div className="relative z-10 text-center mt-20 md:mt-28 max-w-650px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-base md:text-lg italic tracking-[0.06em]"
          style={{ color: "rgba(253,248,240,0.55)" }}
        >
          May God continue to bless you today and always.
        </motion.p>
      </div>
    </section>
  );
}
