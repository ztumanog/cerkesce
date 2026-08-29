"use client";

import { useMemo, useState } from "react";
import type { TemaTipi } from "@/utils/helpers";
import rawManifest from "@/utils/dictionaries.json";

interface ManifestKaydi {
  file?: string;
  filename?: string;
  title?: string | null;
  name?: string | null;
  label?: string | null;
  author?: string | null;
  editor?: string | null;
  publisher?: string | null;
  year?: number | string | null;
  dialect?: string | null;
  total_words?: number | null;
  totalWords?: number | null;
  wordCount?: number | null;
  count?: number | null;
  sourceLanguage?: string | null;
  targetLanguage?: string | null;
  targetLanguages?: string[] | null;
  langPair?: string | null;
  sourceFamily?: string | null;
  sourceType?: string | null;
  dictionaryType?: string | null;
}

interface ManifestKonteyneri {
  dictionaries?: ManifestKaydi[];
  sources?: ManifestKaydi[];
  data?: ManifestKaydi[];
}

export interface KaynaklarProps {
  onClose?: () => void;
  tema?: Partial<TemaTipi>;
}

const hamManifest = rawManifest as ManifestKaydi[] | ManifestKonteyneri;

const manifestData: ManifestKaydi[] = Array.isArray(hamManifest)
  ? hamManifest
  : hamManifest.dictionaries ||
    hamManifest.sources ||
    hamManifest.data ||
    [];

function metin(
  ...degerler: Array<string | number | null | undefined>
): string {
  const deger = degerler.find(
    (item) => item !== null && item !== undefined && String(item).trim() !== ""
  );

  return deger === undefined ? "" : String(deger);
}

function dosyaAdi(kayit: ManifestKaydi): string {
  return metin(kayit.file, kayit.filename, "Bilinmeyen dosya");
}

function baslik(kayit: ManifestKaydi): string {
  return metin(kayit.title, kayit.name, kayit.label, dosyaAdi(kayit));
}

function maddeSayisi(kayit: ManifestKaydi): number {
  return Number(
    kayit.total_words ??
      kayit.totalWords ??
      kayit.wordCount ??
      kayit.count ??
      0
  );
}

function kayitDiyalekt(kayit: ManifestKaydi): "western" | "DOGU" | null {
  const deger = metin(kayit.dialect).toLocaleUpperCase("tr-TR");

  if (deger === "western" || deger === "western ADIGE") {
    return "western";
  }

  if (
    deger === "DOGU" ||
    deger === "DOĞU" ||
    deger === "KABARDEY" ||
    deger === "DOĞU ADIGE"
  ) {
    return "DOGU";
  }

  return null;
}

function dilCifti(kayit: ManifestKaydi): string {
  if (kayit.langPair) {
    return kayit.langPair;
  }

  const kaynak = kayit.sourceLanguage || "";
  const hedef =
    kayit.targetLanguages?.join(" & ") ||
    kayit.targetLanguage ||
    "";

  if (!kaynak && !hedef) {
    return "";
  }

  return `${kaynak || "—"} → ${hedef || "—"}`;
}

function sozlukTuru(kayit: ManifestKaydi): string {
  const tur = metin(kayit.dictionaryType);

  const adlar: Record<string, string> = {
    GENERAL: "Genel Sözlük",
    EXPLANATORY: "Açıklamalı Sözlük",
    BILINGUAL: "İki Dilli Sözlük",
    GRAMMAR: "Gramer Sözlüğü",
    TERMINOLOGY: "Terim Sözlüğü",
    INSTITUTION: "Kurumsal Kaynak",
  };

  return adlar[tur.toLocaleUpperCase("tr-TR")] || tur;
}

