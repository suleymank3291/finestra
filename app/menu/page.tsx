"use client";

import { useState, useRef, useCallback, useLayoutEffect, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";

const BG = "#FCFCFC";

const KATEGORILER = [
  {
    slug: "kahvaltiliklar-ana-yemekler",
    isim: "Kahvaltılıklar & Ana Yemekler",
    gorsel: "/media/menu-1.jpg",
    genislik: 1228,
    yukseklik: 1736,
  },
  {
    slug: "tatlilar-icecekler",
    isim: "Tatlılar & İçecekler",
    gorsel: "/media/menu-2.jpg",
    genislik: 1228,
    yukseklik: 1736,
  },
];

const N = KATEGORILER.length;

function MenuContent() {
  const searchParams = useSearchParams();
  const baslangicIdx = Math.max(
    0,
    KATEGORILER.findIndex((k) => k.slug === searchParams.get("k"))
  );

  const [aktifIdx, setAktifIdx] = useState(baslangicIdx);
  const aktifIdxRef = useRef(baslangicIdx);
  const stripRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef    = useRef<gsap.core.Tween | null>(null);
  const progressObj = useRef({ v: baslangicIdx });

  useLayoutEffect(() => {
    const panel = panelRefs.current[baslangicIdx];
    if (containerRef.current && panel)
      containerRef.current.style.height = `${panel.scrollHeight}px`;
    if (stripRef.current && baslangicIdx > 0)
      gsap.set(stripRef.current, { x: `-${baslangicIdx * (100 / N)}%` });
  }, [baslangicIdx]);

  useEffect(() => {
    const panel = panelRefs.current[aktifIdx];
    if (containerRef.current && panel)
      containerRef.current.style.height = `${panel.scrollHeight}px`;
  }, [aktifIdx]);

  const goToKat = useCallback((idx: number) => {
    if (idx === aktifIdxRef.current) return;
    tweenRef.current?.kill();
    aktifIdxRef.current = idx;
    setAktifIdx(idx);
    tweenRef.current = gsap.to(progressObj.current, {
      v: idx,
      duration: 0.6,
      ease: "power3.inOut",
      onUpdate() {
        if (stripRef.current)
          gsap.set(stripRef.current, { x: `-${progressObj.current.v * (100 / N)}%` });
      },
      onComplete() {
        const panel = panelRefs.current[idx];
        if (containerRef.current && panel)
          containerRef.current.style.height = `${panel.scrollHeight}px`;
      },
    });
  }, []);

  return (
    <>
      <Navbar />
      <main
        data-navbar-color="#2C3E2D"
        className="pt-28 md:pt-36"
        style={{ backgroundColor: BG, minHeight: "100vh" }}
      >

        {/* Başlık */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-8 pb-2 text-center">
          <h1
            className="font-playfair text-6xl md:text-8xl italic"
            style={{ color: "var(--primary-accent)" }}
          >
            Menümüz
          </h1>
          <p
            className="font-montserrat text-sm mt-3"
            style={{ color: "var(--text-muted)" }}
          >
            El yapımı lezzetler, nitelikli içecekler.
          </p>
        </div>

        {/* Sticky kategori sekmesi */}
        <div
          className="sticky top-0 z-40 mt-8"
          style={{
            backgroundColor: BG,
            borderBottom: "1px solid rgba(44,62,45,0.08)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="flex items-center py-4 gap-10 justify-center">
              {KATEGORILER.map((k, i) => {
                const aktif = i === aktifIdx;
                return (
                  <button
                    key={k.slug}
                    onClick={() => goToKat(i)}
                    className="relative pb-2 font-montserrat text-xs font-medium tracking-widest uppercase transition-colors duration-300"
                    style={{ color: aktif ? "#2C3E2D" : "rgba(44,62,45,0.35)" }}
                  >
                    {k.isim}
                    <span
                      className="absolute bottom-0 left-0 w-full h-[1.5px] rounded-full origin-left"
                      style={{
                        backgroundColor: "#C4A47C",
                        transform: aktif ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* GSAP şerit */}
        <div ref={containerRef} style={{ overflow: "hidden", position: "relative" }}>
          <div
            ref={stripRef}
            style={{ display: "flex", width: `${N * 100}%`, alignItems: "flex-start" }}
          >
            {KATEGORILER.map((kat, i) => (
              <div
                key={kat.slug}
                ref={(el) => { panelRefs.current[i] = el; }}
                style={{ width: `${100 / N}%`, flexShrink: 0, backgroundColor: BG }}
              >
                <div className="flex justify-center py-12 md:py-16 px-6">
                  <div
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      maxWidth: "960px",
                      width: "100%",
                    }}
                  >
                    <Image
                      src={kat.gorsel}
                      alt={kat.isim}
                      width={kat.genislik}
                      height={kat.yukseklik}
                      className="w-full h-auto"
                      priority={i === 0}
                      draggable={false}
                      style={{ display: "block" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

export default function MenuSayfasi() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}
