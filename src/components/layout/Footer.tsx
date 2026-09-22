/**
 * File: UNKNOWN
 * Generated: 2026-09-19
 * Layer: UI
 */

'use client';

import React from 'react';
import {
  BookOpen,
  Camera,
  Code2,
  Users,
  Shield,
  Mail,
  GitBranch,
  Heart,
  type LucideIcon,
} from 'lucide-react';

export interface FooterProps {
  onKaynaklarAc?: () => void;
}

type FooterLink = {
  ad: string;
  href?: string;
  onClick?: boolean;
  icon?: LucideIcon;
};

const sosyalBaglantilar = [
  { ad: 'Facebook', href: 'https://www.facebook.com/acikmektep', icon: Users },
  { ad: 'Instagram', href: 'https://www.instagram.com/acikmektep', icon: Camera },
  { ad: 'GitHub', href: 'https://github.com/acikmektep', icon: Code2 },
];

const footerBolumler: {
  baslik: string;
  linkler: FooterLink[];
}[] = [
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
      { ad: 'acikmektep@gmail.com', href: 'mailto:acikmektep@gmail.com', icon: Mail },
      { ad: '@acikmektep', href: 'https://github.com/acikmektep', icon: GitBranch },
      { ad: 'Gizlilik', href: '/privacy', icon: Shield },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ onKaynaklarAc }) => {
  const handleKaynaklarClick = () => {
    if (onKaynaklarAc) {
      onKaynaklarAc();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-700">
      {/* Ana Footer Bölümü */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Branding Bölümü */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Çerkesçe Sözlük</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Açık kaynak, çok dilli Çerkesçe bilgi motoru.
            </p>
            {/* Sosyal Bağlantılar */}
            <div className="flex gap-4">
              {sosyalBaglantilar.map((sosyal) => {
                const Icon = sosyal.icon;
                return (
                  <a
                    key={sosyal.ad}
                    href={sosyal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sosyal.ad}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Bölümleri */}
          {footerBolumler.map((bolum) => (
            <div key={bolum.baslik} className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {bolum.baslik}
              </h4>
              <ul className="space-y-2">
                {bolum.linkler.map((link) => {
                  const Icon = link.icon;

                  if (link.onClick) {
                    return (
                      <li key={link.ad}>
                        <button
                          type="button"
                          onClick={handleKaynaklarClick}
                          className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                        >
                          {Icon && <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                          <span className="hover:underline">{link.ad}</span>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={link.ad}>
                      <a
                        href={link.href}
                        target={link.href?.startsWith('http') ? '_blank' : undefined}
                        rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                      >
                        {Icon && <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        <span className="hover:underline">{link.ad}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-slate-400">
            <p>
              © 2026 Çerkesçe Sözlük. Tüm hakları saklıdır.{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                CC BY-SA 4.0
              </a>
            </p>
          </div>

          {/* Version & Credits */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>v1.0.0</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              by Açık Mektep
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;