import { Suspense } from "react";
import SozlukEkrani from "@/components/dictionary/SozlukEkrani";
import type { LehceTipi, AramaModu } from "@/types/dictionary";

// Next.js App Router'da URL parametreleri asenkron olarak gelir
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DictionaryPage({ searchParams }: PageProps) {
  // 1. URL parametrelerini çözümleme
  const resolvedParams = await searchParams;
  
  // 2. SearchBox için başlangıç değerlerini URL'den güvenli şekilde çıkarma
  const baslangicSorgusu = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const baslangicLehce = (typeof resolvedParams.lehce === "string" ? resolvedParams.lehce : "TUMU") as LehceTipi;
  const baslangicHedefDil = typeof resolvedParams.hedefDil === "string" ? resolvedParams.hedefDil : "TUMU";
  const baslangicMod = (typeof resolvedParams.mod === "string" ? resolvedParams.mod : "prefix") as AramaModu;
  const baslangicLimit = typeof resolvedParams.limit === "string" ? parseInt(resolvedParams.limit, 10) : 20;

  return (
    <main className="flex min-h-screen flex-col items-center bg-stone-50 p-4 dark:bg-stone-950 sm:p-8">
      {/* 
        Ağır veri işleme ve SearchBox durum (state) yönetimi istemci tarafında yapılmalıdır.
        page.tsx sadece başlangıç parametrelerini ileten bir sarmalayıcıdır.
      */}
      <Suspense 
        fallback={
          <div className="flex min-h-[50vh] w-full items-center justify-center text-sm font-medium text-stone-500 dark:text-stone-400">
            Sözlük altyapısı yükleniyor...
          </div>
        }
      >
        <SozlukEkrani 
          initialQuery={baslangicSorgusu}
          initialLehce={baslangicLehce}
          initialHedefDil={baslangicHedefDil}
          initialMod={baslangicMod}
          initialLimit={baslangicLimit}
        />
      </Suspense>
    </main>
  );
}