import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-face",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-face",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Finestra — Coffee · Dessert · Breakfast · Eatery",
  description:
    "Nitelikli kahve, el yapımı çikolata, pasta ve butik tasarım çiçekleri. Ankara'nın 3 şubesinde sizi bekliyoruz.",
  keywords: ["finestra", "kafe", "ankara", "kahve", "butik"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
