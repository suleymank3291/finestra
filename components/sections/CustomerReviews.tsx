"use client";

import { useState } from "react";

const SUBELER_YORUM = [
  {
    name: "Emek Şubesi",
    color: "#2C3E2D",
    bg: "rgba(44,62,45,0.04)",
    mapsUrl: "https://www.google.com/maps/place/Finestra+Emek/@39.9199164,32.8151086,17z/data=!3m1!4b1!4m6!3m5!1s0x14d34f67c238ad29:0x1b48caad1a9a1705!8m2!3d39.9199123!4d32.8176835!16s%2Fg%2F11scq2zvny?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Ümitköy Şubesi",
    color: "#C4A47C",
    bg: "rgba(196,164,124,0.06)",
    mapsUrl: "https://www.google.com/maps/place/Finestra+%C3%9Cmitk%C3%B6y/@39.8953662,32.7098745,17z/data=!3m1!4b1!4m6!3m5!1s0x14d339004515ebf7:0x54ccf74d867265a1!8m2!3d39.8953621!4d32.7124494!16s%2Fg%2F11x_cy_686?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Yenimahalle Şubesi",
    color: "#4A3728",
    bg: "rgba(74,55,40,0.04)",
    mapsUrl: "https://www.google.com/maps/place/Finestra+Yenimahalle/@39.9740358,32.7718819,17z/data=!3m1!4b1!4m6!3m5!1s0x14d3490dcdbd7a0b:0x68a5f53c5733ea25!8m2!3d39.9740317!4d32.7744568!16s%2Fg%2F11t5qt07k3?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
  },
];

