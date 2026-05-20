"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{ backgroundColor: "var(--primary-accent)", color: "#fff" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Marka */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-playfair text-3xl font-bold tracking-widest">
            FINESTRA
          </span>
          <p
            className="font-montserrat text-xs max-w-xs leading-relaxed"
            style={{ color: "rgba(196,164,124,0.8)" }}
          >
            Coffee · Dessert · Breakfast · Eatery
          </p>
          <a
            href="https://www.instagram.com/finestra_cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="font-montserrat text-xs transition-colors duration-300"
            style={{ color: "rgba(196,164,124,0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(196,164,124,0.7)")
            }
          >
            @finestra_cafe
          </a>
        </div>

        {/* Sayfa linkleri */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4
            className="font-playfair text-lg mb-2"
            style={{ color: "var(--secondary-accent)" }}
          >
            Menü & Bilgi
          </h4>
          {[
            { label: "Menüyü İncele", href: "/menu" },
            { label: "Hikayemiz", href: "/hakkimizda" },
            { label: "Şubelerimiz", href: "#subeler" },
            { label: "İletişim", href: "/iletisim" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-montserrat text-sm transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Şubeler */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <h4
            className="font-playfair text-lg mb-2"
            style={{ color: "var(--secondary-accent)" }}
          >
            Şubelerimiz
          </h4>

          {[
            {
              name: "Emek",
              address: "Bişkek (Eski 8) Cad. No:175",
              url: "https://www.google.com/maps/place/Finestra+Emek/@39.9199164,32.8151086,17z/data=!3m1!4b1!4m6!3m5!1s0x14d34f67c238ad29:0x1b48caad1a9a1705!8m2!3d39.9199123!4d32.8176835!16s%2Fg%2F11scq2zvny?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
            },
            {
              name: "Ümitköy",
              address: "Pazartesi kapalıdır.",
              url: "https://www.google.com/maps/place/Finestra+%C3%9Cmitk%C3%B6y/@39.8953662,32.7098745,17z/data=!3m1!4b1!4m6!3m5!1s0x14d339004515ebf7:0x54ccf74d867265a1!8m2!3d39.8953621!4d32.7124494!16s%2Fg%2F11x_cy_686?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
            },
            {
              name: "Yenimahalle",
              address: "Mehmet Akif Ersoy Cad. No:3",
              url: "https://www.google.com/maps/place/Finestra+Yenimahalle/@39.9740358,32.7718819,17z/data=!3m1!4b1!4m6!3m5!1s0x14d3490dcdbd7a0b:0x68a5f53c5733ea25!8m2!3d39.9740317!4d32.7744568!16s%2Fg%2F11t5qt07k3?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
            },
          ].map(({ name, address, url }) => (
            <div key={name} className="font-montserrat text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              <p className="font-semibold text-white text-sm">{name}</p>
              <p>{address}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors duration-300 hover:text-white"
              >
                Haritada Gör
              </a>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-16 pt-8 border-t text-center font-montserrat text-xs"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        © {new Date().getFullYear()} Finestra. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
