import Image from 'next/image';
import {
  BookOpen,
  BriefcaseBusiness,
  Camera,
  Code2,
  ExternalLink,
  Globe,
  Play,
  Users,
} from 'lucide-react';

export interface FooterProps {
  aktifTema?: Record<string, any>;
  onKaynaklarAc?: () => void;
  kayitSayisi?: number;
  sozlukSayisi?: number;
}

const sosyalBaglantilar = [
  { ad: 'Facebook', href: 'https://www.facebook.com/', icon: Users },
  { ad: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { ad: 'YouTube', href: 'https://www.youtube.com/', icon: Play },
  { ad: 'LinkedIn', href: 'https://www.linkedin.com/', icon: BriefcaseBusiness },
  { ad: 'GitHub', href: 'https://github.com/', icon: Code2 },
];

export default function Footer({ onKaynaklarAc }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[#c9a227]/30 bg-[#fbf8ef] text-stone-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-8 sm:px-8 lg:pt-10">
        <div className="grid items-start gap-8 md:grid-cols-3 md:gap-10">
          
          {/* 1. SÜTUN: Logo & Kurumsal */}
          <section aria-labelledby="footer-kurumsal">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-[#c9a227]/40 bg-[#8b1e1e] p-1 shadow-sm">
                <Image
                  src="/logo/logo.svg" // PNG kullanacaksanız "/logo/logo.png" yapabilirsiniz
                  alt="Açık Mektep Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2
                  id="footer-kurumsal"
                  className="text-base font-bold tracking-tight text-[#8b1e1e] dark:text-[#e5b82e]"
                >
                  Açık Mektep
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Dijital Yayıncılık
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-6 text-stone-600 dark:text-stone-300">
              Çerkesçe Dil Korpusu için açık, erişilebilir ve sürdürülebilir
              dijital kaynaklar.
            </p>
          </section>

          {/* 2. SÜTUN: Çerkesçe Dil Korpusu, Sosyal Medya & Lisans */}
          <section aria-labelledby="footer-korpus">
            <div className="mb-3 flex items-center gap-2">
              <Globe size={18} className="text-[#c9a227]" />
              <h2
                id="footer-korpus"
                className="text-sm font-bold uppercase tracking-[0.12em] text-[#8b1e1e] dark:text-[#e5b82e]"
              >
                Çerkesçe Dil Korpusu
              </h2>
            </div>

            <div
              className="flex flex-wrap gap-1.5"
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#c9a227]/40 bg-white/60 px-2.5 py-1.5 text-[11px] font-medium text-stone-600 transition-all hover:-translate-y-0.5 hover:border-[#8b1e1e] hover:bg-[#8b1e1e] hover:text-white dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:border-[#8b1e1e] dark:hover:bg-[#8b1e1e]"
                >
                  <Icon size={13} strokeWidth={1.8} />
                  <span>{ad}</span>
                </a>
              ))}
            </div>

            <p className="mt-3 text-xs text-stone-400 dark:text-stone-500">
              Özgün içerikler CC BY-NC 4.0 lisansı kapsamındadır.
            </p>
          </section>

          {/* 3. SÜTUN: Kaynaklar ve Bağlantılar */}
          <section aria-labelledby="footer-kaynaklar">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-[#c9a227]" />
              <h2
                id="footer-kaynaklar"
                className="text-sm font-bold uppercase tracking-[0.12em] text-[#8b1e1e] dark:text-[#e5b82e]"
              >
                Kaynaklar ve Bağlantılar
              </h2>
            </div>

            <button
              type="button"
              onClick={onKaynaklarAc}
              className="group inline-flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-sm font-semibold text-stone-700 transition-colors hover:text-[#8b1e1e] dark:text-stone-300 dark:hover:text-[#e5b82e]"
            >
              Kaynaklar ve Referanslar
              <ExternalLink
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </section>

        </div>
      </div>
    </footer>
  );
}