const YORUMLAR = [
  {
    isim: "Ayşenur Esen",
    sure: "3 ay önce",
    yorum: "İlk defa japon pankeki denedim çok hoşuma gitti, rahatsız edici bir yumurta tadı ve kokusu yoktu. Çok pofuduk ve hafifti ayrıca çikolatası da efsane bence. Sufle insanı değilim pek onu daha çok arkadaşlarım yedi magnolia da güzeldi. Yukarı katta oturduk uzun vakit geçirdik arkadaşımızın da doğum günüydü aynı zamanda. Bizimle ilgilenen personel de çok tatlıydı genel anlamıyla mekanı sevdim.",
    puan: 5,
  },
  {
    isim: "Rıza Badem",
    sure: "2 ay önce",
    yorum: "Dün akşam saatlerinde her zaman önünden geçtiğim Finestra'da bir kahve içmek istedim. Yanında da çilekli magnolya söyledim. Gayet lezzetliydi bir magnolya için fakat filtre kahvenin servis edildiği fincan çok küçük geldi maalesef. Garsonların hepsi çok ilgiliydi onlara da ayrıca teşekkürler. 490 ödedim ayrıca bence bi tık pahalı.",
    puan: 5,
  },
  {
    isim: "Burçak Balkan",
    sure: "5 ay önce",
    yorum: "Sabah kahvaltısı için arkadaşımın tavsiyesi üzerine tercih ettiğim bu mekandan oldukça memnun kaldım, kahvaltı konusunda zengin bir menüye sahipler. Avakadolu Simit ve çay istedim. Yanında gelen çay ise hacim olarak çok büyük olduğundan benim gibi çaykolik birisi için ayrıca bir mutluluk sebebiydi. Ankara'ya yolum düştüğünde tekrar gelmeyi planlıyorum.",
    puan: 5,
  },
  {
    isim: "Reyhan K.",
    sure: "6 ay önce",
    yorum: "Üniversite hayatımdan bu yana (1994) yediğim ennn güzel hamburgerdi diyebilirim. Kızım da avokadolu simit yedi, çay da mükemmeldi. Gerçekten beni 2025'ten alıp gençliğimin en güzel anılarına götüren lezzeti herkesin tatmasını isterim. Tek kelimeyle harikaydı, iki kelime ile harika ÖTESİYDİ. EMEĞİ GEÇENLERİN ELLERİNE SAĞLIK.",
    puan: 5,
  },
  {
    isim: "Songül Çakmak",
    sure: "3 ay önce",
    yorum: "İçerisi sessiz sakin çok güzeldi. Tost yedik biz içindeki malzemeler bol ve çok güzeldi kaliteliydi. Çalışan kızda güler yüzlüydü.",
    puan: 5,
  },
  {
    isim: "Yeliz Öz",
    sure: "bir yıl önce",
    yorum: "Çiçek, çikolata, pasta konseptli hoş bir ortamı var. Çiçek de satın alabiliyorsunuz. Bal kabağı seviyorsanız bal kabaklı cheesecake çok başarılı. Çikolatalı meyveli mont black da lezzetliydi. Servis hızlı, çalışanlar ilgili. Fiyatlar biraz pahalı ama yediklerimizden ve servisten memnun kaldık. Porsiyonlar büyük, iki kişi bir tatlıyı paylaşabilir.",
    puan: 5,
  },
  {
    isim: "C. Cem Denk",
    sure: "11 ay önce",
    yorum: "Ankara'da piyano dinlenerek kahvaltı edilebilecek çoook nadir mekanlardan birisi. Tanıtım amaçlı Piyano çalanlara kahvaltı ücretsiz. 2 katlı ferah bir yer. Kahvaltısındaki yiyecekler çok doğaldı. Sucuk ayrı lezzetliydi. Sakin, nezih ve leziz bir mekan arıyorsanız tam size göre.",
    puan: 5,
  },
  {
    isim: "Sevim Özkan",
    sure: "bir yıl önce",
    yorum: "Sigara içmeyenlerin de rahat edeceği bir mekan. İç tasarımı güzel girişte sizi karşılayan çiçekler çok hoş satın da alabiliyorsunuz. Çalışanlar güleryüzlü ve sıcak. Çocukla gidilip pişman olunmayacak yerlerden. Dilek kağıtları iyi düşünülmüş bir etkinlik. Bize sukulent hediye ettiler çok hoş bir jest mutlu olduk.",
    puan: 5,
  },
  {
    isim: "Rabia Yılmaz",
    sure: "6 ay önce",
    yorum: "Kesinlikle diğer şubesindense hem evime yakın olması hem de çalışanlar lezzet yönünden bu şubeyi tercih ederim. Kadınlar için düşünülüp kişisel eşyaların konulması aşırı hoşuma gitti teşekkürler.",
    puan: 5,
  },
  {
    isim: "Fatma Duru",
    sure: "bir yıl önce",
    yorum: "Hem çiçek hem çikolata hem de kafe konseptiyle sıradanlıktan çok uzak, özenle tasarlanmış bir mekan. Mont Blanc, San Sebastian ve çikolatalı fondüyü denedik — her biri ayrı ayrı çok lezzetliydi. Çalışanlar çok nazik ve ilgiliydi. Kasada küçük sukulentlerden hediye ettiler. Hem göze hem damağa hitap eden, içeri girince huzur bulduğunuz çok tatlı bir yer.",
    puan: 5,
  },
  {
    isim: "Duygu Otgöz",
    sure: "2 ay önce",
    yorum: "Ben burayı çok beğeniyorum. İçeride çiçekler de var. Yiyecekler taze ve farklı, butik bir yer. Küçük el sanatları ürünleri de sergileniyor.",
    puan: 5,
  },
  {
    isim: "Saliha Gürdal",
    sure: "3 yıl önce",
    yorum: "İçeri güzel dizayn edilmiş, sıcak bir ortamı olan butik bir kafe. Epey tatlı çeşidi var ve çok lezzetli. Personel gayet ilgili. Hediye sukulent verdiler. Önünde otoparkı var ama biraz küçük.",
    puan: 5,
  },
  {
    isim: "ESMA (Petrichores)",
    sure: "3 yıl önce",
    yorum: "Sıkça karşıma çıkan bir mekandı ve iki üç kez gittim denedim. Her gittiğimde de beğendim. Mekan güzel dizayn edilmiş, yarısı güzel bitkilerden oluşuyor satışı da yapılıyor. Tatlıları da çok güzel. Çikolatalı San Sebastián yedik, oldukça lezzetliydi. Ortam çok hoş ve ferah. Tavsiye edilir.",
    puan: 5,
  },
  {
    isim: "Serdar Kuvvet",
    sure: "5 ay önce",
    yorum: "Finestra Cafe'nin ortamı gerçekten çok hoş, samimi bir havası var. Tatlıları taze ve lezzetli, özellikle çayı da gayet güzel demlemişler. Sessiz sakin bir yerde oturup keyifli vakit geçirmek için ideal bir yer olmuş.",
    puan: 5,
  },
  {
    isim: "Egemen Akdeniz",
    sure: "4 ay önce",
    yorum: "Bahçe kısmı çok keyifli. Özellikle yaz akşamları yer bulmak çok zor olur diye düşünüyorum. Hafta içi ateşte kestane de pişiriyorlarmış. Mexican burger yanında patates kızartması ile çok güzeldi. Çalışanlar ilgili ve güler yüzlüydü. Mutlaka tekrar gideceğim.",
    puan: 5,
  },
  {
    isim: "Yesim Coban",
    sure: "5 ay önce",
    yorum: "Harika sıcacık bir ortam, isterseniz bahçede isterseniz iç mekanda oturabilirsiniz. Tatlıları efsane ve porsiyonları çok büyük. Güleryüzlü çalışanlar, servis hızlı. Küçük bitkiler hediye ediyorlar, yolunuz düşerse uğrayın mutlaka.",
    puan: 5,
  },
  {
    isim: "Atakan Gungor",
    sure: "3 ay önce",
    yorum: "Pose yumurtalı avakodolu ekmek ile beraber kupa çay içtim. Tatlı olarak vialetta cup aldım 2 kişilik, gayet doyurucuydu. Fiyatlarda uygun. Not: tostu elinize alıp yemeyin hepsi dağılabiliyor çatal bıçakla devam edilebilir.",
    puan: 5,
  },
  {
    isim: "Ebe Hilal Tangal",
    sure: "5 ay önce",
    yorum: "Biz öğle vaktinde gittik tavuk bowl ve waffle söyledik, bowl ortalama üstüydü. Mekanın her köşesi fotoğraf çekinmek için yapılmış gibiydi çok güzeldi. Namaz kılmak isteyenlerin kılabileceği bir alan var bence en önemli kısmı bu. Tuvaletleri tertemizdi biz çok beğendik mekanı.",
    puan: 5,
  },
  {
    isim: "Nezaket Akdeniz",
    sure: "6 ay önce",
    yorum: "Kapıdan girdiğimiz andan itibaren çalışanların güler yüzü ve ilgisiyle karşılaştık. Üç Peynirli Kiş ve Mont Blanc tatlısını denedik cidden çok güzel ve tatmaya değerdi. Her köşesi fotoğraf çekilmelik, bahçesi yeşillikler içinde huzurla oturacağınız bir mekan. Yolunuz Ümitköy'e düşerse mutlaka bir uğrayın.",
    puan: 5,
  },
];

