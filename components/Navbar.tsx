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

          {/* Merkez: Logo */}
          <Link
            href="/"
            className="font-playfair text-xl md:text-2xl font-bold tracking-[0.25em] flex-shrink-0 transition-colors duration-500"
            style={{ color: logoColor }}
          >
            FINESTRA
          </Link>

          {/* Sağ grup */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            <NavLink href="/subeler" textColor={textColor}>Şubelerimiz</NavLink>
            <NavLink href="/hakkimizda" textColor={textColor}>Hakkımızda</NavLink>
            <NavLink href="/iletisim" textColor={textColor}>İletişim</NavLink>
            <a
              href="https://www.instagram.com/finestra_cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-white text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: "rgba(196,164,124,0.9)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(196,164,124,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(196,164,124,0.9)")
              }
            >
              Sipariş Ver
            </a>
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
            { label: "Şubelerimiz", href: "#subeler" },
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
          <a
            href="https://www.instagram.com/finestra_cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 text-white font-montserrat text-sm uppercase tracking-widest rounded-full"
            style={{ backgroundColor: "var(--primary-accent)" }}
            onClick={() => setMobileOpen(false)}
          >
            Sipariş Ver
          </a>
        </div>
      )}
    </>
  );
}
