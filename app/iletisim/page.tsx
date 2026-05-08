import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GENEL = [
  {
    etiket: "Instagram",
    deger: "@finestra_cafe",
    href: "https://www.instagram.com/finestra_cafe",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

const SUBELER = [
  {
    isim: "Emek Şubesi",
    adres: "Bişkek (Eski 8) Cad. No:175",
    ilce: "Emek, Ankara",
    teller: ["0 533 499 76 78"],
    not: null as string | null,
    mapsUrl: "https://maps.app.goo.gl/MqHtYpdZYsjFa4YJ8",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.9597745122906!2d32.81510321142457!3d39.9199163856088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f67c238ad29%3A0x1b48caad1a9a1705!2sFinestra%20Emek!5e0!3m2!1str!2str!4v1778181053155!5m2!1str!2str",
  },
  {
    isim: "Ümitköy Şubesi",
    adres: "Mutlukent Mah. 1961. Cad. No:42",
    ilce: "Çankaya, Ankara",
    teller: ["0 501 542 06 06"],
    not: "Pazartesi kapalıdır." as string | null,
    mapsUrl: "https://maps.app.goo.gl/N1TcdCSqNVy5Lpy97",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.056548937365!2d32.70986911142349!3d39.895366187087916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d339004515ebf7%3A0x54ccf74d867265a1!2zRmluZXN0cmEgw5xtaXRrw7Z5!5e0!3m2!1str!2str!4v1778181074513!5m2!1str!2str",
  },
  {
    isim: "Yenimahalle Şubesi",
    adres: "Mehmet Akif Ersoy Cad. No:3/A",
    ilce: "Yenimahalle, Ankara",
    teller: ["0 312 341 90 90", "0 552 325 44 44"],
    not: null as string | null,
    mapsUrl: "https://maps.app.goo.gl/LtaL5zG4QZHj28FWA",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.540019032558!2d32.77187651142705!3d39.97403578234585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3490dcdbd7a0b%3A0x68a5f53c5733ea25!2sFinestra%20Yenimahalle!5e0!3m2!1str!2str!4v1778181097607!5m2!1str!2str",
  },
];

export default function IletisimSayfasi() {
  return (
    <>
      <Navbar />
      <main
        data-navbar-color="#2C3E2D"
        className="pt-32 md:pt-40 pb-24 md:pb-32 px-6"
        style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Başlık */}
          <div className="text-center mb-16">
            <p
              className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase mb-4"
              style={{ color: "#C4A47C" }}
            >
              Finestra Cafe
            </p>
            <h1
              className="font-playfair text-6xl md:text-8xl italic"
              style={{ color: "var(--primary-accent)" }}
            >
              İletişim
            </h1>
            <div className="mt-5 h-[2px] w-12 rounded-full mx-auto" style={{ backgroundColor: "#C4A47C" }} />
          </div>

          {/* Genel iletişim kutusu */}
          <div
            className="rounded-2xl px-8 md:px-14 py-10 mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8"
            style={{ backgroundColor: "#2C3E2D" }}
          >
            <div>
              <p
                className="font-montserrat text-[9px] font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "rgba(196,164,124,0.6)" }}
              >
                Genel İletişim
              </p>
              <h2 className="font-playfair text-3xl italic text-white">
                Bize Ulaşın
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
              {GENEL.map((item) => (
                <a
                  key={item.etiket}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group"
                >
                  <span style={{ color: "#C4A47C" }}>{item.icon}</span>
                  <div>
                    <p
                      className="font-montserrat text-[9px] tracking-[0.2em] uppercase mb-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {item.etiket}
                    </p>
                    <p
                      className="font-montserrat text-sm font-medium text-white transition-colors duration-300 group-hover:text-[#C4A47C]"
                    >
                      {item.deger}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Üç şube kutusu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {SUBELER.map((sube) => (
              <div
                key={sube.isim}
                className="flex flex-col gap-3 px-8 py-9 rounded-2xl" style={{ backgroundColor: "#FCFCFC" }}
                style={{ border: "1px solid rgba(44,62,45,0.1)" }}
              >
                <p
                  className="font-montserrat text-[9px] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "#C4A47C" }}
                >
                  Şube
                </p>
                <h2
                  className="font-playfair text-2xl italic"
                  style={{ color: "var(--primary-accent)" }}
                >
                  {sube.isim}
                </h2>
                <div className="h-px w-8" style={{ backgroundColor: "rgba(196,164,124,0.4)" }} />
                <p
                  className="font-montserrat text-sm leading-relaxed"
                  style={{ color: "var(--text-main)" }}
                >
                  {sube.adres}
                </p>
                <p className="font-montserrat text-xs" style={{ color: "var(--text-muted)" }}>
                  {sube.ilce}
                </p>
                {sube.teller.map((tel) => (
                  <a
                    key={tel}
                    href={`tel:${tel.replace(/\s/g, "")}`}
                    className="font-montserrat text-sm font-medium transition-colors duration-300"
                    style={{ color: "var(--primary-accent)" }}
                  >
                    {tel}
                  </a>
                ))}
                {sube.not && (
                  <p className="font-montserrat text-xs" style={{ color: "#C4A47C" }}>
                    {sube.not}
                  </p>
                )}
                <a
                  href={sube.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-5 inline-flex items-center gap-2 font-montserrat text-xs font-medium tracking-widest uppercase pb-0.5 border-b border-current self-start transition-colors duration-300"
                  style={{ color: "var(--text-muted)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Yol Tarifi Al
                </a>
              </div>
            ))}
          </div>

          {/* Üç harita */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBELER.map((sube) => (
              <div
                key={sube.isim}
                className="overflow-hidden rounded-2xl"
                style={{ height: "260px" }}
              >
                <iframe
                  src={sube.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={sube.isim}
                />
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
