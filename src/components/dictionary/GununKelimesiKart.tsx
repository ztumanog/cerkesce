import { KURUMSAL, SOZLUK_META } from "@/lib/dictionaryConstants";
import type { DictionaryItem } from "@/types/dictionary";
import {
  kaynagiDuzenle,
  tanimlariBicimlendir,
  type TemaTipi,
} from "@/utils/helpers";

interface YerelSozlukMeta {
  dilCifti: string;
  yazar: string;
}

interface GununKelimesiKartiProps {
  gununKelimesi: DictionaryItem | null;
  karanlikMod: boolean;
  metinBoyutu: number;
  tema: TemaTipi;
  onClick: () => void;
}

export default function GununKelimesiKarti({
  gununKelimesi,
  metinBoyutu,
  tema,
  onClick,
}: GununKelimesiKartiProps) {
  if (!gununKelimesi) return null;

  const tanimMetni =
    gununKelimesi.definitions?.[0]?.meaning ||
    gununKelimesi.full_definition_in_html ||
    (typeof gununKelimesi.tanim === "string"
      ? gununKelimesi.tanim
      : "") ||
    gununKelimesi.meaning ||
    "";

  /*
   * Tüm renkler ortak tema yapısından alınıyor.
   * Böylece açık/koyu mod renkleri otomatik olarak uyumlu kalır.
   */
  const arkaPlanRengi = tema.kartArkaPlan || tema.arkaPlan;
  const kenarlikRengi = tema.kenarlik;
  const anaYaziRengi = tema.yaziAna;
  const altYaziRengi = tema.yaziAlt;
  const vurguRengi = KURUMSAL.kirmizi || anaYaziRengi;

  const isBatil = gununKelimesi.dialect === "BATI";

  /*
   * Kaynak verisini güvenli şekilde al
   */
  const rawKaynak = gununKelimesi.kaynak_sozluk as unknown;

  let kaynakStr = "";
  let kaynakMeta: YerelSozlukMeta | null = null;

  if (typeof rawKaynak === "string") {
    kaynakStr = rawKaynak;
  } else if (rawKaynak && typeof rawKaynak === "object") {
    kaynakMeta = rawKaynak as YerelSozlukMeta;
  }

  /*
   * Dosya adını string olarak al
   */
  const dosyaAdi =
    typeof gununKelimesi.file === "string"
      ? gununKelimesi.file
      : kaynakStr;

  /*
   * Metadata veya yedek fonksiyondan kaynak ismi üret
   */
  const metaObj = dosyaAdi
    ? (SOZLUK_META[dosyaAdi] as YerelSozlukMeta | undefined)
    : undefined;

  let kaynakIsmi = "";

  if (metaObj) {
    kaynakIsmi = `${metaObj.dilCifti} — ${metaObj.yazar}`;
  } else if (kaynakMeta) {
    kaynakIsmi = `${kaynakMeta.dilCifti} — ${kaynakMeta.yazar}`;
  } else {
    const duzenlenmis = kaynagiDuzenle(dosyaAdi) as unknown;

    if (typeof duzenlenmis === "string") {
      kaynakIsmi = duzenlenmis;
    } else if (duzenlenmis && typeof duzenlenmis === "object") {
      const obj = duzenlenmis as YerelSozlukMeta;
      kaynakIsmi = `${obj.dilCifti} — ${obj.yazar}`;
    } else {
      kaynakIsmi = dosyaAdi;
    }
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        backgroundColor: arkaPlanRengi,
        borderLeft: `4px solid ${vurguRengi}`,
        borderTop: `1px solid ${kenarlikRengi}`,
        borderRight: `1px solid ${kenarlikRengi}`,
        borderBottom: `1px solid ${kenarlikRengi}`,
      }}
      className="box-border w-full cursor-pointer rounded-[3px] px-5 py-[18px] text-left shadow-[0_2px_5px_rgba(0,0,0,0.04)] transition-all duration-150 ease-in-out hover:brightness-[0.98] focus:outline-none focus:ring-1 focus:ring-red-900/20"
      role="button"
      tabIndex={0}
      aria-label="Günün kelimesi detaylarını aç"
    >
      {/* Üst etiket satırı ve lehçe rozeti */}
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span
          style={{
            color: vurguRengi,
            fontSize: `${Math.max(11, metinBoyutu * 0.75)}px`,
          }}
          className="font-bold uppercase tracking-[1.5px]"
        >
          ✨ Günün Kelimesi
        </span>

        {gununKelimesi.dialect && (
          <span
            style={{
              color: vurguRengi,
              backgroundColor: arkaPlanRengi,
              borderColor: kenarlikRengi,
              fontSize: `${Math.max(10, metinBoyutu * 0.7)}px`,
            }}
            className="rounded-[2px] border px-1.5 py-0.5 font-bold uppercase"
          >
            {isBatil ? "🟢 BATI ADIGECE" : "🔵 DOĞU KABARDEYCE"}
          </span>
        )}
      </div>

      {/* Kelime başlığı */}
      <div
        style={{
          color: anaYaziRengi,
          fontSize: `${metinBoyutu * 1.3}px`,
        }}
        className="mb-1.5 font-serif font-bold leading-[1.3]"
      >
        {gununKelimesi.kelime}
      </div>

      {/* Tanım içeriği */}
      <div
        style={{
          color: altYaziRengi,
          fontSize: `${metinBoyutu * 0.9}px`,
        }}
      >
        {tanimlariBicimlendir(
          tanimMetni,
          tema,
          gununKelimesi.kelime,
          metinBoyutu,
          kaynakIsmi
        )}
      </div>
    </div>
  );
}
