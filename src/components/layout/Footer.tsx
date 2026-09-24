/**
 * File: src/components/layout/Footer.tsx
 * Generated: 2026-09-24
 * Layer: UI
 * Note: SVG ikonlar (lucide-react bagimliligi yok).
 */

'use client';

import React from 'react';

export interface FooterProps {
  onKaynaklarAc?: () => void;
}

// --- SVG Ikonlar ---

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onKaynaklarAc }) => {
  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sutun 1: Marka */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-400">
                <BookOpenIcon />
              </span>
              <h3 className="text-lg font-bold text-white">Çerkesçe Sözlük</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Açık kaynak, çok dilli bilgi motoru.
            </p>
            <a
              href="https://acikkitap.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              Açık Mektep
            </a>
          </div>

          {/* Sutun 2: Hakkinda */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Hakkında
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onKaynaklarAc}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Kaynaklar
                </button>
              </li>
              <li>
                <a
                  href="/privacy-policy.html"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <ShieldIcon />
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a
                  href="/cerkesce-sozluk-v1.0.apk"
                  download
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <DownloadIcon />
                  APK İndir (Android)
                </a>
              </li>
              
            </ul>
          </div>

          {/* Sutun 3: Iletisim */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:acikmektep@gmail.com"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  acikmektep@gmail.com
                </a>
              </li>
              <li className="flex gap-3 pt-2">
                <a
                  href="https://www.facebook.com/acikmektep"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/acikmektep"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://github.com/ztumanog/cerkesce"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <GithubIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ayirici Cizgi */}
        <div className="border-t border-slate-700 my-4" />

        {/* Alt Kisim */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <div className="text-slate-400">
            <p>
              © 2026 Çerkesçe Sözlük.{' '}
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

          <div className="flex items-center gap-2 text-slate-400">
            <span className="flex items-center gap-1">
              Made with
              <HeartIcon />
              by Açık Mektep
            </span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;