"use client";

import { useState } from "react";
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
    note: "Pazartesi kapalıdır." as string | null,
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

  return (
    <Link
      href={`/subeler#${branch.id}`}
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video kartı */}
      <div
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
      </div>

      {/* Şube bilgisi — Link kapanışı aşağıda */}
      <div className="mt-5 px-1">
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
            className="font-montserrat text-xs mb-2"
            style={{ color: "var(--secondary-accent)" }}
          >
            {branch.note}
          </p>
        )}

        {/* Yol tarifi linki */}
        <a
          href={branch.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-montserrat text-xs mt-2 pb-0.5 border-b border-current transition-colors duration-300"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--primary-accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Yol Tarifi Al
        </a>
      </div>
    </Link>
  );
}

export default function BranchCards() {
  return (
    <section
      id="subeler"
      data-navbar-color="#2C3E2D"
      className="py-20 md:py-28 px-6"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-playfair text-3xl md:text-4xl text-center mb-16 tracking-wide"
          style={{ color: "var(--primary-accent)" }}
        >
          Şubelerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </section>
  );
}
