import {
  Archive,
  BookOpen,
  BookText,
  BriefcaseBusiness,
  Building2,
  Camera,
  Code2,
  ExternalLink,
  Globe,
  LibraryBig,
  Play,
  Users,
} from 'lucide-react';

// ✅ DÜZELTME: sources prop'u eklendi
export interface FooterProps {
  aktifTema?: Record<string, any>;
  onKaynaklarAc?: () => void;
  kayitSayisi?: number;
  sozlukSayisi?: number;
  sources?: any[];
}

const sosyalBaglantilar = [
  { ad: 'Facebook', href: 'https://www.facebook.com/', icon: Users },
  { ad: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { ad: 'YouTube', href: 'https://www.youtube.com/', icon: Play },
  { ad: 'LinkedIn', href: 'https://www.linkedin.com/', icon: BriefcaseBusiness },
  { ad: 'GitHub', href: 'https://github.com/', icon: Code2 },
];

export default function Footer({
  aktifTema,
  onKaynaklarAc,
  kayitSayisi,
  sozlukSayisi = 34,
  sources,
}: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[#c9a227]/30 bg-[#fbf8ef] text-stone-800">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-12 sm:px-8 sm:pb-10 lg:pt-10">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <section aria-labelledby="footer-kurumsal">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8b1e1e] text-[#c9a227]">
                <Building2 size={21} strokeWidth={1.8} />
              </div>

              <div>
                <h2
                  id="footer-kurumsal"
                  className="text-base font-bold tracking-tight text-[#8b1e1e]"
                >
                  Açık Mektep
                </h2>
                <p className="text-xs text-stone-500">Dijital Yayıncılık</p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-6 text-stone-600">
              Çerkesçe Dil Korpusu için açık, erişilebilir ve sürdürülebilir
              dijital kaynaklar.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-stone-500">
              <Globe size={15} className="text-[#c9a227]" />
              <span>Çerkesçe Dil Korpusu</span>
            </div>

            <p className="mt-2 text-xs text-stone-400">
              Özgün içerikler CC BY-NC 4.0 lisansı kapsamındadır.
            </p>
          </section>

          <section aria-labelledby="footer-istatistik">
            <div className="mb-4 flex items-center gap-2">
              <LibraryBig size={19} className="text-[#c9a227]" />
              <h2
                id="footer-istatistik"
                className="text-sm font-bold uppercase tracking-[0.12em] text-[#8b1e1e]"
              >
                Sözlük İstatistikleri
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <LibraryBig size={18} className="shrink-0 text-[#c9a227]" />
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    {sozlukSayisi} Sözlük
                  </p>
                  <p className="text-xs text-stone-500">
                    Çok kaynaklı sözlük arşivi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookText size={18} className="shrink-0 text-[#c9a227]" />
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    {kayitSayisi
                      ? `${kayitSayisi.toLocaleString('tr-TR')}+ Kayıt`
                      : '428.000+ Kayıt'}
                  </p>
                  <p className="text-xs text-stone-500">
                    Sürekli gelişen kelime hazinesi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Archive size={18} className="shrink-0 text-[#c9a227]" />
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    Açık Dijital Arşiv
                  </p>
                  <p className="text-xs text-stone-500">
                    Herkes için erişilebilir kaynak
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="footer-kaynaklar">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={19} className="text-[#c9a227]" />
              <h2
                id="footer-kaynaklar"
                className="text-sm font-bold uppercase tracking-[0.12em] text-[#8b1e1e]"
              >
                Kaynaklar ve Bağlantılar
              </h2>
            </div>

            <button
              type="button"
              onClick={onKaynaklarAc}
              className="group inline-flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-sm font-semibold text-stone-700 transition-colors hover:text-[#8b1e1e]"
            >
              Kaynaklar ve Referanslar
              <ExternalLink
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>

            <div
              className="mt-5 flex flex-wrap gap-2"
              aria-label="Sosyal medya bağlantıları"
            >
              {sosyalBaglantilar.map(({ ad, href, icon: Icon }) => (
                <a
                  key={ad}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ad}
                  title={ad}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c9a227]/40 bg-white/60 px-3 py-2 text-xs font-medium text-stone-600 transition-all hover:-translate-y-0.5 hover:border-[#8b1e1e] hover:bg-[#8b1e1e] hover:text-white"
                >
                  <Icon size={15} strokeWidth={1.8} />
                  <span>{ad}</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[#c9a227]/30 pt-5 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Açık Mektep</p>
          <p>Çerkesçe Sözlük • Açık Dil Kaynakları</p>
        </div>
      </div>
    </footer>
  );
}