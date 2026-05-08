"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUBELER = [
  {
    id: "emek",
    isim: "Emek Şubesi",
    aciklama: "Finestra'nın ilk evi. Emek'in kalabalık sokaklarından sıyrılıp kapıdan girdiğiniz an, şehrin gürültüsü geride kalır. Sabahın erken saatlerinde fırından yeni çıkmış kişlerle başlayan gün, akşamın loş ışığında son kahveye dek uzanır. Her masa bir hikâyeye ev sahipliği etmiş; bu şube Finestra'nın ruhunu en saf haliyle taşır.",
    not: null as string | null,
    video: "/media/branch-emek.mp4",
    mapsUrl: "https://maps.app.goo.gl/MqHtYpdZYsjFa4YJ8",
    videoSolda: true,
    navbarColor: "#2C3E2D",
  },
  {
    id: "umitköy",
    isim: "Ümitköy Şubesi",
    aciklama: "Ümitköy'ün sakin mahalle dokusuna işlemiş bir durak. Hafta sonları kitabıyla gelip öğleden sonraya uzananlar, hafta içi iş toplantısını sessizce burada bitirenler — hepsi Finestra Ümitköy'ü kendine ait bir köşe gibi benimsemiş. Pazartesi günleri dinlenirken siz de ziyaretinizi planlamaya başlayabilirsiniz.",
    not: "Pazartesi kapalıdır." as string | null,
    video: "/media/branch-umitköy.mp4",
    mapsUrl: "https://maps.app.goo.gl/N1TcdCSqNVy5Lpy97",
    videoSolda: false,
    navbarColor: "#C4A47C",
  },
  {
    id: "yenimahalle",
    isim: "Yenimahalle Şubesi",
    aciklama: "Ankara'nın en dinamik semtlerinden birinde, Mehmet Akif Ersoy Caddesi üzerinde hayat bulan şubemiz. Geniş mekanı ve sıcak atmosferiyle hem büyük grupların buluşma noktası hem de yalnız çalışmak isteyenlerin sığınağı. Sabahtan geç saatlere kadar kesintisiz hizmet veren bu şube, Finestra'nın şehre en geniş kucağını açan yüzüdür.",
    not: null as string | null,
    video: "/media/branch-yenimahalle.mp4",
    mapsUrl: "https://maps.app.goo.gl/LtaL5zG4QZHj28FWA",
    videoSolda: true,
    navbarColor: "#2C3E2D",
  },
];

function SubeSection({ sube }: { sube: (typeof SUBELER)[0] }) {
  const bgColor = sube.videoSolda ? "var(--bg-color)" : "#2C3E2D";
  const textMain = sube.videoSolda ? "var(--primary-accent)" : "#ffffff";
  const textMuted = sube.videoSolda ? "var(--text-muted)" : "rgba(255,255,255,0.55)";
  const accentColor = "#C4A47C";

  return (
    <section
      id={sube.id}
      data-navbar-color={sube.navbarColor}
      className="min-h-screen flex items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`w-full max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 flex flex-col gap-12 md:gap-0 ${
          sube.videoSolda ? "md:flex-row" : "md:flex-row-reverse"
        } items-center`}
      >
        {/* Video */}
        <div className="w-full md:w-1/2 shrink-0">
          <div
            className="overflow-hidden"
            style={{ borderRadius: "20px", aspectRatio: "4/5" }}
          >
            <video
              src={sube.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Yazı */}
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center ${
            sube.videoSolda ? "md:pl-20" : "md:pr-20"
          }`}
        >
          <p
            className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
            style={{ color: accentColor }}
          >
            Finestra Cafe
          </p>

          <h2
            className="font-playfair text-5xl md:text-7xl italic leading-tight mb-6"
            style={{ color: textMain }}
          >
            {sube.isim}
          </h2>

          <div className="h-[2px] w-12 rounded-full mb-8" style={{ backgroundColor: accentColor }} />

          <p
            className="font-montserrat text-sm md:text-base leading-loose"
            style={{ color: textMuted }}
          >
            {sube.aciklama}
          </p>

          {sube.not && (
            <p
              className="font-montserrat text-xs mt-5"
              style={{ color: accentColor }}
            >
              {sube.not}
            </p>
          )}

          <a
            href={sube.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 font-montserrat text-xs font-semibold tracking-widest uppercase self-start px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            <svg
              width="14"
              height="14"
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
      </div>
    </section>
  );
}

export default function SubelerSayfasi() {
  return (
    <>
      <Navbar />
      <main>
        {SUBELER.map((sube) => (
          <SubeSection key={sube.id} sube={sube} />
        ))}
      </main>
      <Footer />
    </>
  );
}
