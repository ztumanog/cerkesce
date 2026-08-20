module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AkilliKlavye.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const LIMIT = 20;
const KURUMSAL = {
    kirmizi: "#FF4030",
    kirmiziKoyu: "#E02E1F",
    kirmiziAcik: "#FFF1F0",
    sari: "#FFC604",
    sariKoyu: "#D9A400",
    sariAcik: "#FFFBEB"
};
const VARSAYILAN_TEMA = {
    arkaPlan: "#ffffff",
    yaziAna: "#000000",
    yaziAlt: "#64748b",
    kenarlik: "#e2e8f0",
    kartArkaPlan: "#ffffff",
    inputArkaPlan: "#f8fafc"
};
const BATI_SOZLUKLERI = {
    "0.Ady-Ady_AIG.json": "Adıgece Açıklamalı Sözlük — Адыгабзэм изэхэф гущı1алъ (2006)",
    "1.Ady-Ady_AP.json": "Adıgece-Rusça Sözlük — Prof. Dr. Mirabil L. Apaşev (2008)",
    "2.Ady-Ara.json": "Adıgece-Arapça Sözlük — Dr. Adel Abdulsalam Lash (2013)",
    "3.Ady-En.json": "Adıgece-İngilizce Sözlük — Адыгэбзэ-инджылыбзэ гущı1алъэ",
    "4.Ady-En_Adam.json": "Adam Shagash Adıgece-İngilizce Sözlük (2020)",
    "7.Ady-Rus_Tharkaho.json": "Tharkaho Adıgece-Rusça Sözlük — Cevdet Tharkaho",
    "8.Ady-Tur_Huvaj.json": "Fahri Huvaj Adıgece-Türkçe Sözlük",
    "9.En-Ady.json": "İngilizce-Adıgece Sözlük",
    "10.En-Ady_Adam.json": "Adam Shagash İngilizce-Adıgece Sözlük (2020)",
    "23.Rus-Ady_Blaghoj.json": "Blaghoj Rusça-Adıgece Sözlük — Prof. Dr. Ramazan Blaghoj (1991)",
    "24.Rus-Ady_UAG.json": "Odezhdeko Rusça-Adıgece Sözlük — U. A. Gethanoko (1960)",
    "25.Rus-Ady_UASP.json": "Rusça-Adıgece Okul Sözlüğü (1991)",
    "29.Tur-Ady_Teshu.json": "Teshu Türkçe-Adıgece Sözlük — Cevdet Tharkaho (1991)",
    "30.Ady-Rus_ThreeVolumes.json": "3 Ciltlik Büyük Adıgece-Rusça Sözlük — Maykop Enstitüsü (2011)",
    "31.Tu-Ady_Hilmi.json": "Açumıj Hilmi Türkçe-Adıgece Sözlük (2013)",
    "33.Ady-Rus-1960.json": "Eski Adıgece-Rusça Açıklamalı Sözlük (1960)"
};
const DOGU_SOZLUKLERI = {
    "5.Ady-Rus_Qarden.json": "Kardanov Kabardeyce-Rusça Sözlük — B. M. Kardanov (1957)",
    "6.Ady-Rus_Sherdjes.json": "Sherdjes Aliy Kabardeyce/Adıgece-Rusça Sözlük — Ali İ. Çerkes (1994)",
    "11.En-Kbd-Jonty.json": "Jonty Yamisha İngilizce-Kabardeyce Sözlük",
    "12.En-Kbd-Ziwar.json": "Ziwar Gish İngilizce-Kabardeyce Sözlük",
    "13.Kbd-Ar-Jonty.json": "Jonty Yamisha Kabardeyce-Arapça Sözlük",
    "14.Kbd-En-2-Jonty.json": "Jonty Yamisha Kabardeyce-İngilizce Sözlük v2",
    "15.Kbd-En-Jonty.json": "Jonty Yamisha Kabardeyce-İngilizce Sözlük v1",
    "16.Kbd-En-Ziwar.json": "Ziwar Gish Kabardeyce-İngilizce Sözlük",
    "17.Kbd-En_Amjad.json": "Amjad Jaimoukha Kabardeyce-İngilizce Sözlük (1997)",
    "18.Kbd-Ru&En.json": "Kabardeyce - Rusça & İngilizce Çok Dilli Sözlük",
    "19.Kbd-Ru-2-Jonty.json": "Jonty Yamisha Kabardeyce-Rusça Sözlük v2",
    "20.Kbd-Ru-Jonty.json": "Jonty Yamisha Kabardeyce-Rusça Sözlük v1",
    "21.Kbd-Tu-Jonty.json": "Jonty Yamisha Kabardeyce-Türkçe Sözlük",
    "22.Ru-Kbd-Jonty.json": "Jonty Yamisha Rusça-Kabardeyce Sözlük",
    "26.Tu-Kbd-Jonty.json": "Jonty Yamisha Türkçe-Kabardeyce Sözlük",
    "27.Tur-Ady_Abaze.json": "İbrahim Alhas Abaze Türkçe-Adıgece Sözlük (2005)",
    "28.Tur-Ady_Huvaj.json": "Fahri Huvaj Türkçe-Çerkesçe Sözlük (2007)",
    "32.Rus-Kbd_Nalchik_2013.json": "Nalçik Baskısı Okullar İçin Rusça-Kabardeyce Sözlük (2013)"
};
const KAYNAK_HARITASI = {
    ...BATI_SOZLUKLERI,
    ...DOGU_SOZLUKLERI
};
// Türkçe Tür Dönüştürücü Haritası
const TUR_MAP = {
    "verb": "Fiil",
    "noun": "İsim",
    "adjective": "Sıfat",
    "adverb": "Zarf",
    "auxiliary verb": "Yardımcı Fiil",
    "auxiliary": "Yardımcı Fiil",
    "suffix": "Ek",
    "verbal suffix": "Fiil Eki",
    "prefix": "Önek",
    "preposition": "Edat",
    "conjunction": "Bağlaç",
    "pronoun": "Zamir"
};
const tanimlariBicimlendir = (tanim, tema = VARSAYILAN_TEMA, gecerliBaslikOrBoyut, metinBoyutuParam, kaynakParam)=>{
    if (!tanim) return null;
    const gecerliTema = tema || VARSAYILAN_TEMA;
    let gecerliBaslik = "";
    let metinBoyutu = 16;
    if (typeof gecerliBaslikOrBoyut === "number") {
        metinBoyutu = gecerliBaslikOrBoyut;
    } else if (typeof gecerliBaslikOrBoyut === "string") {
        gecerliBaslik = gecerliBaslikOrBoyut;
        if (typeof metinBoyutuParam === "number") {
            metinBoyutu = metinBoyutuParam;
        }
    }
    const temizBaslik = gecerliBaslik.trim().toLowerCase();
    const satirListesi = tanim.split("\n");
    const anlamlar = [];
    let turBilgisi = "";
    let kaynakBilgisi = kaynakParam || "";
    for (const satir of satirListesi){
        let temiz = satir.trim();
        if (!temiz) continue;
        if (/^definitions:?$/i.test(temiz)) continue;
        // "type: ..." bilgisini yakala
        const typeMatch = temiz.match(/^type:\s*(.*)$/i);
        if (typeMatch) {
            const hamTur = typeMatch[1].trim();
            turBilgisi = TUR_MAP[hamTur.toLowerCase()] || hamTur;
            continue;
        }
        // "source: ..." veya "kaynak: ..." bilgisini metin içinden yakala
        const sourceMatch = temiz.match(/^(?:source|kaynak):\s*(.*)$/i);
        if (sourceMatch) {
            kaynakBilgisi = sourceMatch[1].trim();
            continue;
        }
        // Liste numaralarını temizle ("1.", "2)")
        temiz = temiz.replace(/^\d+[\.\)]\s*/, "").trim();
        // Parantez içindeki açıklamaları temizle
        temiz = temiz.replace(/\s*\(.*?\)/g, "").trim();
        // Başlığın kendisi ise listeye ekleme
        if (temizBaslik && temiz.toLowerCase() === temizBaslik) continue;
        if (temiz) {
            anlamlar.push(temiz);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
        },
        children: [
            anlamlar.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        style: {
                            fontSize: `${metinBoyutu * 0.85}px`,
                            fontWeight: 600,
                            color: gecerliTema.yaziAlt || "#64748b",
                            margin: "0 0 6px 0"
                        },
                        children: "📖 Karşılıklar"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    anlamlar.map((anlam, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: gecerliTema.yaziAna,
                                fontSize: `${metinBoyutu * 0.95}px`,
                                lineHeight: "1.6",
                                marginBottom: "4px",
                                paddingLeft: "2px"
                            },
                            children: [
                                "• ",
                                anlam
                            ]
                        }, idx, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Boolean(turBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: "8px",
                    borderTop: `1px solid ${gecerliTema.kenarlik || "#e5e7eb"}`,
                    fontSize: `${metinBoyutu * 0.85}px`,
                    color: gecerliTema.yaziAlt || "#64748b",
                    fontWeight: 500
                },
                children: [
                    "🏷 Tür:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: gecerliTema.yaziAna,
                            fontWeight: 600
                        },
                        children: turBilgisi
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Boolean(kaynakBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: turBilgisi ? "4px" : "8px",
                    borderTop: turBilgisi ? "none" : `1px solid ${gecerliTema.kenarlik || "#e5e7eb"}`,
                    fontSize: `${metinBoyutu * 0.8}px`,
                    color: gecerliTema.yaziAlt || "#64748b",
                    fontStyle: "italic"
                },
                children: [
                    "📚 Kaynak:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 500
                        },
                        children: kaynakBilgisi
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function Home() {
    const { wordsCount, loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDictionary"])();
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(LIMIT);
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(16);
    const [kopyalandiId, setKopyalandiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [duyuruMetni, setDuyuruMetni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawerKapatBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sonOdaklanilanElemanRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ozelKarakterler = [
        "Ӏ",
        "I",
        "а",
        "э",
        "гь",
        "кь"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const kayitliKaranlik = localStorage.getItem("darkMode");
        if (kayitliKaranlik) {
            setKaranlikMod(JSON.parse(kayitliKaranlik));
        }
    }, []);
    const toggleKaranlikMod = ()=>{
        setKaranlikMod((prev)=>{
            const yeniDurum = !prev;
            localStorage.setItem("darkMode", JSON.stringify(yeniDurum));
            setDuyuruMetni(yeniDurum ? "Karanlık tema açıldı." : "Aydınlık tema açıldı.");
            return yeniDurum;
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (!seciliKelimeGrubu) return;
            if (e.key === "Escape") {
                setSeciliKelimeGrubu(null);
                return;
            }
            if (e.key === "Tab" && drawerRef.current) {
                const odaklanabilir = drawerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (odaklanabilir.length === 0) return;
                const ilk = odaklanabilir[0];
                const son = odaklanabilir[odaklanabilir.length - 1];
                if (e.shiftKey && document.activeElement === ilk) {
                    e.preventDefault();
                    son.focus();
                } else if (!e.shiftKey && document.activeElement === son) {
                    e.preventDefault();
                    ilk.focus();
                }
            }
        };
        if (seciliKelimeGrubu) {
            sonOdaklanilanElemanRef.current = document.activeElement;
            window.addEventListener("keydown", handleKeyDown);
            setTimeout(()=>drawerKapatBtnRef.current?.focus(), 50);
        } else {
            sonOdaklanilanElemanRef.current?.focus();
        }
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        seciliKelimeGrubu
    ]);
    const kaynagiDuzenle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((dosyaAdi)=>{
        if (!dosyaAdi) return "";
        return KAYNAK_HARITASI[dosyaAdi] || dosyaAdi;
    }, []);
    const hedefDilBul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((dosyaAdi)=>{
        if (!dosyaAdi) return "diger";
        const isim = dosyaAdi.toLowerCase();
        if (isim.includes("tur") || isim.includes("tu-")) return "tr";
        if (isim.includes("ara") || isim.includes("-ar")) return "ar";
        if (isim.includes("en") || isim.includes("kbd-en")) return "en";
        if (isim.includes("rus") || isim.includes("ru-")) return "ru";
        return "diger";
    }, []);
    const gruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!searchQuery.trim()) return [];
        let sonucHavuzu = filtrelenmisSonuclar || [];
        const q = searchQuery.trim().toLowerCase();
        if (mod === "baslayan") {
            sonucHavuzu = sonucHavuzu.filter((item)=>item.kelime?.toLowerCase().startsWith(q));
        } else if (mod === "tam") {
            sonucHavuzu = sonucHavuzu.filter((item)=>item.kelime?.toLowerCase() === q);
        } else if (mod === "icinde") {
            sonucHavuzu = sonucHavuzu.filter((item)=>item.kelime?.toLowerCase().includes(q) || item.tanim?.toLowerCase().includes(q));
        }
        if (hedefDil !== "tumu") {
            sonucHavuzu = sonucHavuzu.filter((item)=>{
                const dosya = item.file || item.kaynak_sozluk || item.kaynak;
                return hedefDilBul(dosya) === hedefDil;
            });
        }
        const gruplar = {};
        sonucHavuzu.forEach((item)=>{
            const kelimeKey = (item.kelime || "").trim().toLowerCase();
            if (!kelimeKey) return;
            if (!gruplar[kelimeKey]) gruplar[kelimeKey] = [];
            gruplar[kelimeKey].push(item);
        });
        return Object.values(gruplar).map((kaynaklar)=>({
                kelime: kaynaklar[0].kelime,
                dialect: kaynaklar[0].dialect,
                kaynaklar
            }));
    }, [
        filtrelenmisSonuclar,
        searchQuery,
        mod,
        hedefDil,
        hedefDilBul
    ]);
    // ... Buradan itibaren JSX (return) bloğunuz aynen devam eder.
    const handleSearchChange = (val)=>{
        setSearchQuery(val);
        setGoruntulenenAdet(LIMIT);
    };
    const harfEkle = (harf)=>{
        handleSearchChange(searchQuery + harf);
        setDuyuruMetni(`${harf} harfi eklendi.`);
        inputRef.current?.focus();
    };
    const panoyaKopyala = (kelime, tanim, id)=>{
        const metin = `${kelime}\n${tanim || ""}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(metin).then(()=>{
                if (id) setKopyalandiId(id);
                setDuyuruMetni(`${kelime} kelimesi panoya kopyalandı.`);
                setTimeout(()=>setKopyalandiId(null), 2000);
            }).catch(()=>setDuyuruMetni("Kopyalama işlemi başarısız oldu."));
        }
    };
    const metniVurgula = (metin, aktifTema)=>{
        const parcalar = metin.split(/(-[^\:]+\:|◊)/g);
        return parcalar.map((parca, index)=>{
            if (!parca) return null;
            if (parca === "◊") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: KURUMSAL.kirmizi,
                        margin: "0 4px",
                        fontWeight: "bold"
                    },
                    children: "◊"
                }, index, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 423,
                    columnNumber: 11
                }, this);
            }
            if (parca.startsWith("-") && parca.endsWith(":")) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: aktifTema.yaziAna,
                        fontWeight: "700"
                    },
                    children: [
                        parca,
                        " "
                    ]
                }, index, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 430,
                    columnNumber: 11
                }, this);
            }
            return parca;
        });
    };
    const normalizeText = (text)=>text.normalize("NFC").toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]/gu, "").trim();
    const tanimlariBicimlendir = (tanim, tema = VARSAYILAN_TEMA, gecerliBaslikOrBoyut, metinBoyutuParam, kaynakParam)=>{
        if (!tanim) return null;
        const gecerliTema = tema || VARSAYILAN_TEMA;
        let gecerliBaslik = "";
        let metinBoyutu = 16;
        if (typeof gecerliBaslikOrBoyut === "number") {
            metinBoyutu = gecerliBaslikOrBoyut;
        } else if (typeof gecerliBaslikOrBoyut === "string") {
            gecerliBaslik = gecerliBaslikOrBoyut;
            if (typeof metinBoyutuParam === "number") {
                metinBoyutu = metinBoyutuParam;
            }
        }
        const temizBaslik = gecerliBaslik ? normalizeText(gecerliBaslik) : "";
        const satirListesi = tanim.split("\n");
        const anlamlar = [];
        let turBilgisi = "";
        let kaynakBilgisi = kaynakParam || "";
        // Metinde Çerkesçe (Kiril) harfler var mı kontrol et
        const kirilVarMi = /[\u0400-\u04FF]/.test(tanim);
        for (const satir of satirListesi){
            let temiz = satir.trim();
            if (!temiz) continue;
            // 1. Definitions başlığını atla
            if (/^definitions:?$/i.test(temiz)) continue;
            // 2. Type bilgisini yakala
            const typeMatch = temiz.match(/^type:\s*(.*)$/i);
            if (typeMatch) {
                const hamTur = typeMatch[1].trim();
                turBilgisi = TUR_MAP[hamTur.toLowerCase()] || hamTur;
                continue;
            }
            // 3. Kaynak bilgisini yakala
            const sourceMatch = temiz.match(/^(?:source|kaynak):\s*(.*)$/i);
            if (sourceMatch) {
                kaynakBilgisi = sourceMatch[1].trim();
                continue;
            }
            // 4. Liste ve madde işaretlerini temizle (•, -, *, 1., 1))
            temiz = temiz.replace(/^[\s•*\-\d\.\)]+/, "").trim();
            // 5. Parantez içindeki açıklamaları temizle
            temiz = temiz.replace(/\s*\(.*?\)/g, "").trim();
            if (!temiz) continue;
            // 6. Başlık parametresi ile eşleşen kelimeyi süz
            if (temizBaslik && normalizeText(temiz) === temizBaslik) {
                continue;
            }
            // 7. OTOMATİK SÜZME: Başlık gönderilmediyse bile, Çerkesçe karşılıkların
            // arasındaki İngilizce başlık tekrarını (sadece Latin harfli satırı) otomatik süz
            if (!temizBaslik && kirilVarMi && /^[a-zA-Z\s\-\'\"]+$/.test(temiz)) {
                continue;
            }
            anlamlar.push(temiz);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            },
            children: [
                anlamlar.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            style: {
                                fontSize: `${metinBoyutu * 0.85}px`,
                                fontWeight: 600,
                                color: gecerliTema.yaziAlt || "#64748b",
                                margin: "0 0 6px 0"
                            },
                            children: "📖 Karşılıklar"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 528,
                            columnNumber: 11
                        }, this),
                        anlamlar.map((anlam, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: gecerliTema.yaziAna,
                                    fontSize: `${metinBoyutu * 0.95}px`,
                                    lineHeight: "1.6",
                                    marginBottom: "4px",
                                    paddingLeft: "2px"
                                },
                                children: [
                                    "• ",
                                    anlam
                                ]
                            }, idx, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 539,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 527,
                    columnNumber: 9
                }, this),
                Boolean(turBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingTop: "8px",
                        borderTop: `1px solid ${gecerliTema.kenarlik || "#e5e7eb"}`,
                        fontSize: `${metinBoyutu * 0.85}px`,
                        color: gecerliTema.yaziAlt || "#64748b",
                        fontWeight: 500
                    },
                    children: [
                        "🏷 Tür:",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: gecerliTema.yaziAna,
                                fontWeight: 600
                            },
                            children: turBilgisi
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 567,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 557,
                    columnNumber: 9
                }, this),
                Boolean(kaynakBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingTop: turBilgisi ? "4px" : "8px",
                        borderTop: turBilgisi ? "none" : `1px solid ${gecerliTema.kenarlik || "#e5e7eb"}`,
                        fontSize: `${metinBoyutu * 0.8}px`,
                        color: gecerliTema.yaziAlt || "#64748b",
                        fontStyle: "italic"
                    },
                    children: [
                        "📚 Kaynak:",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontWeight: 500
                            },
                            children: kaynakBilgisi
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 585,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 575,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 524,
            columnNumber: 5
        }, this);
    };
    const benzerKelimeler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!seciliKelimeGrubu || !seciliKelimeGrubu.kelime || !filtrelenmisSonuclar) return [];
        const kok = seciliKelimeGrubu.kelime.slice(0, 3).toLowerCase();
        if (!kok) return [];
        const eslesenler = filtrelenmisSonuclar.filter((w)=>w.kelime?.toLowerCase().startsWith(kok) && w.kelime?.toLowerCase() !== seciliKelimeGrubu.kelime.toLowerCase()).map((w)=>w.kelime);
        return Array.from(new Set(eslesenler)).slice(0, 8);
    }, [
        seciliKelimeGrubu,
        filtrelenmisSonuclar
    ]);
    const tema = {
        arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
        kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
        yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
        yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
        kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
        inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff"
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui, sans-serif",
                color: "#64748b"
            },
            children: "📖 Sözlük veritabanı yükleniyor..."
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 620,
            columnNumber: 7
        }, this);
    }
    const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: tema.arkaPlan,
            minHeight: "100vh",
            padding: "24px 16px",
            transition: "background-color 0.2s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-live": "polite",
                "aria-atomic": "true",
                style: {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                    border: 0
                },
                children: duyuruMetni
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: "840px",
                    margin: "0 auto",
                    fontFamily: "system-ui, -apple-system, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                            flexWrap: "wrap",
                            gap: "12px",
                            borderBottom: `2px solid ${KURUMSAL.sari}`,
                            paddingBottom: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/logo.png",
                                        alt: "Açık Mektep Logosu",
                                        style: {
                                            width: "42px",
                                            height: "42px",
                                            objectFit: "contain",
                                            borderRadius: "8px"
                                        },
                                        onError: (e)=>{
                                            e.target.style.display = "none";
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                    fontWeight: "bold",
                                                    color: KURUMSAL.kirmizi,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.08em",
                                                    display: "block"
                                                },
                                                children: "Açık Mektep"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 650,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    color: tema.yaziAna,
                                                    margin: 0,
                                                    fontSize: `${metinBoyutu * 1.5}px`
                                                },
                                                children: "📖 Çerkesçe Sözlük"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 653,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 649,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 642,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "center"
                                },
                                role: "toolbar",
                                "aria-label": "Görünüm kontrolleri",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMetinBoyutu((p)=>{
                                                const yeni = Math.max(14, p - 2);
                                                setDuyuruMetni(`Yazı boyutu küçültüldü: ${yeni} piksel`);
                                                return yeni;
                                            }),
                                        "aria-label": "Yazı boyutunu küçült",
                                        style: {
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            border: `1px solid ${tema.kenarlik}`,
                                            backgroundColor: tema.kartArkaPlan,
                                            color: tema.yaziAna,
                                            cursor: "pointer",
                                            fontWeight: "bold"
                                        },
                                        children: "A-"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 660,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMetinBoyutu((p)=>{
                                                const yeni = Math.min(24, p + 2);
                                                setDuyuruMetni(`Yazı boyutu büyütüldü: ${yeni} piksel`);
                                                return yeni;
                                            }),
                                        "aria-label": "Yazı boyutunu büyüt",
                                        style: {
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            border: `1px solid ${tema.kenarlik}`,
                                            backgroundColor: tema.kartArkaPlan,
                                            color: tema.yaziAna,
                                            cursor: "pointer",
                                            fontWeight: "bold"
                                        },
                                        children: "A+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 667,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleKaranlikMod,
                                        "aria-pressed": karanlikMod,
                                        "aria-label": "Karanlık Temayı Aç/Kapat",
                                        style: {
                                            padding: "8px 14px",
                                            borderRadius: "6px",
                                            border: `1px solid ${tema.kenarlik}`,
                                            backgroundColor: tema.kartArkaPlan,
                                            color: tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: karanlikMod ? "☀️ Aydınlık" : "🌙 Karanlık"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 674,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 659,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 641,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: tema.yaziAlt,
                            fontSize: `${metinBoyutu * 0.9}px`,
                            marginBottom: "20px"
                        },
                        children: [
                            "📚 ",
                            aktifSozlukler?.length || 33,
                            " sözlük • 📖 ",
                            (wordsCount ?? 0).toLocaleString("tr-TR"),
                            "+ kayıt •",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                style: {
                                    color: KURUMSAL.kirmizi
                                },
                                children: "Açık Mektep Dijital Sözlük Ekosistemi"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 685,
                        columnNumber: 9
                    }, this),
                    !searchQuery.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setSeciliKelimeGrubu({
                                kelime: gununKelimesi.kelime,
                                dialect: gununKelimesi.dialect === "BATI" || gununKelimesi.dialect === "DOGU" ? gununKelimesi.dialect : undefined,
                                kaynaklar: [
                                    gununKelimesi
                                ]
                            }),
                        style: {
                            padding: "16px 20px",
                            backgroundColor: karanlikMod ? "#1e293b" : "#FFF1F0",
                            borderLeft: `5px solid ${KURUMSAL.kirmizi}`,
                            borderRadius: "8px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                            cursor: "pointer",
                            textAlign: "left"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: KURUMSAL.kirmizi,
                                            fontWeight: "bold",
                                            fontSize: `${metinBoyutu * 0.85}px`,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em"
                                        },
                                        children: "🌟 Günün Kelimesi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 700,
                                        columnNumber: 15
                                    }, this),
                                    gununKelimesi.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: `${metinBoyutu * 0.75}px`,
                                            fontWeight: "bold",
                                            color: gununKelimesi.dialect === "BATI" ? "#16a34a" : "#2563eb",
                                            backgroundColor: gununKelimesi.dialect === "BATI" ? "#16a34a15" : "#2563eb15",
                                            padding: "3px 8px",
                                            borderRadius: "12px"
                                        },
                                        children: gununKelimesi.dialect === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 704,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 699,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: `${metinBoyutu * 1.25}px`,
                                    fontWeight: "bold",
                                    color: tema.yaziAna,
                                    marginTop: "4px"
                                },
                                children: gununKelimesi.kelime
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 709,
                                columnNumber: 13
                            }, this),
                            tanimlariBicimlendir(gununKelimesi.tanim, tema, metinBoyutu),
                            gununKelimesi.kaynak_sozluk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                style: {
                                    color: tema.yaziAlt,
                                    display: "block",
                                    marginTop: "6px",
                                    fontSize: "12px"
                                },
                                children: [
                                    "📚 Kaynak: ",
                                    kaynagiDuzenle(gununKelimesi.kaynak_sozluk)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 714,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 691,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        style: {
                            border: "none",
                            padding: 0,
                            margin: "0 0 16px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.85}px`,
                                    fontWeight: "600",
                                    color: tema.yaziAlt,
                                    marginBottom: "8px"
                                },
                                children: "Lehçe & Sözlük Seçimi:"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 722,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    marginBottom: "10px"
                                },
                                children: [
                                    {
                                        kod: "TUMU",
                                        etiket: "🌐 Tüm Lehçeler"
                                    },
                                    {
                                        kod: "BATI",
                                        etiket: "🟢 Batı Adıgece"
                                    },
                                    {
                                        kod: "DOGU",
                                        etiket: "🔵 Doğu Kabardeyce"
                                    }
                                ].map((lehce)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setSeciliLehce(lehce.kod);
                                            setSeciliDosya("TUMU");
                                        },
                                        "aria-pressed": seciliLehce === lehce.kod,
                                        style: {
                                            padding: "8px 14px",
                                            fontSize: `${metinBoyutu * 0.85}px`,
                                            fontWeight: seciliLehce === lehce.kod ? "bold" : "normal",
                                            borderRadius: "20px",
                                            border: `2px solid ${seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kenarlik}`,
                                            backgroundColor: seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                                            color: seciliLehce === lehce.kod ? "#ffffff" : tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: lehce.etiket
                                    }, lehce.kod, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 731,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 725,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: seciliDosya,
                                onChange: (e)=>{
                                    setSeciliDosya(e.target.value);
                                    setGoruntulenenAdet(LIMIT);
                                },
                                style: {
                                    width: "100%",
                                    padding: "10px 12px",
                                    fontSize: `${metinBoyutu * 0.85}px`,
                                    borderRadius: "8px",
                                    border: `1px solid ${tema.kenarlik}`,
                                    backgroundColor: tema.inputArkaPlan,
                                    color: tema.yaziAna,
                                    cursor: "pointer"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "TUMU",
                                        children: seciliLehce === "TUMU" ? "📖 Tüm Sözlüklerde Ara" : `📖 Tüm ${seciliLehce === "BATI" ? "Batı" : "Doğu"} Sözlüklerinde Ara`
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 747,
                                        columnNumber: 13
                                    }, this),
                                    aktifSozlukler?.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: d.file,
                                            children: [
                                                d.title || kaynagiDuzenle(d.file),
                                                " (",
                                                d.total_words?.toLocaleString("tr-TR") || 0,
                                                " kelime)"
                                            ]
                                        }, d.file, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 751,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 742,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 721,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        style: {
                            border: "none",
                            padding: 0,
                            margin: "0 0 16px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.85}px`,
                                    fontWeight: "600",
                                    color: tema.yaziAlt,
                                    marginBottom: "8px"
                                },
                                children: "Hedef Dil Filtresi:"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 759,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap"
                                },
                                children: [
                                    {
                                        kod: "tumu",
                                        etiket: "🌐 Tümü"
                                    },
                                    {
                                        kod: "tr",
                                        etiket: "🇹🇷 Türkçe"
                                    },
                                    {
                                        kod: "ar",
                                        etiket: "🇸🇦 Arapça"
                                    },
                                    {
                                        kod: "en",
                                        etiket: "🇬🇧 İngilizce"
                                    },
                                    {
                                        kod: "ru",
                                        etiket: "🇷🇺 Rusça"
                                    }
                                ].map((dil)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setHedefDil(dil.kod),
                                        "aria-pressed": hedefDil === dil.kod,
                                        style: {
                                            padding: "6px 12px",
                                            fontSize: `${metinBoyutu * 0.8}px`,
                                            fontWeight: hedefDil === dil.kod ? "bold" : "normal",
                                            borderRadius: "16px",
                                            border: `1px solid ${hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kenarlik}`,
                                            backgroundColor: hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                                            color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: dil.etiket
                                    }, dil.kod, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 765,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 760,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 758,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        style: {
                            border: "none",
                            padding: 0,
                            margin: "0 0 16px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.85}px`,
                                    fontWeight: "600",
                                    color: tema.yaziAlt,
                                    marginBottom: "8px"
                                },
                                children: "Çerkesçe Hızlı Harfler:"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 776,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap"
                                },
                                children: ozelKarakterler.map((harf, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>harfEkle(harf),
                                        style: {
                                            padding: "8px 16px",
                                            fontSize: `${metinBoyutu}px`,
                                            fontWeight: "bold",
                                            borderRadius: "6px",
                                            border: `1px solid ${tema.kenarlik}`,
                                            backgroundColor: tema.kartArkaPlan,
                                            color: tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: harf
                                    }, index, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 779,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 777,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 775,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        inputRef: inputRef,
                        sorgu: searchQuery,
                        setSorgu: handleSearchChange,
                        metinBoyutu: metinBoyutu,
                        karanlikMod: karanlikMod
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 784,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "10px",
                            marginBottom: "16px",
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: "1 1 240px",
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "arama-input",
                                        ref: inputRef,
                                        type: "search",
                                        value: searchQuery,
                                        onChange: (e)=>handleSearchChange(e.target.value),
                                        placeholder: "Kelime veya anlam ara... (Örn: Ӏаб, мафэ, псы)",
                                        style: {
                                            width: "100%",
                                            padding: "12px 40px 12px 16px",
                                            fontSize: `${metinBoyutu}px`,
                                            borderRadius: "8px",
                                            border: `2px solid ${tema.kenarlik}`,
                                            backgroundColor: tema.inputArkaPlan,
                                            color: tema.yaziAna,
                                            outlineColor: KURUMSAL.kirmizi,
                                            boxSizing: "border-box"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this),
                                    searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            handleSearchChange("");
                                            inputRef.current?.focus();
                                        },
                                        style: {
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            background: "transparent",
                                            border: "none",
                                            color: tema.yaziAlt,
                                            cursor: "pointer",
                                            fontSize: `${metinBoyutu}px`
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 794,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: mod,
                                onChange: (e)=>setMod(e.target.value),
                                style: {
                                    padding: "12px",
                                    fontSize: `${metinBoyutu * 0.9}px`,
                                    borderRadius: "8px",
                                    border: `2px solid ${tema.kenarlik}`,
                                    backgroundColor: tema.inputArkaPlan,
                                    color: tema.yaziAna,
                                    cursor: "pointer"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "baslayan",
                                        children: "İle Başlayan"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 799,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "icinde",
                                        children: "İçinde Geçen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 800,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "tam",
                                        children: "Tam Eşleşen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 801,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 798,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 786,
                        columnNumber: 9
                    }, this),
                    searchQuery.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: tema.yaziAlt,
                            fontSize: `${metinBoyutu * 0.9}px`,
                            marginBottom: "16px"
                        },
                        role: "status",
                        children: [
                            "Toplam ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: gruplanmisSonuclar.length
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 807,
                                columnNumber: 20
                            }, this),
                            " kelime grubu bulundu."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 806,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-label": "Arama Sonuçları",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px"
                            },
                            children: [
                                gosterilenGruplar.map((grup, index)=>{
                                    const ilkKaynak = grup.kaynaklar[0];
                                    const benzersizKey = `grup_${grup.kelime}_${index}`;
                                    const kaynakDosya = ilkKaynak.file || ilkKaynak.kaynak_sozluk || ilkKaynak.kaynak;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        style: {
                                            padding: "20px",
                                            borderRadius: "8px",
                                            backgroundColor: tema.kartArkaPlan,
                                            border: `1px solid ${tema.kenarlik}`,
                                            position: "relative",
                                            textAlign: "left"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    gap: "12px",
                                                    marginBottom: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    margin: 0,
                                                                    color: tema.yaziAna,
                                                                    fontWeight: "bold",
                                                                    fontSize: `${metinBoyutu * 1.3}px`
                                                                },
                                                                children: grup.kelime
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 822,
                                                                columnNumber: 23
                                                            }, this),
                                                            grup.kaynaklar.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                                    fontWeight: "bold",
                                                                    color: "#ffffff",
                                                                    backgroundColor: KURUMSAL.kirmizi,
                                                                    padding: "2px 8px",
                                                                    borderRadius: "10px",
                                                                    display: "inline-block",
                                                                    marginTop: "4px"
                                                                },
                                                                children: [
                                                                    grup.kaynaklar.length,
                                                                    " Farklı Sözlük"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 824,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            grup.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                                    fontWeight: "bold",
                                                                    color: grup.dialect === "BATI" ? "#16a34a" : "#2563eb",
                                                                    backgroundColor: grup.dialect === "BATI" ? "#16a34a15" : "#2563eb15",
                                                                    padding: "4px 8px",
                                                                    borderRadius: "12px",
                                                                    border: `1px solid ${grup.dialect === "BATI" ? "#16a34a" : "#2563eb"}`
                                                                },
                                                                children: grup.dialect === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 832,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>panoyaKopyala(ilkKaynak.kelime, ilkKaynak.tanim, benzersizKey),
                                                                style: {
                                                                    border: `1px solid ${tema.kenarlik}`,
                                                                    borderRadius: "6px",
                                                                    backgroundColor: tema.inputArkaPlan,
                                                                    color: tema.yaziAna,
                                                                    cursor: "pointer",
                                                                    fontSize: `${metinBoyutu * 0.85}px`,
                                                                    padding: "6px 10px"
                                                                },
                                                                children: kopyalandiId === benzersizKey ? "✓ Kopyalandı" : "📋 Kopyala"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 836,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 830,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 820,
                                                columnNumber: 19
                                            }, this),
                                            tanimlariBicimlendir(ilkKaynak.tanim, tema, metinBoyutu),
                                            kaynakDosya && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: `${metinBoyutu * 0.8}px`,
                                                    color: tema.yaziAlt,
                                                    fontStyle: "italic",
                                                    marginTop: "12px",
                                                    borderTop: `1px dashed ${tema.kenarlik}`,
                                                    paddingTop: "8px"
                                                },
                                                children: [
                                                    "📚 Kaynak: ",
                                                    kaynagiDuzenle(kaynakDosya),
                                                    " ",
                                                    ilkKaynak.author ? `— ${ilkKaynak.author}` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 845,
                                                columnNumber: 21
                                            }, this),
                                            grup.kaynaklar.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "14px",
                                                    textAlign: "right"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSeciliKelimeGrubu(grup),
                                                    style: {
                                                        padding: "6px 14px",
                                                        borderRadius: "6px",
                                                        backgroundColor: "transparent",
                                                        border: `1px solid ${KURUMSAL.kirmizi}`,
                                                        color: KURUMSAL.kirmizi,
                                                        fontWeight: "600",
                                                        fontSize: `${metinBoyutu * 0.85}px`,
                                                        cursor: "pointer"
                                                    },
                                                    children: [
                                                        "Tüm Kaynakları İncele (",
                                                        grup.kaynaklar.length,
                                                        ") →"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 852,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 851,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, benzersizKey, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 819,
                                        columnNumber: 17
                                    }, this);
                                }),
                                dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "center",
                                        marginTop: "16px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setGoruntulenenAdet((prev)=>prev + LIMIT),
                                        style: {
                                            padding: "10px 20px",
                                            fontSize: `${metinBoyutu * 0.9}px`,
                                            fontWeight: "bold",
                                            borderRadius: "8px",
                                            border: "none",
                                            backgroundColor: KURUMSAL.kirmizi,
                                            color: "#ffffff",
                                            cursor: "pointer",
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                        },
                                        children: [
                                            "Daha Fazla Göster (",
                                            gruplanmisSonuclar.length - goruntulenenAdet,
                                            " kaldı)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 863,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 862,
                                    columnNumber: 15
                                }, this),
                                searchQuery.trim() && gruplanmisSonuclar.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "32px 16px",
                                        textAlign: "center",
                                        color: tema.yaziAlt,
                                        backgroundColor: tema.kartArkaPlan,
                                        borderRadius: "8px",
                                        border: `1px solid ${tema.kenarlik}`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: `${metinBoyutu * 1.1}px`,
                                            margin: 0
                                        },
                                        children: [
                                            '🔍 "',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: searchQuery
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 871,
                                                columnNumber: 82
                                            }, this),
                                            '" aramasına uygun kelime bulunamadı.'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 870,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 812,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 811,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 639,
                columnNumber: 7
            }, this),
            seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "flex-end",
                    zIndex: 1000,
                    backdropFilter: "blur(2px)"
                },
                onClick: ()=>setSeciliKelimeGrubu(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: drawerRef,
                    role: "dialog",
                    "aria-modal": "true",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        width: "100%",
                        maxWidth: "500px",
                        height: "100%",
                        backgroundColor: tema.kartArkaPlan,
                        color: tema.yaziAna,
                        boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "16px 20px",
                                borderBottom: `1px solid ${tema.kenarlik}`,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: tema.inputArkaPlan
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                margin: 0,
                                                fontSize: `${metinBoyutu * 1.3}px`,
                                                color: tema.yaziAna
                                            },
                                            children: seciliKelimeGrubu.kelime
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 884,
                                            columnNumber: 17
                                        }, this),
                                        seciliKelimeGrubu.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: `${metinBoyutu * 0.75}px`,
                                                fontWeight: "bold",
                                                color: seciliKelimeGrubu.dialect === "BATI" ? "#16a34a" : "#2563eb",
                                                marginTop: "4px",
                                                display: "inline-block"
                                            },
                                            children: seciliKelimeGrubu.dialect === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 886,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 883,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    ref: drawerKapatBtnRef,
                                    onClick: ()=>setSeciliKelimeGrubu(null),
                                    style: {
                                        background: "transparent",
                                        border: "none",
                                        fontSize: `${metinBoyutu * 1.2}px`,
                                        color: tema.yaziAna,
                                        cursor: "pointer",
                                        padding: "4px 8px",
                                        borderRadius: "4px"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 891,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 882,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "20px",
                                overflowY: "auto",
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontSize: `${metinBoyutu * 0.95}px`,
                                        color: KURUMSAL.kirmizi,
                                        marginBottom: "12px"
                                    },
                                    children: [
                                        "📚 Tüm Kaynaklar (",
                                        seciliKelimeGrubu.kaynaklar.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 895,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "16px"
                                    },
                                    children: seciliKelimeGrubu.kaynaklar.map((item, idx)=>{
                                        const dosya = item.file || item.kaynak_sozluk || item.kaynak;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: "12px 16px",
                                                borderRadius: "8px",
                                                border: `1px solid ${tema.kenarlik}`,
                                                backgroundColor: tema.inputArkaPlan
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: `${metinBoyutu * 0.8}px`,
                                                        fontWeight: "bold",
                                                        color: tema.yaziAlt,
                                                        marginBottom: "6px"
                                                    },
                                                    children: [
                                                        kaynagiDuzenle(dosya),
                                                        " ",
                                                        item.author ? `— ${item.author}` : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 23
                                                }, this),
                                                tanimlariBicimlendir(item.tanim, tema, metinBoyutu)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 900,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 896,
                                    columnNumber: 15
                                }, this),
                                benzerKelimeler.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "24px",
                                        paddingTop: "16px",
                                        borderTop: `1px solid ${tema.kenarlik}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: `${metinBoyutu * 0.85}px`,
                                                color: tema.yaziAlt,
                                                marginBottom: "8px"
                                            },
                                            children: "🔗 Benzer / İlişkili Kelimeler:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 910,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "6px",
                                                flexWrap: "wrap"
                                            },
                                            children: benzerKelimeler.map((kelime, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        handleSearchChange(kelime);
                                                        setSeciliKelimeGrubu(null);
                                                    },
                                                    style: {
                                                        padding: "4px 10px",
                                                        fontSize: `${metinBoyutu * 0.8}px`,
                                                        borderRadius: "14px",
                                                        border: `1px solid ${tema.kenarlik}`,
                                                        backgroundColor: tema.kartArkaPlan,
                                                        color: tema.yaziAna,
                                                        cursor: "pointer"
                                                    },
                                                    children: kelime
                                                }, idx, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 913,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 911,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 909,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 894,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 881,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 880,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 630,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/AkilliKlavye.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AkilliKlavye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const KLAVYE_DUZENLERI = {
    adiyge: {
        etiket: '🟢 Adıgece',
        tuslar: [
            'Ӏ',
            'а',
            'б',
            'в',
            'г',
            'гу',
            'гъ',
            'д',
            'дж',
            'дз',
            'е',
            'ё',
            'ж',
            'жъ',
            'з',
            'и',
            'й',
            'к',
            'къ',
            'кӀ',
            'л',
            'ль',
            'м',
            'н',
            'о',
            'п',
            'пӀ',
            'р',
            'с',
            'т',
            'у',
            'ф',
            'х',
            'хъ',
            'ц',
            'ч',
            'чъ',
            'чӀ',
            'ш',
            'щ',
            'ы',
            'э',
            'ю',
            'я'
        ]
    },
    kabardey: {
        etiket: '🔵 Kabardeyce',
        tuslar: [
            'Ӏ',
            'къ',
            'кӀ',
            'пӀ',
            'тӀ',
            'цӀ',
            'чӀ',
            'лъ',
            'фӀ',
            'хь',
            'гъ',
            'жь',
            'щ',
            'гу',
            'гъu',
            'дз',
            'дж'
        ]
    },
    tr: {
        etiket: '🇹🇷 Türkçe',
        tuslar: [
            'a',
            'b',
            'c',
            'ç',
            'd',
            'e',
            'f',
            'g',
            'ğ',
            'h',
            'ı',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'ö',
            'p',
            'r',
            's',
            'ş',
            't',
            'u',
            'ü',
            'v',
            'y',
            'z'
        ]
    },
    ru: {
        etiket: '🇷🇺 Русский',
        tuslar: [
            'а',
            'б',
            'в',
            'г',
            'д',
            'е',
            'ё',
            'ж',
            'з',
            'и',
            'й',
            'к',
            'л',
            'м',
            'н',
            'о',
            'п',
            'р',
            'с',
            'т',
            'у',
            'ф',
            'х',
            'ц',
            'ч',
            'ш',
            'щ',
            'ъ',
            'ы',
            'ь',
            'э',
            'ю',
            'я'
        ]
    },
    en: {
        etiket: '🇬🇧 English',
        tuslar: [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z'
        ]
    },
    ar: {
        etiket: '🇸🇦 العربية',
        tuslar: [
            'أ',
            'ب',
            'ت',
            'ث',
            'ج',
            'ح',
            'خ',
            'د',
            'ذ',
            'ر',
            'ز',
            'س',
            'ش',
            'ص',
            'ض',
            'ط',
            'ظ',
            'ع',
            'غ',
            'ف',
            'ق',
            'ك',
            'ل',
            'م',
            'ن',
            'هـ',
            'و',
            'ي'
        ]
    }
};
function AkilliKlavye({ inputRef, sorgu, setSorgu, metinBoyutu, karanlikMod }) {
    const [acik, setAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aktifDil, setAktifDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('adiyge');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const kayitliDil = localStorage.getItem('aktifKlavye');
        if (kayitliDil && KLAVYE_DUZENLERI[kayitliDil]) {
            setAktifDil(kayitliDil);
        }
    }, []);
    const dilDegistir = (dil)=>{
        setAktifDil(dil);
        localStorage.setItem('aktifKlavye', dil);
    };
    const harfEkle = (harf)=>{
        const input = inputRef.current;
        if (!input) {
            setSorgu((prev)=>prev + harf);
            return;
        }
        const baslangic = input.selectionStart ?? sorgu.length;
        const bitis = input.selectionEnd ?? sorgu.length;
        const yeniMetin = sorgu.substring(0, baslangic) + harf + sorgu.substring(bitis);
        setSorgu(yeniMetin);
        setTimeout(()=>{
            input.focus();
            input.setSelectionRange(baslangic + harf.length, baslangic + harf.length);
        }, 0);
    };
    const arkaPlan = karanlikMod ? '#1e293b' : '#ffffff';
    const kenarlik = karanlikMod ? '#475569' : '#cbd5e1';
    const yaziRengi = karanlikMod ? '#f8fafc' : '#0f172a';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: '16px',
            textAlign: 'left'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setAcik((prev)=>!prev),
                "aria-expanded": acik,
                "aria-label": "Sanal Klavyeyi Aç veya Kapat",
                style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1px solid ${kenarlik}`,
                    backgroundColor: arkaPlan,
                    color: yaziRengi,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: `${metinBoyutu * 0.85}px`
                },
                children: [
                    "⌨️ ",
                    acik ? 'Klavyeyi Gizle' : 'Akıllı Klavye'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AkilliKlavye.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            acik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '10px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: `1px solid ${kenarlik}`,
                    backgroundColor: arkaPlan,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '6px',
                            overflowX: 'auto',
                            paddingBottom: '10px',
                            marginBottom: '12px'
                        },
                        children: Object.keys(KLAVYE_DUZENLERI).map((dilKey)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>dilDegistir(dilKey),
                                style: {
                                    padding: '6px 12px',
                                    borderRadius: '16px',
                                    border: `1px solid ${aktifDil === dilKey ? '#2563eb' : kenarlik}`,
                                    backgroundColor: aktifDil === dilKey ? '#2563eb' : 'transparent',
                                    color: aktifDil === dilKey ? '#ffffff' : yaziRengi,
                                    fontSize: `${metinBoyutu * 0.8}px`,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                },
                                children: KLAVYE_DUZENLERI[dilKey].etiket
                            }, dilKey, false, {
                                fileName: "[project]/src/components/AkilliKlavye.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AkilliKlavye.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px'
                        },
                        children: KLAVYE_DUZENLERI[aktifDil].tuslar.map((harf, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onMouseDown: (e)=>e.preventDefault(),
                                onClick: ()=>harfEkle(harf),
                                style: {
                                    padding: '8px 12px',
                                    minWidth: '36px',
                                    borderRadius: '6px',
                                    border: `1px solid ${kenarlik}`,
                                    backgroundColor: karanlikMod ? '#334155' : '#f1f5f9',
                                    color: yaziRengi,
                                    fontSize: `${metinBoyutu * 0.9}px`,
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                },
                                children: harf
                            }, idx, false, {
                                fileName: "[project]/src/components/AkilliKlavye.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AkilliKlavye.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AkilliKlavye.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AkilliKlavye.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDictionary",
    ()=>useDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cleanHtml.ts [app-ssr] (ecmascript)");
;
;
const DEMO_SOZLUKLER = [
    {
        file: "adigece_turkce.json",
        title: "Demo Sözlük",
        total_words: 6,
        dialect: "BATI"
    }
];
const DEMO_KELIMELER = [
    {
        kelime: "псы",
        tanim: "su",
        kaynak_sozluk: "Demo",
        file: "demo",
        dialect: "BATI"
    },
    {
        kelime: "Ӏупэ",
        tanim: "kapı",
        kaynak_sozluk: "Demo",
        file: "demo",
        dialect: "BATI"
    },
    {
        kelime: "мафэ",
        tanim: "güneş / gün",
        kaynak_sozluk: "Demo",
        file: "demo",
        dialect: "BATI"
    }
];
function normalizeText(text) {
    if (!text || typeof text !== "string") return "";
    return text.normalize("NFC").toLocaleLowerCase("tr").trim();
}
function hashString(str) {
    let h = 0;
    for(let i = 0; i < str.length; i++){
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}
function getLanguageName(item) {
    if (item.language) return item.language;
    if (item.dialect === "BATI") return "Adıgece";
    if (item.dialect === "DOGU") return "Kabardeyce";
    return "Bilinmeyen";
}
function parseTanim(val) {
    if (Array.isArray(val?.definitions) && val.definitions.length > 0) {
        const meanings = val.definitions.map((d)=>typeof d === "string" ? d : d?.meaning || "").map((m)=>m.trim()).filter(Boolean);
        if (meanings.length > 0) {
            const tip = val?.type?.trim();
            const tipEki = tip ? `[${tip}] ` : "";
            return tipEki + meanings.join("\n");
        }
    }
    if (val?.full_definition_in_html) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["temizleHtml"])(val.full_definition_in_html);
    if (typeof val === "string") return val.trim();
    if (typeof val?.tanim === "string") return val.tanim.trim();
    if (typeof val?.meaning === "string") return val.meaning.trim();
    return "";
}
function parseDictionaryData(rawData, meta) {
    const wordsObj = rawData?.words || rawData;
    let parsed = [];
    if (Array.isArray(wordsObj)) {
        parsed = wordsObj.map((item)=>{
            const kelime = item?.kelime || item?.spelling || "";
            const tanim = item?.tanim ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["temizleHtml"])(item.tanim) : parseTanim(item);
            return {
                ...item,
                kelime,
                tanim,
                file: meta.file,
                kaynak_sozluk: meta.title,
                dialect: meta.dialect,
                normalizedKelime: normalizeText(kelime),
                normalizedTanim: normalizeText(tanim)
            };
        });
    } else if (typeof wordsObj === "object" && wordsObj !== null) {
        parsed = Object.entries(wordsObj).map(([key, val])=>{
            const kelime = val?.spelling || key;
            const tanim = parseTanim(val);
            return {
                kelime,
                tanim,
                file: meta.file,
                kaynak_sozluk: meta.title,
                dialect: meta.dialect,
                normalizedKelime: normalizeText(kelime),
                normalizedTanim: normalizeText(tanim)
            };
        });
    }
    return parsed.filter((item)=>item.kelime && item.tanim);
}
function useDictionary() {
    const [aktifSozlukler, setAktifSozlukler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawWords, setRawWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wordsCount, setWordsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliLehce, setSeciliLehce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [seciliDosya, setSeciliDosya] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [gununKelimesi, setGununKelimesi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const cacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const deferredSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchQuery);
    const loadOne = async (meta)=>{
        if (cacheRef.current[meta.file]) return cacheRef.current[meta.file];
        const res = await fetch(`/data/${meta.file}`);
        if (!res.ok) throw new Error(`${meta.file} 404`);
        const raw = await res.json();
        const result = parseDictionaryData(raw, meta);
        cacheRef.current[meta.file] = result;
        return result;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        async function init() {
            setLoading(true);
            // 1. Manifest yükle
            let manifest = [];
            try {
                const res = await fetch("/data/dictionaries.json");
                if (res.ok) manifest = await res.json();
            } catch  {
                console.warn("Manifest yüklenemedi.");
            }
            if (!Array.isArray(manifest) || manifest.length === 0) {
                manifest = DEMO_SOZLUKLER;
            }
            if (isMounted) setAktifSozlukler(manifest);
            // 2. Hedef sözlükleri belirle
            const hedef = seciliDosya !== "TUMU" ? manifest.filter((d)=>d.file === seciliDosya) : seciliLehce !== "TUMU" ? manifest.filter((d)=>d.dialect === seciliLehce) : manifest;
            if (hedef.length === 0) {
                if (isMounted) {
                    setRawWords(DEMO_KELIMELER);
                    setWordsCount(DEMO_KELIMELER.length);
                    setLoading(false);
                }
                return;
            }
            // 3. İlk 3 sözlüğü hemen yükle → ekran açılsın
            const ilkGrup = hedef.slice(0, 3);
            const kalanGrup = hedef.slice(3);
            let ilkKelimeler = [];
            const ilkSonuclar = await Promise.allSettled(ilkGrup.map(loadOne));
            ilkSonuclar.forEach((r)=>{
                if (r.status === "fulfilled") ilkKelimeler.push(...r.value);
            });
            if (!isMounted) return;
            if (ilkKelimeler.length === 0) {
                setRawWords(DEMO_KELIMELER);
                setWordsCount(DEMO_KELIMELER.length);
            } else {
                setRawWords(ilkKelimeler);
                setWordsCount(ilkKelimeler.length);
            }
            setLoading(false); // ← Ekran burada açılır
            // 4. Kalan sözlükleri batch'ler halinde arka planda yükle
            if (kalanGrup.length === 0) return;
            const BATCH = 4;
            let tumKelimeler = [
                ...ilkKelimeler
            ];
            for(let i = 0; i < kalanGrup.length; i += BATCH){
                if (!isMounted) return;
                const batch = kalanGrup.slice(i, i + BATCH);
                const sonuclar = await Promise.allSettled(batch.map(loadOne));
                const yeni = [];
                sonuclar.forEach((r)=>{
                    if (r.status === "fulfilled") yeni.push(...r.value);
                });
                if (yeni.length > 0 && isMounted) {
                    tumKelimeler = [
                        ...tumKelimeler,
                        ...yeni
                    ];
                    setRawWords([
                        ...tumKelimeler
                    ]);
                    setWordsCount(tumKelimeler.length);
                }
            }
        }
        init();
        return ()=>{
            isMounted = false;
        };
    }, [
        seciliDosya,
        seciliLehce
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (rawWords.length === 0) return;
        const today = new Date().toISOString().slice(0, 10);
        const idx = hashString(today) % rawWords.length;
        setGununKelimesi(rawWords[idx]);
    }, [
        rawWords
    ]);
    const filtrelenmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let veri = rawWords;
        if (seciliLehce !== "TUMU") veri = veri.filter((i)=>i.dialect === seciliLehce);
        if (seciliDosya !== "TUMU") veri = veri.filter((i)=>i.file === seciliDosya);
        if (deferredSearch.trim()) {
            const q = normalizeText(deferredSearch);
            veri = veri.filter((i)=>i.normalizedKelime?.includes(q) || i.normalizedTanim?.includes(q));
        }
        return veri;
    }, [
        rawWords,
        seciliLehce,
        seciliDosya,
        deferredSearch
    ]);
    const conceptRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const groups = new Map();
        filtrelenmisSonuclar.forEach((item)=>{
            const key = item.normalizedTanim || item.tanim;
            if (!groups.has(key)) groups.set(key, {});
            const row = groups.get(key);
            const lang = getLanguageName(item);
            row[lang] = item.kelime;
            if (!row["Türkçe"]) row["Türkçe"] = item.tanim.split(";")[0].trim();
        });
        return Array.from(groups.values());
    }, [
        filtrelenmisSonuclar
    ]);
    return {
        wordsCount,
        loading,
        searchQuery,
        setSearchQuery,
        seciliLehce,
        setSeciliLehce,
        seciliDosya,
        setSeciliDosya,
        gununKelimesi,
        filtrelenmisSonuclar,
        conceptRows,
        aktifSozlukler
    };
}
}),
"[project]/src/utils/cleanHtml.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "temizleHtml",
    ()=>temizleHtml
]);
const ENTITY_MAP = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&cent;": "¢",
    "&pound;": "£",
    "&yen;": "¥",
    "&euro;": "€",
    "&copy;": "©",
    "&reg;": "®"
};
function temizleHtml(html) {
    if (!html || typeof html !== "string") {
        return "";
    }
    let text = html.replace(/<\/(?:h[1-6]|p|div|li|tr)>/gi, "\n").replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity)=>{
        if (ENTITY_MAP[entity]) {
            return ENTITY_MAP[entity];
        }
        if (entity.startsWith("&#") && !entity.startsWith("&#x")) {
            const code = parseInt(entity.slice(2, -1), 10);
            return !isNaN(code) ? String.fromCharCode(code) : entity;
        }
        if (entity.startsWith("&#x")) {
            const code = parseInt(entity.slice(3, -1), 16);
            return !isNaN(code) ? String.fromCharCode(code) : entity;
        }
        return entity;
    });
    return text.replace(/[ \t]+/g, " ").replace(/\n\s*\n/g, "\n\n").trim();
}
}),
];

//# sourceMappingURL=_0h2ebnp._.js.map