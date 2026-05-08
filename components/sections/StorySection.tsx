"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROWS = [
  {
    video: "/media/story-1.mp4",
    heading: "Artizan ekmek,",
    headingItalic: "kendi mutfağımızdan.",
    body: "Her gün sabahın erken saatlerinde, sizin için pişirilen el yapımı burger ekmeği.",
  },
  {
    video: "/media/story-2.mp4",
    heading: "Yöresel lezzetler,",
    headingItalic: "Aşıkbaba'dan.",
    body: "Özenle seçilmiş yöresel Aşıkbaba ürünleri — toprağın tadı tabağınıza taşınır.",
  },
  {
    video: "/media/story-3.mp4",
    heading: "Nitelikli çekirdek,",
    headingItalic: "taze demleme.",
    body: "Nitelikli çekirdeklerden demlenen taze kahve kokusu — her sabah yeniden.",
  },
  {
    video: "/media/story-4.mp4",
    heading: "El yapımı çikolata,",
    headingItalic: "saf lezzet.",
    body: "Butik çikolata ve pastalar — şeker sanatının en zarif hali.",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const videoEl = row.querySelector(".story-video");
        const textEl = row.querySelector(".story-text");
        const isEven = i % 2 === 0;

        if (videoEl) {
          gsap.from(videoEl, {
            x: isEven ? -50 : 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        if (textEl) {
          gsap.from(textEl, {
            x: isEven ? 50 : -50,
            opacity: 0,
            duration: 1,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} data-navbar-color="#2C3E2D" className="py-20 md:py-28 px-6" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-playfair text-3xl md:text-4xl text-center mb-16 tracking-wide"
          style={{ color: "var(--primary-accent)" }}
        >
          <span className="italic">Finestra</span> Hikayesi
        </h2>

        <div className="flex flex-col gap-0">
          {ROWS.map((row, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={`flex flex-col items-center gap-8 md:gap-12 ${
                  isEven ? "md:flex-row-reverse md:justify-start" : "md:flex-row md:justify-start"
                }`}
                style={{ width: "100%" }}
              >
                {/* Dairesel video */}
                <div className="story-video flex-shrink-0">
                  <video
                    src={row.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Metin */}
                <div className="story-text text-center md:text-left">
                  <h3
                    className="font-playfair text-2xl md:text-3xl leading-tight mb-3"
                    style={{ color: "var(--text-main)" }}
                  >
                    {row.heading}
                    <br />
                    <span
                      className="italic"
                      style={{ color: "var(--primary-accent)" }}
                    >
                      {row.headingItalic}
                    </span>
                  </h3>
                  <p
                    className="font-montserrat text-sm md:text-base leading-relaxed max-w-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {row.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
