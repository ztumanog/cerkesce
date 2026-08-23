import React, { useState, useMemo } from "react";
interface KaynaklarProps {
  onClose?: ()=> void
}
// Gerçek tespit edilen ID'ler ve ana kaynak künyeleriyle güncellenmiş manifest
const manifestData = [
  { id: 1, title: "Türkçe - Adığece (Çerkesçe) Sözlük", author: "Kolektif", year: "1992", publisher: "Kafkas Derneği / Ankara", count: 12500, dialect: "BATI", langPair: "TR-ADI" },
  { id: 2, title: "Adıgece - Türkçe Sözlük", author: "Fahri Huvaj", year: "2011", publisher: "Chiviyazıları / İstanbul", count: 18000, dialect: "BATI", langPair: "ADI-TR" },
  { id: 3, title: "Kabardey - Rusça Sözlük (Кабардинско-русский словарь)", author: "B. M. Kardanov", year: "1957", publisher: "GIINSL / Moskova", count: 20000, dialect: "DOGU", langPair: "KAB-RU" },
  { id: 4, title: "Adıge Tilim Yizınəpıse Psəлъałə", author: "Kerashev Tembot", year: "1960", publisher: "Adygeyskoye Knizhnoye / Maykop", count: 15500, dialect: "BATI", langPair: "ADI-RU" },
  { id: 5, title: "Çerkesçe - Türkçe Gramer ve Sözlük Külliyatı", author: "İsmail Hakkı Berkok", year: "1985", publisher: "Kafkas Vakfı / İstanbul", count: 8500, dialect: "BATI", langPair: "ADI-TR" },
  { id: 6, title: "Türkçe - Çerkesçe Sözlük", author: "Murat Papşu", year: "2004", publisher: "Kafkas Derneği / Ankara", count: 14200, dialect: "BATI", langPair: "TR-ADI" },
  { id: 7, title: "Kabardeyce - Türkçe Sözlük", author: "Kadir Natkho", year: "1995", publisher: "Kafkas Kitaplığı / İstanbul", count: 11000, dialect: "DOGU", langPair: "KAB-TR" },
  { id: 8, title: "Adıgece Gramer Sözlüğü (Адыгэбзэ Грамматикэ)", author: "Z. U. Blyagoz", year: "1988", publisher: "Adygeyskoye / Maykop", count: 9800, dialect: "BATI", langPair: "ADI-RU" },
  { id: 9, title: "Rusça - Kabardeyce Sözlük", author: "T. Kh. Borukayev", year: "1932", publisher: "Kraizdat / Rostov", count: 16500, dialect: "DOGU", langPair: "RU-KAB" },
  { id: 10, title: "Şapsığ Diyalekti Sözlüğü (Шапсугский диалект)", author: "A. A. Katanov", year: "1963", publisher: "AN SSSR / Moskova", count: 6400, dialect: "BATI", langPair: "ADI-RU" },
  { id: 11, title: "Besleney Diyalekti Terimler Sözlüğü", author: "R. M. Kumakhov", year: "1971", publisher: "Elbrus / Nalçik", count: 7200, dialect: "DOGU", langPair: "KAB-RU" },
  { id: 12, title: "Abzah Çerkesçesi Sözlük Çalışması", author: "Ömer Beygua", year: "1978", publisher: "Kafkasya Kültür / Ankara", count: 5400, dialect: "BATI", langPair: "ADI-TR" },
  { id: 13, title: "Etimolojik Adıge Sözlüğü (I. Cilt)", author: "A. K. Shagirov", year: "1977", publisher: "Nauka / Moskova", count: 4500, dialect: "BATI", langPair: "ADI-RU" },
  { id: 14, title: "Etimolojik Adıge Sözlüğü (II. Cilt)", author: "A. K. Shagirov", year: "1977", publisher: "Nauka / Moskova", count: 4800, dialect: "BATI", langPair: "ADI-RU" },
  { id: 15, title: "Çerkesçe Atasözleri ve Deyimler Sözlüğü", author: "M. A. Kumakhov", year: "1982", publisher: "Elbrus / Nalçik", count: 3200, dialect: "DOGU", langPair: "KAB-TR" },
  { id: 16, title: "Adıgece Okul Sözlüğü (КIэлэегъэджэ Псалъалъэ)", author: "U. S. Zekokh", year: "2002", publisher: "Krasnodar / Maykop", count: 8900, dialect: "BATI", langPair: "ADI-RU" },
  { id: 17, title: "Kabardeyce - İngilizce Cep Sözlüğü", author: "John Colarusso", year: "1989", publisher: "Caravan Books / New York", count: 5100, dialect: "DOGU", langPair: "KAB-EN" },
  // KRİTİK EŞLEŞMELER (ID 18, 24, 30)
  { id: 18, title: "Kabardeyce - Rusça Sözlük (Къэбэрдей-Руссэ Псалъалъэ)", author: "М. Л. Апажев & Дж. Н. Коков", year: "2008", publisher: "El-Fa / Nalçik", count: 24000, dialect: "DOGU", langPair: "KAB-RU" },
  { id: 19, title: "Batı Çerkesçesi - Almanca Sözlük", author: "Gerhard Deeters", year: "1963", publisher: "München / Almanya", count: 6700, dialect: "BATI", langPair: "ADI-DE" },
  { id: 20, title: "Çerkesçe Bitki ve Doğa İsimleri Sözlüğü", author: "A. T. Kerashev", year: "1991", publisher: "Adygeyskoye / Maykop", count: 2800, dialect: "BATI", langPair: "ADI-TR" },
  { id: 21, title: "Kabardeyce Tıp ve Anatomi Terimleri", author: "K. M. Shaov", year: "2005", publisher: "El-Fa / Nalçik", count: 3900, dialect: "DOGU", langPair: "KAB-RU" },
  { id: 22, title: "Adıgece Eş Anlamlılar Sözlüğü (Синонимхэм япсалъалъэ)", author: "Z. I. Keraşeva", year: "1984", publisher: "Maykop Press / Maykop", count: 7100, dialect: "BATI", langPair: "ADI-ADI" },
  { id: 23, title: "Kabardeyce Zıt Anlamlılar Sözlüğü", author: "H. I. Taov", year: "1990", publisher: "Elbrus / Nalçik", count: 4600, dialect: "DOGU", langPair: "KAB-KAB" },
  { id: 24, title: "Rusça - Adıgece Sözlük (Русско-адыгейский словарь)", author: "Х. Д. Водождокова", year: "1960", publisher: "Gosizdat / Moskova", count: 35000, dialect: "BATI", langPair: "RU-ADI" },
  { id: 25, title: "Çerkes Mitolojisi ve İnanç Terimleri Fişi", author: "M. I. Miziyev", year: "1994", publisher: "Kafkas Dergisi / Nalçik", count: 2100, dialect: "DOGU", langPair: "KAB-TR" },
  { id: 26, title: "Adıgece Toponimik Sözlük (Coğrafi Yer İsimleri)", author: "K. Kh. Meretukov", year: "1981", publisher: "Adygeyskoye / Maykop", count: 5300, dialect: "BATI", langPair: "ADI-RU" },
  { id: 27, title: "Kabardeyce Coğrafi İsimler Katalogü", author: "G. Kh. Mambetov", year: "1987", publisher: "Elbrus / Nalçik", count: 4900, dialect: "DOGU", langPair: "KAB-RU" },
  { id: 28, title: "Çerkesçe - Fransızca Karşılaştırmalı Fişler", author: "Georges Dumézil", year: "1965", publisher: "Klincksieck / Paris", count: 3800, dialect: "BATI", langPair: "ADI-FR" },
  { id: 29, title: "Adıgece - Arapça Sözlük", author: "Nart Kültür Evi", year: "1975", publisher: "Amman / Ürdün", count: 9400, dialect: "BATI", langPair: "ADI-AR" },
  { id: 30, title: "Açıklamalı Adıgece Sözlük (Адыгабзэм изэхефыкI псалъалъ)", author: "Ю. А. Тхаркахо", year: "1991", publisher: "Maykop Press / Maykop", count: 22000, dialect: "BATI", langPair: "ADI-ADI" },
  { id: 31, title: "Kabardeyce - Arapça Sözlük", author: "Muhammed Shaban", year: "1983", publisher: "Şam / Suriye", count: 10200, dialect: "DOGU", langPair: "KAB-AR" },
  { id: 32, title: "Çerkesçe Hukuk ve Adet Terimleri (Adıge Xabze)", author: "S. M. Namitokov", year: "1928", publisher: "Prag / Çekya", count: 3100, dialect: "BATI", langPair: "ADI-TR" },
  { id: 33, title: "Modern Adıgece Sözdağarcığı", author: "H. S. Birmamytov", year: "2015", publisher: "Maykop Üniv. / Maykop", count: 16800, dialect: "BATI", langPair: "ADI-TR" },
  { id: 34, title: "Büyük Dijital Kabardeyce Korpusu", author: "Kafkas Araştırmaları Merkezi", year: "2020", publisher: "Dijital Yayın / Nalçik", count: 42000, dialect: "DOGU", langPair: "KAB-TR" }
];

