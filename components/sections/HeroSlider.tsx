"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Slide = {
  type: "image" | "video";
  src: string;
  heading: string[];
  sub: string;
};

const SLIDES: Slide[] = [
  {
    type: "image",
    src: "/media/hero-f1.webp",
    heading: ["Şehrin kalbinde", "bir nefes."],
    sub: "Nitelikli kahve, el yapımı çikolata, taze çiçek.",
  },
  {
    type: "image",
    src: "/media/hero-f2.webp",
    heading: ["Her yudumda", "bir hikâye."],
    sub: "Aşıkbaba yöresi çekirdeklerinden demlenen taze kahve.",
  },
  {
    type: "image",
    src: "/media/hero-f3.webp",
    heading: ["Doğanın renkleri,", "sofranızda."],
    sub: "Taze çiçekler, özenle hazırlanmış buketler, hediyeler.",
  },
  {
    type: "image",
    src: "/media/hero-f4.webp",
    heading: ["El yapımı", "çikolata sanatı."],
    sub: "Her parçada sabır, ustalık ve en seçkin kakao.",
  },
  {
    type: "image",
    src: "/media/hero-f5.webp",
    heading: ["Anılarınıza layık", "bir lezzet."],
    sub: "Özel günler için özel reçeteler, Finestra mutfağından.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // İlk slayt metin reveal — kelimeler CSS'te opacity:0 başlıyor, gsap.to ile açılıyor
  useGSAP(() => {
    const textEl = textsRef.current[0];
    if (!textEl) return;
    const words = textEl.querySelectorAll<HTMLSpanElement>(".word");
    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.6,
    });
  }, []);

  // dir: "forward" = sağdan giriş, "backward" = soldan giriş
  const goToSlide = useCallback(
    (next: number, dir: "forward" | "backward" = "forward") => {
      if (isAnimating || next === current) return;
      setIsAnimating(true);

      const currentSlide = slidesRef.current[current];
      const nextSlide = slidesRef.current[next];
      const currentText = textsRef.current[current];
      const nextText = textsRef.current[next];

      if (!currentSlide || !nextSlide) return;

      // Yön: forward → sağdan giriş, backward → soldan giriş
      const enterClip  = dir === "forward" ? "inset(0% 0% 0% 100%)"  : "inset(0% 100% 0% 0%)";
      const enterX     = dir === "forward" ? "15%"                    : "-15%";
      const exitX      = dir === "forward" ? "-8%"                    : "8%";
      const exitClip   = dir === "forward" ? "inset(0% 100% 0% 0%)"  : "inset(0% 0% 0% 100%)";

      gsap.set(nextSlide, { clipPath: enterClip, zIndex: 2, x: enterX });
      gsap.set(currentSlide, { zIndex: 1 });

      // Next slide metnini hazırla
      if (nextText) {
        gsap.set(nextText, { opacity: 1, y: 0 });
        const nextWords = nextText.querySelectorAll<HTMLSpanElement>(".word");
        gsap.set(nextWords, { opacity: 0, y: 80 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentSlide, { zIndex: 0, x: "0%", clipPath: exitClip });
          setCurrent(next);
          setIsAnimating(false);

          if (nextText) {
            const words = nextText.querySelectorAll<HTMLSpanElement>(".word");
            gsap.to(words, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" });
          }

          if (currentText) {
            gsap.set(currentText, { opacity: 1, y: 0 });
            const oldWords = currentText.querySelectorAll<HTMLSpanElement>(".word");
            gsap.set(oldWords, { opacity: 0, y: 80 });
          }
        },
      });

      // Yeni slayt kayarak girer
      tl.to(nextSlide, { clipPath: "inset(0% 0% 0% 0%)", x: "0%", duration: 1.2, ease: "power3.inOut" });

      // Eski slayt çıkar (parallax)
      tl.to(currentSlide, { x: exitX, duration: 1.2, ease: "power3.inOut" }, "<");

      // Eski metin fade out
      if (currentText) {
        tl.to(currentText, { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }, "<");
      }
    },
    [current, isAnimating]
  );

  // Otomatik ilerleme (5 sn) — her zaman ileri
  useEffect(() => {
    autoTimer.current = setTimeout(() => {
      goToSlide((current + 1) % SLIDES.length, "forward");
    }, 5000);
    return () => clearTimeout(autoTimer.current);
  }, [current, goToSlide]);

  // Touchpad (wheel) ve dokunmatik kaydırma
  useEffect(() => {
    const section = document.getElementById("hero-slider");
    if (!section) return;

    // Wheel / touchpad iki parmak kaydırma
    let wheelCooldown = false;
    const handleWheel = (e: WheelEvent) => {
      // Yalnızca yatay kaydırmayı yakala (touchpad iki parmak sol-sağ)
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(() => { wheelCooldown = false; }, 900);
      if (e.deltaX > 30) goToSlide((current + 1) % SLIDES.length, "forward");
      else if (e.deltaX < -30) goToSlide((current - 1 + SLIDES.length) % SLIDES.length, "backward");
    };

    // Touch kaydırma (mobil)
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return;
      if (diff > 0) goToSlide((current + 1) % SLIDES.length, "forward");
      else goToSlide((current - 1 + SLIDES.length) % SLIDES.length, "backward");
    };

    section.addEventListener("wheel", handleWheel, { passive: true });
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current, goToSlide]);


  return (
    <section id="hero-slider" data-navbar-color="#ffffff" className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#2C3E2D" }}>
      {/* Slaytlar */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { slidesRef.current[i] = el; }}
          className="absolute inset-0"
          style={{
            clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
            zIndex: i === 0 ? 1 : 0,
          }}
        >
          {/* Arka plan */}
          {slide.type === "video" ? (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover"
            />
          )}

          {/* Gradient overlay: %30-40 koyu */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(44,62,45,0.42) 100%)",
            }}
          />

          {/* Metin katmanı */}
          <div
            ref={(el) => { textsRef.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight italic mb-6">
              {slide.heading.map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  {line.split(" ").map((word, wi) => (
                    <span
                      key={wi}
                      className="word inline-block mr-[0.3em]"
                      style={{ opacity: 0, transform: "translateY(80px)" }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p
              className="font-montserrat text-lg md:text-xl max-w-md font-light tracking-wide"
              style={{ color: "#C4A47C" }}
            >
              {slide.sub}
            </p>
          </div>
        </div>
      ))}

      {/* Noktalı slidebar — en alt orta */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i, i > current ? "forward" : "backward")}
            aria-label={`Slayt ${i + 1}`}
            className="relative flex items-center justify-center transition-all duration-400"
            style={{ width: i === current ? "32px" : "8px", height: "8px" }}
          >
            {/* Arkaplan: boş yuvarlak */}
            <span
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(196,164,124,0.5)" }}
            />
            {/* Aktif: dolu kapsül */}
            {i === current && (
              <span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "#C4A47C" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Dairesel CTA — alt orta */}
      <Link
        href="/menu"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-36 h-36 rounded-full flex items-center justify-center text-center transition-all duration-300 hover:scale-110 group"
        style={{ border: "1px solid rgba(196,164,124,0.8)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.borderColor = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(196,164,124,0.8)";
        }}
      >
        <span
          className="font-montserrat text-[10px] uppercase tracking-[0.2em] font-medium leading-5 transition-colors duration-300 text-white group-hover:text-[#2C3E2D]"
        >
          Menüyü
          <br />
          Keşfet
        </span>
      </Link>
    </section>
  );
}
