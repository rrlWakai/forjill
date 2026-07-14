import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { gsap } from "gsap";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function Particles({
  count = 40,
  color = "rgba(196, 162, 101, 0.4)",
}: {
  count?: number;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from(
        { length: count },
        (_, i): Particle => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 4,
          delay: Math.random() * 8,
          duration: 4 + Math.random() * 6,
          opacity: 0.1 + Math.random() * 0.5,
        }),
      ),
    [count],
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const elements: NodeListOf<HTMLDivElement> =
      container.querySelectorAll(".particle");

    elements.forEach((el: HTMLDivElement, index: number) => {
      const particle = particles[index];

      if (!particle) return;

      gsap.set(el, {
        x: `${particle.x}vw`,
        y: `${particle.y}vh`,
        width: particle.size,
        height: particle.size,
        opacity: 0,
      });

      gsap.to(el, {
        opacity: particle.opacity,
        duration: particle.duration,
        delay: particle.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(el, {
        y: `+=${20 + Math.random() * 40}`,
        x: `+=${(Math.random() - 0.5) * 30}`,
        duration: particle.duration * 1.5,
        delay: particle.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [particles]);
}
