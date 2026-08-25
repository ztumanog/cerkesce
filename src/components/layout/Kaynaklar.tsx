"use client";

import { useMemo, useState } from "react";
import type { TemaTipi } from "@/utils/helpers";

interface ManifestSozlugu {
  id: number;
  title: string;
  author: string;
  year: string;
  publisher: string;
  count: number;
  dialect: "BATI" | "DOGU";
  langPair: string;
}

export interface KaynaklarProps {
  onClose?: () => void;
  tema?: Partial<TemaTipi>;
}

const manifestData: ManifestSozlugu[] = [
  {
    id: 1,
    title: "Türkçe - Adığece (Çerkesçe) Sözlük",
    author: "Kolektif",
    year: "1992",
    publisher: "Kafkas Derneği / Ankara",
    count: 12500,
    dialect: "BATI",
    langPair: "TR-ADI",
  },
  {
    id: 2,
    title: "Adıgece - Türkçe Sözlük",
    author: "Fahri Huvaj",
    year: "2011",
    publisher: "Chiviyazıları / İstanbul",
    count: 18000,
    dialect: "BATI",
    langPair: "ADI-TR",
  },
  {
    id: 3,
    title: "Kabardey - Rusça Sözlük (Кабардинско-русский словарь)",
    author: "B. M. Kardanov",
    year: "1957",
    publisher: "GIINSL / Moskova",
    count: 20000,
    dialect: "DOGU",
    langPair: "KAB-RU",
  },
  {
    id: 4,
    title: "Adıge Tilim Yizınəpıse Psəлъałə",
    author: "Kerashev Tembot",
    year: "1960",
    publisher: "Adygeyskoye Knizhnoye / Maykop",
    count: 15500,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 5,
    title: "Çerkesçe - Türkçe Gramer ve Sözlük Külliyatı",
    author: "İsmail Hakkı Berkok",
    year: "1985",
    publisher: "Kafkas Vakfı / İstanbul",
    count: 8500,
    dialect: "BATI",
    langPair: "ADI-TR",
  },
  {
    id: 6,
    title: "Türkçe - Çerkesçe Sözlük",
    author: "Murat Papşu",
    year: "2004",
    publisher: "Kafkas Derneği / Ankara",
    count: 14200,
    dialect: "BATI",
    langPair: "TR-ADI",
  },
  {
    id: 7,
    title: "Kabardeyce - Türkçe Sözlük",
    author: "Kadir Natkho",
    year: "1995",
    publisher: "Kafkas Kitaplığı / İstanbul",
    count: 11000,
    dialect: "DOGU",
    langPair: "KAB-TR",
  },
  {
    id: 8,
    title: "Adıgece Gramer Sözlüğü (Адыгэбзэ Грамматикэ)",
    author: "Z. U. Blyagoz",
    year: "1988",
    publisher: "Adygeyskoye / Maykop",
    count: 9800,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 9,
    title: "Rusça - Kabardeyce Sözlük",
    author: "T. Kh. Borukayev",
    year: "1932",
    publisher: "Kraizdat / Rostov",
    count: 16500,
    dialect: "DOGU",
    langPair: "RU-KAB",
  },
  {
    id: 10,
    title: "Şapsığ Diyalekti Sözlüğü (Шапсугский диалект)",
    author: "A. A. Katanov",
    year: "1963",
    publisher: "AN SSSR / Moskova",
    count: 6400,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 11,
    title: "Besleney Diyalekti Terimler Sözlüğü",
    author: "R. M. Kumakhov",
    year: "1971",
    publisher: "Elbrus / Nalçik",
    count: 7200,
    dialect: "DOGU",
    langPair: "KAB-RU",
  },
  {
    id: 12,
    title: "Abzah Çerkesçesi Sözlük Çalışması",
    author: "Ömer Beygua",
    year: "1978",
    publisher: "Kafkasya Kültür / Ankara",
    count: 5400,
    dialect: "BATI",
    langPair: "ADI-TR",
  },
  {
    id: 13,
    title: "Etimolojik Adıge Sözlüğü (I. Cilt)",
    author: "A. K. Shagirov",
    year: "1977",
    publisher: "Nauka / Moskova",
    count: 4500,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 14,
    title: "Etimolojik Adıge Sözlüğü (II. Cilt)",
    author: "A. K. Shagirov",
    year: "1977",
    publisher: "Nauka / Moskova",
    count: 4800,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 15,
    title: "Çerkesçe Atasözleri ve Deyimler Sözlüğü",
    author: "M. A. Kumakhov",
    year: "1982",
    publisher: "Elbrus / Nalçik",
    count: 3200,
    dialect: "DOGU",
    langPair: "KAB-TR",
  },
  {
    id: 16,
    title: "Adıgece Okul Sözlüğü (КIэлэегъэджэ Псалъалъэ)",
    author: "U. S. Zekokh",
    year: "2002",
    publisher: "Krasnodar / Maykop",
    count: 8900,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 17,
    title: "Kabardeyce - İngilizce Cep Sözlüğü",
    author: "John Colarusso",
    year: "1989",
    publisher: "Caravan Books / New York",
    count: 5100,
    dialect: "DOGU",
    langPair: "KAB-EN",
  },
  {
    id: 18,
    title: "Kabardeyce - Rusça Sözlük (Къэбэрдей-Руссэ Псалъалъэ)",
    author: "М. Л. Апажев & Дж. Н. Коков",
    year: "2008",
    publisher: "El-Fa / Nalçik",
    count: 24000,
    dialect: "DOGU",
    langPair: "KAB-RU",
  },
  {
    id: 19,
    title: "Batı Çerkesçesi - Almanca Sözlük",
    author: "Gerhard Deeters",
    year: "1963",
    publisher: "München / Almanya",
    count: 6700,
    dialect: "BATI",
    langPair: "ADI-DE",
  },
  {
    id: 20,
    title: "Çerkesçe Bitki ve Doğa İsimleri Sözlüğü",
    author: "A. T. Kerashev",
    year: "1991",
    publisher: "Adygeyskoye / Maykop",
    count: 2800,
    dialect: "BATI",
    langPair: "ADI-TR",
  },
  {
    id: 21,
    title: "Kabardeyce Tıp ve Anatomi Terimleri",
    author: "K. M. Shaov",
    year: "2005",
    publisher: "El-Fa / Nalçik",
    count: 3900,
    dialect: "DOGU",
    langPair: "KAB-RU",
  },
  {
    id: 22,
    title: "Adıgece Eş Anlamlılar Sözlüğü (Синонимхэм япсалъалъэ)",
    author: "Z. I. Keraşeva",
    year: "1984",
    publisher: "Maykop Press / Maykop",
    count: 7100,
    dialect: "BATI",
    langPair: "ADI-ADI",
  },
  {
    id: 23,
    title: "Kabardeyce Zıt Anlamlılar Sözlüğü",
    author: "H. I. Taov",
    year: "1990",
    publisher: "Elbrus / Nalçik",
    count: 4600,
    dialect: "DOGU",
    langPair: "KAB-KAB",
  },
  {
    id: 24,
    title: "Rusça - Adıgece Sözlük (Русско-адыгейский словарь)",
    author: "Х. Д. Водождокова",
    year: "1960",
    publisher: "Gosizdat / Moskova",
    count: 35000,
    dialect: "BATI",
    langPair: "RU-ADI",
  },
  {
    id: 25,
    title: "Çerkes Mitolojisi ve İnanç Terimleri Fişi",
    author: "M. I. Miziyev",
    year: "1994",
    publisher: "Kafkas Dergisi / Nalçik",
    count: 2100,
    dialect: "DOGU",
    langPair: "KAB-TR",
  },
  {
    id: 26,
    title: "Adıgece Toponimik Sözlük (Coğrafi Yer İsimleri)",
    author: "K. Kh. Meretukov",
    year: "1981",
    publisher: "Adygeyskoye / Maykop",
    count: 5300,
    dialect: "BATI",
    langPair: "ADI-RU",
  },
  {
    id: 27,
    title: "Kabardeyce Coğrafi İsimler Katalogü",
    author: "G. Kh. Mambetov",
    year: "1987",
    publisher: "Elbrus / Nalçik",
    count: 4900,
    dialect: "DOGU",
    langPair: "KAB-RU",
  },
  {
    id: 28,
    title: "Çerkesçe - Fransızca Karşılaştırmalı Fişler",
    author: "Georges Dumézil",
    year: "1965",
    publisher: "Klincksieck / Paris",
    count: 3800,
    dialect: "BATI",
    langPair: "ADI-FR",
  },
  {
    id: 29,
    title: "Adıgece - Arapça Sözlük",
    author: "Nart Kültür Evi",
    year: "1975",
    publisher: "Amman / Ürdün",
    count: 9400,
    dialect: "BATI",
    langPair: "ADI-AR",
  },
  {
    id: 30,
    title: "Açıklamalı Adıgece Sözlük (Адыгабзэм изэхефыкI псалъалъ)",
    author: "Ю. А. Тхаркахо",
    year: "1991",
    publisher: "Maykop Press / Maykop",
    count: 22000,
    dialect: "BATI",
    langPair: "ADI-ADI",
  },
  {
    id: 31,
    title: "Kabardeyce - Arapça Sözlük",
    author: "Muhammed Shaban",
    year: "1983",
    publisher: "Şam / Suriye",
    count: 10200,
    dialect: "DOGU",
    langPair: "KAB-AR",
  },
  {
    id: 32,
    title: "Çerkesçe Hukuk ve Adet Terimleri (Adıge Xabze)",
    author: "S. M. Namitokov",
    year: "1928",
    publisher: "Prag / Çekya",
    count: 3100,
    dialect: "BATI",
    langPair: "ADI-TR",
  },
  {
    id: 33,
    title: "Modern Adıgece Sözdağarcığı",
    author: "H. S. Birmamytov",
    year: "2015",
    publisher: "Maykop Üniv. / Maykop",
    count: 16800,
    dialect: "BATI",
    langPair: "ADI-TR",
  },
  {
    id: 34,
    title: "Büyük Dijital Kabardeyce Korpusu",
    author: "Kafkas Araştırmaları Merkezi",
    year: "2020",
    publisher: "Dijital Yayın / Nalçik",
    count: 42000,
    dialect: "DOGU",
    langPair: "KAB-TR",
  },
];

