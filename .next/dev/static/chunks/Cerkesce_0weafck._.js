(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Cerkesce/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../src/compenents/AkilliKlavye'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$lib$2f$DictionaryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/src/lib/DictionaryService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const BATI_SOZLUKLERI = {
    "0.Ady-Ady_AIG.json": "Adıgece Açıklamalı Sözlük — Адыгабзэм изэхэф гущı1алъ (2006)",
    "1.Ady-Ady_AP.json": "Adıgece-Rusça Sözlük — Prof. Dr. Mirabil L. Apaşev (2008)",
    "2.Ady-Ara.json": "Adıgece-Arapça Sözlük — Dr. Adel Abdulsalam Lash (2013)",
    "3.Ady-En.json": "Adıgece-İngilizce Sözlük — Адыгэбзэ-инджылыбзэ гущı1алъэ",
    "4.Ady-En_Adam.json": "Adam Shagash Adıgece-İngilizce Sözlük (2020)",
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
function Home() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sorgu, setSorgu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dailyWord, setDailyWord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Arama ve Filtreleme Durumları
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [lehceFiltresi, setLehceFiltresi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tumu");
    // Sayfalama Durumu
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(LIMIT);
    // Görünüm ve Erişilebilirlik
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(16);
    const [kopyalandiId, setKopyalandiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [duyuruMetni, setDuyuruMetni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Seçili Öğeler ve DOM Referansları
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawerKapatBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sonOdaklanilanElemanRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ozelKarakterler = [
        "Ӏ",
        "I",
        "а",
        "э",
        "гь",
        "кь"
    ];
    // 1. JSON Sözlük Verilerini dictionaryService Üzerinden Yükleme
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const kayitliKaranlik = localStorage.getItem("darkMode");
            if (kayitliKaranlik) {
                setKaranlikMod(JSON.parse(kayitliKaranlik));
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$lib$2f$DictionaryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadDictionary"])("0.Ady-Ady_AIG.json").then({
                "Home.useEffect": (dictionary)=>{
                    setData(dictionary);
                    setDailyWord((0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$lib$2f$DictionaryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyWordFromJSON"])(dictionary));
                    setLoading(false);
                }
            }["Home.useEffect"]).catch({
                "Home.useEffect": (err)=>{
                    console.error("Veri yükleme hatası:", err);
                    setLoading(false);
                }
            }["Home.useEffect"]);
        }
    }["Home.useEffect"], []);
    const toggleKaranlikMod = ()=>{
        setKaranlikMod((prev)=>{
            const yeniDurum = !prev;
            localStorage.setItem("darkMode", JSON.stringify(yeniDurum));
            setDuyuruMetni(yeniDurum ? "Karanlık tema açıldı." : "Aydınlık tema açıldı.");
            return yeniDurum;
        });
    };
    // Detay Paneli (Drawer) Klavye Kontrolleri
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const handleKeyDown = {
                "Home.useEffect.handleKeyDown": (e)=>{
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
                }
            }["Home.useEffect.handleKeyDown"];
            if (seciliKelimeGrubu) {
                sonOdaklanilanElemanRef.current = document.activeElement;
                window.addEventListener("keydown", handleKeyDown);
                setTimeout({
                    "Home.useEffect": ()=>drawerKapatBtnRef.current?.focus()
                }["Home.useEffect"], 50);
            } else {
                sonOdaklanilanElemanRef.current?.focus();
            }
            return ({
                "Home.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        seciliKelimeGrubu
    ]);
    const kaynagiDuzenle = (dosyaAdi)=>!dosyaAdi ? "" : KAYNAK_HARITASI[dosyaAdi] || dosyaAdi;
    const lehceBul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[lehceBul]": (dosyaAdi)=>{
            if (!dosyaAdi) return null;
            if (dosyaAdi in BATI_SOZLUKLERI) return {
                etiket: "Batı Adıgece",
                kod: "bati",
                renk: "#16a34a"
            };
            if (dosyaAdi in DOGU_SOZLUKLERI) return {
                etiket: "Doğu Kabardeyce",
                kod: "dogu",
                renk: "#2563eb"
            };
            return null;
        }
    }["Home.useCallback[lehceBul]"], []);
    const hedefDilBul = (dosyaAdi)=>{
        if (!dosyaAdi) return "diger";
        const isim = dosyaAdi.toLowerCase();
        if (isim.includes("tur") || isim.includes("tu-")) return "tr";
        if (isim.includes("ara") || isim.includes("-ar")) return "ar";
        if (isim.includes("en") || isim.includes("kbd-en")) return "en";
        if (isim.includes("rus") || isim.includes("ru-")) return "ru";
        return "diger";
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: KURUMSAL.kirmizi,
                        margin: "0 4px",
                        fontWeight: "bold"
                    },
                    children: "◊"
                }, index, false, {
                    fileName: "[project]/Cerkesce/app/page.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this);
            }
            if (parca.startsWith("-") && parca.endsWith(":")) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: aktifTema.yaziAna,
                        fontWeight: "700"
                    },
                    children: [
                        parca,
                        " "
                    ]
                }, index, true, {
                    fileName: "[project]/Cerkesce/app/page.tsx",
                    lineNumber: 227,
                    columnNumber: 11
                }, this);
            }
            return parca;
        });
    };
    const tanimlariBicimlendir = (tanimMetni, aktifTema)=>{
        if (!tanimMetni || tanimMetni === "Tanım yok") return null;
        const maddeler = tanimMetni.split(/;|\n/).map((item)=>item.trim()).filter(Boolean);
        if (maddeler.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                marginTop: "8px",
                marginBottom: "8px",
                textAlign: "left"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    style: {
                        fontSize: `${metinBoyutu * 0.85}px`,
                        fontWeight: "600",
                        color: aktifTema?.yaziAlt,
                        marginBottom: "6px"
                    },
                    children: "Tanımlar:"
                }, void 0, false, {
                    fileName: "[project]/Cerkesce/app/page.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    style: {
                        paddingLeft: "22px",
                        margin: 0
                    },
                    children: maddeler.map((madde, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: {
                                color: aktifTema?.yaziAna,
                                fontSize: `${metinBoyutu * 0.95}px`,
                                lineHeight: "1.6",
                                marginBottom: "4px"
                            },
                            children: metniVurgula(madde, aktifTema)
                        }, idx, false, {
                            fileName: "[project]/Cerkesce/app/page.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Cerkesce/app/page.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Cerkesce/app/page.tsx",
            lineNumber: 243,
            columnNumber: 7
        }, this);
    };
    // 2. Bellek İçi Arama ve Gruplama (searchInJSON tabanlı)
    const filtrelenmisVeGruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[filtrelenmisVeGruplanmisSonuclar]": ()=>{
            if (!sorgu.trim()) return [];
            let sonucHavuzu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$lib$2f$DictionaryService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchInJSON"])(data, sorgu);
            if (mod === "baslayan") {
                sonucHavuzu = sonucHavuzu.filter({
                    "Home.useMemo[filtrelenmisVeGruplanmisSonuclar]": (item)=>item.kelime.toLowerCase().startsWith(sorgu.trim().toLowerCase())
                }["Home.useMemo[filtrelenmisVeGruplanmisSonuclar]"]);
            } else if (mod === "tam") {
                sonucHavuzu = sonucHavuzu.filter({
                    "Home.useMemo[filtrelenmisVeGruplanmisSonuclar]": (item)=>item.kelime.toLowerCase() === sorgu.trim().toLowerCase()
                }["Home.useMemo[filtrelenmisVeGruplanmisSonuclar]"]);
            }
            const filtrelenmis = sonucHavuzu.filter({
                "Home.useMemo[filtrelenmisVeGruplanmisSonuclar].filtrelenmis": (item)=>{
                    const kaynak = item.kaynak_sozluk || item.kaynak;
                    if (lehceFiltresi !== "tumu" && kaynak) {
                        const lehce = lehceBul(kaynak);
                        if (lehce?.kod !== lehceFiltresi) return false;
                    }
                    if (hedefDil !== "tumu" && kaynak) {
                        const dil = hedefDilBul(kaynak);
                        if (dil !== hedefDil) return false;
                    }
                    return true;
                }
            }["Home.useMemo[filtrelenmisVeGruplanmisSonuclar].filtrelenmis"]);
            const gruplar = {};
            filtrelenmis.forEach({
                "Home.useMemo[filtrelenmisVeGruplanmisSonuclar]": (item)=>{
                    const kelimeKey = (item.kelime || "").toLowerCase().trim();
                    if (!kelimeKey) return;
                    if (!gruplar[kelimeKey]) gruplar[kelimeKey] = [];
                    gruplar[kelimeKey].push(item);
                }
            }["Home.useMemo[filtrelenmisVeGruplanmisSonuclar]"]);
            return Object.entries(gruplar).map({
                "Home.useMemo[filtrelenmisVeGruplanmisSonuclar]": ([_, kaynaklar])=>({
                        kelime: kaynaklar[0].kelime,
                        kaynaklar
                    })
            }["Home.useMemo[filtrelenmisVeGruplanmisSonuclar]"]);
        }
    }["Home.useMemo[filtrelenmisVeGruplanmisSonuclar]"], [
        data,
        sorgu,
        mod,
        lehceFiltresi,
        hedefDil,
        lehceBul
    ]);
    const handleSearchChange = (val)=>{
        setSorgu(val);
        setGoruntulenenAdet(LIMIT);
    };
    const harfEkle = (harf)=>{
        setSorgu((prev)=>{
            const yeni = prev + harf;
            setGoruntulenenAdet(LIMIT);
            return yeni;
        });
        setDuyuruMetni(`${harf} harfi eklendi.`);
        if (inputRef.current) inputRef.current.focus();
    };
    const dahaFazlaYukle = ()=>{
        setGoruntulenenAdet((prev)=>prev + LIMIT);
    };
    // Benzer Kelimeler (Seçili kelimeye göre bellek içi arama)
    const benzerKelimeler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[benzerKelimeler]": ()=>{
            if (!seciliKelimeGrubu || !seciliKelimeGrubu.kelime) return [];
            const kok = seciliKelimeGrubu.kelime.slice(0, 3).toLowerCase();
            if (!kok) return [];
            const eslesenler = data.filter({
                "Home.useMemo[benzerKelimeler].eslesenler": (w)=>w.kelime.toLowerCase().startsWith(kok) && w.kelime.toLowerCase() !== seciliKelimeGrubu.kelime.toLowerCase()
            }["Home.useMemo[benzerKelimeler].eslesenler"]).map({
                "Home.useMemo[benzerKelimeler].eslesenler": (w)=>w.kelime
            }["Home.useMemo[benzerKelimeler].eslesenler"]);
            return Array.from(new Set(eslesenler)).slice(0, 8);
        }
    }["Home.useMemo[benzerKelimeler]"], [
        seciliKelimeGrubu,
        data
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: "#64748b"
            },
            children: "📖 Sözlük yükleniyor..."
        }, void 0, false, {
            fileName: "[project]/Cerkesce/app/page.tsx",
            lineNumber: 352,
            columnNumber: 7
        }, this);
    }
    const gosterilenGruplar = filtrelenmisVeGruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = filtrelenmisVeGruplanmisSonuclar.length > goruntulenenAdet;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: tema.arkaPlan,
            minHeight: "100vh",
            padding: "24px 16px",
            transition: "background-color 0.2s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 365,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: "840px",
                    margin: "0 auto",
                    fontFamily: "system-ui, -apple-system, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 387,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    color: tema.yaziAna,
                                                    margin: 0,
                                                    fontSize: `${metinBoyutu * 1.5}px`
                                                },
                                                children: "📖 Çerkesçe Sözlük"
                                            }, void 0, false, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 390,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "center"
                                },
                                role: "toolbar",
                                "aria-label": "Görünüm kontrolleri",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMetinBoyutu((p)=>{
                                                const yeni = Math.max(14, p - 2);
                                                setDuyuruMetni(`Yazı boyutu küçültüldü: ${yeni} piksel`);
                                                return yeni;
                                            });
                                        },
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMetinBoyutu((p)=>{
                                                const yeni = Math.min(24, p + 2);
                                                setDuyuruMetni(`Yazı boyutu büyütüldü: ${yeni} piksel`);
                                                return yeni;
                                            });
                                        },
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: tema.yaziAlt,
                            fontSize: `${metinBoyutu * 0.9}px`,
                            marginBottom: "20px"
                        },
                        children: [
                            "// ✅ Doğru 📚 33 sözlük • 📖 ",
                            (data?.length ?? 0).toLocaleString("tr-TR"),
                            "+ kayıt"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this),
                    !sorgu.trim() && dailyWord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setSeciliKelimeGrubu({
                                kelime: dailyWord.kelime,
                                kaynaklar: [
                                    dailyWord
                                ]
                            }),
                        style: {
                            padding: "14px",
                            backgroundColor: karanlikMod ? "#1e293b" : "#e0f2fe",
                            borderLeft: "5px solid #0284c7",
                            borderRadius: "6px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                            cursor: "pointer",
                            textAlign: "left"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                style: {
                                    color: "#0369a1",
                                    fontWeight: "bold",
                                    letterSpacing: "0.5px"
                                },
                                children: "🌟 GÜNÜN KELİMESİ"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginTop: "4px",
                                    color: tema.yaziAna
                                },
                                children: dailyWord.kelime
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 459,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: "4px",
                                    color: tema.yaziAlt,
                                    fontSize: "15px"
                                },
                                children: dailyWord.tanim || dailyWord.anlam
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, this),
                            dailyWord.kaynak_sozluk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                style: {
                                    color: tema.yaziAlt,
                                    display: "block",
                                    marginTop: "6px",
                                    fontSize: "12px"
                                },
                                children: [
                                    "📚 Kaynak: ",
                                    kaynagiDuzenle(dailyWord.kaynak_sozluk)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 466,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        style: {
                            border: "none",
                            padding: 0,
                            margin: "0 0 16px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.85}px`,
                                    fontWeight: "600",
                                    color: tema.yaziAlt,
                                    marginBottom: "8px"
                                },
                                children: "Hedef Dil Filtresi:"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 475,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((dil)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setHedefDil(dil.kod),
                                        "aria-pressed": hedefDil === dil.kod,
                                        style: {
                                            padding: "8px 14px",
                                            fontSize: `${metinBoyutu * 0.85}px`,
                                            fontWeight: hedefDil === dil.kod ? "bold" : "normal",
                                            borderRadius: "20px",
                                            border: `2px solid ${hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kenarlik}`,
                                            backgroundColor: hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                                            color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: dil.etiket
                                    }, dil.kod, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 486,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 478,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        style: {
                            border: "none",
                            padding: 0,
                            margin: "0 0 16px 0"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.85}px`,
                                    fontWeight: "600",
                                    color: tema.yaziAlt,
                                    marginBottom: "8px"
                                },
                                children: "Çerkesçe Hızlı Harfler:"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 509,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap"
                                },
                                children: ozelKarakterler.map((harf, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>harfEkle(harf),
                                        "aria-label": `Arama kutusuna ${harf} karakterini ekle`,
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 508,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AkilliKlavye, {
                        inputRef: inputRef,
                        sorgu: sorgu,
                        setSorgu: handleSearchChange,
                        metinBoyutu: metinBoyutu,
                        karanlikMod: karanlikMod
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 536,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "10px",
                            marginBottom: "16px",
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: "1 1 240px",
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "arama-input",
                                        style: {
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            overflow: "hidden",
                                            clip: "rect(0,0,0,0)"
                                        },
                                        children: "Kelime Arayın"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "arama-input",
                                        ref: inputRef,
                                        type: "search",
                                        value: sorgu,
                                        onChange: (e)=>handleSearchChange(e.target.value),
                                        placeholder: "Kelime veya anlam ara...",
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 13
                                    }, this),
                                    sorgu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            handleSearchChange("");
                                            inputRef.current?.focus();
                                        },
                                        "aria-label": "Arama metnini temizle",
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
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 570,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "arama-modu-sec",
                                style: {
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    overflow: "hidden",
                                    clip: "rect(0,0,0,0)"
                                },
                                children: "Arama Yöntemi"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 593,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "arama-modu-sec",
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "baslayan",
                                        children: "İle Başlayan"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 608,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "icinde",
                                        children: "İçinde Geçen"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 609,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "tam",
                                        children: "Tam Eşleşen"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 610,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 594,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "lehce-sec",
                                style: {
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    overflow: "hidden",
                                    clip: "rect(0,0,0,0)"
                                },
                                children: "Lehçe Seçimi"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 613,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "lehce-sec",
                                value: lehceFiltresi,
                                onChange: (e)=>setLehceFiltresi(e.target.value),
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "tumu",
                                        children: "🌐 Tüm Lehçeler"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 628,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "bati",
                                        children: "🟢 Batı Adıgece"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 629,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "dogu",
                                        children: "🔵 Doğu Kabardeyce"
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, this),
                    sorgu.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: tema.yaziAlt,
                            fontSize: `${metinBoyutu * 0.9}px`,
                            marginBottom: "16px"
                        },
                        role: "status",
                        children: [
                            "Toplam ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: filtrelenmisVeGruplanmisSonuclar.length
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 637,
                                columnNumber: 20
                            }, this),
                            " kelime grubu bulundu."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 636,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-label": "Arama Sonuçları",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px"
                            },
                            children: [
                                gosterilenGruplar.map((grup, index)=>{
                                    const ilkKaynak = grup.kaynaklar[0];
                                    const kaynakDosya = ilkKaynak.kaynak_sozluk || ilkKaynak.kaynak;
                                    const lehceBilgisi = lehceBul(kaynakDosya);
                                    const benzersizKey = `grup_${grup.kelime}_${index}`;
                                    const tanimGosterilecek = ilkKaynak.tanim || ilkKaynak.anlam;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        style: {
                                            padding: "20px",
                                            borderRadius: "8px",
                                            backgroundColor: tema.kartArkaPlan,
                                            border: `1px solid ${tema.kenarlik}`,
                                            position: "relative",
                                            textAlign: "left"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    gap: "12px",
                                                    marginBottom: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            margin: 0,
                                                            color: tema.yaziAna,
                                                            fontWeight: "bold",
                                                            fontSize: `${metinBoyutu * 1.3}px`
                                                        },
                                                        children: grup.kelime
                                                    }, void 0, false, {
                                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            grup.kaynaklar.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                                    fontWeight: "bold",
                                                                    color: "#ffffff",
                                                                    backgroundColor: KURUMSAL.kirmizi,
                                                                    padding: "4px 8px",
                                                                    borderRadius: "12px"
                                                                },
                                                                children: [
                                                                    grup.kaynaklar.length,
                                                                    " Sözlük"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 25
                                                            }, this),
                                                            lehceBilgisi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                                    fontWeight: "bold",
                                                                    color: lehceBilgisi.renk,
                                                                    backgroundColor: `${lehceBilgisi.renk}15`,
                                                                    padding: "4px 8px",
                                                                    borderRadius: "12px",
                                                                    border: `1px solid ${lehceBilgisi.renk}`
                                                                },
                                                                children: lehceBilgisi.etiket
                                                            }, void 0, false, {
                                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>panoyaKopyala(ilkKaynak.kelime, tanimGosterilecek, benzersizKey),
                                                                "aria-label": `${ilkKaynak.kelime} kelimesini ve tanımını panoya kopyala`,
                                                                title: "Panoya Kopyala",
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
                                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                                lineNumber: 681,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 19
                                            }, this),
                                            tanimlariBicimlendir(tanimGosterilecek, tema),
                                            kaynakDosya && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    kaynagiDuzenle(kaynakDosya)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 695,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "14px",
                                                    textAlign: "right"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSeciliKelimeGrubu(grup),
                                                    "aria-label": `${grup.kelime} kelimesinin tüm sözlük karşılaştırmalarını aç`,
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
                                                    children: "Tüm Kaynakları İncele →"
                                                }, void 0, false, {
                                                    fileName: "[project]/Cerkesce/app/page.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 700,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, benzersizKey, true, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 652,
                                        columnNumber: 17
                                    }, this);
                                }),
                                dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: dahaFazlaYukle,
                                    "aria-label": "Sonraki 20 sonucu listeye ekle",
                                    style: {
                                        padding: "14px",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        border: "none",
                                        backgroundColor: KURUMSAL.kirmizi,
                                        color: "#ffffff",
                                        fontWeight: "bold",
                                        fontSize: `${metinBoyutu}px`,
                                        cursor: "pointer"
                                    },
                                    children: "Daha Fazla Sonuç Göster"
                                }, void 0, false, {
                                    fileName: "[project]/Cerkesce/app/page.tsx",
                                    lineNumber: 723,
                                    columnNumber: 15
                                }, this),
                                sorgu && filtrelenmisVeGruplanmisSonuclar.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        textAlign: "center",
                                        color: tema.yaziAlt,
                                        fontSize: `${metinBoyutu}px`
                                    },
                                    role: "status",
                                    children: "Aradığınız ölçüte uygun sonuç bulunamadı."
                                }, void 0, false, {
                                    fileName: "[project]/Cerkesce/app/page.tsx",
                                    lineNumber: 743,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Cerkesce/app/page.tsx",
                            lineNumber: 643,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 642,
                        columnNumber: 9
                    }, this),
                    seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-labelledby": "drawer-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSeciliKelimeGrubu(null),
                                "aria-hidden": "true",
                                style: {
                                    position: "fixed",
                                    inset: 0,
                                    background: "rgba(0,0,0,0.6)",
                                    backdropFilter: "blur(2px)",
                                    zIndex: 1000
                                }
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 753,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: drawerRef,
                                style: {
                                    position: "fixed",
                                    top: 0,
                                    right: 0,
                                    width: "520px",
                                    maxWidth: "92%",
                                    height: "100vh",
                                    backgroundColor: tema.kartArkaPlan,
                                    color: tema.yaziAna,
                                    zIndex: 1001,
                                    boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflowY: "auto",
                                    padding: "24px",
                                    boxSizing: "border-box"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "20px",
                                            borderBottom: `1px solid ${tema.kenarlik}`,
                                            paddingBottom: "12px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                id: "drawer-title",
                                                style: {
                                                    margin: 0,
                                                    fontSize: `${metinBoyutu * 1.4}px`,
                                                    color: tema.yaziAna
                                                },
                                                children: seciliKelimeGrubu.kelime
                                            }, void 0, false, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 781,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                ref: drawerKapatBtnRef,
                                                onClick: ()=>setSeciliKelimeGrubu(null),
                                                "aria-label": "Detay panelini kapat",
                                                style: {
                                                    background: "transparent",
                                                    border: "none",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    color: tema.yaziAlt,
                                                    padding: "4px 8px"
                                                },
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 784,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 780,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "16px"
                                        },
                                        children: [
                                            seciliKelimeGrubu.kaynaklar.map((kaynak, idx)=>{
                                                const kaynakDosya = kaynak.kaynak_sozluk || kaynak.kaynak;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: "16px",
                                                        borderRadius: "8px",
                                                        backgroundColor: tema.inputArkaPlan,
                                                        border: `1px solid ${tema.kenarlik}`
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: `${metinBoyutu * 0.85}px`,
                                                                fontWeight: "bold",
                                                                color: KURUMSAL.kirmizi,
                                                                marginBottom: "6px"
                                                            },
                                                            children: [
                                                                "📚 ",
                                                                kaynagiDuzenle(kaynakDosya)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Cerkesce/app/page.tsx",
                                                            lineNumber: 815,
                                                            columnNumber: 23
                                                        }, this),
                                                        tanimlariBicimlendir(kaynak.tanim || kaynak.anlam, tema)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/Cerkesce/app/page.tsx",
                                                    lineNumber: 806,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            benzerKelimeler.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "20px",
                                                    borderTop: `1px solid ${tema.kenarlik}`,
                                                    paddingTop: "16px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            margin: "0 0 10px 0",
                                                            fontSize: `${metinBoyutu * 0.9}px`,
                                                            color: tema.yaziAlt
                                                        },
                                                        children: "🔗 Benzer Kelimeler:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                                        lineNumber: 826,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: "8px"
                                                        },
                                                        children: benzerKelimeler.map((benzer, bIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    handleSearchChange(benzer);
                                                                    setSeciliKelimeGrubu(null);
                                                                },
                                                                style: {
                                                                    padding: "6px 12px",
                                                                    borderRadius: "16px",
                                                                    border: `1px solid ${tema.kenarlik}`,
                                                                    backgroundColor: tema.kartArkaPlan,
                                                                    color: tema.yaziAna,
                                                                    fontSize: `${metinBoyutu * 0.8}px`,
                                                                    cursor: "pointer"
                                                                },
                                                                children: benzer
                                                            }, bIdx, false, {
                                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                                lineNumber: 831,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                                        lineNumber: 829,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Cerkesce/app/page.tsx",
                                                lineNumber: 825,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 802,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 759,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Cerkesce/app/page.tsx",
        lineNumber: 362,
        columnNumber: 5
    }, this);
}
_s(Home, "c1/C2H08iyG7poNvOushyl+dUF8=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Cerkesce/src/lib/DictionaryService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// DictionaryItem is defined locally because the current dictionary types module
// does not export it.
__turbopack_context__.s([
    "dictionaryService",
    ()=>dictionaryService,
    "getDailyWordFromJSON",
    ()=>getDailyWordFromJSON,
    "loadDictionary",
    ()=>loadDictionary,
    "normalizeDictionaryData",
    ()=>normalizeDictionaryData,
    "searchInJSON",
    ()=>searchInJSON
]);
function normalizeDictionaryData(raw, meta) {
    if (!raw) return [];
    // 🎯 SIFIR HATA GÜVENLİK DUVARI: meta her ne koşulda olursa olsun undefined gelse dahi çökmez
    const safeMeta = {
        file: meta?.file || "veri.json",
        title: meta?.title || "İsimsiz Sözlük",
        author: meta?.author || "",
        publisher: meta?.publisher || "",
        year: meta?.year || "",
        dialect: meta?.dialect || "BATI"
    };
    let list = [];
    // A) Veri Kaynağını Otomatik Tespit Et
    if (Array.isArray(raw)) {
        list = raw;
    } else if (typeof raw === "object" && raw !== null) {
        const source = raw.words && typeof raw.words === "object" ? raw.words : raw;
        if (Array.isArray(source)) {
            list = source;
        } else {
            list = Object.entries(source).map(([key, val])=>{
                if (typeof val === "string") {
                    return {
                        kelime: key,
                        tanim: val
                    };
                }
                if (typeof val === "object" && val !== null) {
                    return {
                        kelime: val.spelling || val.kelime || val.word || key,
                        tanim: val.full_definition_in_html || val.tanim || val.definition || val.meaning || ""
                    };
                }
                return null;
            }).filter(Boolean);
        }
    }
    // B) Elemanları Standardize Et, HTML Temizle ve Künye Ekle
    return list.map((item)=>{
        if (!item) return null;
        const rawKelime = item.kelime || item.spelling || item.word || "";
        let rawTanim = item.tanim || item.full_definition_in_html || item.definition || item.meaning || "";
        if (typeof rawTanim === "string" && rawTanim.includes("<")) {
            rawTanim = rawTanim.replace(/<[^>]*>?/gm, "").trim();
        }
        const kelime = String(rawKelime).trim();
        const tanim = String(rawTanim).trim();
        if (!kelime || !tanim) return null;
        return {
            kelime,
            tanim,
            kaynak_sozluk: safeMeta.title,
            author: safeMeta.author,
            publisher: safeMeta.publisher,
            year: safeMeta.year,
            file: safeMeta.file,
            dialect: safeMeta.dialect
        };
    }).filter((item)=>item !== null);
}
async function loadDictionary(fileName, meta) {
    const res = await fetch(`/data/${fileName}`);
    if (!res.ok) throw new Error(`${fileName} verisi okunamadı.`);
    const raw = await res.json();
    return normalizeDictionaryData(raw, meta);
}
function searchInJSON(data, query, limit = 50) {
    if (!Array.isArray(data)) return [];
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return data.filter((item)=>item.kelime?.toLowerCase().includes(clean) || item.tanim?.toLowerCase().includes(clean)).slice(0, limit);
}
function getDailyWordFromJSON(data) {
    if (!Array.isArray(data) || data.length === 0) return null;
    const today = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for(let i = 0; i < today.length; i++)hash += today.charCodeAt(i);
    return data[Math.abs(hash) % data.length];
}
// ==========================================
// 2. CLASS TABANLI SERVİS (Bellek Önbellekli)
// ==========================================
class DictionaryService {
    cache = new Map();
    async loadDictionary(fileName, meta) {
        if (this.cache.has(fileName)) {
            return this.cache.get(fileName);
        }
        const data = await loadDictionary(fileName, meta);
        this.cache.set(fileName, data);
        return data;
    }
    async search(query, fileName, meta, limit = 50) {
        const data = await this.loadDictionary(fileName, meta);
        return searchInJSON(data, query, limit);
    }
    async getDailyWord(fileName, meta) {
        const data = await this.loadDictionary(fileName, meta);
        return getDailyWordFromJSON(data);
    }
}
const dictionaryService = new DictionaryService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Cerkesce_0weafck._.js.map