"use client";

import { useEffect, useRef, useState } from "react";

const SOCIAL_VIDEOS = [
  {
    src: "90'lar Türkçe Müzik her Cuma ve Cumartesi Finestra'da.mp4",
    title: "90'lar Türkçe Müzik her Cuma & Cumartesi"
  },
  {
    src: "Ankara’ya bahar gelirken....mp4",
    title: "Ankara'ya Bahar Gelirken..."
  },
  {
    src: "En lezzetli Japon Pankeki Finestra Ümitköyde....mp4",
    title: "En Lezzetli Japon Pankeki"
  },
  {
    src: "Finestra Ümitköy şubemiz sizleri bekliyor....mp4",
    title: "Finestra Ümitköy Şubemiz Sizleri Bekliyor"
  },
  {
    src: "Finestra özel reçetesi ile Matcha Dondurma....mp4",
    title: "Özel Reçeteli Matcha Dondurma"
  },
  {
    src: "Finestra’da sağlıklı ve keyifli kahvaltı zamanı….mp4",
    title: "Sağlıklı ve Keyifli Kahvaltı Zamanı"
  },
  {
    src: "Her şey sizin için özenle hazırlandı....mp4",
    title: "Her Şey Sizin İçin Özenle Hazırlandı"
  },
  {
    src: "Her şey sizinle güzel….mp4",
    title: "Her Şey Sizinle Güzel"
  },
  {
    src: "Mutluluk dendiğinde akla gelir....mp4",
    title: "Mutluluk Dendiğinde Akla Gelir"
  },
  {
    src: "Pazartesi hariç 6 gün sizlerle….mp4",
    title: "Pazartesi Hariç 6 Gün Sizlerle"
  },
  {
    src: "Sizi çok uzaklara götürecek….mp4",
    title: "Sizi Çok Uzaklara Götürecek Lezzetler"
  }
];

function virtualRel(realIdx: number, current: number, total: number): number {
  const currentMod = ((current % total) + total) % total;
  const offset = realIdx - currentMod;
  const normalized = ((offset % total) + total) % total;
  return normalized > total / 2 ? normalized - total : normalized;
}

function getTransform(
  i: number,
  current: number,
  total: number,
  centerVw: number,
  sideVw: number,
  gapVw: number
): string {
  const rel = virtualRel(i, current, total);
  const n = Math.abs(rel);
  const sign = Math.sign(rel);
  if (n === 0) return "translateX(-50%)";
  const offset = sign * (n * (sideVw + gapVw) + (centerVw - sideVw) / 2);
  return `translateX(calc(-50% + ${offset}vw))`;
}