export default function Kaynaklar({
  onClose,
  tema,
}: KaynaklarProps) {
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliDiyalekt, setSeciliDiyalekt] = useState<
    "HEPSİ" | "western" | "DOĞU"
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
    let toplamMadde = 0;
    let western = 0;
    let dogu = 0;

    manifestData.forEach((kayit) => {
      toplamMadde += maddeSayisi(kayit);

      if (kayitDiyalekt(kayit) === "western") {
        western += 1;
      }

      if (kayitDiyalekt(kayit) === "DOGU") {
        dogu += 1;
      }
    });

    return {
      toplamMadde,
      western,
      dogu,
    };
  }, []);

  const filtrelenmisKayitlar = useMemo(() => {
    const arama = aramaMetni
      .toLocaleLowerCase("tr-TR")
      .trim();

    return manifestData.filter((kayit) => {
      const aranabilirMetin = [
        dosyaAdi(kayit),
        baslik(kayit),
        kayit.author,
        kayit.editor,
        kayit.publisher,
        kayit.year,
        kayit.dialect,
        kayit.sourceFamily,
        kayit.sourceType,
        kayit.dictionaryType,
        kayit.sourceLanguage,
        kayit.targetLanguage,
        kayit.langPair,
        ...(kayit.targetLanguages || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      const aramaUygun =
        arama.length === 0 || aranabilirMetin.includes(arama);

      const diyalekt = kayitDiyalekt(kayit);

      const diyalektUygun =
        seciliDiyalekt === "HEPSİ" ||
        (seciliDiyalekt === "western" && diyalekt === "western") ||
        (seciliDiyalekt === "DOĞU" && diyalekt === "DOGU");

      return aramaUygun && diyalektUygun;
    });
  }, [aramaMetni, seciliDiyalekt]);

  return (
    <main
      style={{
        backgroundColor: aktifTema.arkaPlan,
        color: aktifTema.yaziAna,
      }}
      className="min-h-screen px-4 py-8 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{ color: vurguRengi }}
            className="mb-6 bg-transparent p-0 text-xs font-bold uppercase"
          >
            ← Sözlüğe dön
          </button>
        )}

        <section
          style={{
            backgroundColor: aktifTema.kartArkaPlan,
            borderColor: aktifTema.kenarlik,
            borderLeftColor: vurguRengi,
          }}
          className="mb-6 rounded border border-l-4 p-6"
        >
          <div
            style={{ color: vurguRengi }}
            className="mb-2 text-xs font-bold uppercase"
          >
            Açık Mektep Açık Erişim Dil Kaynakları Projesi
          </div>

          <h1
            style={{ color: aktifTema.yaziAna }}
            className="mb-3 text-2xl font-bold"
          >
            Çerkesçe Sözlük Projesi
          </h1>

          <p
            style={{ color: aktifTema.yaziAlt }}
            className="m-0 text-sm leading-7"
          >
            Batı Adığece ve Doğu Adığece lehçelerine ait sözlükler tek bir
            dijital platform altında sunulmaktadır.
          </p>
        </section>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Kaynak Sözlük", manifestData.length, vurguRengi],
            [
              "Toplam Madde",
              istatistikler.toplamMadde.toLocaleString("tr-TR"),
              vurguRengi,
            ],
            ["Batı Adığece", istatistikler.western, vurguRengi],
            ["Doğu Kabardeyce", istatistikler.dogu, doguRengi],
          ].map(([etiket, deger, renk]) => (
            <div
              key={String(etiket)}
              style={{
                backgroundColor: aktifTema.kartArkaPlan,
                borderColor: aktifTema.kenarlik,
              }}
              className="rounded border p-4 text-center"
            >
              <div
                style={{ color: String(renk) }}
                className="text-xl font-bold"
              >
                {deger}
              </div>

              <div
                style={{ color: aktifTema.yaziAlt }}
                className="mt-1 text-xs font-medium uppercase"
              >
                {etiket}
              </div>
            </div>
          ))}
        </div>

        <section
          style={{
            backgroundColor: aktifTema.kartArkaPlan,
            borderColor: aktifTema.kenarlik,
          }}
          className="mb-6 rounded border p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={aramaMetni}
              onChange={(event) => setAramaMetni(event.target.value)}
              placeholder="Koleksiyonda sözlük veya yazar ara..."
              style={{
                backgroundColor: aktifTema.inputArkaPlan,
                borderColor: aktifTema.kenarlik,
                color: aktifTema.yaziAna,
              }}
              className="w-full rounded border px-3 py-2 text-sm outline-none"
            />

            <div className="flex gap-2">
              {(["HEPSİ", "western", "DOĞU"] as const).map((filtre) => {
                const aktif = seciliDiyalekt === filtre;
                const renk =
                  filtre === "DOĞU" ? doguRengi : vurguRengi;

                return (
                  <button
                    key={filtre}
                    type="button"
                    onClick={() => setSeciliDiyalekt(filtre)}
                    style={{
                      backgroundColor: aktif ? renk : "transparent",
                      borderColor: aktif
                        ? renk
                        : aktifTema.kenarlik,
                      color: aktif ? "#FFFFFF" : aktifTema.yaziAlt,
                    }}
                    className="rounded border px-3 py-1.5 text-xs font-bold"
                  >
                    {filtre}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          {filtrelenmisKayitlar.length === 0 ? (
            <div
              style={{
                backgroundColor: aktifTema.kartArkaPlan,
                borderColor: aktifTema.kenarlik,
              }}
              className="rounded border border-dashed p-8 text-center"
            >
              <p className="text-sm font-bold">
                Aramanızla eşleşen kaynak bulunamadı.
              </p>
            </div>
          ) : (
            filtrelenmisKayitlar.map((kayit, index) => {
              const diyalekt = kayitDiyalekt(kayit);
              const cift = dilCifti(kayit);
              const tur = sozlukTuru(kayit);

              return (
                <article
                  key={`${dosyaAdi(kayit)}-${index}`}
                  style={{
                    backgroundColor: aktifTema.kartArkaPlan,
                    borderColor: aktifTema.kenarlik,
                  }}
                  className="flex flex-col justify-between gap-4 rounded border p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {diyalekt && (
                        <span
                          style={{
                            backgroundColor:
                              diyalekt === "western"
                                ? vurguRengi
                                : doguRengi,
                          }}
                          className="rounded px-2 py-1 text-[10px] font-bold text-white"
                        >
                          {diyalekt === "western"
                            ? "western ADIĞECE"
                            : "DOĞU KABARDEYCE"}
                        </span>
                      )}

                      {cift && (
                        <span
                          style={{
                            borderColor: aktifTema.kenarlik,
                            color: aktifTema.yaziAlt,
                          }}
                          className="rounded border px-2 py-1 text-[10px]"
                        >
                          {cift}
                        </span>
                      )}

                      {tur && (
                        <span
                          style={{
                            borderColor: aktifTema.kenarlik,
                            color: aktifTema.yaziAlt,
                          }}
                          className="rounded border px-2 py-1 text-[10px]"
                        >
                          {tur}
                        </span>
                      )}
                    </div>

                    <h2
                      style={{ color: aktifTema.yaziAna }}
                      className="break-words text-base font-bold"
                    >
                      {baslik(kayit)}
                    </h2>

                    <p
                      style={{ color: aktifTema.yaziAlt }}
                      className="mt-1 text-xs leading-relaxed"
                    >
                      <strong>Yazar:</strong>{" "}
                      {metin(kayit.author, kayit.editor) ||
                        "Belirtilmemiş"}
                      {" • "}
                      <strong>Yayıncı:</strong>{" "}
                      {metin(kayit.publisher) || "Belirtilmemiş"}
                      {" • "}
                      <strong>Yıl:</strong>{" "}
                      {metin(kayit.year) || "Belirtilmemiş"}
                    </p>

                    {kayit.sourceFamily && (
                      <p
                        style={{ color: aktifTema.yaziAlt }}
                        className="mt-1 text-[11px]"
                      >
                        <strong>Kaynak:</strong>{" "}
                        {kayit.sourceFamily}
                      </p>
                    )}

                    <p
                      style={{ color: aktifTema.yaziAlt }}
                      className="mt-1 break-all text-[10px] opacity-70"
                    >
                      {dosyaAdi(kayit)}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <div
                      style={{ color: vurguRengi }}
                      className="text-sm font-bold"
                    >
                      {maddeSayisi(kayit).toLocaleString("tr-TR")} madde
                    </div>

                    <div
                      style={{ color: aktifTema.yaziAlt }}
                      className="text-[10px] uppercase"
                    >
                      Kayıtlı
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}
