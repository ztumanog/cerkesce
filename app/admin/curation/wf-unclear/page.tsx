"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WfUnclearRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/curation/family?filter=yetim");
  }, [router]);

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: 20, color: "#475569" }}>
      WF-UNCLEAR ve yetim aile denetimi <strong>Aile Kürasyonu</strong> sayfasına taşındı. Yönlendiriliyor…
    </div>
  );
}