export default function Kaynaklar({ onClose, tema }: KaynaklarProps) {
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliDiyalekt, setSeciliDiyalekt] = useState<
    "HEPSİ" | "BATI" | "DOĞU"
  >("HEPSİ");

  const aktifTema: TemaTipi = useMemo(
    () => ({
      arkaPlan: tema?.arkaPlan || "#FDFBF7",
      kartArkaPlan: tema?.kartArkaPlan || "#FFFFFF",
      yaziAna: tema?.yaziAna || "#2C221E",
      yaziAlt: tema?.yaziAlt || "#8C7A6B",
      kenarlik: tema?.kenarlik || "#EADDC9",
      inputArkaPlan: tema?.inputArkaPlan || "#FAFAFA",
    }),
    [tema]
  );

  const vurguRengi = "#7A1C1C";
  const doguRengi = "#A37015";

  const istatistikler = useMemo(() => {
    let toplamKayit = 0;
    let batiCount = 0;
    let doguCount = 0;
    const hedefDiller = new Set<string>();

    manifestData.forEach((sozluk: ManifestSozlugu) => {
      toplamKayit += sozluk.count;

      if (sozluk.dialect === "BATI") {
        batiCount++;
      }

      if (sozluk.dialect === "DOGU") {
        doguCount++;
      }

      hedefDiller.add(sozluk.langPair);
    });

    return {
      toplamSozluk: manifestData.length,
      toplamKayit,
      batiCount,
      doguCount,
      hedefDilSayisi: hedefDiller.size,
    };
  }, []);

  const filtrelenmisManifest = useMemo(() => {
    const arama = aramaMetni.toLocaleLowerCase("tr-TR").trim();

    return manifestData.filter((sozluk: ManifestSozlugu) => {
      const aranabilirMetin = [
        sozluk.title,
        sozluk.author,
        sozluk.publisher,
        sozluk.langPair,
        sozluk.year,
        sozluk.id.toString(),
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      const aramaUyum = arama.length === 0 || aranabilirMetin.includes(arama);

      const diyalektUyum =
        seciliDiyalekt === "HEPSİ" ||
        (seciliDiyalekt === "BATI" && sozluk.dialect === "BATI") ||
        (seciliDiyalekt === "DOĞU" && sozluk.dialect === "DOGU");

      return aramaUyum && diyalektUyum;
    });
  }, [aramaMetni, seciliDiyalekt]);

  return (
    <main
      style={{
        backgroundColor: aktifTema.kartArkaPlan,
        color: aktifTema.yaziAna,
      }}
      className="min-h-screen px-4 py-8 font-sans transition-colors duration-200 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{ color: vurguRengi }}
            className="mb-6 cursor-pointer border-0 bg-transparent p-0 text-xs font-bold uppercase tracking-[1px] transition-opacity hover:opacity-70 focus:outline-none"
          >
            ← Sözlüğe dön
          </button>
        )}

        {/* Proje Tanıtım Kartı */}
        <section
          style={{
            backgroundColor: aktifTema.kartArkaPlan,
            borderColor: aktifTema.kenarlik,
            borderLeftColor: vurguRengi,
          }}
          className="mb-6 rounded-[2px] border border-l-4 px-6 py-6 sm:px-8"
        >
          <div
            style={{ color: vurguRengi }}
            className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] sm:text-[11px]"
          >
            Açık Mektep Açık Erişim Dil Kaynakları Projesi
          </div>

          <h1
            style={{ color: aktifTema.yaziAna }}
            className="mb-3 font-serif text-2xl font-semibold italic leading-tight sm:text-3xl"
          >
            Çerkesçe Sözlük Projesi
          </h1>

          <p
            style={{ color: aktifTema.yaziAlt }}
            className="mb-3 text-sm leading-7 sm:text-[15px]"
          >
            Çerkesçe Sözlük, Batı Adıgece (Adıge) ve Doğu Adıgece (Kabardeyce)
            lehçelerine ait sözlükleri tek bir dijital platform altında bir
            araya getirmeyi amaçlayan açık erişimli bir dil kaynakları
            projesidir.
          </p>

          <p
            style={{ color: aktifTema.yaziAlt }}
            className="m-0 text-sm leading-7 sm:text-[15px]"
          >
            Proje kapsamında farklı dönemlerde yayımlanmış basılı sözlükler,
            akademik çalışmalar, açık erişimli dijital koleksiyonlar ve topluluk
            katkıları incelenmiş; elde edilen veriler ortak bir veri modeli
            altında bütünleştirilmiştir.
          </p>
        </section>

        {/* Dijital Arşiv Bağlantısı */}
        <section
          style={{
            backgroundColor: aktifTema.kartArkaPlan,
            borderColor: aktifTema.kenarlik,
          }}
          className="mb-6 rounded-[3px] border p-6 shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
        >
          <div
            style={{ color: vurguRengi }}
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[1px]"
          >
            <span aria-hidden="true">📡</span>
            Dijital Kaynak Koleksiyonu
          </div>

          <h2
            style={{ color: aktifTema.yaziAna }}
            className="mb-2 text-lg font-bold sm:text-xl"
          >
            Learn Circassian Raw Dictionary Collection
          </h2>

          <p
            style={{ color: aktifTema.yaziAlt }}
            className="mb-4 text-sm leading-relaxed"
          >
            Bu uygulamada kullanılan çok sayıda Adıgece ve Kabardeyce sözlük
            verisi, açık erişimli{" "}
            <strong>Learn Circassian Raw Dictionary Collection</strong> dijital
            arşivinden derlenmiştir.
          </p>

          <a
            href="https://github.com/bihoqo/learn-circassian-raw-dictionary-collection"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: vurguRengi }}
            className="inline-flex items-center gap-1.5 rounded-[3px] px-4 py-2 text-xs font-bold text-white transition-all hover:brightness-110 focus:outline-none"
          >
            🔗 GitHub Koleksiyonunu Görüntüle
          </a>
        </section>

        {/* İstatistikler */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            style={{
              backgroundColor: aktifTema.kartArkaPlan,
              borderColor: aktifTema.kenarlik,
            }}
            className="rounded-[3px] border p-4 text-center"
          >
            <div
              style={{ color: vurguRengi }}
              className="text-xl font-bold sm:text-2xl"
            >
              {istatistikler.toplamSozluk}
            </div>
            <div
              style={{ color: aktifTema.yaziAlt }}
              className="mt-1 text-xs font-medium uppercase tracking-wider"
            >
              Kaynak Sözlük
            </div>
          </div>

          <div
            style={{
              backgroundColor: aktifTema.kartArkaPlan,
              borderColor: aktifTema.kenarlik,
            }}
            className="rounded-[3px] border p-4 text-center"
          >
            <div
              style={{ color: vurguRengi }}
              className="text-xl font-bold sm:text-2xl"
            >
              {istatistikler.toplamKayit.toLocaleString("tr-TR")}
            </div>
            <div
              style={{ color: aktifTema.yaziAlt }}
              className="mt-1 text-xs font-medium uppercase tracking-wider"
            >
              Toplam Madde
            </div>
          </div>

          <div
            style={{
              backgroundColor: aktifTema.kartArkaPlan,
              borderColor: aktifTema.kenarlik,
            }}
            className="rounded-[3px] border p-4 text-center"
          >
            <div
              style={{ color: vurguRengi }}
              className="text-xl font-bold sm:text-2xl"
            >
              {istatistikler.batiCount}
            </div>
            <div
              style={{ color: aktifTema.yaziAlt }}
              className="mt-1 text-xs font-medium uppercase tracking-wider"
            >
              Batı Adıgece
            </div>
          </div>

          <div
            style={{
              backgroundColor: aktifTema.kartArkaPlan,
              borderColor: aktifTema.kenarlik,
            }}
            className="rounded-[3px] border p-4 text-center"
          >
            <div
              style={{ color: doguRengi }}
              className="text-xl font-bold sm:text-2xl"
            >
              {istatistikler.doguCount}
            </div>
            <div
              style={{ color: aktifTema.yaziAlt }}
              className="mt-1 text-xs font-medium uppercase tracking-wider"
            >
              Doğu (Kabardey)
            </div>
          </div>
        </div>

        {/* Filtre ve Arama Alanı */}
        <section
          style={{
            backgroundColor: aktifTema.kartArkaPlan,
            borderColor: aktifTema.kenarlik,
          }}
          className="mb-6 rounded-[3px] border p-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              placeholder="Koleksiyonda sözlük veya yazar ara..."
              style={{
                backgroundColor: aktifTema.inputArkaPlan,
                borderColor: aktifTema.kenarlik,
                color: aktifTema.yaziAna,
              }}
              className="w-full rounded-[3px] border px-3 py-2 text-sm outline-none transition-colors focus:border-[#7A1C1C]"
            />

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {(["HEPSİ", "BATI", "DOĞU"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSeciliDiyalekt(d)}
                  style={{
                    backgroundColor:
                      seciliDiyalekt === d
                        ? d === "DOĞU"
                          ? doguRengi
                          : vurguRengi
                        : "transparent",
                    color:
                      seciliDiyalekt === d ? "#FFFFFF" : aktifTema.yaziAlt,
                    borderColor:
                      seciliDiyalekt === d
                        ? d === "DOĞU"
                          ? doguRengi
                          : vurguRengi
                        : aktifTema.kenarlik,
                  }}
                  className="rounded-[3px] border px-3 py-1.5 text-xs font-bold uppercase transition-all hover:opacity-90"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sözlük Kataloğu Listesi */}
        <section className="flex flex-col gap-3">
          {filtrelenmisManifest.length === 0 ? (
            <div
              style={{
                borderColor: aktifTema.kenarlik,
                backgroundColor: aktifTema.kartArkaPlan,
              }}
              className="rounded-[3px] border border-dashed p-8 text-center"
            >
              <p
                style={{ color: aktifTema.yaziAna }}
                className="text-sm font-bold"
              >
                Aramanızla eşleşen kaynak bulunamadı.
              </p>
            </div>
          ) : (
            filtrelenmisManifest.map((sozluk) => (
              <article
                key={sozluk.id}
                style={{
                  backgroundColor: aktifTema.kartArkaPlan,
                  borderColor: aktifTema.kenarlik,
                }}
                className="flex flex-col justify-between gap-3 rounded-[3px] border p-4 sm:flex-row sm:items-center"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        backgroundColor:
                          sozluk.dialect === "BATI" ? "#7A1C1C" : doguRengi,
                      }}
                      className="rounded-[2px] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase"
                    >
                      {sozluk.dialect === "BATI" ? "BATI ADIGE" : "KABARDEY"}
                    </span>
                    <span
                      style={{
                        borderColor: aktifTema.kenarlik,
                        color: aktifTema.yaziAlt,
                      }}
                      className="rounded-[2px] border px-1.5 py-0.5 text-[9px] font-mono font-bold"
                    >
                      {sozluk.langPair}
                    </span>
                  </div>

                  <h3
                    style={{ color: aktifTema.yaziAna }}
                    className="text-base font-bold"
                  >
                    {sozluk.title}
                  </h3>

                  <p
                    style={{ color: aktifTema.yaziAlt }}
                    className="text-xs leading-relaxed"
                  >
                    <strong>Yazar:</strong> {sozluk.author} •{" "}
                    <strong>Yayın:</strong> {sozluk.publisher} ({sozluk.year})
                  </p>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center">
                  <span
                    style={{ color: vurguRengi }}
                    className="text-sm font-bold"
                  >
                    {sozluk.count.toLocaleString("tr-TR")} madde
                  </span>
                  <span
                    style={{ color: aktifTema.yaziAlt }}
                    className="text-[10px] uppercase tracking-wider"
                  >
                    Kayıtlı
                  </span>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}