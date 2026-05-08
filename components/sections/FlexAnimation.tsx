"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMG_START = 0.04;
const IMG_W     = 0.20;
const IMG_END   = 1 - IMG_W - 0.04;

const WORDS: { text: string; accent: boolean; color?: string }[] = [
  { text: "Şehrin",       accent: false },
  { text: "kalbinde,",    accent: false },
  { text: "doğanın",      accent: true,  color: "#C4A47C" },
  { text: "taze",         accent: true,  color: "#C4A47C" },
  { text: "nefesiyle",    accent: true,  color: "#C4A47C" },
  { text: "harmanlanmış", accent: false },
  { text: "el",           accent: true,  color: "rgba(255,255,255,0.95)" },
  { text: "yapımı",       accent: true,  color: "rgba(255,255,255,0.95)" },
  { text: "bir",          accent: false },
  { text: "lezzet",       accent: false },
  { text: "deneyimi.",    accent: false },
];

export default function FlexAnimation() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const finestraRef = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const wordRef     = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const vw        = window.innerWidth;
    const imgW      = vw * IMG_W;
    const startLeft = vw * IMG_START;
    const totalMove = vw * (IMG_END - IMG_START);
    const section   = sectionRef.current!;

    gsap.set(imageRef.current, { yPercent: -50 });

    // ── Scroll maskeleme ──────────────────────────────────────────
    const applyClips = (progress: number) => {
      const x = startLeft + totalMove * progress;
      finestraRef.current!.style.clipPath = `inset(0 ${vw - x}px 0 0)`;
      textRef.current!.style.clipPath    = `inset(0 0 0 ${x + imgW}px)`;
    };
    applyClips(0);

    gsap.to(imageRef.current, {
      x: totalMove,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=220%",
        onUpdate(self) { applyClips(self.progress); },
      },
    });

    // ── İmleç tepkili 3D rotasyon ─────────────────────────────────
    const el = wordRef.current!;
    gsap.set(el, { rotationY: -10, rotationX: 2, transformStyle: "preserve-3d" });

    const toRotY = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
    const toRotX = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const xN = (e.clientX - rect.left)  / rect.width;   // 0→1
      const yN = (e.clientY - rect.top)   / rect.height;  // 0→1
      toRotY((xN - 0.5) * 32);   // -16 → +16 deg
      toRotX(-(yN - 0.5) * 18);  // -9  → +9  deg  (üst = öne eğil)
    };

    const onLeave = () => {
      toRotY(-10);
      toRotX(2);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-navbar-color="#C4A47C"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#2C3E2D", height: "100vh" }}
    >

      {/* KATMAN 1 — FINESTRA (clip-path ile reveal, imleçle 3D döner) */}
      <div
        ref={finestraRef}
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 1, paddingLeft: `${IMG_START * 100 + 6}%`, perspective: "1200px" }}
      >
        <p
          ref={wordRef}
          className="font-playfair italic select-none pointer-events-none whitespace-nowrap"
          style={{
            fontSize: "clamp(56px, 16vw, 240px)",
            color: "#C4A47C",
            letterSpacing: "0.02em",
            lineHeight: 1,
            textShadow: [
              "1px  0   rgba(196,164,124,0.95)",
              "2px  0   rgba(185,155,115,0.82)",
              "3px  0   rgba(172,143,104,0.70)",
              "4px  0   rgba(158,131, 93,0.58)",
              "5px  0   rgba(144,119, 82,0.47)",
              "6px  0   rgba(130,107, 71,0.37)",
              "7px  0   rgba(116, 95, 60,0.28)",
              "8px  0   rgba(100, 82, 50,0.21)",
              "9px  0   rgba( 84, 68, 40,0.14)",
              "10px 0   rgba( 65, 52, 30,0.09)",
              "12px 2px rgba(  0,  0,  0,0.22)",
            ].join(", "),
          }}
        >
          Finestra
        </p>
      </div>

      {/* KATMAN 1 — Sağ yazı (WelcomeText formatı, clip-path ile yutulur) */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 1 }}
      >
        <div
          style={{
            marginLeft: `${(IMG_START + IMG_W + 0.04) * 100}%`,
            paddingRight: "5%",
          }}
        >
          <p className="flex flex-wrap gap-x-4 gap-y-3">
            {WORDS.map((word, i) => (
              <span
                key={i}
                className="inline-block text-4xl md:text-5xl lg:text-6xl select-none pointer-events-none"
                style={{
                  fontFamily: word.accent
                    ? "var(--font-playfair-face), Georgia, serif"
                    : "var(--font-montserrat-face), Arial, sans-serif",
                  fontStyle:  word.accent ? "italic" : "normal",
                  fontWeight: word.accent ? 600 : 300,
                  color: word.accent ? word.color : "rgba(255,255,255,0.75)",
                }}
              >
                {word.text}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* KATMAN 2 — Kayan resim */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          left: `${IMG_START * 100}%`,
          top: "50%",
          width: `${IMG_W * 100}vw`,
          height: `calc(${IMG_W * 100}vw * 16 / 9)`,
          maxHeight: "84vh",
          borderRadius: "14px",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <Image
          src="/media/cat-2.jpg"
          alt="Finestra"
          fill
          className="object-cover"
          priority
        />
      </div>

    </section>
  );
}