const DOUBLED = [...YORUMLAR, ...YORUMLAR];

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#C4A47C" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function Avatar({ isim }: { isim: string }) {
  const initials = isim.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#2C3E2D", "#4a6741", "#3d5c3e", "#5c7a3e", "#2d4a2e", "#1f3320", "#3a5c3b", "#4d7a4e"];
  const color = colors[isim.charCodeAt(0) % colors.length];
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 font-montserrat"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function YorumKarti({ yorum }: { yorum: typeof YORUMLAR[0] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-5 flex flex-col gap-3"
      style={{
        width: 300,
        backgroundColor: "#FCFCFC",
        border: "1px solid rgba(44,62,45,0.08)",
        boxShadow: "0 2px 16px rgba(44,62,45,0.06)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar isim={yorum.isim} />
          <div>
            <p className="font-montserrat font-semibold text-sm leading-tight" style={{ color: "var(--text-main)" }}>
              {yorum.isim}
            </p>
            <p className="font-montserrat text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {yorum.sure}
            </p>
          </div>
        </div>
        <GoogleIcon />
      </div>

      <div className="flex gap-0.5">
        {[...Array(yorum.puan)].map((_, i) => <StarIcon key={i} />)}
      </div>

      <p className="font-montserrat text-xs leading-relaxed line-clamp-4" style={{ color: "var(--text-muted)" }}>
        {yorum.yorum}
      </p>
    </div>
  );
}

