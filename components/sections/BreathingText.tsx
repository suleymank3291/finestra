"use client";

import Image from "next/image";

const GALLERY_IMAGES = [
  "finestra_cafe_1655981791_2866905519419937289_50439188917_1.jpg",
  "finestra_cafe_1655981791_2866905519420071521_50439188917_7.jpg",
  "finestra_cafe_1656616261_2872227839009168249_50439188917.jpg",
  "finestra_cafe_1665615082_2947715417745025572_50439188917.jpg",
  "finestra_cafe_1734445258_3525104778904589152_50439188917_1.jpg",
  "finestra_cafe_1763819547_3771514177874046142_50439188917.jpg",
  "finestra_cafe_1769157212_3816289757571846717_50439188917_2.jpg",
  "finestra_cafe_1769157212_3816289757580238879_50439188917_5.jpg",
  "finestra_cafe_1769157212_3816289757580263907_50439188917_7.jpg",
  "finestra_cafe_1769157212_3816289757580285975_50439188917_6.jpg",
  "finestra_cafe_1769157212_3816289757588671049_50439188917_3.jpg",
  "finestra_cafe_1769157212_3816289758335231743_50439188917_1.jpg",
  "finestra_cafe_1769157212_3816289758352045507_50439188917_4.jpg",
  "finestra_cafe_1775153310_3866587150573646312_50439188917_1.jpg",
  "finestra_cafe_1775512349_3869599416827019150_50439188917_1.jpg",
  "finestra_cafe_1776417361_3877189476774636923_50439188917_1.jpg",
  "finestra_cafe_1776417361_3877189484634716323_50439188917_2.jpg",
  "finestra_cafe_1776417361_3877189495305014966_50439188917_3.jpg",
  "finestra_cafe_1776417361_3877189498618566927_50439188917_4.jpg",
  "finestra_cafe_1776417361_3877189502460551622_50439188917_5.jpg",
  "finestra_cafe_1776417361_3877189510706527601_50439188917_6.jpg",
  "finestra_cafe_1776417361_3877189512703041909_50439188917_7.jpg",
  "finestra_cafe_1776417361_3877189516570157616_50439188917_8.jpg",
  "finestra_cafe_1776417361_3877189518239518079_50439188917_9.jpg",
  "finestra_cafe_1776417361_3877189520823190864_50439188917_10.jpg",
  "finestra_cafe_1776417361_3877189522542875117_50439188917_11.jpg",
  "finestra_cafe_1776417361_3877189526368031059_50439188917_12.jpg",
  "finestra_cafe_1776417361_3877189531938095316_50439188917_13.jpg",
  "finestra_cafe_1776790255_3880320241762835580_50439188917_1.jpg",
  "finestra_cafe_1776790255_3880320303469442467_50439188917_2.jpg",
  "finestra_cafe_1776790255_3880320309601530624_50439188917_3.jpg",
  "finestra_cafe_1776790255_3880320315129629306_50439188917_4.jpg",
  "finestra_cafe_1776790255_3880320323241403124_50439188917_5.jpg",
  "finestra_cafe_1776790255_3880320325120434657_50439188917_6.jpg",
  "finestra_cafe_1778145664_3891689652084034469_50439188917_1.jpg",
  "finestra_cafe_1778145664_3891689659583478883_50439188917_3.jpg",
  "finestra_cafe_1778145664_3891689665589698727_50439188917_2.jpg"
];

// 37 görseli iki satıra paylaştırıyoruz: 18 üst, 19 alt
const topRowImages = GALLERY_IMAGES.slice(0, 18);
const bottomRowImages = GALLERY_IMAGES.slice(18);

// Her kart için deterministik, tatlı bir eğiklik açısı üreten dizi (hydration mismatch olmaması için sabit)
const getRotation = (index: number) => {
  const rotations = [-4.0, 2.5, -2.0, 3.5, -4.5, 1.8, -3.0, 4.2, -1.5, 3.0, -3.5, 2.0, -4.2, 3.8, -2.5, 2.2, -3.8, 1.2];
  return rotations[index % rotations.length];
};

const PolaroidCard = ({ src, index }: { src: string; index: number }) => {
  const rotation = getRotation(index);
  return (
    <div
      className="bg-[#FCFCF9] p-2 pb-3.5 md:p-3 md:pb-5 shadow-[0_8px_20px_rgba(0,0,0,0.06)] rounded-[6px] flex-shrink-0 transition-all duration-300 md:hover:scale-108 md:hover:rotate-0 md:hover:z-10 md:hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] cursor-pointer"
      style={{
        width: "var(--card-width)",
        height: "var(--card-height)",
        transform: `rotate(${rotation}deg)`,
        margin: "0 var(--card-margin)",
      }}
    >
      <div className="relative w-full h-[90%] overflow-hidden bg-[#2C3E2D]/5 rounded-[4px] select-none pointer-events-none">
        <Image
          src={`/media/gallery/${src}`}
          alt="Finestra Cafe"
          fill
          sizes="(max-width: 768px) 150px, 240px"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default function BreathingText() {
  return (
    <section
      className="relative flex flex-col justify-center py-20 md:py-28 overflow-hidden select-none"
      data-navbar-color="#2C3E2D"
      style={{ backgroundColor: "#E5C9A3" }}
    >
      {/* Scoped CSS Styles for Marquee Performance, Size Adjustments, and Responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-container {
          --card-width: 230px;
          --card-height: 275px;
          --card-margin: 14px;
          overflow: hidden;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 20px 0; /* Sihirli dikey koruma tamponu (Mobil) */
        }
        @media (min-width: 768px) {
          .marquee-container {
            --card-width: 285px;
            --card-height: 345px;
            --card-margin: 26px;
            gap: 38px;
            padding: 30px 0; /* Sihirli dikey koruma tamponu (Masaüstü) */
          }
        }

        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 58s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 58s linear infinite;
        }

        @media (min-width: 768px) {
          .marquee-row:hover .animate-marquee-left,
          .marquee-row:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        }
      `}} />

      {/* Başlık Alanı */}
      <div className="text-center mb-10 md:mb-16 px-6 select-none pointer-events-none">
        <span className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#2C3E2D]/60 block mb-2">
          HİKAYEMİZDEN KARELER
        </span>
        <h2 className="font-playfair italic text-3xl md:text-5xl lg:text-6xl text-[#2C3E2D] font-bold leading-tight">
          Finestra'da Zamanı Durduran Anlar
        </h2>
      </div>

      <div className="marquee-container">
        {/* Üst Satır: Sağa doğru akar */}
        <div className="marquee-row w-full flex py-3">
          <div className="animate-marquee-right">
            {/* Orijinal Liste */}
            {topRowImages.map((src, i) => (
              <PolaroidCard key={`top-orig-${i}`} src={src} index={i} />
            ))}
            {/* Kesintisiz döngü için kopya liste */}
            {topRowImages.map((src, i) => (
              <PolaroidCard key={`top-dup-${i}`} src={src} index={i} />
            ))}
          </div>
        </div>

        {/* Alt Satır: Sola doğru akar */}
        <div className="marquee-row w-full flex py-3">
          <div className="animate-marquee-left">
            {/* Orijinal Liste */}
            {bottomRowImages.map((src, i) => (
              <PolaroidCard key={`bottom-orig-${i}`} src={src} index={i} />
            ))}
            {/* Kesintisiz döngü için kopya liste */}
            {bottomRowImages.map((src, i) => (
              <PolaroidCard key={`bottom-dup-${i}`} src={src} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
