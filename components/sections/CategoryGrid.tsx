"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const CATEGORIES = [
  {
    name: "Kahvaltılıklar & Ana Yemekler",
    slug: "kahvaltiliklar-ana-yemekler",
    thumbnail: "/media/kahvalti_r.webp",
    videos: ["/media/kahvalti1.mp4", "/media/kahvalti2.mp4"],
    videoStartTimes: [0, 1],   // kahvalti2 → 1. saniyeden başlar
    playbackRate: 1.75,
  },
  {
    name: "Tatlılar & İçecekler",
    slug: "tatlilar-icecekler",
    thumbnail: "/media/tatli_r.webp",
    videos: ["/media/tatli_v1.mp4", "/media/tatli_v2.mp4"],
    videoStartTimes: [0, 0],
    playbackRate: 1,
  },
];

const Y_STRAIGHT = [15, 15, 15, 15];
const Y_CURVED   = [4,  26, 26, 4 ];

function CategoryCard({ category }: { category: typeof CATEGORIES[0] }) {
  const [hovered, setHovered] = useState(false);
  const [vidIdx,  setVidIdx]  = useState(0);
  const [textY,   setTextY]   = useState(0);

  const imgRef   = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathRef  = useRef<SVGPathElement>(null);
  const prog     = useRef({ t: 0 });

  // Arc morph (düz ↔ eğri)
  useEffect(() => {
    const p = prog.current;
    const yFrom = hovered ? Y_STRAIGHT : Y_CURVED;
    const yTo   = hovered ? Y_CURVED   : Y_STRAIGHT;
    gsap.killTweensOf(p);
    p.t = 0;
    gsap.to(p, {
      t: 1,
      duration: 0.55,
      ease: "power2.inOut",
      onUpdate() {
        const y = yFrom.map((a, i) => +(a + (yTo[i] - a) * p.t).toFixed(2));
        pathRef.current?.setAttribute("d", `M 5,${y[0]} C 40,${y[1]} 80,${y[2]} 115,${y[3]}`);
      },
    });
  }, [hovered]);

  // Video: vidIdx veya hovered değişince oynat/durdur
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (!hovered) {
      vid.pause();
      vid.currentTime = 0;
      return;
    }

    const src       = category.videos[vidIdx];
    const startTime = category.videoStartTimes[vidIdx] ?? 0;

    if (vid.getAttribute("data-src") !== src) {
      vid.setAttribute("data-src", src);
      vid.src = src;
      vid.load();
    }

    const play = () => {
      vid.currentTime = startTime;
      vid.playbackRate = category.playbackRate ?? 1;
      vid.play().catch(() => {});
    };

    if (vid.readyState >= 3) {
      play();
    } else {
      vid.addEventListener("canplay", play, { once: true });
    }
  }, [hovered, vidIdx, category.videos, category.videoStartTimes]);

  const handleEnter = useCallback(() => {
    const w = imgRef.current?.offsetWidth ?? 0;
    setTextY(w * 0.26);
    setHovered(true);
    setVidIdx(0);
  }, []);

  const handleLeave = useCallback(() => {
    setTextY(0);
    setHovered(false);
    setVidIdx(0);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setVidIdx(prev => (prev + 1) % category.videos.length);
  }, [category.videos.length]);

  return (
    <Link href={`/menu?k=${category.slug}`} className="flex flex-col items-center">
      <div
        ref={imgRef}
        className="relative w-full aspect-square"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            transform:       hovered ? "scale(1.45)" : "scale(1)",
            borderRadius:    hovered ? "50%" : "16px",
            transition:      "transform 0.4s ease-in-out, border-radius 0.4s ease-in-out",
            transformOrigin: "center",
          }}
        >
          {/* Thumbnail — hover öncesi */}
          <Image
            src={category.thumbnail}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ opacity: hovered ? 0 : 1, transition: "opacity 0.2s" }}
          />

          {/* Video — hover'da sırayla oynar */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
            muted
            playsInline
            onEnded={handleVideoEnded}
          />
        </div>
      </div>

      {/* Arc yazı */}
      <div
        style={{
          width:      "130%",
          marginLeft: "-15%",
          marginTop:  "1.75rem",
          height:     "2.5rem",
          transform:  `translateY(${textY}px)`,
          transition: "transform 0.55s ease-in-out",
        }}
      >
        <svg
          viewBox="0 0 120 32"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", overflow: "visible" }}
        >
          <defs>
            <path
              ref={pathRef}
              id={`arc-${category.slug}`}
              d="M 5,15 C 40,15 80,15 115,15"
            />
          </defs>
          <text
            fontFamily="var(--font-montserrat-face), Arial, sans-serif"
            fontSize="6"
            fontStyle="italic"
            fontWeight="500"
            style={{ fill: hovered ? "#2C3E2D" : "#1A1A1A", transition: "fill 0.55s ease" }}
          >
            <textPath href={`#arc-${category.slug}`} startOffset="50%" textAnchor="middle">
              {category.name}
            </textPath>
          </text>
        </svg>
      </div>
    </Link>
  );
}

export default function CategoryGrid() {
  return (
    <section data-navbar-color="#2C3E2D" className="pt-20 md:pt-28 pb-40 md:pb-52 px-6" style={{ backgroundColor: "#E5C9A3" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-playfair text-3xl md:text-4xl text-center mb-16 tracking-wide"
          style={{ color: "var(--primary-accent)" }}
        >
          Ne istersiniz?
        </h2>
        <div className="grid grid-cols-2 gap-16 md:gap-32 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
