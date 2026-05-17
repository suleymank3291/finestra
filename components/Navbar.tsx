"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function NavLink({
  href,
  children,
  textColor,
}: {
  href: string;
  children: React.ReactNode;
  textColor: string;
}) {
  return (
    <Link
      href={href}
      className="relative group text-sm font-medium tracking-wide transition-colors duration-500"
      style={{ color: textColor }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#C4A47C")}
      onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
    >
      {children}
      <span
        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ width: "100%", backgroundColor: "#C4A47C" }}
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rezervasyonOpen, setRezervasyonOpen] = useState(false);
  const [navColor, setNavColor] = useState("#ffffff");

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("[data-navbar-color]");
      let color = "#ffffff";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom > 60) {
          color = section.getAttribute("data-navbar-color") ?? "#ffffff";
          break;
        }
      }
      setNavColor(color);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const textColor = navColor;
  const logoColor = navColor;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? "16px 0" : "24px 0",
          background: scrolled ? "rgba(255, 255, 255, 0.08)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(128,128,128,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Sol grup */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            <NavLink href="/" textColor={textColor}>Anasayfa</NavLink>
            <NavLink href="/menu" textColor={textColor}>Menü</NavLink>
          </div>

          {/* Merkez: Logo (Özel Düz F SVG + INESTRA) */}
          <Link
            href="/"
            className="font-playfair text-xl md:text-2xl font-bold flex items-center justify-center select-none flex-shrink-0 transition-colors duration-500"
            style={{ color: logoColor, lineHeight: 1 }}
          >
            {/* Düz F SVG */}
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              preserveAspectRatio="xMidYMid meet"
              className="shrink-0 transition-colors duration-500"
              style={{
                height: "1.05em",
                width: "1.05em",
                fill: "currentColor",
                transform: "translate(-0.22em, 0.015em) scale(1.15)",
                marginRight: "-0.20em", // inestra harflerinin F motifinin içine asil bir şekilde yerleşmesi için
              }}
            >
              <g
                transform="translate(0.000000,2048.000000) scale(0.100000,-0.100000)"
                fill="currentColor"
                stroke="none"
              >
                <path d="M4967 17170 c-11 -30 -57 -318 -78 -485 -26 -216 -36 -658 -20 -865 42 -534 214 -998 498 -1350 80 -98 247 -260 351 -339 111 -84 293 -193 427 -257 106 -50 334 -139 423 -165 23 -7 42 -15 42 -18 0 -3 -47 -21 -105 -39 -270 -87 -586 -285 -804 -503 -368 -368 -568 -805 -612 -1337 -21 -250 17 -543 102 -797 169 -499 581 -916 1075 -1088 195 -68 289 -82 559 -82 265 0 338 9 508 67 479 160 757 538 757 1027 0 556 -299 1049 -800 1319 -158 85 -379 156 -586 187 -126 19 -391 29 -514 18 l-95 -8 65 -39 c168 -99 278 -214 437 -456 64 -96 150 -227 192 -290 176 -268 425 -463 676 -530 102 -28 345 -41 345 -19 0 8 -9 50 -20 95 -98 411 -357 734 -780 972 -105 59 -84 61 50 5 396 -168 655 -447 790 -851 74 -220 89 -460 41 -627 -97 -335 -368 -567 -750 -642 -119 -23 -402 -22 -526 1 -625 120 -1083 606 -1201 1276 -23 129 -23 380 0 527 96 622 428 1109 937 1373 465 240 945 279 1559 124 340 -85 617 -208 929 -411 547 -357 1003 -877 1287 -1468 69 -143 187 -432 170 -414 -2 2 -43 81 -90 174 -100 200 -195 356 -311 510 -371 495 -941 954 -1437 1159 -48 20 -92 36 -97 36 -8 0 -11 -1220 -11 -4077 0 -2678 -3 -4116 -10 -4188 -32 -341 -132 -571 -329 -757 -216 -204 -477 -302 -863 -324 l-118 -7 0 -93 0 -94 2590 0 2590 0 0 93 0 93 -152 11 c-384 29 -633 129 -837 334 -204 206 -295 446 -321 846 -6 86 -10 979 -10 2136 l0 1987 1134 0 c1216 0 1243 -1 1461 -52 415 -96 747 -344 920 -688 99 -198 163 -453 183 -735 l7 -100 98 -3 97 -3 0 1946 0 1945 -100 0 -100 0 0 -49 c0 -133 -55 -432 -111 -606 -139 -429 -474 -733 -942 -855 -253 -66 -195 -64 -1478 -67 l-1166 -4 -6 308 c-7 406 -36 650 -113 957 -116 465 -303 889 -569 1291 -137 207 -238 330 -434 525 -272 271 -544 466 -900 644 -410 206 -775 316 -1381 416 -421 70 -896 217 -1228 382 -432 214 -767 529 -965 908 -133 253 -220 595 -232 910 l-5 115 29 -130 c176 -777 643 -1408 1292 -1748 109 -58 275 -124 285 -115 12 13 44 200 53 313 35 439 -113 857 -441 1250 -112 135 -291 313 -538 535 -457 412 -601 582 -712 845 -21 50 -42 99 -47 110 -7 16 -10 17 -14 5z" />
                <path d="M15490 15595 c-341 -128 -769 -214 -1405 -282 -147 -16 -442 -17 -3612 -20 l-3453 -3 0 -94 0 -93 148 -6 c479 -20 784 -169 989 -483 124 -191 177 -384 190 -690 l6 -151 121 -43 c722 -258 1336 -714 1779 -1323 240 -329 421 -686 588 -1157 l48 -135 0 1718 1 1717 1423 0 c1415 0 1546 -3 1767 -36 629 -93 1047 -435 1235 -1009 69 -209 108 -422 121 -652 l7 -123 89 0 88 0 0 1455 c0 800 -3 1455 -7 1454 -5 0 -60 -20 -123 -44z" />
              </g>
            </svg>

            {/* INESTRA Gövdesi */}
            <span
              style={{
                letterSpacing: "0.25em",
              }}
            >
              INESTRA
            </span>
          </Link>

          {/* Sağ grup */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            <NavLink href="/subeler" textColor={textColor}>Şubelerimiz</NavLink>
            <NavLink href="/hakkimizda" textColor={textColor}>Hakkımızda</NavLink>
            <NavLink href="/iletisim" textColor={textColor}>İletişim</NavLink>
            <button
              onClick={() => setRezervasyonOpen(true)}
              className="px-6 py-2.5 text-white text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none"
              style={{ backgroundColor: "rgba(196,164,124,0.9)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(196,164,124,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(196,164,124,0.9)")
              }
            >
              Rezervasyon Yap
            </button>
          </div>

          {/* Hamburger — sadece mobil */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
          >
            {[
              mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
              "none",
              mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            ].map((transform, i) => (
              <span
                key={i}
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: textColor,
                  transform,
                  opacity: i === 1 && mobileOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobil overlay menü */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)" }}
        >
          {[
            { label: "Anasayfa", href: "/" },
            { label: "Menü", href: "/menu" },
            { label: "Şubelerimiz", href: "/subeler" },
            { label: "Hakkımızda", href: "/hakkimizda" },
            { label: "İletişim", href: "/iletisim" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-playfair text-3xl"
              style={{ color: "var(--primary-accent)" }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              setRezervasyonOpen(true);
            }}
            className="mt-4 px-8 py-3 text-white font-montserrat text-sm uppercase tracking-widest rounded-full focus:outline-none"
            style={{ backgroundColor: "var(--primary-accent)" }}
          >
            Rezervasyon Yap
          </button>
        </div>
      )}

      {/* Rezervasyon Şube Seçim Pop-up Modalı */}
      {rezervasyonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          {/* Özel Spring Ölçekleme ve Fade Animasyonu */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes modalFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalScaleUp {
              from { opacity: 0; transform: scale(0.94); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
              animation: modalFadeIn 0.25s ease-out forwards;
            }
            .animate-scale-up {
              animation: modalScaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}} />

          {/* Modal Gövdesi */}
          <div className="bg-[#FCFCF9] w-full max-w-md rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(44,62,45,0.2)] border border-[#2C3E2D]/10 p-6 md:p-8 animate-scale-up">
            
            {/* Modal Kapatma Butonu */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setRezervasyonOpen(false)}
                className="text-[#2C3E2D]/40 hover:text-[#2C3E2D] p-1.5 rounded-full hover:bg-[#2C3E2D]/5 transition-all duration-300 focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Modal Başlık */}
            <div className="text-center mb-6">
              <span className="font-montserrat text-[10px] font-semibold tracking-[0.25em] text-[#C4A47C] uppercase block mb-1">
                FİNESTRA CAFE
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#2C3E2D]">
                Rezervasyon Yapın
              </h3>
              <p className="font-montserrat text-xs text-[#2C3E2D]/60 mt-2 leading-relaxed">
                Rezervasyon yapmak istediğiniz şubemizi seçin. Doğrudan şubemizin arama ekranına yönlendirileceksiniz.
              </p>
            </div>

            {/* Şube Seçenekleri */}
            <div className="flex flex-col gap-3">
              {[
                {
                  name: "Emek Şubesi",
                  phone: "0 533 499 76 78",
                  color: "#2C3E2D",
                  bg: "rgba(44,62,45,0.04)"
                },
                {
                  name: "Ümitköy Şubesi",
                  phone: "0 501 542 06 06",
                  color: "#C4A47C",
                  bg: "rgba(196,164,124,0.06)"
                },
                {
                  name: "Yenimahalle Şubesi",
                  phone: "0 312 341 90 90",
                  color: "#4A3728",
                  bg: "rgba(74,55,40,0.04)"
                }
              ].map((branch) => {
                const rawPhone = branch.phone.replace(/\s/g, "");
                return (
                  <a
                    key={branch.name}
                    href={`tel:${rawPhone}`}
                    onClick={() => setRezervasyonOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl border border-transparent transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                    style={{ 
                      backgroundColor: branch.bg,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = branch.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div className="flex flex-col items-start">
                      <span 
                        className="font-playfair text-lg font-bold transition-colors duration-300"
                        style={{ color: branch.color }}
                      >
                        {branch.name}
                      </span>
                      <span className="font-montserrat text-xs text-[#2C3E2D]/50 mt-0.5 group-hover:text-[#2C3E2D]/70 transition-colors">
                        {branch.phone}
                      </span>
                    </div>

                    {/* Telefon Çağrı Simgesi */}
                    <div 
                      className="p-2 rounded-full text-white transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: branch.color }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
            
            {/* Modal Alt Bilgi */}
            <div className="text-center mt-6 pt-4 border-t border-[#2C3E2D]/5">
              <p className="font-montserrat text-[10px] text-[#2C3E2D]/40 uppercase tracking-wider">
                Finestra Cafe &bull; Rezervasyon Hattı
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