export default function SosyalMedya() {
  const total = SOCIAL_VIDEOS.length;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState(Math.floor(total / 2));
  
  // Carousel boyutlarını responsive yapmak için client-side tespiti
  const [dims, setDims] = useState({ center: 18, side: 13, gap: 1.2 });
  const [mounted, setMounted] = useState(false);

  const dragStart = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    setMounted(true);
    const updateDims = () => {
      if (window.innerWidth < 640) {
        // Mobil
        setDims({ center: 52, side: 36, gap: 2.2 });
      } else if (window.innerWidth < 1024) {
        // Tablet
        setDims({ center: 32, side: 24, gap: 1.6 });
      } else {
        // Desktop
        setDims({ center: 17, side: 12.5, gap: 1.2 });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Aktif videoyu otomatik oynatma, diğerlerini durdurma logic'i
  useEffect(() => {
    const currentMod = ((current % total) + total) % total;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === currentMod) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [current, total]);

  const go = (dir: number) => setCurrent((c) => c + dir);

  const touchStart = useRef(0);
  const wheelLocked = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Sadece yatay (iki parmak) touchpad kaydırma hareketlerini yakala (Hassasiyeti artırmak için eşik 8 yapıldı)
    if (Math.abs(e.deltaX) > 8) {
      if (wheelLocked.current) return;
      wheelLocked.current = true;
      go(e.deltaX > 0 ? 1 : -1);

      // Çoklu tetiklemeyi önlemek için kilitleme süresi (750ms)
      setTimeout(() => {
        wheelLocked.current = false;
      }, 750);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // Touch events handle touch scrolling robustly
    isDragging.current = true;
    dragStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // Touch events handle touch scrolling robustly
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
  };

  const labelH = 44; // px — alt yazı için dikey boşluk

  return (
    <section
      className="py-20 md:py-28 overflow-hidden select-none"
      data-navbar-color="#2C3E2D"
      style={{ backgroundColor: "#E5C9A3" }}
    >
      {/* Başlık Alanı */}
      <div className="container mx-auto px-6 text-center mb-12 md:mb-16">
        <span className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#2C3E2D]/60 block mb-2">
          SOSYAL MEDYA
        </span>
        <h2 className="font-playfair italic text-3xl md:text-5xl lg:text-6xl text-[#2C3E2D] font-bold leading-tight mb-4">
          Hikayemize <span className="font-normal font-playfair italic text-[#2C3E2D]/80">Ortak Olun</span>
        </h2>
        <a
          href="https://www.instagram.com/finestraumitkoy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-montserrat text-xs md:text-sm tracking-widest uppercase font-bold text-[#2C3E2D] hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
        >
          <span>@finestraumitkoy</span>
          <span className="transition-transform duration-300 hover:translate-x-1">→</span>
        </a>
      </div>

      {/* Infinite Video Carousel */}
      {mounted && (
        <div
          className="relative w-full overflow-visible touch-pan-y"
          style={{
            height: `calc(${dims.center * 16 / 9}vw + ${labelH}px)`,
            userSelect: "none",
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {SOCIAL_VIDEOS.map((item, i) => {
            const rel = virtualRel(i, current, total);
            const isCenter = rel === 0;
            const absRel = Math.abs(rel);
            const isBuffer = absRel === 4; // Teleport tamponu
            const visible = absRel <= 3;

            // Boşluklu veya özel karakterli video dosya isimlerini güvenle URL formatına çeviriyoruz
            const encodedSrc = `/media/social/${encodeURIComponent(item.src)}`;

            return (
              <div
                key={item.src}
                className="absolute flex flex-col items-center gap-3 transition-all duration-300"
                style={{
                  left: "50%",
                  bottom: 0,
                  width: isCenter ? `${dims.center}vw` : `${dims.side}vw`,
                  transform: getTransform(i, current, total, dims.center, dims.side, dims.gap),
                  transition: isBuffer
                    ? "none"
                    : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms ease, width 400ms ease",
                  opacity: isBuffer ? 0 : visible ? (isCenter ? 1 : absRel === 1 ? 0.7 : 0.35) : 0,
                  pointerEvents: visible ? "auto" : "none",
                  cursor: isCenter ? "default" : "pointer",
                }}
                onClick={() => !isCenter && setCurrent(i)}
              >
                {/* Video Oynatıcı Kartı */}
                <div
                  className="relative w-full overflow-hidden transition-shadow duration-300"
                  style={{
                    aspectRatio: "9/16",
                    borderRadius: "1rem",
                    boxShadow: isCenter
                      ? "0 20px 48px rgba(44,62,45,0.22)"
                      : "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={encodedSrc}
                    muted
                    playsInline
                    autoPlay={isCenter}
                    onEnded={() => {
                      if (isCenter) {
                        go(1);
                      }
                    }}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  
                  {/* İnteraktif karartma perdesi (Sadece kenardaki videolarda aktiftir, odaklanmayı kolaylaştırır) */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-[#2C3E2D]/15 transition-opacity duration-300" />
                  )}
                </div>

                {/* Açıklama Yazısı (Sadece Merkezdeki Aktif Video İçin Gösterilir - Tertemiz Arayüz) */}
                <span
                  className="font-montserrat text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase text-[#2C3E2D] text-center px-4 max-w-full truncate transition-all duration-500"
                  style={{
                    opacity: isCenter ? 0.85 : 0,
                    lineHeight: `${labelH}px`,
                    transform: isCenter ? "translateY(0)" : "translateY(5px)",
                    visibility: isCenter ? "visible" : "hidden",
                  }}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigasyon Noktaları (Indicators) */}
      <div className="flex justify-center gap-2.5 mt-8 md:mt-12">
        {SOCIAL_VIDEOS.map((_, i) => {
          const activeDot = ((current % total) + total) % total;
          return (
            <button
              key={i}
              onClick={() => setCurrent((c) => c + virtualRel(i, c, total))}
              className="h-2 rounded-full transition-all duration-300 border-none cursor-pointer p-0"
              style={{
                width: i === activeDot ? "28px" : "8px",
                backgroundColor: i === activeDot ? "#2C3E2D" : "rgba(44,62,45,0.25)",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
