'use client';

import React from 'react';
import { Camera, Code2, Users, Shield, BookOpen, Mail, Github, Heart } from 'lucide-react';

export interface FooterProps {
  onKaynaklarAc?: () => void;
}

const sosyalBaglantilar = [
  { ad: 'Facebook', href: 'https://www.facebook.com/acikmektep', icon: Users },
  { ad: 'Instagram', href: 'https://www.instagram.com/acikmektep', icon: Camera },
  { ad: 'GitHub', href: 'https://github.com/acikmektep', icon: Code2 },
];

const footerBolumler = [
  {
    baslik: '📚 Hakkında',
    linkler: [
      { ad: 'Proje Hakkında', href: '#' },
      { ad: 'Versiyon 1.0.0', href: '#' },
      { ad: 'Açık Mektep', href: 'https://acikkitap.com.tr' },
    ],
  },
  {
    baslik: '🔗 Kaynaklar',
    linkler: [
      { ad: 'CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/' },
      { ad: 'Kaynaklar', onClick: true },
      { ad: 'Katkıda Bulun', href: 'https://github.com/acikmektep' },
    ],
  },
  {
    baslik: '💬 İletişim',
    linkler: [
      { ad: 'acıkmektep@gmail.com', href: 'mailto:acıkmektep@gmail.com', icon: Mail },
      { ad: '@acikmektep', href: 'https://github.com/acikmektep', icon: Github },
      { ad: 'Gizlilik', href: '/privacy', icon: Shield },
    ],
  },
];

export default function Footer({ onKaynaklarAc }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[#c9a227]/30 dark:border-slate-800 bg-gradient-to-b from-[#fbf8ef] to-[#f5f1e8] dark:from-slate-900 dark:to-slate-950 text-stone-800 dark:text-slate-200 py-8 px-3 sm:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        {/* ===== ÜSTTÜ BÖLÜM: LOGO VE AÇIKLAMA ===== */}
        <div className="mb-8 pb-8 border-b border-[#c9a227]/20 dark:border-slate-700">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 bg-[#8b1e1e] rounded-lg flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md">
              А
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#8b1e1e] dark:text-emerald-400">
                Çerkesçe Sözlük
              </h2>
              <p className="text-xs text-stone-600 dark:text-slate-400 mt-1">
                Açık Mektep tarafından geliştirilen, topluluk destekli Çerkesçe-Türkçe sözlük projesi.
              </p>
              <p className="text-[10px] text-stone-500 dark:text-slate-500 mt-2">
                v1.0.0 • Lisans: CC BY-SA 4.0
              </p>
            </div>
          </div>
        </div>

        {/* ===== ORTADA BÖLÜM: 3 KOLON (YAN YANA) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#c9a227]/20 dark:border-slate-700">
          {footerBolumler.map((bolum, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-4 pb-2 border-b-2 border-[#c9a227]/40 dark:border-slate-700">
                {bolum.baslik}
              </h3>
              <ul className="space-y-2.5">
                {bolum.linkler.map((link, linkIdx) => {
                  const Icon = link.icon;
                  return (
                    <li key={linkIdx}>
                      {link.onClick ? (
                        <button
                          onClick={onKaynaklarAc}
                          className="text-xs text-stone-600 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-emerald-400 transition-colors flex items-center gap-2 font-medium group"
                        >
                          <BookOpen size={14} className="text-[#c9a227] dark:text-emerald-500 group-hover:scale-110 transition-transform" />
                          {link.ad}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          target={link.href?.startsWith('http') ? '_blank' : undefined}
                          rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-xs text-stone-600 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-emerald-400 transition-colors flex items-center gap-2 font-medium group"
                        >
                          {Icon && <Icon size={14} className="text-[#c9a227] dark:text-emerald-500 group-hover:scale-110 transition-transform" />}
                          {link.ad}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== ALTTAKI BÖLÜM: SOSYAL VE TELIF ===== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* SOSYAL BAĞLANTILAR */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600 dark:text-slate-400">
              Bizi Takip Edin:
            </span>
            <div className="flex items-center gap-2">
              {sosyalBaglantilar.map(({ ad, href, icon: Icon }) => (
                <a
                  key={ad}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${ad} - @acikmektep`}
                  className="w-8 h-8 rounded-full border-2 border-[#c9a227]/40 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-stone-600 dark:text-slate-300 flex items-center justify-center hover:bg-[#8b1e1e] dark:hover:bg-emerald-600 hover:text-white hover:border-[#8b1e1e] dark:hover:border-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* TELIF HAKKARI VE YARATICI */}
          <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Heart size={10} className="text-red-500" />
              Yapan:
            </span>
            <a
              href="https://zekituman.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-emerald-400 font-semibold transition-colors"
            >
              Zeki Tuman
            </a>
            <span>•</span>
            <span>© 2024 Açık Mektep</span>
          </div>
        </div>

      </div>
    </footer>
  );
}