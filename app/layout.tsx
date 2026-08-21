import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Footer bileşenini import ediyoruz (dosya yoluna göre düzenleyebilirsin)
import Footer from "@/components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Çerkesçe Sözlük",
  description: "Çerkesçe / Adıgece Online Sözlük ve Dil Kaynağı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0 }}>
        {/* Sayfa İçerikleri */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer Tüm Sayfalarda En Altta Görünecek */}
        <Footer />
      </body>
    </html>
  );
}