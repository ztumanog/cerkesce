import { Suspense } from "react";
import AramaClient from "./AramaClient";
import "./arama.css";

export default function AramaPage() {
  return (
    <Suspense fallback={<div className="arama-fallback">Sözlük açılıyor…</div>}>
      <AramaClient />
    </Suspense>
  );
}
