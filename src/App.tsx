import './globals.css';

export const metadata = {
  title: 'Çerkesçe Sözlük',
  description: 'Адыгэбзэ Псалъалъэ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-amber-500/30 antialiased">
        {children}
      </body>
    </html>
  );
}