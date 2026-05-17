"use client";

import { useRef, useState, useEffect } from "react";
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const vw = window.innerWidth;
    const isMobileSize = vw < 768;
    const section = sectionRef.current!;

    if (isMobileSize) {
      // ── MOBİL ANİMASYON LOGIC ────────────────────────────────────
      // Mobil görsel genişliği %75, mobil başlangıç konumu ekranın sol dışı, bitişi sağ dışı
      const imgW_mob = vw * 0.75;
      const xStart = -imgW_mob - 100;
      const xEnd = vw + 100;
      const totalMoveMob = xEnd - xStart;

      // Görseli ilk başta ekranın sol dışına konumlandır
      gsap.set(imageRef.current, { x: xStart, yPercent: -50 });

      // Mobil clip-path maskeleme fonksiyonu (Resmin tam ortasını kesim noktası alır)
      const applyClipsMob = (progress: number) => {
        const currentX = xStart + totalMoveMob * progress;
        const midX = currentX + imgW_mob / 2;

        // İlk yazı (Finestra) resmin sağ tarafında kalacak şekilde soldan clip-path ile kırpılır
        const leftClip = Math.max(0, Math.min(vw, midX));
        if (finestraRef.current) {
          finestraRef.current.style.clipPath = `inset(0 0 0 ${leftClip}px)`;
        }

        // İkinci yazı (WelcomeText) resmin sol tarafında kalacak şekilde sağdan clip-path ile kırpılır
        const rightClip = Math.max(0, Math.min(vw, vw - midX));
        if (textRef.current) {
          textRef.current.style.clipPath = `inset(0 ${rightClip}px 0 0)`;
        }
      };

      applyClipsMob(0);

      const animObj = { progress: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
          start: "top top",
          end: "+=320%",
        },
      });

      // Başa scroll beklemesi (Resting state - ilk yazının ortada temiz görünmesi için)
      tl.to({}, { duration: 0.5 });

      // Resim ekranın solundan girip sağından çıkarken clip-path'i tetikler
      tl.to(animObj, {
        progress: 1,
        duration: 1.5,
        ease: "none",
        onUpdate() {
          const currentX = xStart + totalMoveMob * animObj.progress;
          gsap.set(imageRef.current, { x: currentX });
          applyClipsMob(animObj.progress);
        },
      });

      // Sona scroll beklemesi (Resting state - ikinci yazının ortada temiz görünmesi için)
      tl.to({}, { duration: 0.5 });

    } else {
      // ── MASAÜSTÜ ANİMASYON LOGIC (Orijinal Kod - Dokunulmadı!) ────
      const imgW      = vw * IMG_W;
      const startLeft = vw * IMG_START;
      const totalMove = vw * (IMG_END - IMG_START);

      gsap.set(imageRef.current, { x: 0, yPercent: -50 });

      const applyClips = (progress: number) => {
        const x = startLeft + totalMove * progress;
        const containerWidth = vw * IMG_END;
        if (finestraRef.current) {
          finestraRef.current.style.clipPath = `inset(0 ${containerWidth - x}px 0 0)`;
        }
        if (textRef.current) {
          textRef.current.style.clipPath    = `inset(0 0 0 ${x + imgW}px)`;
        }
      };
      applyClips(0);

      const animObj = { progress: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
          start: "top top",
          end: "+=320%",
        },
      });

      tl.to({}, { duration: 0.5 });

      tl.to(animObj, {
        progress: 1,
        duration: 1.5,
        ease: "none",
        onUpdate() {
          const x = totalMove * animObj.progress;
          gsap.set(imageRef.current, { x });
          applyClips(animObj.progress);
        },
      });

      tl.to({}, { duration: 0.5 });
    }

    // ── İmleç tepkili 3D rotasyon (Sadece Masaüstünde Aktif) ────────
    if (!isMobileSize && wordRef.current) {
      const el = wordRef.current!;
      gsap.set(el, { rotationY: -10, rotationX: 2, transformStyle: "preserve-3d" });

      const toRotY = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
      const toRotX = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const xN = (e.clientX - rect.left)  / rect.width;
        const yN = (e.clientY - rect.top)   / rect.height;
        toRotY((xN - 0.5) * 32);
        toRotX(-(yN - 0.5) * 18);
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
    }
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
        className="absolute top-0 bottom-0 left-0 flex items-center justify-center"
        style={{
          zIndex: 1,
          width: isMobile ? "100vw" : "76vw",
          perspective: "1200px",
        }}
      >
        <div
          ref={wordRef}
          className="flex flex-col items-center justify-center text-center select-none pointer-events-none"
        >
          {/* Ana Başlık (Özel Çiçek Motifli F + inestra) */}
          <div
            className="flex items-center justify-center select-none pointer-events-none"
            style={{
              fontSize: "clamp(56px, 15vw, 220px)",
              color: "#C4A47C",
              lineHeight: 1,
            }}
          >
            {/* Çiçek Motifli Harf F SVG */}
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              preserveAspectRatio="xMidYMid meet"
              className="shrink-0"
              style={{
                height: "1.05em",
                width: "1.05em",
                fill: "currentColor",
                transform: "translate(0.035em, -0.01em) scale(1.3)",
                marginRight: "-0.16em", // Ligatür etkisi yaratması için yeni ölçeğe göre payı güncelledik
              }}
            >
              <g
                transform="translate(0.000000,2048.000000) scale(0.100000,-0.100000)"
                fill="currentColor"
                stroke="none"
              >
                <path d="M4961 17128 c-60 -278 -90 -551 -98 -883 -13 -585 60 -975 261 -1390 111 -229 220 -379 407 -561 255 -246 532 -409 949 -555 74 -26 128 -49 120 -52 -179 -56 -401 -161 -559 -264 -238 -154 -480 -395 -634 -633 -190 -294 -303 -659 -323 -1046 -16 -289 67 -696 190 -936 246 -482 687 -828 1200 -940 89 -20 131 -22 351 -23 204 0 265 3 335 18 409 88 720 326 850 650 57 142 74 241 74 432 0 195 -16 298 -71 464 -68 206 -175 387 -319 540 -359 381 -883 559 -1513 514 l-91 -6 67 -40 c201 -119 293 -223 534 -598 139 -216 214 -313 320 -413 210 -198 404 -283 663 -293 l138 -6 -7 44 c-12 73 -54 209 -90 292 -134 311 -361 551 -705 745 -101 57 -86 61 40 11 422 -169 717 -512 836 -974 25 -98 28 -127 29 -270 0 -185 -11 -235 -81 -380 -97 -202 -240 -335 -461 -430 -276 -119 -657 -124 -970 -14 -249 88 -479 246 -632 433 -250 306 -373 653 -373 1051 1 505 195 991 531 1325 373 371 912 564 1458 522 632 -49 1209 -283 1733 -703 148 -118 217 -182 369 -343 268 -282 476 -584 641 -928 63 -132 160 -369 160 -390 0 -7 -33 55 -73 137 -217 444 -525 831 -932 1170 -155 129 -322 252 -330 243 -1 -1 -42 -205 -89 -453 -48 -247 -132 -679 -187 -960 -192 -977 -300 -1533 -375 -1915 -41 -212 -118 -599 -169 -860 -93 -470 -142 -723 -310 -1590 -47 -245 -119 -614 -160 -820 -41 -206 -113 -572 -160 -812 -94 -480 -128 -614 -203 -792 -168 -395 -423 -642 -785 -760 -109 -36 -273 -66 -399 -73 l-106 -6 -16 -86 c-9 -47 -16 -89 -16 -93 0 -5 1046 -8 2323 -8 l2324 0 11 83 c17 114 19 107 -40 107 -82 0 -224 20 -324 45 -442 112 -624 362 -624 860 0 238 14 329 185 1225 151 788 216 1127 290 1515 35 187 71 374 80 415 13 60 108 563 222 1168 l15 82 1013 0 c664 0 1040 -4 1090 -11 257 -35 454 -128 616 -289 98 -97 155 -178 209 -294 108 -233 142 -486 117 -863 l-8 -123 85 0 c47 0 86 2 86 4 0 36 208 1398 361 2360 54 345 128 818 164 1050 36 231 67 431 70 444 5 22 4 22 -83 22 l-89 0 -33 -137 c-141 -597 -372 -957 -773 -1207 -102 -64 -269 -133 -400 -166 -235 -59 -276 -61 -1327 -58 l-956 3 110 578 110 578 -23 92 c-40 155 -166 525 -225 662 -327 747 -788 1282 -1446 1677 -429 258 -945 440 -1495 528 -356 57 -494 90 -849 201 -533 167 -954 428 -1235 764 -211 254 -341 522 -415 856 -30 135 -78 545 -62 529 2 -3 19 -68 36 -145 80 -353 227 -693 418 -970 216 -312 530 -595 852 -768 78 -42 278 -127 299 -127 11 0 36 104 52 215 6 44 12 143 12 220 0 222 -39 411 -128 620 -147 343 -349 589 -870 1059 -458 412 -601 585 -710 859 -20 51 -38 93 -40 95 -2 2 -8 -21 -14 -50z" />
                <path d="M15520 15604 c-283 -115 -658 -211 -1010 -259 -385 -52 -178 -49 -3310 -55 l-2905 -5 -11 -50 c-6 -27 -14 -69 -17 -92 l-7 -43 92 0 c183 0 377 -43 513 -113 161 -83 268 -224 323 -425 25 -92 26 -109 26 -332 0 -252 -7 -313 -75 -650 -19 -95 -26 -146 -19 -148 24 -8 341 -224 415 -282 449 -355 795 -780 1049 -1289 113 -225 276 -630 276 -685 0 -9 3 -16 8 -16 8 0 17 48 193 990 55 294 122 648 149 785 27 138 81 421 120 630 39 209 97 516 128 683 l56 302 1156 0 c684 0 1194 -4 1250 -10 425 -44 738 -197 908 -443 100 -145 161 -300 208 -527 22 -108 26 -158 30 -365 4 -171 1 -273 -9 -355 -8 -63 -12 -118 -10 -122 2 -5 40 -8 83 -8 l79 0 6 33 c3 17 28 199 55 402 28 204 62 447 76 540 13 94 51 352 84 575 33 223 75 511 95 640 41 268 105 708 105 721 0 14 -20 9 -110 -27z" />
              </g>
            </svg>

            {/* inestra Gövdesi */}
            <span
              className="font-playfair italic whitespace-nowrap"
              style={{
                letterSpacing: "0.02em",
              }}
            >
              inestra
            </span>
          </div>

          {/* Simetrik Kıvrımlı Motif Çizgileri ve Ortasında Sarı Nokta */}
          <div className="flex items-center justify-between w-[280px] sm:w-[340px] md:w-[420px] my-3 shrink-0">
            {/* Sol Kıvrım Motifi */}
            <svg
              width="43%"
              height="20"
              viewBox="0 0 100 20"
              fill="none"
              preserveAspectRatio="none"
              style={{ color: "#C4A47C" }}
            >
              <path
                d="M 0 10 C 10 2, 20 18, 30 10 C 40 2, 70 16, 80 10 C 85 4, 95 4, 95 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Merkez Sarı/Altın Nokta */}
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C4A47C" }} />

            {/* Sağ Kıvrım Motifi */}
            <svg
              width="43%"
              height="20"
              viewBox="0 0 100 20"
              fill="none"
              preserveAspectRatio="none"
              style={{ color: "#C4A47C" }}
            >
              <path
                d="M 100 10 C 90 2, 80 18, 70 10 C 60 2, 30 16, 20 10 C 15 4, 5 4, 5 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Alt Başlık Açıklaması */}
          <p
            className="font-montserrat text-xs md:text-sm font-light uppercase tracking-[0.35em] w-[280px] sm:w-[340px] md:w-[420px]"
            style={{ color: "rgba(255, 255, 255, 0.75)", marginTop: "2px" }}
          >
            Coffee <span style={{ color: "#C4A47C" }}>•</span> Dessert <span style={{ color: "#C4A47C" }}>•</span> Breakfast <span style={{ color: "#C4A47C" }}>•</span> Eatery
          </p>
        </div>
      </div>

      {/* KATMAN 1 — Sağ yazı (WelcomeText formatı, clip-path ile yutulur) */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center md:justify-start"
        style={{ zIndex: 1 }}
      >
        <div
          className="w-full md:w-auto px-6 md:px-0 text-center md:text-left flex justify-center md:block"
          style={{
            marginLeft: isMobile ? "0" : "28%",
            paddingRight: isMobile ? "0" : "5%",
          }}
        >
          <p className="flex flex-wrap justify-center md:justify-start gap-x-3 md:gap-x-4 gap-y-2 md:gap-y-3 max-w-[90vw] md:max-w-none">
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
          left: isMobile ? "0px" : `${IMG_START * 100}%`,
          top: "50%",
          width: isMobile ? "75vw" : `${IMG_W * 100}vw`,
          height: isMobile ? "calc(75vw * 16 / 9)" : `calc(${IMG_W * 100}vw * 16 / 9)`,
          maxHeight: isMobile ? "70vh" : "84vh",
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
