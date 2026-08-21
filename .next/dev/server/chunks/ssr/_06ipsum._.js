module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SozlukEkrani$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SozlukEkrani.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Home() {
    const dictionary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDictionary"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SozlukEkrani$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        loading: dictionary.loading,
        searchQuery: dictionary.searchQuery,
        setSearchQuery: dictionary.setSearchQuery,
        seciliLehce: dictionary.seciliLehce,
        setSeciliLehce: dictionary.setSeciliLehce,
        seciliDosya: dictionary.seciliDosya,
        setSeciliDosya: dictionary.setSeciliDosya,
        gununKelimesi: dictionary.gununKelimesi,
        filtrelenmisSonuclar: dictionary.filtrelenmisSonuclar,
        aktifSozlukler: dictionary.aktifSozlukler,
        wordsCount: dictionary.wordsCount || 428679
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/src/components/SozlukEkrani.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SozlukEkrani
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function SozlukEkrani({ loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler, wordsCount = 428679 }) {
    const [metinBoyutu, setMetinBoyutu] = useState(16);
    const [karanlikMod, setKaranlikMod] = useState(false);
    const [mod, setMod] = useState("baslayan");
    const [hedefDil, setHedefDil] = useState("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = useState(20);
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = useState(null);
    const [kopyalandiId, setKopyalandiId] = useState(null);
    const inputRef = useRef(null);
    useEffect(()=>{
        if (karanlikMod) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [
        karanlikMod
    ]);
    const aktifTema = useMemo(()=>({
            arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
            kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
            yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
            yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
            kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
            inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff"
        }), [
        karanlikMod
    ]);
    const gruplanmisSonuclar = useMemo(()=>{
        if (!searchQuery?.trim() || !filtrelenmisSonuclar) {
            return [];
        }
        const gruplar = new Map();
        filtrelenmisSonuclar.forEach((item)=>{
            const key = item.kelime?.trim().toLowerCase();
            if (!key) return;
            if (!gruplar.has(key)) gruplar.set(key, []);
            gruplar.get(key).push(item);
        });
        return Array.from(gruplar.values()).map((kaynaklar)=>({
                kelime: kaynaklar[0].kelime,
                dialect: kaynaklar[0].dialect,
                kaynaklar
            }));
    }, [
        filtrelenmisSonuclar,
        searchQuery
    ]);
    const handleKelimeSec = useCallback((grup)=>{
        setSeciliKelimeGrubu(grup);
    }, []);
    const handlePanoyaKopyala = useCallback(async (kelime, tanim, id)=>{
        const metin = `${kelime}\n${tanim || ""}`;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(metin);
            }
            if (id) {
                setKopyalandiId(id);
                setTimeout(()=>setKopyalandiId(null), 2000);
            }
        } catch (err) {
            console.warn("Kopyalama engellendi:", err);
        }
    }, []);
    const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen transition-colors px-4 py-6",
        style: {
            backgroundColor: aktifTema.arkaPlan
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 max-w-4xl w-full mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
                    karanlikMod: karanlikMod,
                    toggleKaranlikMod: ()=>setKaranlikMod(!karanlikMod),
                    metinBoyutu: metinBoyutu,
                    setMetinBoyutu: setMetinBoyutu,
                    tema: aktifTema
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                !searchQuery?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IstatistikBandi, {
                    wordsCount: wordsCount,
                    sozlukSayisi: aktifSozlukler?.length || 34,
                    aktifTema: aktifTema
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this),
                !searchQuery?.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GununKelimesiKart, {
                    gununKelimesi: gununKelimesi,
                    karanlikMod: karanlikMod,
                    metinBoyutu: metinBoyutu,
                    tema: aktifTema,
                    onClick: ()=>handleKelimeSec({
                            kelime: gununKelimesi.kelime,
                            dialect: gununKelimesi.dialect,
                            kaynaklar: [
                                gununKelimesi
                            ]
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchBox, {
                    searchQuery: searchQuery || "",
                    setSearchQuery: setSearchQuery,
                    mod: mod,
                    setMod: setMod,
                    hedefDil: hedefDil,
                    setHedefDil: setHedefDil,
                    seciliLehce: seciliLehce,
                    setSeciliLehce: setSeciliLehce,
                    seciliDosya: seciliDosya,
                    setSeciliDosya: setSeciliDosya,
                    aktifSozlukler: aktifSozlukler || [],
                    metinBoyutu: metinBoyutu,
                    karanlikMod: karanlikMod,
                    tema: aktifTema,
                    inputRef: inputRef,
                    harfEkle: (harf)=>{
                        setSearchQuery((prev)=>(prev || "") + harf);
                        inputRef.current?.focus();
                    },
                    kaynagiDuzenle: (dosyaAdi)=>dosyaAdi || "",
                    limit: 20,
                    setGoruntulenenAdet: setGoruntulenenAdet
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                searchQuery?.trim() && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-medium",
                    style: {
                        color: aktifTema.yaziAlt
                    },
                    children: [
                        "Toplam ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: gruplanmisSonuclar.length
                        }, void 0, false, {
                            fileName: "[project]/src/components/SozlukEkrani.tsx",
                            lineNumber: 168,
                            columnNumber: 20
                        }, this),
                        " kelime grubu bulundu."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 text-slate-500 font-medium",
                    children: "📖 Sözlük verileri yükleniyor..."
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    "aria-label": "Arama Sonuçları",
                    className: "flex flex-col gap-4",
                    children: [
                        gosterilenGruplar.map((grup, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KelimeKarti, {
                                idx: idx,
                                grup: grup,
                                tema: aktifTema,
                                metinBoyutu: metinBoyutu,
                                kopyalandiId: kopyalandiId,
                                panoyaKopyala: handlePanoyaKopyala,
                                onClick: handleKelimeSec
                            }, `${grup.kelime}-${grup.kaynaklar?.length || 0}-${idx}`, false, {
                                fileName: "[project]/src/components/SozlukEkrani.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this)),
                        dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setGoruntulenenAdet((prev)=>prev + 20),
                            className: "mt-4 w-full p-3 bg-[#FF4030] text-white font-bold rounded-lg hover:opacity-90 transition-opacity",
                            children: [
                                "Daha Fazla Göster (",
                                gruplanmisSonuclar.length - goruntulenenAdet,
                                " kalan)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SozlukEkrani.tsx",
                            lineNumber: 192,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this),
                seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KelimeDetayDrawer, {
                    seciliKelime: seciliKelimeGrubu,
                    kapat: ()=>setSeciliKelimeGrubu(null),
                    tema: aktifTema,
                    metinBoyutu: metinBoyutu
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SozlukEkrani.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SozlukEkrani.tsx",
        lineNumber: 108,
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
"use client";
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
    if (typeof text !== "string" || !text) return "";
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
    if (typeof val !== "object" || val === null) {
        return typeof val === "string" ? val.trim() : "";
    }
    const obj = val;
    // 1. Öncelik: definitions[].meaning
    if (Array.isArray(obj.definitions) && obj.definitions.length > 0) {
        const meanings = obj.definitions.map((d)=>{
            if (typeof d === "string") return d.trim();
            if (typeof d === "object" && d !== null && "meaning" in d) {
                const m = d.meaning;
                return typeof m === "string" ? m.trim() : "";
            }
            return "";
        }).filter(Boolean);
        if (meanings.length > 0) {
            const tip = typeof obj.type === "string" ? obj.type.trim() : "";
            return (tip ? `[${tip}] ` : "") + meanings.join("\n");
        }
    }
    // 2. Öncelik: full_definition_in_html
    if (typeof obj.full_definition_in_html === "string" && obj.full_definition_in_html) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["temizleHtml"])(obj.full_definition_in_html);
    }
    // 3. Öncelik: tanim / meaning
    if (typeof obj.tanim === "string" && obj.tanim) return obj.tanim.trim();
    if (typeof obj.meaning === "string" && obj.meaning) return obj.meaning.trim();
    return "";
}
function parseDictionaryData(rawData, meta) {
    if (typeof rawData !== "object" || rawData === null) return [];
    const record = rawData;
    const wordsObj = record.words ?? rawData;
    let parsed = [];
    if (Array.isArray(wordsObj)) {
        parsed = wordsObj.map((item)=>{
            if (typeof item !== "object" || item === null) return {};
            const itemObj = item;
            const kelime = typeof itemObj.kelime === "string" ? itemObj.kelime : typeof itemObj.spelling === "string" ? itemObj.spelling : "";
            const tanim = typeof itemObj.tanim === "string" && itemObj.tanim ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["temizleHtml"])(itemObj.tanim) : parseTanim(itemObj);
            return {
                ...itemObj,
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
            const valObj = typeof val === "object" && val !== null ? val : {};
            const kelime = typeof valObj.spelling === "string" ? valObj.spelling : key;
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
        if (!meta.file) return [];
        if (cacheRef.current[meta.file]) return cacheRef.current[meta.file];
        try {
            const res = await fetch(`/data/${meta.file}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const raw = await res.json();
            const result = parseDictionaryData(raw, meta);
            cacheRef.current[meta.file] = result;
            return result;
        } catch (error) {
            console.error(`[Sözlük Yükleme Hatası - ${meta.file}]:`, error);
            return [];
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        async function init() {
            setLoading(true);
            let manifest = [];
            try {
                const res = await fetch("/data/dictionaries.json");
                if (res.ok) manifest = await res.json();
            } catch  {
                console.warn("Manifest okunamadı, fallback sözlükler aktif.");
            }
            if (!Array.isArray(manifest) || manifest.length === 0) {
                manifest = DEMO_SOZLUKLER;
            }
            if (isMounted) setAktifSozlukler(manifest);
            const hedef = seciliDosya !== "TUMU" ? manifest.filter((d)=>d.file === seciliDosya) : seciliLehce !== "TUMU" ? manifest.filter((d)=>d.dialect === seciliLehce) : manifest;
            if (hedef.length === 0) {
                if (isMounted) {
                    setRawWords(DEMO_KELIMELER);
                    setWordsCount(DEMO_KELIMELER.length);
                    setLoading(false);
                }
                return;
            }
            const ilkGrup = hedef.slice(0, 3);
            const kalanGrup = hedef.slice(3);
            const ilkKelimeler = [];
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
            setLoading(false);
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
            const key = item.kelime?.trim().toLowerCase();
            if (!key) return;
            if (!groups.has(key)) {
                groups.set(key, {});
            }
            const row = groups.get(key);
            const lang = getLanguageName(item);
            row[lang] = item.kelime;
            if (!row["Türkçe"] && item.tanim) {
                row["Türkçe"] = item.tanim.split(";")[0].trim();
            }
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

//# sourceMappingURL=_06ipsum._.js.map