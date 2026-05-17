"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const BRANCHES = [
  {
    id: "emek",
    name: "Emek Şubesi",
    nameColor: "#2C3E2D",
    address: "Bişkek (Eski 8) Cad. No:175",
    note: null as string | null,
    video: "/media/branch-emek.mp4",
    mapsUrl: "https://maps.app.goo.gl/MqHtYpdZYsjFa4YJ8",
  },
  {
    id: "umitköy",
    name: "Ümitköy Şubesi",
    nameColor: "#C4A47C",
    address: "Ümitköy",
    note: "Pazartesi kapalıdır.",
    video: "/media/branch-umitköy.mp4",
    mapsUrl: "https://maps.app.goo.gl/N1TcdCSqNVy5Lpy97",
  },
  {
    id: "yenimahalle",
    name: "Yenimahalle Şubesi",
    nameColor: "#4A3728",
    address: "Mehmet Akif Ersoy Cad. No:3",
    note: null as string | null,
    video: "/media/branch-yenimahalle.mp4",
    mapsUrl: "https://maps.app.goo.gl/LtaL5zG4QZHj28FWA",
  },
];

function BranchCard({ branch }: { branch: (typeof BRANCHES)[0] }) {
  const [hovered, setHovered] = useState(false);

  // Şube bazlı doğrudan arama numarası
  const phone = branch.id === "emek"
    ? "05334997678"
    : branch.id === "umitköy"
    ? "05015420606"
    : "03123419090";

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video kartı (Sadece video alanı link sarmallı) */}
      <Link
        href={`/subeler#${branch.id}`}
        style={{
          transform: hovered ? "translateY(-10px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 30px 60px rgba(0,0,0,0.1)"
            : "0 10px 30px rgba(0,0,0,0.04)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          borderRadius: "12px",
          overflow: "hidden",
          aspectRatio: "3/4",
        }}
      >
        <video
          src={branch.video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Şube bilgisi */}
      <div className="mt-5 px-1 flex flex-col items-start">
        <h3
          className="font-playfair text-2xl font-bold mb-1"
          style={{ color: branch.nameColor }}
        >
          {branch.name}
        </h3>
        <p
          className="font-montserrat text-sm mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          {branch.address}
        </p>
        {branch.note && (
          <p
            className="font-montserrat text-xs mb-2 font-semibold"
            style={{ color: "var(--secondary-accent)" }}
          >
            {branch.note}
          </p>
        )}

        {/* Buton Grubu: Rezervasyon & Yol Tarifi */}
        <div className="flex items-center gap-4 mt-3 w-full">
          {/* Rezervasyon Yap Butonu */}
          <a
            href={`tel:${phone}`}
            className="px-5 py-2 text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{ backgroundColor: branch.nameColor }}
          >
            Rezervasyon Yap
          </a>

          {/* Yol tarifi linki */}
          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-montserrat text-xs pb-0.5 border-b border-current transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = branch.nameColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Yol Tarifi
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BranchCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isSwipeRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwipeRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const diffX = startX - e.touches[0].clientX;
      const diffY = startY - e.touches[0].clientY;

      // Yatay hareket dikey hareketten baskınsa sayfa scroll'unu kilitle ve swiping'i başlat
      if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
        isSwipeRef.current = true;
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipeRef.current) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe left -> next card
          setActiveIndex((prev) => Math.min(prev + 1, BRANCHES.length - 1));
        } else {
          // Swipe right -> prev card
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false }); // Passive false sayfa scroll'unu durdurmak için hayati önem taşır
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    // Sürükleme yapılmışsa tıklamayı yut ve subeler sayfasına yönlendirme!
    if (isSwipeRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Normal tap ise yönlendir
    window.location.href = `/subeler#${id}`;
  };

  return (
    <section
      id="subeler"
      data-navbar-color="#2C3E2D"
      className="py-20 md:py-28 px-6"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-playfair text-3xl md:text-4xl text-center mb-12 md:mb-16 tracking-wide"
          style={{ color: "var(--primary-accent)" }}
        >
          Şubelerimiz
        </h2>

        {/* 1. MOBİL SLIDER GÖRÜNÜMÜ (md:hidden) */}
        <div className="md:hidden w-full max-w-sm mx-auto overflow-hidden">
          {/* Üst Kısım: Zarif Başlık Slidebar */}
          <div className="flex justify-center items-center gap-8 mb-8 pb-3 border-b border-[#2C3E2D]/10">
            {BRANCHES.map((branch, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={branch.id}
                  onClick={() => setActiveIndex(idx)}
                  className="flex flex-col items-center focus:outline-none transition-all duration-300"
                >
                  <span
                    className="font-playfair text-sm font-bold tracking-wide transition-colors duration-300"
                    style={{
                      color: isSelected ? branch.nameColor : "rgba(44, 62, 45, 0.4)",
                    }}
                  >
                    {branch.name.replace(" Şubesi", "")}
                  </span>
                  
                  {/* Başlığın Altındaki Nokta Göstergesi */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 transition-all duration-300"
                    style={{
                      backgroundColor: branch.nameColor,
                      transform: isSelected ? "scale(1)" : "scale(0)",
                      opacity: isSelected ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Alt Kısım: Sağa Sola Kaydırılabilir Slider Alanı */}
          <div
            ref={sliderRef}
            className="w-full overflow-hidden touch-pan-y"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="w-full flex-shrink-0 px-2">
                  <div 
                    className="flex flex-col cursor-pointer"
                    onClick={(e) => handleCardClick(e, branch.id)}
                  >
                    {/* Video Kartı */}
                    <div
                      className="relative overflow-hidden rounded-[1rem] shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-black/5"
                      style={{ aspectRatio: "9/16" }}
                    >
                      <video
                        src={branch.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>

                    {/* Şube Detayları (Ortalanmış ve Net) */}
                    <div className="mt-6 text-center px-4">
                      <h3
                        className="font-playfair text-2xl font-bold mb-1"
                        style={{ color: branch.nameColor }}
                      >
                        {branch.name}
                      </h3>
                      <p className="font-montserrat text-sm text-[#2C3E2D]/60 mb-1 leading-relaxed">
                        {branch.address}
                      </p>
                      {branch.note && (
                        <p className="font-montserrat text-xs text-rose-700/80 mb-2 font-semibold">
                          {branch.note}
                        </p>
                      )}

                      {/* Butonlar Grubu */}
                      <div className="flex flex-col items-center gap-3.5 mt-5 w-full">
                        {/* Rezervasyon Yap Butonu */}
                        <a
                          href={`tel:${
                            branch.id === "emek"
                              ? "05334997678"
                              : branch.id === "umitköy"
                              ? "05015420606"
                              : "03123419090"
                          }`}
                          onClick={(e) => e.stopPropagation()} // Slider tıklama tetiklemesini engelle
                          className="px-6 py-2.5 text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-48 text-center transition-all duration-300 hover:scale-105 active:scale-95"
                          style={{ backgroundColor: branch.nameColor }}
                        >
                          Rezervasyon Yap
                        </a>

                        {/* Yol Tarifi Al Linki */}
                        <a
                          href={branch.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Slider tıklama tetiklemesini engelle
                          className="inline-flex items-center gap-2 font-montserrat text-xs pb-0.5 border-b border-[#2C3E2D]/30 text-[#2C3E2D]/60 hover:text-[#2C3E2D] transition-colors duration-300"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Yol Tarifi Al
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. MASAÜSTÜ GRID GÖRÜNÜMÜ (md:flex/grid - mobilde gizli) */}
        <div className="hidden md:grid grid-cols-3 gap-10 md:gap-12">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </section>
  );
}
