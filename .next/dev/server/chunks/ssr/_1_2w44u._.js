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
const TUR_MAP = {
    verb: "Fiil",
    noun: "İsim",
    adjective: "Sıfat",
    adverb: "Zarf",
    "auxiliary verb": "Yardımcı Fiil",
    auxiliary: "Yardımcı Fiil",
    suffix: "Ek",
    "verbal suffix": "Fiil Eki",
    prefix: "Önek",
    preposition: "Edat",
    conjunction: "Bağlaç",
    pronoun: "Zamir"
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
    const benzersizAnlamlar = new Set();
    let turBilgisi = "";
    let kaynakBilgisi = kaynakParam || "";
    const kirilVarMi = /[\u0400-\u04FF]/.test(tanim);
    for (const satir of satirListesi){
        let temiz = satir.trim();
        if (!temiz) continue;
        if (/^definitions:?$/i.test(temiz)) continue;
        const typeMatch = temiz.match(/^type:\s*(.*)$/i);
        if (typeMatch) {
            const hamTur = typeMatch[1].trim();
            turBilgisi = TUR_MAP[hamTur.toLowerCase()] || hamTur;
            continue;
        }
        const sourceMatch = temiz.match(/^(?:source|kaynak):\s*(.*)$/i);
        if (sourceMatch) {
            kaynakBilgisi = sourceMatch[1].trim();
            continue;
        }
        temiz = temiz.replace(/^[\s•*\-\d\.\)]+/, "").trim();
        temiz = temiz.replace(/\s*\(.*?\)/g, "").trim();
        if (!temiz) continue;
        if (temizBaslik && normalizeText(temiz) === temizBaslik) continue;
        if (!temizBaslik && kirilVarMi && /^[a-zA-Z\s\-\'\"]+$/.test(temiz)) continue;
        if (!benzersizAnlamlar.has(temiz)) {
            benzersizAnlamlar.add(temiz);
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
                            color: gecerliTema.yaziAlt,
                            margin: "0 0 6px 0"
                        },
                        children: "📖 Karşılıklar"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 182,
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
                            lineNumber: 186,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Boolean(turBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: "8px",
                    borderTop: `1px solid ${gecerliTema.kenarlik}`,
                    fontSize: `${metinBoyutu * 0.85}px`,
                    color: gecerliTema.yaziAlt,
                    fontWeight: 500
                },
                children: [
                    "🏷 Tür: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: gecerliTema.yaziAna,
                            fontWeight: 600
                        },
                        children: turBilgisi
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 195,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Boolean(kaynakBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: turBilgisi ? "4px" : "8px",
                    borderTop: turBilgisi ? "none" : `1px solid ${gecerliTema.kenarlik}`,
                    fontSize: `${metinBoyutu * 0.8}px`,
                    color: gecerliTema.yaziAlt,
                    fontStyle: "italic"
                },
                children: [
                    "📚 Kaynak: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 500
                        },
                        children: kaynakBilgisi
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 201,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 200,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 179,
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
    // 🎯 0 KAYIT ENGELİ KALDIRILDI:
    const gruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const gruplar = new Map();
        filtrelenmisSonuclar.forEach((item)=>{
            const kelimeKey = item.kelime?.trim().toLowerCase();
            if (!kelimeKey) return;
            if (!gruplar.has(kelimeKey)) {
                gruplar.set(kelimeKey, []);
            }
            gruplar.get(kelimeKey).push(item);
        });
        return Array.from(gruplar.values()).map((kaynaklar)=>({
                kelime: kaynaklar[0].kelime,
                kaynaklar: kaynaklar
            }));
    }, [
        filtrelenmisSonuclar,
        searchQuery,
        mod,
        hedefDil,
        hedefDilBul
    ]);
    const handleSearchChange = (val)=>{
        setSearchQuery(val);
        setGoruntulenenAdet(LIMIT);
    };
    const harfEkle = (harf)=>{
        handleSearchChange(searchQuery + harf);
        setDuyuruMetni(`${harf} harfi eklendi.`);
        inputRef.current?.focus();
    };
    const panoyaKopyala = async (kelime, tanim, id)=>{
        const metin = `${kelime}\n${tanim || ""}`;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(metin);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = metin;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            if (id) setKopyalandiId(id);
            setDuyuruMetni(`${kelime} kelimesi panoya kopyalandı.`);
            setTimeout(()=>setKopyalandiId(null), 2000);
        } catch (err) {
            console.warn("Pano kopyalama engellendi:", err);
            setDuyuruMetni("Kopyalama başarısız oldu.");
        }
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
            lineNumber: 387,
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
                lineNumber: 398,
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
                                        src: "/logo/logo.png",
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
                                        lineNumber: 409,
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
                                                lineNumber: 416,
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
                                                lineNumber: 419,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 415,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 408,
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
                                        lineNumber: 426,
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
                                        lineNumber: 433,
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
                                        lineNumber: 440,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 425,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 407,
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
                                lineNumber: 453,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this),
                    !searchQuery.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setSeciliKelimeGrubu({
                                kelime: gununKelimesi.kelime || "",
                                dialect: gununKelimesi.dialect,
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
                                        lineNumber: 462,
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
                                        lineNumber: 466,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 461,
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
                                lineNumber: 471,
                                columnNumber: 13
                            }, this),
                            tanimlariBicimlendir(gununKelimesi.tanim, tema, gununKelimesi.kelime, metinBoyutu, kaynagiDuzenle(gununKelimesi.kaynak_sozluk))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 457,
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
                                lineNumber: 479,
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
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 482,
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
                                        lineNumber: 504,
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
                                            lineNumber: 508,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 499,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 478,
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
                                lineNumber: 516,
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
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 515,
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
                                lineNumber: 533,
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
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 534,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 532,
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
                        lineNumber: 541,
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
                                        lineNumber: 545,
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
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 544,
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
                                        lineNumber: 556,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "icinde",
                                        children: "İçinde Geçen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 557,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "tam",
                                        children: "Tam Eşleşen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 558,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 555,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 543,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                lineNumber: 563,
                                columnNumber: 18
                            }, this),
                            " kelime grubu bulundu."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-label": "Arama Sonuçları",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px"
                                },
                                children: gosterilenGruplar.map((g, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setSeciliKelimeGrubu(g),
                                        style: {
                                            padding: "16px",
                                            backgroundColor: tema.kartArkaPlan,
                                            border: `1px solid ${tema.kenarlik}`,
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            margin: 0,
                                                            fontSize: `${metinBoyutu * 1.1}px`,
                                                            color: tema.yaziAna
                                                        },
                                                        children: g.kelime
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            panoyaKopyala(g.kelime, g.kaynaklar[0]?.tanim, `g-${idx}`);
                                                        },
                                                        style: {
                                                            padding: "4px 8px",
                                                            fontSize: "12px",
                                                            border: `1px solid ${tema.kenarlik}`,
                                                            backgroundColor: "transparent",
                                                            color: tema.yaziAlt,
                                                            borderRadius: "4px",
                                                            cursor: "pointer"
                                                        },
                                                        children: kopyalandiId === `g-${idx}` ? "✓ Kopyalandı" : "📋 Kopyala"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 576,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 574,
                                                columnNumber: 17
                                            }, this),
                                            tanimlariBicimlendir(g.kaynaklar[0]?.tanim, tema, g.kelime, metinBoyutu, kaynagiDuzenle(g.kaynaklar[0]?.file || g.kaynaklar[0]?.kaynak_sozluk))
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 567,
                                columnNumber: 11
                            }, this),
                            dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setGoruntulenenAdet((prev)=>prev + LIMIT),
                                style: {
                                    marginTop: "20px",
                                    width: "100%",
                                    padding: "12px",
                                    backgroundColor: KURUMSAL.kirmizi,
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                },
                                children: [
                                    "Daha Fazla Göster (",
                                    gruplanmisSonuclar.length - goruntulenenAdet,
                                    " kalan)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 589,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this),
                    seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "flex-end",
                            zIndex: 1000
                        },
                        onClick: ()=>setSeciliKelimeGrubu(null),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: drawerRef,
                            style: {
                                width: "100%",
                                maxWidth: "480px",
                                backgroundColor: tema.kartArkaPlan,
                                height: "100%",
                                padding: "24px",
                                overflowY: "auto",
                                boxShadow: "-4px 0 16px rgba(0,0,0,0.15)"
                            },
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "16px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                color: tema.yaziAna,
                                                margin: 0,
                                                fontSize: `${metinBoyutu * 1.3}px`
                                            },
                                            children: seciliKelimeGrubu.kelime
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 628,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            ref: drawerKapatBtnRef,
                                            onClick: ()=>setSeciliKelimeGrubu(null),
                                            style: {
                                                padding: "8px 12px",
                                                border: `1px solid ${tema.kenarlik}`,
                                                borderRadius: "6px",
                                                backgroundColor: "transparent",
                                                color: tema.yaziAna,
                                                cursor: "pointer"
                                            },
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 629,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 627,
                                    columnNumber: 15
                                }, this),
                                seciliKelimeGrubu.kaynaklar.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "20px",
                                            paddingBottom: "16px",
                                            borderBottom: `1px solid ${tema.kenarlik}`
                                        },
                                        children: tanimlariBicimlendir(item.tanim, tema, seciliKelimeGrubu.kelime, metinBoyutu, kaynagiDuzenle(item.file || item.kaynak_sozluk))
                                    }, index, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 17
                                    }, this)),
                                benzerKelimeler.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "24px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: tema.yaziAlt,
                                                marginBottom: "8px",
                                                fontSize: `${metinBoyutu * 0.9}px`
                                            },
                                            children: "Benzer Kelimeler"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "8px",
                                                flexWrap: "wrap"
                                            },
                                            children: benzerKelimeler.map((bKelime, bIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSearchQuery(bKelime);
                                                        setSeciliKelimeGrubu(null);
                                                    },
                                                    style: {
                                                        padding: "6px 10px",
                                                        border: `1px solid ${tema.kenarlik}`,
                                                        borderRadius: "6px",
                                                        backgroundColor: tema.inputArkaPlan,
                                                        color: tema.yaziAna,
                                                        cursor: "pointer",
                                                        fontSize: `${metinBoyutu * 0.85}px`
                                                    },
                                                    children: bKelime
                                                }, bIdx, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 649,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 647,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 645,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 614,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 600,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 406,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 397,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
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
"[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
];

//# sourceMappingURL=_1_2w44u._.js.map