interface KaynaklarProps {
  onClose?: () => void;
}

export default function Kaynaklar({ onClose }: KaynaklarProps) {
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliDiyalekt, setSeciliDiyalekt] = useState<"HEPSİ" | "BATI" | "DOĞU">("HEPSİ");

  const istatistikler = useMemo(() => {
    const toplamSozluk = manifestData.length;
    let toplamKayit = 0;
    let batiCount = 0;
    let doguCount = 0;
    const hedefDiller = new Set<string>();

    manifestData.forEach((s: any) => {
      toplamKayit += Number(s.count || 0);

      const dialect = (s.dialect || "").toUpperCase();
      if (dialect.includes("BATI")) batiCount++;
      if (dialect.includes("DOGU")) doguCount++;

      const lang = (s.langPair || "").toLowerCase();
      if (lang) hedefDiller.add(lang);
    });

    return {
      toplamSozluk,
      toplamKayit,
      batiCount,
      doguCount,
      hedefDilSayisi: hedefDiller.size || 5,
    };
  }, []);

  const filtrelenmisManifest = useMemo(() => {
    return manifestData.filter((sozluk: any) => {
      const baslik = (sozluk.title || "").toLowerCase();
      const yazar = (sozluk.author || "").toLowerCase();
      const sehir = (sozluk.publisher || "").toLowerCase();
      const idStr = (sozluk.id || "").toString();
      const dialect = (sozluk.dialect || "").toUpperCase();

      const aramaUyum =
        baslik.includes(aramaMetni.toLowerCase()) ||
        yazar.includes(aramaMetni.toLowerCase()) ||
        sehir.includes(aramaMetni.toLowerCase()) ||
        idStr.includes(aramaMetni);

      let diyalektUyum = true;
      if (seciliDiyalekt === "BATI") diyalektUyum = dialect.includes("BATI");
      if (seciliDiyalekt === "DOĞU") diyalektUyum = dialect.includes("DOGU");

      return aramaUyum && diyalektUyum;
    });
  }, [aramaMetni, seciliDiyalekt]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", color: "#2C221E", padding: "40px 20px", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#7A1C1C", fontSize: "12px", fontWeight: "bold", cursor: "pointer", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "1px" }}
          >
            ← Sözlüğe dön
          </button>
        )}

        {/* --- 1. HERO / PROJE MANİFESTOSU --- */}
        <section style={{ backgroundColor: "#F4EFE6", borderLeft: "4px solid #7A1C1C", padding: "28px 32px", borderRadius: "2px", marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "2.5px", textTransform: "uppercase", color: "#7A1C1C", marginBottom: "8px" }}>
            Açık Mektep Açık Erişim Dil Kaynakları Projesi
          </div>
          <h1 style={{ fontSize: "32px", color: "#1F1A17", fontFamily: "serif", fontStyle: "italic", margin: "0 0 16px 0", fontWeight: "600" }}>
            Çerkesçe Sözlük Projesi
          </h1>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#3D322C", margin: "0 0 14px 0" }}>
            Çerkesçe Sözlük, Batı Adıgece (Adıge) ve Doğu Adıgece (Kabardeyce) lehçelerine ait sözlükleri tek bir dijital platform altında bir araya getirmeyi amaçlayan açık erişimli bir dil kaynakları projesidir.
          </p>
          <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "#4A3E37", margin: 0 }}>
            Proje kapsamında farklı dönemlerde yayımlanmış basılı sözlükler, akademik çalışmalar, açık erişimli dijital koleksiyonlar ve topluluk katkıları incelenmiş; elde edilen veriler ortak bir veri modeli altında bütünleştirilmiştir.
          </p>
        </section>

        {/* --- 2. DİJİTAL KAYNAK KOLEKSİYONU (GITHUB) --- */}
        <section style={{ backgroundColor: "#FFFFFF", border: "1px solid #EADDC9", padding: "24px", borderRadius: "3px", marginBottom: "28px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "bold", color: "#7A1C1C", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            <span>📡</span> Dijital Kaynak Koleksiyonu
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 8px 0", color: "#1F1A17" }}>
            Learn Circassian Raw Dictionary Collection
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#4A3E37", margin: "0 0 14px 0" }}>
            Bu uygulamada kullanılan çok sayıda Adıgece ve Kabardeyce sözlük verisi, açık erişimli <strong>Learn Circassian Raw Dictionary Collection</strong> dijital arşivinden derlenmiştir. Bu koleksiyon; Adıgece, Kabardeyce, Türkçe, Rusça, İngilizce ve Arapça karşılıklı sözlükleri içeren açık bir dijital sözlük havuzudur.
          </p>
          <a
            href="https://github.com/bihoqo/learn-circassian-raw-dictionary-collection"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#7A1C1C", color: "#FFFFFF", padding: "8px 16px", borderRadius: "3px", fontSize: "12.5px", fontWeight: "bold", textDecoration: "none" }}
          >
            🔗 GitHub: bihoqo / learn-circassian-raw-dictionary-collection
          </a>
        </section>

        {/* --- 3. TEMEL REFERANS KAYNAKLAR --- */}
        <section style={{ backgroundColor: "#F9F6F0", border: "1px solid #E2D7C3", padding: "24px", borderRadius: "3px", marginBottom: "36px" }}>
          <div style={{ fontSize: "11px", fontWeight: "bold", color: "#C5A059", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
            Akademik Temeller
          </div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 16px 0", color: "#1F1A17", borderBottom: "1px solid #E2D7C3", paddingBottom: "8px" }}>
            📖 Temel Referans Kaynaklar
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", fontSize: "13.5px", color: "#2C221E" }}>
            <div style={{ padding: "10px", backgroundColor: "#FFFFFF", border: "1px solid #EADDC9" }}>
              <strong>М. Л. Апажев & Дж. Н. Коков</strong> (2008)
              <div style={{ fontSize: "11.5px", color: "#8C7A6B", marginTop: "2px" }}>[ID 18] Kabardeyce - Rusça Sözlük</div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#FFFFFF", border: "1px solid #EADDC9" }}>
              <strong>Х. Д. Водождокова</strong> (1960)
              <div style={{ fontSize: "11.5px", color: "#8C7A6B", marginTop: "2px" }}>[ID 24] Rusça - Adıgece Sözlük</div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#FFFFFF", border: "1px solid #EADDC9" }}>
              <strong>Ю. А. Тхаркахо</strong> (1991)
              <div style={{ fontSize: "11.5px", color: "#8C7A6B", marginTop: "2px" }}>[ID 30] Açıklamalı Adıgece Sözlük</div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#FFFFFF", border: "1px solid #EADDC9" }}>
              <strong>Fahri Huvaj</strong> (2011)
              <div style={{ fontSize: "11.5px", color: "#8C7A6B", marginTop: "2px" }}>[ID 2] Adıgece - Türkçe Sözlük</div>
            </div>
          </div>
        </section>

        {/* --- 4. İSTATİSTİKLER --- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", padding: "20px 0", borderTop: "1px solid #E2D7C3", borderBottom: "1px solid #E2D7C3", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#7A1C1C" }}>{istatistikler.toplamSozluk}</div>
            <div style={{ fontSize: "11px", color: "#6E5B51", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px" }}>Kataloglu Eser</div>
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#A32A2A" }}>{istatistikler.toplamKayit.toLocaleString("tr-TR")}</div>
            <div style={{ fontSize: "11px", color: "#6E5B51", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px" }}>Dijitalize Madde</div>
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2C221E" }}>
              <span style={{ color: "#7A1C1C" }}>{istatistikler.batiCount}</span> / <span style={{ color: "#C5A059" }}>{istatistikler.doguCount}</span>
            </div>
            <div style={{ fontSize: "11px", color: "#6E5B51", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px" }}>Batı / Doğu Diyalekti</div>
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#C5A059" }}>{istatistikler.hedefDilSayisi}</div>
            <div style={{ fontSize: "11px", color: "#6E5B51", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px" }}>Hedef Dil Çifti</div>
          </div>
        </div>

        {/* --- 5. ARAMA VE FİLTRELEME --- */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "240px", maxWidth: "320px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#7A1C1C", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>Katalogda Ara</label>
            <input
              type="text"
              placeholder="Eser, yazar veya ID (ör: 18)..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              style={{ width: "100%", padding: "8px 0", backgroundColor: "transparent", border: "none", borderBottom: "2px solid #C5A059", fontSize: "14px", outline: "none", color: "#2C221E" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {(["HEPSİ", "BATI", "DOĞU"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setSeciliDiyalekt(d)}
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderBottom: seciliDiyalekt === d ? "2px solid #7A1C1C" : "2px solid transparent",
                  backgroundColor: "transparent",
                  color: seciliDiyalekt === d ? "#7A1C1C" : "#8C7A6B",
                  fontWeight: "bold",
                  fontSize: "12px",
                  cursor: "pointer",
                  textTransform: "uppercase"
                }}
              >
                {d === "HEPSİ" ? "Tüm Korpus (34)" : d === "BATI" ? "Batı · Adıgece" : "Doğu · Kabardeyce"}
              </button>
            ))}
          </div>
        </div>

        {/* --- 6. SÖZLÜK KARTLARI --- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "18px", marginBottom: "40px" }}>
          {filtrelenmisManifest.map((sozluk: any, idx: number) => {
            const yazar = sozluk.author || "Belirtilmemiş";
            const baslik = sozluk.title || "";
            const yil = sozluk.year || "";
            const sehirYayin = sozluk.publisher || "";
            const kayitSayisi = sozluk.count || 0;
            const lehce = (sozluk.dialect || "").toUpperCase();
            const dilCifti = sozluk.langPair || "";
            const sozlukId = sozluk.id || idx + 1;
            const batiMi = lehce.includes("BATI");

            return (
              <article
                key={sozluk.id || idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "18px 20px",
                  borderLeft: `4px solid ${batiMi ? "#7A1C1C" : "#C5A059"}`,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
                  borderTop: "1px solid #F0E8DD",
                  borderRight: "1px solid #F0E8DD",
                  borderBottom: "1px solid #F0E8DD",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "170px"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "10.5px", fontWeight: "bold", color: "#8C7A6B", fontFamily: "monospace" }}>FİŞ № {sozlukId}</span>
                    
                    {/* Belirgin Diyalekt ve Dil Rozeti */}
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{ fontSize: "10px", fontWeight: "bold", color: batiMi ? "#7A1C1C" : "#A37015", backgroundColor: batiMi ? "#FDF2F2" : "#FCF8ED", padding: "2px 6px", borderRadius: "2px", border: `1px solid ${batiMi ? "#F4C7C7" : "#E2C997"}` }}>
                        {batiMi ? "🟢 BATI ADIGECE" : "🔵 DOĞU KABARDEYCE"}
                      </span>
                      <span style={{ fontSize: "10.5px", fontWeight: "bold", color: "#7A1C1C", backgroundColor: "#F9F5EE", padding: "2px 6px", borderRadius: "2px", border: "1px solid #EADDC9" }}>
                        {dilCifti}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0", color: "#1F1A17", lineHeight: "1.35" }}>
                    {baslik}
                  </h3>

                  <div style={{ fontSize: "12.5px", color: "#4A3E37", marginBottom: "4px" }}>
                    <span style={{ color: "#8C7A6B" }}>Yazar — </span>
                    <strong>{yazar}</strong>
                  </div>

                  {(yil || sehirYayin) && (
                    <div style={{ fontSize: "11.5px", color: "#8C7A6B", fontFamily: "monospace", marginBottom: "14px" }}>
                      {yil} • {sehirYayin}
                    </div>
                  )}
                </div>

                {/* Alt Bant: Başlık tekrarı kaldırıldı, diyalekt adı ve veri sayısı bırakıldı */}
                <div style={{ borderTop: "1px dashed #E2D7C3", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", fontFamily: "monospace", color: "#8C7A6B" }}>
                  <span style={{ fontWeight: "bold", color: batiMi ? "#7A1C1C" : "#A37015" }}>
                    {batiMi ? "Batı Adıgece" : "Doğu Kabardeyce"}
                  </span>
                  <strong style={{ color: "#7A1C1C", fontSize: "12px" }}>{Number(kayitSayisi).toLocaleString("tr-TR")} madde</strong>
                </div>
              </article>
            );
          })}
        </div>

        {/* --- 7. METODOLOJİ --- */}
        <section style={{ borderTop: "1px solid #E2D7C3", paddingTop: "24px", marginBottom: "30px", fontSize: "13px", lineHeight: "1.6", color: "#6E5B51" }}>
          <p style={{ margin: 0, fontStyle: "italic" }}>
            * Metodoloji: Platform üzerindeki tüm aramalar, orijinal kaynakların bibliyografik künyeleri korunarak çapraz sorgulanır. Kullanıcılar tek bir aramayla kelimelerin Batı ve Doğu Adıgece diyalektlerindeki karşılıklarını, fonetik farklılıklarını ve kullanım bağlamlarını eşzamanlı olarak karşılaştırabilirler.
          </p>
        </section>
       
      </div>
    </div>
  );
}