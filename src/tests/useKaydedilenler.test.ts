// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useKaydedilenler } from "@/hooks/useKaydedilenler";

describe("useKaydedilenler", () => {
  beforeEach(() => {
    const s=new Map(); Object.defineProperty(window,'localStorage',{value:{getItem:(k)=>s.get(k)??null,setItem:(k,v)=>s.set(k,String(v)),removeItem:(k)=>s.delete(k),clear:()=>s.clear()},configurable:true});
    (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;
  });

  it("eski favorileri otomatik tasir, mukerrer kaydi onler ve toggle/silme islemlerini yapar", async () => {
    localStorage.setItem("acikmektep_favoriler", JSON.stringify([{ id: "1", kelime: "фыжь", anlam: "beyaz", kaydedilmeTarihi: "2025-01-01T00:00:00.000Z" }, { id: "2", kelime: "плъыжь", anlam: "kirmizi", kaydedilmeTarihi: "2025-01-01T00:00:00.000Z" }]));
    localStorage.setItem("acikmektep_kayitli_kelimeler", JSON.stringify([{ id: "2", kelime: "плъыжь", anlam: "kirmizi", kaydedilmeTarihi: "2025-02-01T00:00:00.000Z" }]));
    let api!: ReturnType<typeof useKaydedilenler>;
    function TestComp() { api = useKaydedilenler(); return null; }
    const root = createRoot(document.createElement("div"));
    await act(async () => { root.render(React.createElement(TestComp)); });
    expect(api.kayitlilar.map((k) => k.id)).toEqual(["1", "2"]);
    expect(localStorage.getItem("acikmektep_favoriler")).toBeNull();
    expect(api.kayitliMi("1")).toBe(true);
    await act(async () => { api.kayitToggle({ id: "3", kelime: "шхъуантӀэ", anlam: "mavi" }); });
    expect(api.kayitliMi("3")).toBe(true);
    await act(async () => { api.kayitToggle({ id: "1", kelime: "фыжь", anlam: "beyaz" }); });
    expect(api.kayitliMi("1")).toBe(false);
    await act(async () => { api.tumunuSil(); });
    expect(api.kayitlilar).toHaveLength(0);
    await act(async () => { root.unmount(); });
  });
});