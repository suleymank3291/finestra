"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HAKKIMIZDA_WORDS: { text: string; accent: boolean; color?: string }[] = [
  { text: "Çiçek,", accent: true, color: "#C4A47C" },
  { text: "çikolata,", accent: false },
  { text: "pasta", accent: false },
  { text: "ve", accent: false },
  { text: "kahveyi", accent: true, color: "#C4A47C" },
  { text: "aynı", accent: false },
  { text: "mekânda", accent: false },
  { text: "buluşturan", accent: false },
  { text: "eşsiz", accent: true, color: "#C4A47C" },
  { text: "bir", accent: false },
  { text: "deneyim.", accent: false },
];

function NefesYazi() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.from(wordsRef.current.filter(Boolean), {
        opacity: 0,
        y: 22,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.8,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-navbar-color="#ffffff"
      className="flex items-center justify-center py-24 px-6"
      style={{ minHeight: "50vh", backgroundColor: "#2C3E2D" }}
    >
      <div className="max-w-6xl w-full text-center">
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-4">
          {HAKKIMIZDA_WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: word.accent
                  ? "var(--font-playfair-face), Georgia, serif"
                  : "var(--font-montserrat-face), Arial, sans-serif",
                fontStyle: word.accent ? "italic" : "normal",
                fontWeight: word.accent ? 600 : 300,
                color: word.accent ? word.color : "rgba(255, 255, 255, 0.85)",
              }}
            >
              {word.text}
            </span>
          ))}
        </p>

        <p
          className="font-montserrat text-sm md:text-base leading-loose max-w-3xl mx-auto mt-16"
          style={{ color: "rgba(255, 255, 255, 0.65)" }}
        >
          Finestra Cafe çiçek, çikolata, pasta ve kahveyi aynı mekanda birleştirerek misafirlerine eşsiz bir deneyim sunar. Tasarım çiçekler, el yapımı çikolatalar ve yine Finestra mutfağından çıkan özel reçetelerle yapılmış pastalarıyla doğal ve sağlıklı ürünler ortaya koyar. Espresso ve Türk kahvesi çeşitleri, soğuk içecekler ve artizan çaylar ile keyifli vakit geçirmeniz için beklentilerinizin ötesinde bir hizmet sunmayı amaçlayan Finestra Cafe'de ürünleri paket olarak da alabilirsiniz.
        </p>
      </div>
    </section>
  );
}

export default function HakkimizdaSayfasi() {
  return (
    <>
      <Navbar />
      <main>

        {/* Bölüm 1: Sol görsel, sağ yazı */}
        <section
          data-navbar-color="#2C3E2D"
          className="min-h-screen flex items-center"
          style={{ backgroundColor: "var(--bg-color)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12 md:gap-20">

            {/* Görsel */}
            <div className="w-full md:w-1/2 shrink-0">
              <div className="overflow-hidden" style={{ borderRadius: "20px", aspectRatio: "4/5" }}>
                <Image
                  src="/media/cat-2.webp"
                  alt="Finestra Hakkında"
                  fill={false}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Yazı */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <p
                className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
                style={{ color: "#C4A47C" }}
              >
                Finestra Cafe
              </p>
              <h1
                className="font-playfair text-5xl md:text-7xl italic leading-tight mb-4"
                style={{ color: "var(--primary-accent)" }}
              >
                Mutluluğu
                <span className="block">Hisset</span>
              </h1>
              <div className="h-[2px] w-12 rounded-full mb-8" style={{ backgroundColor: "#C4A47C" }} />
              <p
                className="font-montserrat text-sm md:text-base leading-loose"
                style={{ color: "var(--text-muted)" }}
              >
                2014 yılında kurulan Fikrinafi Ltd. Şti'nin tescilli markası olan "Finestra" çikolata ve pasta imalatı faaliyetlerini gerçekleştirirken 2022 yılında Finestra Cafe adı altında kendi misafirlerine de hizmet vermeye başlamıştır. Nitelikli kahveler ile çiçek, çikolata ve pasta ürünlerini bir araya getiren kafe konsepti ile benzersiz bir deneyim yaşatmayı amaçlayan Finestra markası aynı zamanda ürünlerini kurumsal ve online olarak da satışa sunmaktadır.
              </p>
            </div>

          </div>
        </section>

        {/* Bölüm 2: Tam genişlik görsel */}
        <section
          data-navbar-color="#ffffff"
          className="relative w-full overflow-hidden"
          style={{ height: "60vh", minHeight: "400px" }}
        >
          <Image
            src="/media/hero-2.webp"
            alt="Finestra"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45))" }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p
              className="font-playfair text-3xl md:text-5xl italic text-white text-center leading-relaxed tracking-wide"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              ÇİÇEK · ÇİKOLATA · PASTA
            </p>
          </div>
        </section>

        {/* Bölüm 3: Nefes aldırıcı yazı + kavram paragrafı */}
        <NefesYazi />

        {/* Bölüm 4: Sol yazı, sağ görsel */}
        <section
          data-navbar-color="#2C3E2D"
          className="min-h-screen flex items-center"
          style={{ backgroundColor: "var(--bg-color)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">

            {/* Görsel */}
            <div className="w-full md:w-1/2 shrink-0">
              <div className="overflow-hidden" style={{ borderRadius: "20px", aspectRatio: "4/5" }}>
                <Image
                  src="/media/cat-7.webp"
                  alt="Finestra Tadı"
                  fill={false}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Yazı */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <p
                className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
                style={{ color: "#C4A47C" }}
              >
                Finestra Tadi
              </p>
              <h2
                className="font-playfair text-5xl md:text-7xl italic leading-tight mb-4"
                style={{ color: "var(--primary-accent)" }}
              >
                Lezzeti
                <span className="block">Yakalayın</span>
              </h2>
              <div className="h-[2px] w-12 rounded-full mb-8" style={{ backgroundColor: "#C4A47C" }} />
              <p
                className="font-montserrat text-sm md:text-base leading-loose"
                style={{ color: "var(--text-muted)" }}
              >
                Yıllar sonra dahi aldığınız bir koku, tattığınız bir lezzet sizi mutluluk duyduğunuz bir hatıraya götürür. Finestra, tecrübe edilmiş özel reçetelerle, standart ve nitelikli malzeme kalitemizden ödün vermeden, yıllar sonra dahi aynı lezzeti tadabileceğiniz pastaları hassasiyetle üretmekten mutluluk duyar. Bir araya getirdiğimiz malzemeler sizi mutlu edecek bir melodinin uyumlu notaları gibi usta ellerle severek harmanlanır. Gayemiz bizim pastalarımızı tattığınızda yüzünüzde unutulmaz bir tebessümün oluştuğunu görmektir. Mutluluk veren anlar ve mutluluğu hatırlatan anılar için tat hafızanıza saygı duyuyoruz.
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