export default function CustomerReviews() {
  const [yorumOpen, setYorumOpen] = useState(false);

  return (
    <section
      data-navbar-color="#2C3E2D"
      className="py-24 md:py-32 overflow-hidden relative"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      {/* Başlık */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2
          className="font-playfair text-4xl md:text-6xl mb-4"
          style={{ color: "var(--primary-accent)" }}
        >
          Misafirlerimizin{" "}
          <span className="italic" style={{ color: "#C4A47C" }}>
            Deneyimleri
          </span>
        </h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <GoogleIcon />
          <span className="font-montserrat text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
            Google Yorumları
          </span>
          <span className="flex items-center gap-0.5 ml-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </span>
          <span className="font-montserrat text-xs ml-1" style={{ color: "var(--text-muted)" }}>5.0</span>
        </div>
      </div>

      {/* Satır 1 — sola kayar */}
      <div className="relative mb-4">
        <div className="flex gap-4" style={{ animation: "reviewLeft 50s linear infinite", width: "max-content" }}>
          {DOUBLED.map((y, i) => <YorumKarti key={i} yorum={y} />)}
        </div>
      </div>

      {/* Satır 2 — sağa kayar */}
      <div className="relative">
        <div className="flex gap-4" style={{ animation: "reviewRight 55s linear infinite", width: "max-content" }}>
          {[...DOUBLED].reverse().map((y, i) => <YorumKarti key={i} yorum={y} />)}
        </div>
      </div>

      {/* Kenar soluklaştırma */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
           style={{ background: "linear-gradient(to right, var(--bg-color), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
           style={{ background: "linear-gradient(to left, var(--bg-color), transparent)" }} />

      {/* CTA */}
      <div className="mt-20 flex flex-col items-center px-6">
        <h3
          className="font-playfair text-3xl md:text-5xl mb-3 text-center"
          style={{ color: "var(--primary-accent)" }}
        >
          Bizi Değerlendirin
        </h3>
        <div className="mt-4 h-[2px] w-12 rounded-full" style={{ backgroundColor: "#C4A47C" }} />
        <button
          onClick={() => setYorumOpen(true)}
          className="mt-6 inline-flex items-center gap-3 px-8 py-4 text-white font-montserrat text-xs tracking-widest uppercase rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: "var(--primary-accent)" }}
        >
          Google&apos;da Yorum Yaz
        </button>
      </div>

      {/* Yorum Şube Seçim Pop-up Modalı */}
      {yorumOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
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

          <div className="bg-[#FCFCF9] w-full max-w-md rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(44,62,45,0.2)] border border-[#2C3E2D]/10 p-6 md:p-8 animate-scale-up">

            <div className="flex justify-end mb-2">
              <button
                onClick={() => setYorumOpen(false)}
                className="text-[#2C3E2D]/40 hover:text-[#2C3E2D] p-1.5 rounded-full hover:bg-[#2C3E2D]/5 transition-all duration-300 focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <span className="font-montserrat text-[10px] font-semibold tracking-[0.25em] text-[#C4A47C] uppercase block mb-1">
                FİNESTRA CAFE
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#2C3E2D]">
                Yorum Yapın
              </h3>
              <p className="font-montserrat text-xs text-[#2C3E2D]/60 mt-2 leading-relaxed">
                Yorum yapmak istediğiniz şubemizi seçin. Google Maps üzerinden değerlendirmenizi bırakabilirsiniz.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {SUBELER_YORUM.map((sube) => (
                <a
                  key={sube.name}
                  href={sube.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setYorumOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl border border-transparent transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                  style={{ backgroundColor: sube.bg }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = sube.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-playfair text-lg font-bold transition-colors duration-300" style={{ color: sube.color }}>
                      {sube.name}
                    </span>
                    <span className="font-montserrat text-xs text-[#2C3E2D]/50 mt-0.5 group-hover:text-[#2C3E2D]/70 transition-colors">
                      Google Maps&apos;te Değerlendir
                    </span>
                  </div>

                  <div className="p-2 rounded-full text-white transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: sube.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-6 pt-4 border-t border-[#2C3E2D]/5">
              <p className="font-montserrat text-[10px] text-[#2C3E2D]/40 uppercase tracking-wider">
                Finestra Cafe &bull; Google Yorumları
              </p>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes reviewLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes reviewRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
