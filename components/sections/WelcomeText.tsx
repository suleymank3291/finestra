"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Her kelime: metin + accent flag + renk
const WORDS: { text: string; accent: boolean; color?: string }[] = [
  { text: "Şehrin", accent: false },
  { text: "kalbinde,", accent: false },
  { text: "doğanın", accent: true, color: "#2C3E2D" },
  { text: "taze", accent: true, color: "#2C3E2D" },
  { text: "nefesiyle", accent: true, color: "#2C3E2D" },
  { text: "harmanlanmış", accent: false },
  { text: "el", accent: true, color: "#C4A47C" },
  { text: "yapımı", accent: true, color: "#C4A47C" },
  { text: "bir", accent: false },
  { text: "lezzet", accent: false },
  { text: "deneyimi.", accent: false },
];

export default function WelcomeText() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.from(wordsRef.current.filter(Boolean), {
        opacity: 0,
        y: 22,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.8,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center py-20 px-6"
      data-navbar-color="#2C3E2D"
      style={{ minHeight: "45vh", background: "#FCFCFC" }}
    >
      <div className="max-w-6xl w-full text-center">
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-4">
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: word.accent
                  ? "var(--font-playfair-face), Georgia, serif"
                  : "var(--font-montserrat-face), Arial, sans-serif",
                fontStyle: word.accent ? "italic" : "normal",
                fontWeight: word.accent ? 600 : 300,
                color: word.accent ? word.color : "var(--text-main)",
              }}
            >
              {word.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
