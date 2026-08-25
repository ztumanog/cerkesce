module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$SozlukEkrani$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/SozlukEkrani.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Home() {
    const dictionary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$SozlukEkrani$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dictionary/GununKelimesiKart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/src/components/dictionary/KelimeKarti.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KelimeKarti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
// Tip güvenliği sağlayan yardımcı metin dönüştürücü
const metneCevir = (deger)=>{
    if (!deger) return "";
    if (typeof deger === "string") return deger;
    if (typeof deger === "number") return String(deger);
    if (typeof deger === "object" && deger !== null) {
        const obj = deger;
        if (typeof obj.name === "string") return obj.name;
        if (typeof obj.dilCifti === "string") return obj.dilCifti;
        if (typeof obj.yazar === "string") return obj.yazar;
        return JSON.stringify(deger);
    }
    return String(deger);
};
// Tanım metnini öncelik sırasına göre alma:
// 1. definitions[].meaning
// 2. full_definition_in_html
// 3. tanim / meaning
const tanimMetniniAl = (item)=>{
    if (!item) return "";
    if (Array.isArray(item.definitions) && item.definitions.length > 0) {
        const ilkTanim = item.definitions[0]?.meaning;
        if (ilkTanim) return metneCevir(ilkTanim);
    }
    if (item.full_definition_in_html) {
        return metneCevir(item.full_definition_in_html);
    }
    return metneCevir(item.tanim || item.meaning);
};
function KelimeKarti({ grup, idx, tema, metinBoyutu, kopyalandiId, panoyaKopyala, onClick }) {
    const ilkKaynak = grup.kaynaklar?.[0] || grup.anlamlar?.[0];
    const kelimeMetni = metneCevir(grup.kelime);
    const tanimMetni = tanimMetniniAl(ilkKaynak);
    const dosyaVeyaSozluk = metneCevir(ilkKaynak?.file || ilkKaynak?.kaynak_sozluk || ilkKaynak?.dictionaryName);
    const handleKeyDown = (e)=>{
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(grup);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        onClick: ()=>onClick(grup),
        onKeyDown: handleKeyDown,
        style: {
            padding: "16px",
            backgroundColor: tema.kartArkaPlan,
            border: `1px solid ${tema.kenarlik}`,
            borderRadius: "8px",
            cursor: "pointer",
            transition: "border-color 0.2s ease"
        },
        onMouseOver: (e)=>e.currentTarget.style.borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
        onMouseOut: (e)=>e.currentTarget.style.borderColor = tema.kenarlik,
        tabIndex: 0,
        "aria-label": `${kelimeMetni} kelimesi detayları`,
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
                        children: kelimeMetni
                    }, void 0, false, {
                        fileName: "[project]/src/components/dictionary/KelimeKarti.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (e)=>{
                            e.stopPropagation();
                            panoyaKopyala(kelimeMetni, tanimMetni, `g-${idx}`);
                        },
                        style: {
                            padding: "4px 8px",
                            fontSize: "12px",
                            border: `1px solid ${tema.kenarlik}`,
                            backgroundColor: "transparent",
                            color: tema.yaziAlt,
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: kopyalandiId === `g-${idx}` ? "bold" : "normal"
                        },
                        "aria-label": "Kelimeyi ve tanımını kopyala",
                        children: kopyalandiId === `g-${idx}` ? "✓ Kopyalandı" : "📋 Kopyala"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dictionary/KelimeKarti.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dictionary/KelimeKarti.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tanimlariBicimlendir"])(tanimMetni, tema, kelimeMetni, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(dosyaVeyaSozluk))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dictionary/KelimeKarti.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/dictionary/SearchBox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchBox",
    ()=>SearchBox,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$variants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/variants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/utils.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/dictionaries.json.[json].cjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$features$2f$AkilliKlavye$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/features/AkilliKlavye.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const manifestData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
function getEnrichedDictionary(file) {
    const fileNameOnly = file.replace(/\.json$/, '');
    const foundItem = manifestData?.items?.find((item)=>item.file === file || item.file === fileNameOnly);
    if (foundItem) {
        return {
            file: foundItem.file,
            title: foundItem.title,
            label: foundItem.label,
            dialect: foundItem.dialect
        };
    }
    return {
        file: fileNameOnly,
        title: fileNameOnly,
        label: '',
        dialect: fileNameOnly.includes('Kbd') ? 'DOGU' : 'BATI'
    };
}
function SearchBox({ searchQuery, setSearchQuery, mod, setMod, hedefDil, setHedefDil, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, aktifSozlukler = [], inputRef, setGoruntulenenAdet, limit }) {
    const [dropdownAcik, setDropdownAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gelismisFiltrelerAcik, setGelismisFiltrelerAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownAcik(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleSearchChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((value)=>{
        setSearchQuery(value);
        setGoruntulenenAdet(limit);
    }, [
        setSearchQuery,
        setGoruntulenenAdet,
        limit
    ]);
    const batiSozlukleri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>aktifSozlukler.map((dictionary)=>getEnrichedDictionary(dictionary.file)).filter((dictionary)=>dictionary.dialect === 'BATI'), [
        aktifSozlukler
    ]);
    const doguSozlukleri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>aktifSozlukler.map((dictionary)=>getEnrichedDictionary(dictionary.file)).filter((dictionary)=>dictionary.dialect === 'DOGU'), [
        aktifSozlukler
    ]);
    const seciliSozlukEtiketi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (seciliDosya === 'TUMU') {
            if (seciliLehce === 'TUMU') {
                return 'Tüm sözlüklerde arama';
            }
            return seciliLehce === 'BATI' ? 'Tüm Batı Adığece sözlükleri' : 'Tüm Doğu Kabardeyce sözlükleri';
        }
        const dictionary = getEnrichedDictionary(seciliDosya);
        return `${dictionary.title}${dictionary.label ? ` — ${dictionary.label}` : ''}`;
    }, [
        seciliDosya,
        seciliLehce
    ]);
    const lehceSecenekleri = [
        {
            kod: 'TUMU',
            etiket: 'Tümü',
            aciklama: 'Tüm lehçeler'
        },
        {
            kod: 'BATI',
            etiket: 'Batı',
            aciklama: 'Adığece'
        },
        {
            kod: 'DOGU',
            etiket: 'Doğu',
            aciklama: 'Kabardeyce'
        }
    ];
    const dilSecenekleri = [
        {
            kod: 'tumu',
            etiket: 'Tümü',
            emoji: '🌐'
        },
        {
            kod: 'tr',
            etiket: 'Türkçe',
            emoji: '🇹🇷'
        },
        {
            kod: 'ar',
            etiket: 'Arapça',
            emoji: 'ع'
        },
        {
            kod: 'en',
            etiket: 'İngilizce',
            emoji: '🇬🇧'
        },
        {
            kod: 'ru',
            etiket: 'Rusça',
            emoji: '🇷🇺'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50 transition-shadow focus-within:shadow-rose-900/10 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl text-rose-700 dark:text-rose-400",
                                children: "⌕"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "arama-input",
                                ref: inputRef,
                                type: "search",
                                value: searchQuery,
                                onChange: (event)=>handleSearchChange(event.target.value),
                                placeholder: "Kelime, tanım veya kök ara...",
                                autoComplete: "off",
                                className: "h-16 w-full border-0 bg-transparent px-14 pr-5 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:ring-0 dark:text-stone-100 dark:placeholder:text-stone-600 sm:h-20 sm:text-lg"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute bottom-2 right-5 hidden text-xs text-stone-400 sm:block",
                                children: "Örn: псэ, adige, yürek"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-stone-100 bg-stone-50/80 px-4 py-3 dark:border-stone-800 dark:bg-stone-950/50 sm:px-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mr-1 text-xs font-semibold uppercase tracking-wider text-stone-400",
                                    children: "Lehçe"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this),
                                lehceSecenekleri.map((lehce)=>{
                                    const aktif = seciliLehce === lehce.kod;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setSeciliLehce(lehce.kod);
                                            setSeciliDosya('TUMU');
                                            setGoruntulenenAdet(limit);
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-full border px-4 py-2 text-left transition-all', aktif ? 'border-rose-700 bg-rose-800 text-white shadow-md shadow-rose-900/20 dark:border-rose-500 dark:bg-rose-700' : 'border-stone-200 bg-white text-stone-600 hover:border-rose-300 hover:bg-rose-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-rose-800 dark:hover:bg-rose-950/30'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-xs font-bold",
                                                children: lehce.etiket
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('block text-[10px]', aktif ? 'text-rose-100' : 'text-stone-400 dark:text-stone-500'),
                                                children: lehce.aciklama
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, lehce.kod, true, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 270,
                                        columnNumber: 17
                                    }, this);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ml-auto flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$features$2f$AkilliKlavye$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            inputRef: inputRef,
                                            sorgu: searchQuery,
                                            setSorgu: handleSearchChange
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                            lineNumber: 306,
                                            columnNumber: 15
                                        }, this),
                                        searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": "Aramayı temizle",
                                            onClick: ()=>{
                                                handleSearchChange('');
                                                inputRef.current?.focus();
                                            },
                                            className: "rounded-lg px-2.5 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-200 hover:text-rose-700 dark:hover:bg-stone-800 dark:hover:text-rose-400",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>inputRef.current?.focus(),
                                            className: "rounded-full bg-rose-800 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-900/20 transition-all hover:bg-rose-900 active:scale-95 dark:bg-rose-700 dark:hover:bg-rose-600",
                                            children: "Ara"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between gap-3 px-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center gap-2 text-xs text-stone-500 dark:text-stone-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm dark:bg-amber-950/40",
                                children: "📚"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate font-medium",
                                children: seciliSozlukEtiketi
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setGelismisFiltrelerAcik((previous)=>!previous),
                        className: "flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-stone-500 transition-colors hover:bg-stone-100 hover:text-rose-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-rose-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "⚙"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Gelişmiş filtreler"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: gelismisFiltrelerAcik ? '⌃' : '⌄'
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            gelismisFiltrelerAcik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-lg shadow-stone-200/40 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: dropdownRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400",
                                children: "Sözlük seçimi"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-haspopup": "listbox",
                                        "aria-expanded": dropdownAcik,
                                        onClick: ()=>setDropdownAcik((previous)=>!previous),
                                        className: "flex w-full items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:border-rose-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:border-rose-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: seciliSozlukEtiketi
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 392,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-3 text-xs text-stone-400",
                                                children: dropdownAcik ? '▲' : '▼'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    dropdownAcik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "listbox",
                                        className: "absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-stone-200 bg-white p-1 shadow-2xl dark:border-stone-700 dark:bg-stone-900",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "option",
                                                "aria-selected": seciliDosya === 'TUMU',
                                                onClick: ()=>{
                                                    setSeciliDosya('TUMU');
                                                    setDropdownAcik(false);
                                                    setGoruntulenenAdet(limit);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold transition-colors', seciliDosya === 'TUMU' ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300' : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'),
                                                children: [
                                                    "📚",
                                                    ' ',
                                                    seciliLehce === 'TUMU' ? 'Tüm sözlüklerde ara' : seciliLehce === 'BATI' ? 'Tüm Batı Adığece sözlükleri' : 'Tüm Doğu Kabardeyce sözlükleri'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 406,
                                                columnNumber: 19
                                            }, this),
                                            (seciliLehce === 'TUMU' || seciliLehce === 'BATI') && batiSozlukleri.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DictionaryGroup, {
                                                title: "Batı Adığece",
                                                dictionaries: batiSozlukleri,
                                                selectedFile: seciliDosya,
                                                setSelectedFile: setSeciliDosya,
                                                closeDropdown: ()=>setDropdownAcik(false),
                                                resetCount: ()=>setGoruntulenenAdet(limit)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 435,
                                                columnNumber: 23
                                            }, this),
                                            (seciliLehce === 'TUMU' || seciliLehce === 'DOGU') && doguSozlukleri.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DictionaryGroup, {
                                                title: "Doğu Kabardeyce",
                                                dictionaries: doguSozlukleri,
                                                selectedFile: seciliDosya,
                                                setSelectedFile: setSeciliDosya,
                                                closeDropdown: ()=>setDropdownAcik(false),
                                                resetCount: ()=>setGoruntulenenAdet(limit)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 460,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 402,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-5 border-t border-stone-100 pt-5 dark:border-stone-800 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400",
                                        children: "Eşleşme modu"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 489,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: mod,
                                        onChange: (event)=>setMod(event.target.value),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$variants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectBoxVariants"])(), 'w-full'),
                                        "aria-label": "Arama modu seçimi",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "baslayan",
                                                children: "İle başlayan"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 506,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "icinde",
                                                children: "İçinde geçen"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 509,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "tam",
                                                children: "Tam eşleşen"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 512,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400",
                                        children: "Hedef sonuç dili"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: dilSecenekleri.map((dil)=>{
                                            const aktif = hedefDil === dil.kod;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setHedefDil(dil.kod);
                                                    setGoruntulenenAdet(limit);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$variants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterButtonVariants"])({
                                                    active: aktif
                                                }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "aria-hidden": "true",
                                                        children: dil.emoji
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: dil.etiket
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, dil.kod, true, {
                                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                                lineNumber: 530,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                lineNumber: 373,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
function DictionaryGroup({ title, dictionaries, selectedFile, setSelectedFile, closeDropdown, resetCount }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2 border-t border-stone-100 pt-2 dark:border-stone-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-stone-400",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                lineNumber: 584,
                columnNumber: 7
            }, this),
            dictionaries.map((dictionary)=>{
                const aktif = selectedFile === dictionary.file;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    role: "option",
                    "aria-selected": aktif,
                    onClick: ()=>{
                        setSelectedFile(dictionary.file);
                        closeDropdown();
                        resetCount();
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors', aktif ? 'bg-rose-50 font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300' : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: dictionary.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                            lineNumber: 610,
                            columnNumber: 13
                        }, this),
                        dictionary.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "shrink-0 text-[10px] italic text-stone-400",
                            children: dictionary.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                            lineNumber: 615,
                            columnNumber: 15
                        }, this)
                    ]
                }, dictionary.file, true, {
                    fileName: "[project]/src/components/dictionary/SearchBox.tsx",
                    lineNumber: 593,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dictionary/SearchBox.tsx",
        lineNumber: 583,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = SearchBox;
}),
"[project]/src/components/dictionary/SozlukEkrani.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SozlukEkrani
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/GununKelimesiKart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$SearchBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/SearchBox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$KelimeKarti$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/KelimeKarti.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/KelimeDetayDrawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Kaynaklar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Kaynaklar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function SozlukEkrani({ loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler }) {
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(17);
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(20);
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [kopyalandiId, setKopyalandiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [kaynaklarAcik, setKaynaklarAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    /*
   * "/" tuşuyla arama kutusuna odaklanma
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (event)=>{
            const aktifElement = document.activeElement;
            const yazimAlanindaMi = aktifElement?.tagName === "INPUT" || aktifElement?.tagName === "TEXTAREA" || aktifElement?.tagName === "SELECT" || aktifElement?.getAttribute("contenteditable") === "true";
            if (event.key === "/" && !yazimAlanindaMi) {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>{
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    /*
   * Karanlık mod
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (karanlikMod) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [
        karanlikMod
    ]);
    /*
   * Arama veya filtre değişince listeyi başa al
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setGoruntulenenAdet(20);
    }, [
        searchQuery,
        hedefDil,
        seciliLehce,
        seciliDosya,
        mod
    ]);
    /*
   * Aktif tema
   */ const aktifTema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            arkaPlan: karanlikMod ? "#1A1614" : "#FDFBF7",
            kartArkaPlan: karanlikMod ? "#1F1A17" : "#FFFFFF",
            yaziAna: karanlikMod ? "#F4EFE6" : "#2C221E",
            yaziAlt: karanlikMod ? "#A89A8E" : "#8C7A6B",
            kenarlik: karanlikMod ? "#3D322C" : "#EADDC9",
            inputArkaPlan: karanlikMod ? "#26201D" : "#FAFAFA"
        }), [
        karanlikMod
    ]);
    /*
   * Sonucun hedef dilini tespit eder
   */ const hedefDilBul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((item)=>{
        if (!item) {
            return "diger";
        }
        const itemRecord = item;
        const metaLang = (itemRecord.targetLanguage ?? itemRecord.language ?? itemRecord.dil ?? "").toString().toLowerCase();
        if (metaLang.includes("tr")) {
            return "tr";
        }
        if (metaLang === "ar" || metaLang.includes("arab")) {
            return "ar";
        }
        if (metaLang === "en" || metaLang.includes("eng")) {
            return "en";
        }
        if (metaLang === "ru" || metaLang.includes("rus")) {
            return "ru";
        }
        const dosyaAdi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(itemRecord.file ?? itemRecord.kaynak_sozluk ?? "").toLowerCase();
        if (dosyaAdi.includes("tur") || dosyaAdi.includes("tu-")) {
            return "tr";
        }
        if (dosyaAdi.includes("ara") || dosyaAdi.includes("-ar")) {
            return "ar";
        }
        if (dosyaAdi.includes("eng") || dosyaAdi.includes("-en")) {
            return "en";
        }
        if (dosyaAdi.includes("rus") || dosyaAdi.includes("ru-")) {
            return "ru";
        }
        return "diger";
    }, []);
    /*
   * Sonuçları kelimeye göre gruplar
   */ const gruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!searchQuery?.trim() || !Array.isArray(filtrelenmisSonuclar) || filtrelenmisSonuclar.length === 0) {
            return [];
        }
        const havuz = filtrelenmisSonuclar.filter((item)=>{
            return item !== null && typeof item === "object" && ("kelime" in item || "spelling" in item);
        });
        const hedefDileGoreFiltreli = hedefDil === "tumu" ? havuz : havuz.filter((item)=>hedefDilBul(item) === hedefDil);
        const gruplar = new Map();
        hedefDileGoreFiltreli.forEach((item)=>{
            const kelimeStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(item.kelime || item.spelling || "");
            const key = kelimeStr.trim().toLowerCase();
            if (!key) {
                return;
            }
            if (!gruplar.has(key)) {
                gruplar.set(key, []);
            }
            gruplar.get(key)?.push(item);
        });
        return Array.from(gruplar.values()).map((kaynaklar)=>{
            const ilk = kaynaklar[0];
            const kelimeBaslik = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(ilk.kelime || ilk.spelling || "");
            const tespitEdilenLehce = (ilk.dialect || ilk.lehce || ilk.diyalekt || "BATI").toString();
            return {
                kelime: kelimeBaslik,
                dialect: tespitEdilenLehce,
                kaynaklar,
                anlamlar: kaynaklar.map((kaynak)=>{
                    const kaynakObj = kaynak;
                    let secilenTanim = "";
                    if (Array.isArray(kaynak.definitions) && kaynak.definitions.length > 0 && kaynak.definitions[0]?.meaning) {
                        secilenTanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.definitions[0].meaning);
                    } else if (kaynak.full_definition_in_html) {
                        secilenTanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.full_definition_in_html);
                    } else {
                        secilenTanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.tanim || kaynak.meaning || "");
                    }
                    const ozelLehce = kaynakObj.dialect || kaynakObj.lehce || kaynakObj.diyalekt;
                    return {
                        tanim: secilenTanim,
                        file: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.file || ""),
                        kaynak_sozluk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.kaynak_sozluk || ""),
                        dialect: ozelLehce ? ozelLehce.toString() : undefined,
                        language: typeof kaynak.language === "string" ? kaynak.language : undefined
                    };
                })
            };
        });
    }, [
        filtrelenmisSonuclar,
        searchQuery,
        hedefDil,
        hedefDilBul
    ]);
    /*
   * Dinamik sözlük sayısı
   */ const dinamikSozlukSayisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (searchQuery?.trim() && gruplanmisSonuclar.length > 0) {
            const sozlukSet = new Set();
            gruplanmisSonuclar.forEach((grup)=>{
                grup.kaynaklar?.forEach((kaynak)=>{
                    const ad = kaynak.file || kaynak.kaynak_sozluk;
                    if (ad) {
                        sozlukSet.add(ad);
                    }
                });
            });
            return sozlukSet.size;
        }
        const dosyaMetni = String(seciliDosya).trim().toLowerCase();
        if (dosyaMetni && ![
            "tumu",
            "all",
            "hepsi"
        ].includes(dosyaMetni)) {
            return 1;
        }
        if (seciliLehce !== "TUMU" && Array.isArray(aktifSozlukler)) {
            const lehceMetni = seciliLehce.toString().trim().toLowerCase();
            const lehceyeGoreSozlukler = aktifSozlukler.filter((sozluk)=>{
                const dialect = (sozluk.dialect || sozluk.lehce || sozluk.diyalekt || "").toString().trim().toLowerCase();
                return dialect.includes(lehceMetni) || lehceMetni.includes(dialect);
            });
            if (lehceyeGoreSozlukler.length > 0) {
                return lehceyeGoreSozlukler.length;
            }
        }
        if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
            return aktifSozlukler.length;
        }
        return 34;
    }, [
        searchQuery,
        gruplanmisSonuclar,
        seciliDosya,
        seciliLehce,
        aktifSozlukler
    ]);
    /*
   * Dinamik kayıt sayısı
   */ const dinamikKayitSayisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (searchQuery?.trim()) {
            return gruplanmisSonuclar.reduce((toplam, grup)=>toplam + (grup.kaynaklar?.length || 0), 0);
        }
        const dosyaMetni = String(seciliDosya).trim().toLowerCase();
        const lehceMetni = String(seciliLehce).trim().toLowerCase();
        const filtreVarMi = dosyaMetni !== "" && ![
            "tumu",
            "all",
            "hepsi"
        ].includes(dosyaMetni) || lehceMetni !== "" && ![
            "tumu",
            "all",
            "hepsi"
        ].includes(lehceMetni);
        if (filtreVarMi) {
            if (Array.isArray(filtrelenmisSonuclar) && filtrelenmisSonuclar.length > 0) {
                return filtrelenmisSonuclar.length;
            }
            if (Array.isArray(aktifSozlukler) && aktifSozlukler.length > 0) {
                return aktifSozlukler.reduce((toplam, sozluk)=>{
                    if (!sozluk || typeof sozluk !== "object") {
                        return toplam;
                    }
                    const sozlukObj = sozluk;
                    const rawCount = sozlukObj.kelimeSayisi ?? sozlukObj.kayitSayisi ?? sozlukObj.count ?? sozlukObj.total_words ?? 0;
                    const countNum = Number(rawCount);
                    return toplam + (Number.isNaN(countNum) ? 0 : countNum);
                }, 0);
            }
        }
        return 0;
    }, [
        searchQuery,
        gruplanmisSonuclar,
        seciliDosya,
        seciliLehce,
        filtrelenmisSonuclar,
        aktifSozlukler
    ]);
    const handleKelimeSec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((grup)=>{
        setSeciliKelimeGrubu(grup);
    }, []);
    const handlePanoyaKopyala = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (kelime, tanim, id)=>{
        const metin = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kelime)}\n${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(tanim || "")}`;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(metin);
            }
            if (id) {
                setKopyalandiId(id);
                window.setTimeout(()=>{
                    setKopyalandiId(null);
                }, 2000);
            }
        } catch (error) {
            console.warn("Kopyalama engellendi:", error);
        }
    }, []);
    const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;
    const gununKelimesiMetni = gununKelimesi ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.kelime || gununKelimesi.spelling || "") : "";
    const gununKelimesiTanimi = gununKelimesi ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.tanim || gununKelimesi.meaning || gununKelimesi.full_definition_in_html || "") : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            backgroundColor: aktifTema.arkaPlan,
            color: aktifTema.yaziAna,
            transition: "all 0.2s ease",
            padding: "8px 14px 0 14px",
            fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            style: {
                maxWidth: "1150px",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "12px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    karanlikMod: karanlikMod,
                    toggleKaranlikMod: ()=>setKaranlikMod((prev)=>!prev),
                    metinBoyutu: metinBoyutu,
                    setMetinBoyutu: setMetinBoyutu,
                    sozlukSayisi: Number(dinamikSozlukSayisi),
                    kayitSayisi: Number(dinamikKayitSayisi),
                    tema: aktifTema
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 657,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$SearchBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchBox"], {
                    inputRef: inputRef,
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
                    setGoruntulenenAdet: setGoruntulenenAdet,
                    limit: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 674,
                    columnNumber: 9
                }, this),
                !searchQuery?.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    gununKelimesi: {
                        ...gununKelimesi,
                        kelime: gununKelimesiMetni,
                        tanim: gununKelimesiTanimi
                    },
                    karanlikMod: karanlikMod,
                    metinBoyutu: metinBoyutu,
                    tema: aktifTema,
                    onClick: ()=>{
                        const itemObj = gununKelimesi;
                        const gununLehcesi = (gununKelimesi.dialect || itemObj.lehce || itemObj.diyalekt || "BATI").toString();
                        handleKelimeSec({
                            kelime: gununKelimesiMetni,
                            dialect: gununLehcesi,
                            kaynaklar: [
                                gununKelimesi
                            ],
                            anlamlar: [
                                {
                                    tanim: gununKelimesiTanimi,
                                    file: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.file || ""),
                                    kaynak_sozluk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.kaynak_sozluk || ""),
                                    dialect: gununLehcesi
                                }
                            ]
                        });
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 696,
                    columnNumber: 13
                }, this),
                searchQuery?.trim() && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: "4px 0 0 2px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: "11px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                color: "#7A1C1C",
                                backgroundColor: karanlikMod ? "#2C221E" : "#FDF2F2",
                                padding: "2px 8px",
                                borderRadius: "2px",
                                border: "1px solid #F4C7C7"
                            },
                            children: "SONUÇLAR"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                            lineNumber: 752,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "13px",
                                color: aktifTema.yaziAlt,
                                margin: 0
                            },
                            children: [
                                "Toplam",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#7A1C1C",
                                        fontWeight: "bold"
                                    },
                                    children: gruplanmisSonuclar.length
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                    lineNumber: 778,
                                    columnNumber: 15
                                }, this),
                                " ",
                                "kelime grubu bulundu."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                            lineNumber: 770,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 744,
                    columnNumber: 11
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: "center",
                        padding: "16px 0",
                        color: aktifTema.yaziAlt,
                        fontSize: "14px",
                        fontWeight: "bold"
                    },
                    children: "📖 Sözlük koleksiyonu taranıyor..."
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 793,
                    columnNumber: 11
                }, this) : searchQuery?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "12px"
                    },
                    children: [
                        gruplanmisSonuclar.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center",
                                padding: "20px 16px",
                                borderRadius: "4px",
                                border: `1px dashed ${aktifTema.kenarlik}`,
                                backgroundColor: aktifTema.kartArkaPlan
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        marginBottom: "4px",
                                        color: aktifTema.yaziAna
                                    },
                                    children: "Aradığınız kelime bulunamadı"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                    lineNumber: 825,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "13px",
                                        color: aktifTema.yaziAlt
                                    },
                                    children: [
                                        '"',
                                        searchQuery,
                                        '" ifadesine ait kayıt eşleşmedi. Filtrelerinizi kontrol edebilirsiniz.'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                    lineNumber: 836,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                            lineNumber: 815,
                            columnNumber: 17
                        }, this) : gosterilenGruplar.map((grup, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$KelimeKarti$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                idx: index,
                                grup: grup,
                                tema: aktifTema,
                                metinBoyutu: metinBoyutu,
                                kopyalandiId: kopyalandiId,
                                panoyaKopyala: handlePanoyaKopyala,
                                onClick: handleKelimeSec
                            }, `${grup.kelime}-${grup.kaynaklar?.length || 0}-${index}`, false, {
                                fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                lineNumber: 851,
                                columnNumber: 21
                            }, this)),
                        dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setGoruntulenenAdet((prev)=>prev + 20),
                            style: {
                                marginTop: "6px",
                                width: "100%",
                                padding: "10px 14px",
                                backgroundColor: "#7A1C1C",
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: "bold",
                                borderRadius: "4px",
                                border: "none",
                                cursor: "pointer",
                                letterSpacing: "1px",
                                textTransform: "uppercase"
                            },
                            children: [
                                "Daha Fazla Göster (",
                                gruplanmisSonuclar.length - goruntulenenAdet,
                                " ",
                                "kalan)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                            lineNumber: 868,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 806,
                    columnNumber: 13
                }, this),
                seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    seciliKelime: seciliKelimeGrubu,
                    kapat: ()=>setSeciliKelimeGrubu(null),
                    tema: aktifTema,
                    metinBoyutu: metinBoyutu
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 902,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    aktifTema: aktifTema,
                    onKaynaklarAc: ()=>setKaynaklarAcik(true)
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 912,
                    columnNumber: 9
                }, this),
                kaynaklarAcik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        backdropFilter: "blur(2px)"
                    },
                    onClick: ()=>setKaynaklarAcik(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: aktifTema.kartArkaPlan,
                            color: aktifTema.yaziAna,
                            border: `1px solid ${aktifTema.kenarlik}`,
                            borderRadius: "6px",
                            padding: "24px",
                            maxWidth: "800px",
                            width: "100%",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            position: "relative",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        },
                        onClick: (event)=>event.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setKaynaklarAcik(false),
                                style: {
                                    position: "absolute",
                                    top: "12px",
                                    right: "16px",
                                    background: "none",
                                    border: "none",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#7A1C1C",
                                    cursor: "pointer"
                                },
                                "aria-label": "Kaynaklar penceresini kapat",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                lineNumber: 958,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Kaynaklar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                lineNumber: 979,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                        lineNumber: 938,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 921,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
            lineNumber: 646,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
        lineNumber: 635,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/features/AkilliKlavye.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AkilliKlavye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$alphabet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/alphabet.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const KLAVYE_DUZENLERI = {
    cerkes: {
        etiket: '🟢 Çerkesçe',
        tuslar: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$alphabet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CERKES_OZEL_HARFLER"] || []
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
function AkilliKlavye({ inputRef, sorgu = '', setSorgu, metinBoyutu = 16, karanlikMod = false }) {
    const [acik, setAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aktifDil, setAktifDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('cerkes');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const kayitliDil = localStorage.getItem('aktifKlavye');
            if (kayitliDil && KLAVYE_DUZENLERI[kayitliDil]) {
                setAktifDil(kayitliDil);
            }
        } catch  {
        // localStorage kullanılamıyorsa varsayılan dil kullanılır.
        }
    }, []);
    const dilDegistir = (event, dil)=>{
        event.preventDefault();
        event.stopPropagation();
        setAktifDil(dil);
        try {
            localStorage.setItem('aktifKlavye', dil);
        } catch  {
        // localStorage kullanılamıyorsa devam edilir.
        }
    };
    const harfEkle = (harf)=>{
        const input = inputRef?.current;
        if (!input) {
            setSorgu((prev)=>`${prev || ''}${harf}`);
            return;
        }
        const baslangic = input.selectionStart ?? input.value.length;
        const bitis = input.selectionEnd ?? input.value.length;
        const eskiDeger = input.value || '';
        const yeniDeger = eskiDeger.substring(0, baslangic) + harf + eskiDeger.substring(bitis);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, yeniDeger);
        } else {
            input.value = yeniDeger;
        }
        input.dispatchEvent(new Event('input', {
            bubbles: true
        }));
        input.dispatchEvent(new Event('change', {
            bubbles: true
        }));
        setSorgu(yeniDeger);
        const yeniImlecKonumu = baslangic + harf.length;
        window.setTimeout(()=>{
            input.focus();
            input.setSelectionRange(yeniImlecKonumu, yeniImlecKonumu);
        }, 0);
    };
    const kirmiziRenk = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"]?.kirmizi || '#FF4030';
    const arkaPlan = karanlikMod ? '#1e293b' : '#ffffff';
    const kenarlik = karanlikMod ? '#475569' : '#cbd5e1';
    const yaziRengi = karanlikMod ? '#f8fafc' : '#0f172a';
    const mevcutTuslar = KLAVYE_DUZENLERI[aktifDil]?.tuslar || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%',
            marginBottom: '16px',
            textAlign: 'left',
            zIndex: 40
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setAcik((previous)=>!previous),
                "aria-expanded": acik,
                "aria-label": "Sanal klavyeyi aç veya kapat",
                style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: `1px solid ${kenarlik}`,
                    backgroundColor: arkaPlan,
                    color: yaziRengi,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: `${metinBoyutu * 0.85}px`,
                    transition: 'all 0.2s ease'
                },
                children: [
                    "⌨️",
                    ' ',
                    acik ? 'Klavyeyi Gizle' : 'Akıllı Klavye'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/AkilliKlavye.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            acik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '10px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: `1px solid ${kenarlik}`,
                    backgroundColor: arkaPlan,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    width: '100%',
                    boxSizing: 'border-box'
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
                        children: Object.keys(KLAVYE_DUZENLERI).map((dilKey)=>{
                            const isSelected = aktifDil === dilKey;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: (event)=>dilDegistir(event, dilKey),
                                style: {
                                    padding: '6px 12px',
                                    borderRadius: '999px',
                                    border: `1px solid ${isSelected ? kirmiziRenk : kenarlik}`,
                                    backgroundColor: isSelected ? kirmiziRenk : karanlikMod ? '#0f172a' : '#f8fafc',
                                    color: isSelected ? '#ffffff' : yaziRengi,
                                    fontSize: `${metinBoyutu * 0.8}px`,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontWeight: isSelected ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                },
                                children: KLAVYE_DUZENLERI[dilKey].etiket
                            }, dilKey, false, {
                                fileName: "[project]/src/components/features/AkilliKlavye.tsx",
                                lineNumber: 393,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/AkilliKlavye.tsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px'
                        },
                        children: mevcutTuslar.map((harf, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onMouseDown: (event)=>event.preventDefault(),
                                onClick: ()=>harfEkle(harf),
                                style: {
                                    padding: '8px 12px',
                                    minWidth: '36px',
                                    borderRadius: '8px',
                                    border: `1px solid ${kenarlik}`,
                                    backgroundColor: karanlikMod ? '#334155' : '#f1f5f9',
                                    color: yaziRengi,
                                    fontSize: `${metinBoyutu * 0.9}px`,
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                },
                                children: harf
                            }, `${aktifDil}-${harf}-${index}`, false, {
                                fileName: "[project]/src/components/features/AkilliKlavye.tsx",
                                lineNumber: 447,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/AkilliKlavye.tsx",
                        lineNumber: 438,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/AkilliKlavye.tsx",
                lineNumber: 361,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/features/AkilliKlavye.tsx",
        lineNumber: 323,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
"use client";
;
;
function Footer({ aktifTema, onKaynaklarAc }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: {
            marginTop: "24px",
            paddingTop: "16px",
            paddingBottom: "24px",
            borderTop: `1px solid ${aktifTema?.kenarlik || "#EADDC9"}`,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            color: aktifTema?.yaziAlt || "#8C7A6B",
            transition: "all 0.2s ease"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                            display: "inline-block"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 600,
                            letterSpacing: "0.5px"
                        },
                        children: "AÇIK MEKTEP DİJİTAL YAYINCILIK — ÇERKESÇE DİL KORPUSU"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onKaynaklarAc,
                    style: {
                        background: "none",
                        border: `1px solid ${aktifTema?.kenarlik || "#EADDC9"}`,
                        borderRadius: "4px",
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                        cursor: "pointer",
                        padding: "6px 12px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        transition: "all 0.15s ease",
                        backgroundColor: aktifTema?.kartArkaPlan || "#FFFFFF"
                    },
                    onMouseOver: (e)=>{
                        e.currentTarget.style.borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi;
                    },
                    onMouseOut: (e)=>{
                        e.currentTarget.style.borderColor = aktifTema?.kenarlik || "#EADDC9";
                    },
                    "aria-label": "Kaynaklar ve referanslar penceresini aç",
                    children: "Kaynaklar ve Referanslar →"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Footer.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function Header({ karanlikMod, toggleKaranlikMod, metinBoyutu, setMetinBoyutu, sozlukSayisi = 34, kayitSayisi = 332238, aramaYapildiMi = false, tema }) {
    // Kaynaklar.tsx Tasarım Renk Tanımları
    const arkaplan = karanlikMod ? "#1F1A17" : "#F4EFE6";
    const solCizgiRenk = "#7A1C1C";
    const etiketRenk = "#7A1C1C";
    const baslikRenk = karanlikMod ? "#FDFBF7" : "#1F1A17";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "24px",
            backgroundColor: arkaplan,
            borderLeft: `4px solid ${solCizgiRenk}`,
            borderTop: `1px solid ${tema.kenarlik}`,
            borderRight: `1px solid ${tema.kenarlik}`,
            borderBottom: `1px solid ${tema.kenarlik}`,
            borderRadius: "2px",
            padding: "24px 28px",
            fontFamily: "'IBM Plex Sans', sans-serif",
            boxSizing: "border-box",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                    width: "100%"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo/logo.png",
                                alt: "Açık Mektep Logosu",
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    objectFit: "contain",
                                    borderRadius: "4px"
                                },
                                onError: (e)=>{
                                    e.target.style.display = "none";
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "11px",
                                            fontWeight: "bold",
                                            color: etiketRenk,
                                            textTransform: "uppercase",
                                            letterSpacing: "2.5px",
                                            display: "block",
                                            marginBottom: "4px"
                                        },
                                        children: "AÇIK MEKTEP AÇIK ERİŞİM DİL KAYNAKLARI PROJESİ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            color: baslikRenk,
                                            margin: 0,
                                            fontSize: `${metinBoyutu * 1.5}px`,
                                            fontWeight: "600",
                                            fontFamily: "serif",
                                            fontStyle: "italic",
                                            lineHeight: "1.2"
                                        },
                                        children: "Çerkesçe Sözlük"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 67,
                        columnNumber: 9
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    backgroundColor: karanlikMod ? "#2C221E" : "#FFFFFF",
                                    border: `1px solid ${tema.kenarlik}`,
                                    borderRadius: "3px",
                                    padding: "2px 4px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setMetinBoyutu((p)=>Math.max(12, p - 2)),
                                        "aria-label": "Yazı boyutunu küçült",
                                        style: {
                                            padding: "6px 10px",
                                            border: "none",
                                            background: "transparent",
                                            color: tema.yaziAna,
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            fontSize: "13px"
                                        },
                                        children: "A-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: tema.yaziAna,
                                            padding: "0 6px",
                                            borderLeft: `1px solid ${tema.kenarlik}`,
                                            borderRight: `1px solid ${tema.kenarlik}`,
                                            userSelect: "none",
                                            fontFamily: "monospace"
                                        },
                                        children: [
                                            metinBoyutu,
                                            "px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setMetinBoyutu((p)=>Math.min(24, p + 2)),
                                        "aria-label": "Yazı boyutunu büyüt",
                                        style: {
                                            padding: "6px 10px",
                                            border: "none",
                                            background: "transparent",
                                            color: tema.yaziAna,
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            fontSize: "13px"
                                        },
                                        children: "A+"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: toggleKaranlikMod,
                                "aria-pressed": karanlikMod,
                                "aria-label": "Karanlık Temayı Aç/Kapat",
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "8px 12px",
                                    borderRadius: "3px",
                                    border: `1px solid ${tema.kenarlik}`,
                                    backgroundColor: karanlikMod ? "#2C221E" : "#FFFFFF",
                                    color: tema.yaziAna,
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    fontSize: "13px"
                                },
                                children: karanlikMod ? "☀️ Light" : "🌙 Dark"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    margin: "16px 0 0 0",
                    fontSize: `${metinBoyutu * 0.85}px`,
                    color: karanlikMod ? "#D0C4B8" : "#4A3E37",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap"
                },
                children: [
                    "📖 ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            sozlukSayisi,
                            " Sözlük"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 219,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    "📚 ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            kayitSayisi.toLocaleString("tr-TR"),
                            "+ Kelime Kaydı"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 221,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: etiketRenk,
                            fontWeight: "bold"
                        },
                        children: "● Açık Dijital Arşiv"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Kaynaklar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Kaynaklar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
// Gerçek tespit edilen ID'ler ve ana kaynak künyeleriyle güncellenmiş manifest
const manifestData = [
    {
        id: 1,
        title: "Türkçe - Adığece (Çerkesçe) Sözlük",
        author: "Kolektif",
        year: "1992",
        publisher: "Kafkas Derneği / Ankara",
        count: 12500,
        dialect: "BATI",
        langPair: "TR-ADI"
    },
    {
        id: 2,
        title: "Adıgece - Türkçe Sözlük",
        author: "Fahri Huvaj",
        year: "2011",
        publisher: "Chiviyazıları / İstanbul",
        count: 18000,
        dialect: "BATI",
        langPair: "ADI-TR"
    },
    {
        id: 3,
        title: "Kabardey - Rusça Sözlük (Кабардинско-русский словарь)",
        author: "B. M. Kardanov",
        year: "1957",
        publisher: "GIINSL / Moskova",
        count: 20000,
        dialect: "DOGU",
        langPair: "KAB-RU"
    },
    {
        id: 4,
        title: "Adıge Tilim Yizınəpıse Psəлъałə",
        author: "Kerashev Tembot",
        year: "1960",
        publisher: "Adygeyskoye Knizhnoye / Maykop",
        count: 15500,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 5,
        title: "Çerkesçe - Türkçe Gramer ve Sözlük Külliyatı",
        author: "İsmail Hakkı Berkok",
        year: "1985",
        publisher: "Kafkas Vakfı / İstanbul",
        count: 8500,
        dialect: "BATI",
        langPair: "ADI-TR"
    },
    {
        id: 6,
        title: "Türkçe - Çerkesçe Sözlük",
        author: "Murat Papşu",
        year: "2004",
        publisher: "Kafkas Derneği / Ankara",
        count: 14200,
        dialect: "BATI",
        langPair: "TR-ADI"
    },
    {
        id: 7,
        title: "Kabardeyce - Türkçe Sözlük",
        author: "Kadir Natkho",
        year: "1995",
        publisher: "Kafkas Kitaplığı / İstanbul",
        count: 11000,
        dialect: "DOGU",
        langPair: "KAB-TR"
    },
    {
        id: 8,
        title: "Adıgece Gramer Sözlüğü (Адыгэбзэ Грамматикэ)",
        author: "Z. U. Blyagoz",
        year: "1988",
        publisher: "Adygeyskoye / Maykop",
        count: 9800,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 9,
        title: "Rusça - Kabardeyce Sözlük",
        author: "T. Kh. Borukayev",
        year: "1932",
        publisher: "Kraizdat / Rostov",
        count: 16500,
        dialect: "DOGU",
        langPair: "RU-KAB"
    },
    {
        id: 10,
        title: "Şapsığ Diyalekti Sözlüğü (Шапсугский диалект)",
        author: "A. A. Katanov",
        year: "1963",
        publisher: "AN SSSR / Moskova",
        count: 6400,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 11,
        title: "Besleney Diyalekti Terimler Sözlüğü",
        author: "R. M. Kumakhov",
        year: "1971",
        publisher: "Elbrus / Nalçik",
        count: 7200,
        dialect: "DOGU",
        langPair: "KAB-RU"
    },
    {
        id: 12,
        title: "Abzah Çerkesçesi Sözlük Çalışması",
        author: "Ömer Beygua",
        year: "1978",
        publisher: "Kafkasya Kültür / Ankara",
        count: 5400,
        dialect: "BATI",
        langPair: "ADI-TR"
    },
    {
        id: 13,
        title: "Etimolojik Adıge Sözlüğü (I. Cilt)",
        author: "A. K. Shagirov",
        year: "1977",
        publisher: "Nauka / Moskova",
        count: 4500,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 14,
        title: "Etimolojik Adıge Sözlüğü (II. Cilt)",
        author: "A. K. Shagirov",
        year: "1977",
        publisher: "Nauka / Moskova",
        count: 4800,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 15,
        title: "Çerkesçe Atasözleri ve Deyimler Sözlüğü",
        author: "M. A. Kumakhov",
        year: "1982",
        publisher: "Elbrus / Nalçik",
        count: 3200,
        dialect: "DOGU",
        langPair: "KAB-TR"
    },
    {
        id: 16,
        title: "Adıgece Okul Sözlüğü (КIэлэегъэджэ Псалъалъэ)",
        author: "U. S. Zekokh",
        year: "2002",
        publisher: "Krasnodar / Maykop",
        count: 8900,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 17,
        title: "Kabardeyce - İngilizce Cep Sözlüğü",
        author: "John Colarusso",
        year: "1989",
        publisher: "Caravan Books / New York",
        count: 5100,
        dialect: "DOGU",
        langPair: "KAB-EN"
    },
    // KRİTİK EŞLEŞMELER (ID 18, 24, 30)
    {
        id: 18,
        title: "Kabardeyce - Rusça Sözlük (Къэбэрдей-Руссэ Псалъалъэ)",
        author: "М. Л. Апажев & Дж. Н. Коков",
        year: "2008",
        publisher: "El-Fa / Nalçik",
        count: 24000,
        dialect: "DOGU",
        langPair: "KAB-RU"
    },
    {
        id: 19,
        title: "Batı Çerkesçesi - Almanca Sözlük",
        author: "Gerhard Deeters",
        year: "1963",
        publisher: "München / Almanya",
        count: 6700,
        dialect: "BATI",
        langPair: "ADI-DE"
    },
    {
        id: 20,
        title: "Çerkesçe Bitki ve Doğa İsimleri Sözlüğü",
        author: "A. T. Kerashev",
        year: "1991",
        publisher: "Adygeyskoye / Maykop",
        count: 2800,
        dialect: "BATI",
        langPair: "ADI-TR"
    },
    {
        id: 21,
        title: "Kabardeyce Tıp ve Anatomi Terimleri",
        author: "K. M. Shaov",
        year: "2005",
        publisher: "El-Fa / Nalçik",
        count: 3900,
        dialect: "DOGU",
        langPair: "KAB-RU"
    },
    {
        id: 22,
        title: "Adıgece Eş Anlamlılar Sözlüğü (Синонимхэм япсалъалъэ)",
        author: "Z. I. Keraşeva",
        year: "1984",
        publisher: "Maykop Press / Maykop",
        count: 7100,
        dialect: "BATI",
        langPair: "ADI-ADI"
    },
    {
        id: 23,
        title: "Kabardeyce Zıt Anlamlılar Sözlüğü",
        author: "H. I. Taov",
        year: "1990",
        publisher: "Elbrus / Nalçik",
        count: 4600,
        dialect: "DOGU",
        langPair: "KAB-KAB"
    },
    {
        id: 24,
        title: "Rusça - Adıgece Sözlük (Русско-адыгейский словарь)",
        author: "Х. Д. Водождокова",
        year: "1960",
        publisher: "Gosizdat / Moskova",
        count: 35000,
        dialect: "BATI",
        langPair: "RU-ADI"
    },
    {
        id: 25,
        title: "Çerkes Mitolojisi ve İnanç Terimleri Fişi",
        author: "M. I. Miziyev",
        year: "1994",
        publisher: "Kafkas Dergisi / Nalçik",
        count: 2100,
        dialect: "DOGU",
        langPair: "KAB-TR"
    },
    {
        id: 26,
        title: "Adıgece Toponimik Sözlük (Coğrafi Yer İsimleri)",
        author: "K. Kh. Meretukov",
        year: "1981",
        publisher: "Adygeyskoye / Maykop",
        count: 5300,
        dialect: "BATI",
        langPair: "ADI-RU"
    },
    {
        id: 27,
        title: "Kabardeyce Coğrafi İsimler Katalogü",
        author: "G. Kh. Mambetov",
        year: "1987",
        publisher: "Elbrus / Nalçik",
        count: 4900,
        dialect: "DOGU",
        langPair: "KAB-RU"
    },
    {
        id: 28,
        title: "Çerkesçe - Fransızca Karşılaştırmalı Fişler",
        author: "Georges Dumézil",
        year: "1965",
        publisher: "Klincksieck / Paris",
        count: 3800,
        dialect: "BATI",
        langPair: "ADI-FR"
    },
    {
        id: 29,
        title: "Adıgece - Arapça Sözlük",
        author: "Nart Kültür Evi",
        year: "1975",
        publisher: "Amman / Ürdün",
        count: 9400,
        dialect: "BATI",
        langPair: "ADI-AR"
    },
    {
        id: 30,
        title: "Açıklamalı Adıgece Sözlük (Адыгабзэм изэхефыкI псалъалъ)",
        author: "Ю. А. Тхаркахо",
        year: "1991",
        publisher: "Maykop Press / Maykop",
        count: 22000,
        dialect: "BATI",
        langPair: "ADI-ADI"
    },
    {
        id: 31,
        title: "Kabardeyce - Arapça Sözlük",
        author: "Muhammed Shaban",
        year: "1983",
        publisher: "Şam / Suriye",
        count: 10200,
        dialect: "DOGU",
        langPair: "KAB-AR"
    },
    {
        id: 32,
        title: "Çerkesçe Hukuk ve Adet Terimleri (Adıge Xabze)",
        author: "S. M. Namitokov",
        year: "1928",
        publisher: "Prag / Çekya",
        count: 3100,
        dialect: "BATI",
        langPair: "ADI-TR"
    },
    {
        id: 33,
        title: "Modern Adıgece Sözdağarcığı",
        author: "H. S. Birmamytov",
        year: "2015",
        publisher: "Maykop Üniv. / Maykop",
        count: 16800,
        dialect: "BATI",
        langPair: "ADI-TR"
    },
    {
        id: 34,
        title: "Büyük Dijital Kabardeyce Korpusu",
        author: "Kafkas Araştırmaları Merkezi",
        year: "2020",
        publisher: "Dijital Yayın / Nalçik",
        count: 42000,
        dialect: "DOGU",
        langPair: "KAB-TR"
    }
];
function Kaynaklar({ onClose }) {
    const [aramaMetni, setAramaMetni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliDiyalekt, setSeciliDiyalekt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("HEPSİ");
    const istatistikler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const toplamSozluk = manifestData.length;
        let toplamKayit = 0;
        let batiCount = 0;
        let doguCount = 0;
        const hedefDiller = new Set();
        manifestData.forEach((s)=>{
            toplamKayit += Number(s.count || 0);
            const dialect = (s.dialect || "").toUpperCase();
            if (dialect.includes("BATI")) batiCount++;
            if (dialect.includes("DOGU")) doguCount++;
            const lang = (s.langPair || "").toLowerCase();
            if (lang) hedefDiller.add(lang);
        });
        return {
            toplamSozluk,
            toplamKayit,
            batiCount,
            doguCount,
            hedefDilSayisi: hedefDiller.size || 5
        };
    }, []);
    const filtrelenmisManifest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return manifestData.filter((sozluk)=>{
            const baslik = (sozluk.title || "").toLowerCase();
            const yazar = (sozluk.author || "").toLowerCase();
            const sehir = (sozluk.publisher || "").toLowerCase();
            const idStr = (sozluk.id || "").toString();
            const dialect = (sozluk.dialect || "").toUpperCase();
            const aramaUyum = baslik.includes(aramaMetni.toLowerCase()) || yazar.includes(aramaMetni.toLowerCase()) || sehir.includes(aramaMetni.toLowerCase()) || idStr.includes(aramaMetni);
            let diyalektUyum = true;
            if (seciliDiyalekt === "BATI") diyalektUyum = dialect.includes("BATI");
            if (seciliDiyalekt === "DOĞU") diyalektUyum = dialect.includes("DOGU");
            return aramaUyum && diyalektUyum;
        });
    }, [
        aramaMetni,
        seciliDiyalekt
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            backgroundColor: "#FDFBF7",
            color: "#2C221E",
            padding: "40px 20px",
            fontFamily: "'IBM Plex Sans', sans-serif"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "960px",
                margin: "0 auto"
            },
            children: [
                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: {
                        background: "none",
                        border: "none",
                        color: "#7A1C1C",
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginBottom: "24px",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    },
                    children: "← Sözlüğe dön"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        backgroundColor: "#F4EFE6",
                        borderLeft: "4px solid #7A1C1C",
                        padding: "28px 32px",
                        borderRadius: "2px",
                        marginBottom: "32px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "11px",
                                fontWeight: "bold",
                                letterSpacing: "2.5px",
                                textTransform: "uppercase",
                                color: "#7A1C1C",
                                marginBottom: "8px"
                            },
                            children: "Açık Mektep Açık Erişim Dil Kaynakları Projesi"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: "32px",
                                color: "#1F1A17",
                                fontFamily: "serif",
                                fontStyle: "italic",
                                margin: "0 0 16px 0",
                                fontWeight: "600"
                            },
                            children: "Çerkesçe Sözlük Projesi"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "15px",
                                lineHeight: "1.7",
                                color: "#3D322C",
                                margin: "0 0 14px 0"
                            },
                            children: "Çerkesçe Sözlük, Batı Adıgece (Adıge) ve Doğu Adıgece (Kabardeyce) lehçelerine ait sözlükleri tek bir dijital platform altında bir araya getirmeyi amaçlayan açık erişimli bir dil kaynakları projesidir."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "14.5px",
                                lineHeight: "1.7",
                                color: "#4A3E37",
                                margin: 0
                            },
                            children: "Proje kapsamında farklı dönemlerde yayımlanmış basılı sözlükler, akademik çalışmalar, açık erişimli dijital koleksiyonlar ve topluluk katkıları incelenmiş; elde edilen veriler ortak bir veri modeli altında bütünleştirilmiştir."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #EADDC9",
                        padding: "24px",
                        borderRadius: "3px",
                        marginBottom: "28px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "#7A1C1C",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "10px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "📡"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                " Dijital Kaynak Koleksiyonu"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: "20px",
                                fontWeight: "bold",
                                margin: "0 0 8px 0",
                                color: "#1F1A17"
                            },
                            children: "Learn Circassian Raw Dictionary Collection"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "14px",
                                lineHeight: "1.6",
                                color: "#4A3E37",
                                margin: "0 0 14px 0"
                            },
                            children: [
                                "Bu uygulamada kullanılan çok sayıda Adıgece ve Kabardeyce sözlük verisi, açık erişimli ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Learn Circassian Raw Dictionary Collection"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 139,
                                    columnNumber: 100
                                }, this),
                                " dijital arşivinden derlenmiştir. Bu koleksiyon; Adıgece, Kabardeyce, Türkçe, Rusça, İngilizce ve Arapça karşılıklı sözlükleri içeren açık bir dijital sözlük havuzudur."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://github.com/bihoqo/learn-circassian-raw-dictionary-collection",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                backgroundColor: "#7A1C1C",
                                color: "#FFFFFF",
                                padding: "8px 16px",
                                borderRadius: "3px",
                                fontSize: "12.5px",
                                fontWeight: "bold",
                                textDecoration: "none"
                            },
                            children: "🔗 GitHub: bihoqo / learn-circassian-raw-dictionary-collection"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        backgroundColor: "#F9F6F0",
                        border: "1px solid #E2D7C3",
                        padding: "24px",
                        borderRadius: "3px",
                        marginBottom: "36px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "11px",
                                fontWeight: "bold",
                                color: "#C5A059",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "12px"
                            },
                            children: "Akademik Temeller"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: "0 0 16px 0",
                                color: "#1F1A17",
                                borderBottom: "1px solid #E2D7C3",
                                paddingBottom: "8px"
                            },
                            children: "📖 Temel Referans Kaynaklar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: "12px",
                                fontSize: "13.5px",
                                color: "#2C221E"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "10px",
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #EADDC9"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "М. Л. Апажев & Дж. Н. Коков"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        " (2008)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "11.5px",
                                                color: "#8C7A6B",
                                                marginTop: "2px"
                                            },
                                            children: "[ID 18] Kabardeyce - Rusça Sözlük"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "10px",
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #EADDC9"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Х. Д. Водождокова"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        " (1960)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "11.5px",
                                                color: "#8C7A6B",
                                                marginTop: "2px"
                                            },
                                            children: "[ID 24] Rusça - Adıgece Sözlük"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "10px",
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #EADDC9"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Ю. А. Тхаркахо"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        " (1991)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "11.5px",
                                                color: "#8C7A6B",
                                                marginTop: "2px"
                                            },
                                            children: "[ID 30] Açıklamalı Adıgece Sözlük"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "10px",
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #EADDC9"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Fahri Huvaj"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this),
                                        " (2011)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "11.5px",
                                                color: "#8C7A6B",
                                                marginTop: "2px"
                                            },
                                            children: "[ID 2] Adıgece - Türkçe Sözlük"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                        gap: "16px",
                        padding: "20px 0",
                        borderTop: "1px solid #E2D7C3",
                        borderBottom: "1px solid #E2D7C3",
                        marginBottom: "32px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        color: "#7A1C1C"
                                    },
                                    children: istatistikler.toplamSozluk
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6E5B51",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Kataloglu Eser"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        color: "#A32A2A"
                                    },
                                    children: istatistikler.toplamKayit.toLocaleString("tr-TR")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6E5B51",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Dijitalize Madde"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#2C221E"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#7A1C1C"
                                            },
                                            children: istatistikler.batiCount
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 191,
                                            columnNumber: 15
                                        }, this),
                                        " / ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#C5A059"
                                            },
                                            children: istatistikler.doguCount
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 191,
                                            columnNumber: 85
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6E5B51",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Batı / Doğu Diyalekti"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        color: "#C5A059"
                                    },
                                    children: istatistikler.hedefDilSayisi
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6E5B51",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Hedef Dil Çifti"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: "28px",
                        gap: "20px",
                        flexWrap: "wrap"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: "1",
                                minWidth: "240px",
                                maxWidth: "320px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: "block",
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#7A1C1C",
                                        textTransform: "uppercase",
                                        marginBottom: "6px",
                                        letterSpacing: "1px"
                                    },
                                    children: "Katalogda Ara"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Eser, yazar veya ID (ör: 18)...",
                                    value: aramaMetni,
                                    onChange: (e)=>setAramaMetni(e.target.value),
                                    style: {
                                        width: "100%",
                                        padding: "8px 0",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        borderBottom: "2px solid #C5A059",
                                        fontSize: "14px",
                                        outline: "none",
                                        color: "#2C221E"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "10px"
                            },
                            children: [
                                "HEPSİ",
                                "BATI",
                                "DOĞU"
                            ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSeciliDiyalekt(d),
                                    style: {
                                        padding: "6px 12px",
                                        border: "none",
                                        borderBottom: seciliDiyalekt === d ? "2px solid #7A1C1C" : "2px solid transparent",
                                        backgroundColor: "transparent",
                                        color: seciliDiyalekt === d ? "#7A1C1C" : "#8C7A6B",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                        textTransform: "uppercase"
                                    },
                                    children: d === "HEPSİ" ? "Tüm Korpus (34)" : d === "BATI" ? "Batı · Adıgece" : "Doğu · Kabardeyce"
                                }, d, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                        gap: "18px",
                        marginBottom: "40px"
                    },
                    children: filtrelenmisManifest.map((sozluk, idx)=>{
                        const yazar = sozluk.author || "Belirtilmemiş";
                        const baslik = sozluk.title || "";
                        const yil = sozluk.year || "";
                        const sehirYayin = sozluk.publisher || "";
                        const kayitSayisi = sozluk.count || 0;
                        const lehce = (sozluk.dialect || "").toUpperCase();
                        const dilCifti = sozluk.langPair || "";
                        const sozlukId = sozluk.id || idx + 1;
                        const batiMi = lehce.includes("BATI");
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            style: {
                                backgroundColor: "#FFFFFF",
                                padding: "18px 20px",
                                borderLeft: `4px solid ${batiMi ? "#7A1C1C" : "#C5A059"}`,
                                boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
                                borderTop: "1px solid #F0E8DD",
                                borderRight: "1px solid #F0E8DD",
                                borderBottom: "1px solid #F0E8DD",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "170px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "8px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "10.5px",
                                                        fontWeight: "bold",
                                                        color: "#8C7A6B",
                                                        fontFamily: "monospace"
                                                    },
                                                    children: [
                                                        "FİŞ № ",
                                                        sozlukId
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: "6px",
                                                        alignItems: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: "10px",
                                                                fontWeight: "bold",
                                                                color: batiMi ? "#7A1C1C" : "#A37015",
                                                                backgroundColor: batiMi ? "#FDF2F2" : "#FCF8ED",
                                                                padding: "2px 6px",
                                                                borderRadius: "2px",
                                                                border: `1px solid ${batiMi ? "#F4C7C7" : "#E2C997"}`
                                                            },
                                                            children: batiMi ? "🟢 BATI ADIGECE" : "🔵 DOĞU KABARDEYCE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: "10.5px",
                                                                fontWeight: "bold",
                                                                color: "#7A1C1C",
                                                                backgroundColor: "#F9F5EE",
                                                                padding: "2px 6px",
                                                                borderRadius: "2px",
                                                                border: "1px solid #EADDC9"
                                                            },
                                                            children: dilCifti
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 268,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                margin: "0 0 8px 0",
                                                color: "#1F1A17",
                                                lineHeight: "1.35"
                                            },
                                            children: baslik
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "12.5px",
                                                color: "#4A3E37",
                                                marginBottom: "4px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#8C7A6B"
                                                    },
                                                    children: "Yazar — "
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: yazar
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this),
                                        (yil || sehirYayin) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "11.5px",
                                                color: "#8C7A6B",
                                                fontFamily: "monospace",
                                                marginBottom: "14px"
                                            },
                                            children: [
                                                yil,
                                                " • ",
                                                sehirYayin
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 292,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 267,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        borderTop: "1px dashed #E2D7C3",
                                        paddingTop: "10px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        fontSize: "11px",
                                        fontFamily: "monospace",
                                        color: "#8C7A6B"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: "bold",
                                                color: batiMi ? "#7A1C1C" : "#A37015"
                                            },
                                            children: batiMi ? "Batı Adıgece" : "Doğu Kabardeyce"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            style: {
                                                color: "#7A1C1C",
                                                fontSize: "12px"
                                            },
                                            children: [
                                                Number(kayitSayisi).toLocaleString("tr-TR"),
                                                " madde"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 303,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, sozluk.id || idx, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 251,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        borderTop: "1px solid #E2D7C3",
                        paddingTop: "24px",
                        marginBottom: "30px",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: "#6E5B51"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            fontStyle: "italic"
                        },
                        children: "* Metodoloji: Platform üzerindeki tüm aramalar, orijinal kaynakların bibliyografik künyeleri korunarak çapraz sorgulanır. Kullanıcılar tek bir aramayla kelimelerin Batı ve Doğu Adıgece diyalektlerindeki karşılıklarını, fonetik farklılıklarını ve kullanım bağlamlarını eşzamanlı olarak karşılaştırabilirler."
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 311,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Kaynaklar.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/KelimeDetayDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KelimeDetayDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const KURUMSAL_KIRMIZI = "#FF4030";
function KelimeDetayDrawer({ seciliKelime, kapat, tema, metinBoyutu }) {
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const kapatBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Eski page.tsx'teki Klavye ve Odak Yönetimi Logic'i
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.key === "Escape") {
                kapat();
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
        window.addEventListener("keydown", handleKeyDown);
        setTimeout(()=>kapatBtnRef.current?.focus(), 50);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        kapat
    ]);
    // Kaynak listesi (Eski yapıdaki kaynaklar veya anlamlar dizisi)
    const kaynakListesi = seciliKelime.kaynaklar && seciliKelime.kaynaklar.length > 0 ? seciliKelime.kaynaklar : seciliKelime.anlamlar || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "drawer-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: kapat,
                "aria-hidden": "true",
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(2px)",
                    zIndex: 9998
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    zIndex: 9999,
                    boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "24px",
                    boxSizing: "border-box"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                            borderBottom: `1px solid ${tema.kenarlik}`,
                            paddingBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "drawer-title",
                                style: {
                                    margin: 0,
                                    fontSize: `${metinBoyutu * 1.4}px`,
                                    color: tema.yaziAna,
                                    fontWeight: "bold"
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(seciliKelime.kelime)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: kapatBtnRef,
                                onClick: kapat,
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
                                fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px"
                        },
                        children: kaynakListesi.map((kaynak, idx)=>{
                            const dosyaAdi = kaynak.kaynak_sozluk || kaynak.file || kaynak.kaynak;
                            const tanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.tanim || kaynak.anlam || kaynak.meaning || kaynak.full_definition_in_html);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "16px",
                                    borderRadius: "8px",
                                    backgroundColor: tema.inputArkaPlan,
                                    border: `1px solid ${tema.kenarlik}`
                                },
                                children: [
                                    dosyaAdi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: `${metinBoyutu * 0.85}px`,
                                            fontWeight: "bold",
                                            color: KURUMSAL_KIRMIZI,
                                            marginBottom: "6px"
                                        },
                                        children: [
                                            "📚 ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(dosyaAdi))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: tema.yaziAna,
                                            fontSize: `${metinBoyutu * 0.95}px`,
                                            lineHeight: "1.6"
                                        },
                                        dangerouslySetInnerHTML: {
                                            __html: tanim
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/constants/alphabet.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CERKES_OZEL_HARFLER",
    ()=>CERKES_OZEL_HARFLER
]);
const CERKES_OZEL_HARFLER = [
    "Ӏ",
    "а",
    "б",
    "в",
    "г",
    "гу",
    "гъ",
    "д",
    "дж",
    "дз",
    "е",
    "ё",
    "ж",
    "жъ",
    "жь",
    "з",
    "и",
    "й",
    "к",
    "къ",
    "кӀ",
    "л",
    "лъ",
    "м",
    "н",
    "о",
    "п",
    "пӀ",
    "р",
    "с",
    "т",
    "тӀ",
    "у",
    "ф",
    "фӀ",
    "х",
    "хь",
    "хъ",
    "ц",
    "цӀ",
    "ч",
    "чъ",
    "чӀ",
    "ш",
    "щ",
    "ы",
    "э",
    "ю",
    "я"
];
}),
"[project]/src/constants/dictionarySources.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KAYNAK_HARITASI",
    ()=>KAYNAK_HARITASI,
    "kaynagiDuzenle",
    ()=>kaynagiDuzenle,
    "metneCevir",
    ()=>metneCevir,
    "temizeCevir",
    ()=>temizeCevir
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/dictionaries.json.[json].cjs [app-ssr] (ecmascript)");
;
const KAYNAK_HARITASI = {
    // ... harita içeriğin aynen devam ediyor
    "1": "Huvaj — Adıgece-Türkçe Sözlük",
    "2": "Kerasheva — Çerkesçe Temel Kelimeler",
    "3": "Paranuk — Adıgece Kavramlar",
    "3.Ady-En": "Adıgece-İngilizce Sözlük",
    "4": "Boran — Çerkesçe Dil Kartları",
    "5": "Tuguz — Çerkesçe Sözlük",
    "6": "Abaza — Abazaca-Türkçe Sözlük",
    "7": "Kube — Çerkesçe Kelimeler",
    "8.Ady-Tur_Huvaj": "Fahri Huvaj — Adıgece-Türkçe Sözlük",
    "9.KBD-TUR_Keras": "Zeynab Kerasheva — Kabardeyce-Türkçe Sözlük",
    "10.Ady-Tur_Paran": "Nihat Paranuk — Adıgece-Türkçe Sözlük",
    "11.KBD-TUR_Boran": "Murat Boran — Kabardeyce-Türkçe Sözlük",
    "12.Ady-TUR_Tuguz": "Ramazan Tuguz — Adıgece-Türkçe Sözlük",
    "13.ABZ-TUR_Abaz": "Abazaca-Türkçe Sözlük",
    "14.KBD-TUR_Kube": "Cevdet Kube — Kabardeyce-Türkçe Sözlük",
    "15.Tur-Ady_Huvaj": "Fahri Huvaj — Türkçe-Adıgece Sözlük",
    "16.Tur-KBD_Boran": "Murat Boran — Türkçe-Kabardeyce Sözlük",
    "17.KBD-RUS_Apazh": "Apazhev & Kokov — Kabardeyce-Rusça Sözlük",
    "18.RUS-KBD_Apazh": "Apazhev & Kokov (2008) — Rusça-Kabardeyce Sözlük",
    "19.Ady-RUS_Thark": "Yusuf Tharkaho — Adıgece-Rusça Sözlük",
    "20.RUS-Ady_Thark": "Yusuf Tharkaho — Rusça-Adıgece Sözlük",
    "21.Ady-ARA_Huvaj": "Fahri Huvaj — Adıgece-Arapça Sözlük",
    "22.ARA-Ady_Huvaj": "Fahri Huvaj — Arapça-Adıgece Sözlük",
    "23.KBD-ENG_Amjad": "Amjad Jaimoukha — Kabardeyce-İngilizce Sözlük",
    "24.Ady-RUS_Vodoz": "Vodozhdokova (1960) — Adıgece-Rusça Sözlük",
    "25.ENG-KBD_Amjad": "Amjad Jaimoukha — İngilizce-Kabardeyce Sözlük",
    "26.Ady-Tur_Lamiq": "Lamiq — Adıgece-Türkçe Sözlük",
    "27.KBD-TUR_Lamiq": "Lamiq — Kabardeyce-Türkçe Sözlük",
    "28.Ady-RUS_Blyag": "Blyagoz — Adıgece-Rusça Sözlük",
    "29.RUS-Ady_Blyag": "Blyagoz — Rusça-Adıgece Sözlük",
    "30.Ady-ETM_Thark": "Tharkaho (1991) — Adıgece Etimoloji Sözlüğü"
};
const metneCevir = (veri)=>{
    if (veri === null || veri === undefined) return "";
    if (typeof veri === "string") return veri;
    if (typeof veri === "number") return String(veri);
    if (typeof veri === "object") {
        return veri.text || veri.word || veri.value || veri.title || veri.name || veri.file || JSON.stringify(veri);
    }
    return String(veri);
};
const temizeCevir = (metin)=>{
    return metin ? metin.trim() : "";
};
// Gelişmiş Normalizasyon (Sayı öneklerini, uzantıları ve büyük/küçük harf farkını temizler)
const normalizeKey = (val)=>{
    return val.replace(/^\d+[\.\-_]?/, "") // Baştaki sayı öneklerini temizler (Örn: "8." veya "8-")
    .replace(/\.js[oa]?n?$/i, "") // Uzantıları temizler (.json, .jso vs.)
    .replace(/\.txt$/i, "").trim().toLowerCase();
};
const kaynagiDuzenle = (dosyaAdi, sozluklerListesi)=>{
    const hamMetin = metneCevir(dosyaAdi);
    if (!hamMetin) return "";
    const arananNormalized = normalizeKey(hamMetin);
    const hedefListe = sozluklerListesi && sozluklerListesi.length > 0 ? sozluklerListesi : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
    // 1. MANIFEST / DICTIONARIES DİNAMİK ARAMA
    if (Array.isArray(hedefListe) && hedefListe.length > 0) {
        const bulunan = hedefListe.find((s)=>{
            const sFileNormalized = s?.file ? normalizeKey(s.file) : "";
            const sIdNormalized = s?.id ? String(s.id).trim().toLowerCase() : "";
            return sFileNormalized === arananNormalized || sIdNormalized === arananNormalized || sFileNormalized.includes(arananNormalized);
        });
        if (bulunan) {
            const yazar = bulunan.author ? `${bulunan.author} — ` : "";
            return `${yazar}${bulunan.title || bulunan.name}`;
        }
    }
    // 2. YEDEK HARİTA ARAMASI (Fallback)
    const haritaAnahtari = Object.keys(KAYNAK_HARITASI).find((k)=>normalizeKey(k) === arananNormalized);
    if (haritaAnahtari) {
        return KAYNAK_HARITASI[haritaAnahtari];
    }
    return hamMetin;
};
}),
"[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "formatDictionaryTitle",
    ()=>formatDictionaryTitle,
    "useDictionary",
    ()=>useDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cleanHtml.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function formatDictionaryTitle(title) {
    if (!title) return {
        dilCifti: "Bilinmeyen Sözlük",
        yazar: "Kaynak Belirtilmedi"
    };
    const parts = title.split(/\s+[\?—-]\s+/);
    if (parts.length >= 2) {
        const dilCifti = parts[0].replace(/\(.*?\)/g, "").trim();
        const yazar = parts[1].replace(/\(.*?\)/g, "").trim();
        return {
            dilCifti,
            yazar
        };
    }
    const temizTitle = title.replace(/\(.*?\)/g, "").trim();
    return {
        dilCifti: temizTitle,
        yazar: "Genel Kaynak"
    };
}
const DEMO_SOZLUKLER = [
    {
        file: "8.Ady-Tur_Huvaj.json",
        title: "Demo Sözlük",
        total_words: 6,
        dialect: "BATI",
        fromLang: "ady",
        toLang: "tr"
    }
];
const DEMO_KELIMELER = [
    {
        kelime: "псы",
        tanim: "su",
        kaynak_sozluk: "Demo",
        file: "demo",
        dialect: "BATI",
        toLang: "tr"
    },
    {
        kelime: "Ӏупэ",
        tanim: "kapı",
        kaynak_sozluk: "Demo",
        file: "demo",
        dialect: "BATI",
        toLang: "tr"
    },
    {
        kelime: "мафэ",
        tanim: "güneş / gün",
        kaynak_sozluk: "Demo",
        file: "demo",
        dialect: "BATI",
        toLang: "tr"
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
    if (item.dialect === "BATI") return "Adigece";
    if (item.dialect === "DOGU") return "Kabardeyce";
    return "Bilinmeyen";
}
function parseTanim(val) {
    if (typeof val !== "object" || val === null) {
        return typeof val === "string" ? val.trim() : "";
    }
    const obj = val;
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
    if (typeof obj.full_definition_in_html === "string" && obj.full_definition_in_html) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["temizleHtml"])(obj.full_definition_in_html);
    }
    if (typeof obj.tanim === "string" && obj.tanim) return obj.tanim.trim();
    if (typeof obj.meaning === "string" && obj.meaning) return obj.meaning.trim();
    return "";
}
function parseDictionaryData(rawData, meta) {
    if (typeof rawData !== "object" || rawData === null) return [];
    const record = rawData;
    const wordsObj = record.words ?? rawData;
    // JSON dosyasının üst seviyesinde veya manifest'te toLang / fromLang varsa al
    const rootFromLang = record.fromLang || meta.fromLang || "";
    const rootToLang = record.toLang || meta.toLang || "";
    let parsed = [];
    if (Array.isArray(wordsObj)) {
        parsed = wordsObj.map((item)=>{
            if (typeof item !== "object" || item === null) return {
                kelime: "",
                tanim: ""
            };
            const itemObj = item;
            const kelime = typeof itemObj.kelime === "string" ? itemObj.kelime : typeof itemObj.spelling === "string" ? itemObj.spelling : "";
            const tanim = typeof itemObj.tanim === "string" && itemObj.tanim ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["temizleHtml"])(itemObj.tanim) : parseTanim(itemObj);
            return {
                ...itemObj,
                kelime,
                tanim,
                file: meta.file,
                kaynak_sozluk: meta.title,
                dialect: meta.dialect,
                fromLang: itemObj.fromLang || rootFromLang,
                toLang: itemObj.toLang || rootToLang,
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
                fromLang: rootFromLang,
                toLang: rootToLang,
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
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("tumu"); // DÜZELTME: hedefDil State'i Eklendi
    const [gununKelimesi, setGununKelimesi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const cacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const deferredSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchQuery);
    const loadOne = async (meta, signal)=>{
        if (!meta.file) return [];
        if (cacheRef.current[meta.file]) return cacheRef.current[meta.file];
        try {
            const safeFileName = encodeURIComponent(meta.file.trim());
            const res = await fetch(`/data/${safeFileName}`, {
                signal
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const raw = await res.json();
            const result = parseDictionaryData(raw, meta);
            cacheRef.current[meta.file] = result;
            return result;
        } catch (error) {
            if (error.name === "AbortError") {
                return [];
            }
            console.error(`[Sözlük Yükleme Hatası - ${meta.file}]:`, error);
            return [];
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        const controller = new AbortController();
        async function init() {
            setLoading(true);
            let manifest = [];
            try {
                const res = await fetch("data/dictionaries.json", {
                    signal: controller.signal
                });
                if (res.ok) manifest = await res.json();
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.warn("Manifest okunamadı, fallback sözlükler aktif.");
                }
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
            const ilkSonuclar = await Promise.allSettled(ilkGrup.map((meta)=>loadOne(meta, controller.signal)));
            ilkSonuclar.forEach((r)=>{
                if (r.status === "fulfilled") ilkKelimeler.push(...r.value);
            });
            if (!isMounted || controller.signal.aborted) return;
            if (ilkKelimeler.length === 0) {
                setRawWords(DEMO_KELIMELER);
                setWordsCount(DEMO_KELIMELER.length);
            } else {
                setRawWords(ilkKelimeler);
                setWordsCount(ilkKelimeler.length);
            }
            setLoading(false);
            if (kalanGrup.length === 0) return;
            const BATCH = 3;
            let tumKelimeler = [
                ...ilkKelimeler
            ];
            for(let i = 0; i < kalanGrup.length; i += BATCH){
                if (!isMounted || controller.signal.aborted) return;
                const batch = kalanGrup.slice(i, i + BATCH);
                const sonuclar = await Promise.allSettled(batch.map((meta)=>loadOne(meta, controller.signal)));
                const yeni = [];
                sonuclar.forEach((r)=>{
                    if (r.status === "fulfilled") yeni.push(...r.value);
                });
                if (yeni.length > 0 && isMounted && !controller.signal.aborted) {
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
            controller.abort();
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
    // DÜZELTME: Hedef Dil Filtrelemesi Entegre Edildi
    const filtrelenmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let veri = rawWords;
        if (seciliLehce !== "TUMU") {
            veri = veri.filter((i)=>i.dialect === seciliLehce);
        }
        if (seciliDosya !== "TUMU") {
            veri = veri.filter((i)=>i.file === seciliDosya);
        }
        if (hedefDil !== "tumu") {
            const targetLang = hedefDil.toLowerCase();
            veri = veri.filter((i)=>{
                const itemToLang = typeof i.toLang === "string" ? i.toLang.toLowerCase() : "";
                const itemFromLang = typeof i.fromLang === "string" ? i.fromLang.toLowerCase() : "";
                return itemToLang === targetLang || itemFromLang === targetLang;
            });
        }
        if (deferredSearch.trim()) {
            const q = normalizeText(deferredSearch);
            veri = veri.filter((i)=>i.normalizedKelime?.includes(q) || i.normalizedTanim?.includes(q));
        }
        return veri;
    }, [
        rawWords,
        seciliLehce,
        seciliDosya,
        hedefDil,
        deferredSearch
    ]);
    const conceptRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const groups = new Map();
        filtrelenmisSonuclar.forEach((item)=>{
            const key = normalizeText(item.kelime);
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
        hedefDil,
        setHedefDil,
        gununKelimesi,
        filtrelenmisSonuclar,
        conceptRows,
        aktifSozlukler
    };
}
const __TURBOPACK__default__export__ = useDictionary;
}),
"[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/dictionaryConstants.ts
/**
 * Açık Mektep Kurumsal Renk Paleti
 */ __turbopack_context__.s([
    "BATI_SOZLUKLERI",
    ()=>BATI_SOZLUKLERI,
    "DOGU_SOZLUKLERI",
    ()=>DOGU_SOZLUKLERI,
    "KAYNAK_HARITASI",
    ()=>KAYNAK_HARITASI,
    "KURUMSAL",
    ()=>KURUMSAL,
    "SOZLUK_META",
    ()=>SOZLUK_META,
    "TEMA",
    ()=>TEMA,
    "TUR_MAP",
    ()=>TUR_MAP,
    "VARSAYILAN_TEMA",
    ()=>VARSAYILAN_TEMA
]);
const KURUMSAL = {
    kirmizi: "#FF4030",
    kirmiziKoyu: "#E02E1F",
    kirmiziAcik: "#FFF1F0",
    kirmiziOpak: "rgba(255, 64, 48, 0.12)",
    sari: "#FFC604",
    sariKoyu: "#D9A400",
    sariAcik: "#FFFBEB",
    sariOpak: "rgba(255, 198, 4, 0.15)",
    mavi: "#2B6CB0",
    yesil: "#2F855A"
};
const TEMA = {
    acik: {
        kartArkaPlan: "#FFFFFF",
        inputArkaPlan: "#F8FAFC",
        inputFocusArkaPlan: "#FFFFFF",
        yaziAna: "#1E293B",
        yaziAlt: "#64748B",
        kenarlik: "#E2E8F0",
        kenarlikHover: "#CBD5E1",
        golge: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)"
    },
    karanlik: {
        kartArkaPlan: "#1E293B",
        inputArkaPlan: "#0F172A",
        inputFocusArkaPlan: "#1E293B",
        yaziAna: "#F8FAFC",
        yaziAlt: "#94A3B8",
        kenarlik: "#334155",
        kenarlikHover: "#475569",
        golge: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)"
    }
};
const VARSAYILAN_TEMA = TEMA.acik;
const BATI_SOZLUKLERI = {
    "0.Ady-Ady_AIG.json": {
        dilCifti: "Adıgece Açıklamalı Sözlük",
        yazar: "Адыгабзэм изэхэф (2006)"
    },
    "1.Ady-Rus_AP.json": {
        dilCifti: "Adıgece-Rusça",
        yazar: "Mirabil Apaşev"
    },
    "2.Ady-Ara_Lash.json": {
        dilCifti: "Adıgece-Arapça",
        yazar: "Adel Lash"
    },
    "3.Ady-En_Community.json": {
        dilCifti: "Adıgece-İngilizce",
        yazar: "Topluluk Katkısı"
    },
    "4.Ady-En_Adam.json": {
        dilCifti: "Adıgece-İngilizce",
        yazar: "Adam Shagash"
    },
    "10.En-Ady_Adam.json": {
        dilCifti: "İngilizce-Adıgece",
        yazar: "Adam Shagash"
    },
    "14.Tur-Ady_Huvaj.json": {
        dilCifti: "Türkçe-Adıgece",
        yazar: "Fahri Huvaj"
    },
    "15.Ady-Tur_Huvaj.json": {
        dilCifti: "Adıgece-Türkçe",
        yazar: "Fahri Huvaj"
    },
    "adigece_turkce.json": {
        dilCifti: "Adıgece-Türkçe",
        yazar: "Açık Mektep"
    }
};
const DOGU_SOZLUKLERI = {
    "5.Ady-Rus_Qarden.json": {
        dilCifti: "Kabardeyce-Rusça",
        yazar: "B. M. Kardanov"
    },
    "6.Ady-Rus_Sherdjes.json": {
        dilCifti: "Kabardeyce/Adıgece-Rusça",
        yazar: "Ali İ. Çerkes"
    },
    "17.Kbd-En_Amjad.json": {
        dilCifti: "Kabardeyce-İngilizce",
        yazar: "Amjad Jaimoukha"
    },
    "18.Kbd-En_Jonty_v2.json": {
        dilCifti: "Kabardeyce-İngilizce v2",
        yazar: "Jonty Yamisha"
    },
    "19.Kbd-En_Jonty_v1.json": {
        dilCifti: "Kabardeyce-İngilizce v1",
        yazar: "Jonty Yamisha"
    },
    "20.Kbd-En_Ziwar.json": {
        dilCifti: "Kabardeyce-İngilizce",
        yazar: "Ziwar Gish"
    },
    "kab_tr.json": {
        dilCifti: "Kabardeyce-Türkçe",
        yazar: "Açık Mektep"
    }
};
const SOZLUK_META = {
    ...BATI_SOZLUKLERI,
    ...DOGU_SOZLUKLERI
};
const KAYNAK_HARITASI = SOZLUK_META;
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
}),
"[project]/src/lib/variants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterButtonVariants",
    ()=>filterButtonVariants,
    "selectBoxVariants",
    ()=>selectBoxVariants
]);
function filterButtonVariants(options = {}) {
    const { active = false } = options;
    const temelSiniflar = "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/50 sm:text-sm";
    const aktifSiniflar = active ? "border-rose-800 bg-rose-800 font-semibold text-white shadow-sm dark:border-rose-600 dark:bg-rose-700" : "border-stone-200 bg-white text-stone-700 hover:border-rose-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-rose-800";
    return `${temelSiniflar} ${aktifSiniflar}`;
}
function selectBoxVariants() {
    return [
        "h-10",
        "w-full",
        "cursor-pointer",
        "rounded-lg",
        "border",
        "border-stone-200",
        "bg-stone-50",
        "px-3",
        "text-sm",
        "font-semibold",
        "text-stone-800",
        "outline-none",
        "transition-colors",
        "focus:border-rose-500",
        "focus:ring-2",
        "focus:ring-rose-500/50",
        "dark:border-stone-700",
        "dark:bg-stone-950",
        "dark:text-stone-200"
    ].join(" ");
}
}),
"[project]/src/utils/cleanHtml.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/utils/dictionaries.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "file": "0.Ady-Ady_AIG.json",
        "title": "Adıgece Açıklamalı Sözlük",
        "originalTitle": "Адыгабзэм изэхэф гущыӀалъ",
        "author": "A. A. Hatanov, Z. İ. Keraşeva",
        "editor": "A. N. Abregov, N. T. Gışev",
        "publisher": "Adıge Cumhuriyeti İnsani Bilimler Araştırma Enstitüsü (Maykop)",
        "year": 2006,
        "total_words": 15139,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "ady",
        "confidence": "VERIFIED"
    },
    {
        "file": "1.Ady-Ady_AP.json",
        "title": "Adıgece-Rusça Sözlük",
        "originalTitle": "Адыгэ-урыс псалъалъэ",
        "author": "Prof. Dr. Mirabil L. Apaşev",
        "year": 2008,
        "total_words": 27268,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "ru",
        "confidence": "VERIFIED"
    },
    {
        "file": "2.Ady-Ara.json",
        "title": "Adıgece-Arapça Sözlük",
        "author": "Dr. Adel Abdulsalam Lash",
        "year": 2013,
        "total_words": 12978,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "ar",
        "confidence": "VERIFIED"
    },
    {
        "file": "3.Ady-En.json",
        "title": "Adıgece-İngilizce",
        "shortLabel": "Derleme Kaynak",
        "author": "Dijital Derleme",
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "en"
    },
    {
        "file": "4.Ady-En_Adam.json",
        "title": "Adıgece-İngilizce Sözlük",
        "author": "Adam Shagash",
        "year": 2020,
        "total_words": 6445,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "en",
        "confidence": "HIGH"
    },
    {
        "file": "5.Ady-Rus_Qarden.json",
        "title": "Kabardeyce-Rusça",
        "shortLabel": "Kardanov (1957)",
        "author": "B. M. Kardanov (ed.)",
        "year": 1957,
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "ru"
    },
    {
        "file": "6.Ady-Rus_Sherdjes.json",
        "title": "The Words Which We Undeservingly Forgot",
        "originalTitle": "Hak Etmediğimiz Halde Unuttuğumuz Kelimeler",
        "author": "Aliy Cherkesov",
        "year": 1994,
        "total_words": 3834,
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "ru",
        "confidence": "VERIFIED"
    },
    {
        "file": "7.Ady-Rus_Tharkaho.json",
        "title": "Adıgece-Rusça Sözlük",
        "author": "Yunus (Cevdet) Tharkaho",
        "total_words": 8636,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "ru",
        "confidence": "VERIFIED"
    },
    {
        "file": "8.Ady-Tur_Huvaj.json",
        "title": "Adıgece-Türkçe Sözlük",
        "author": "Fahri Huvaj",
        "total_words": 17858,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "tr",
        "confidence": "VERIFIED"
    },
    {
        "file": "9.En-Ady.json",
        "title": "İngilizce-Adıgece Sözlük",
        "author": "Dijital Derleme",
        "total_words": 3056,
        "dialect": "BATI",
        "sourceLanguage": "en",
        "targetLanguage": "ady",
        "confidence": "HIGH"
    },
    {
        "file": "10.En-Ady_Adam.json",
        "title": "İngilizce-Adıgece Sözlük",
        "author": "Adam Shagash",
        "year": 2020,
        "total_words": 6250,
        "dialect": "BATI",
        "sourceLanguage": "en",
        "targetLanguage": "ady",
        "confidence": "HIGH"
    },
    {
        "file": "11.En-Kbd-Jonty.json",
        "title": "İngilizce-Kabardeyce Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "en",
        "targetLanguage": "kbd"
    },
    {
        "file": "12.En-Kbd-Ziwar.json",
        "title": "İngilizce-Kabardeyce Sözlük",
        "author": "Ziwar",
        "dialect": "DOGU",
        "sourceLanguage": "en",
        "targetLanguage": "kbd"
    },
    {
        "file": "13.Kbd-Ar-Jonty.json",
        "title": "Kabardeyce-Arapça Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "ar"
    },
    {
        "file": "14.Kbd-En-2-Jonty.json",
        "title": "Kabardeyce-İngilizce Sözlük (Ek)",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "en"
    },
    {
        "file": "15.Kbd-En-Jonty.json",
        "title": "Kabardeyce-İngilizce Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "en"
    },
    {
        "file": "16.Kbd-En-Ziwar.json",
        "title": "Kabardeyce-İngilizce Sözlük",
        "author": "Ziwar",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "en"
    },
    {
        "file": "17.Kbd-En_Amjad.json",
        "title": "Kabardeyce-İngilizce Sözlük",
        "author": "Amjad M. Jaimoukha",
        "year": 1997,
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "en",
        "confidence": "VERIFIED"
    },
    {
        "file": "18.Kbd-Ru&En.json",
        "title": "Kabardeyce-Rusça-İngilizce Çok Dilli Sözlük",
        "author": "M. L. Apazhev, Dzh. N. Kokov",
        "year": 2008,
        "total_words": 26266,
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "ru",
        "confidence": "VERIFIED"
    },
    {
        "file": "19.Kbd-Ru-2-Jonty.json",
        "title": "Kabardeyce-Rusça Sözlük 2",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "ru"
    },
    {
        "file": "20.Kbd-Ru-Jonty.json",
        "title": "Kabardeyce-Rusça Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "ru"
    },
    {
        "file": "21.Kbd-Tu-Jonty.json",
        "title": "Kabardeyce-Türkçe Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "kbd",
        "targetLanguage": "tr"
    },
    {
        "file": "22.Ru-Kbd-Jonty.json",
        "title": "Rusça-Kabardeyce Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "ru",
        "targetLanguage": "kbd"
    },
    {
        "file": "23.Rus-Ady_Blaghoj.json",
        "title": "Rusça-Adıgece Sözlük",
        "author": "Ramazan Blaghoj",
        "year": 1991,
        "total_words": 3476,
        "dialect": "BATI",
        "sourceLanguage": "ru",
        "targetLanguage": "ady",
        "confidence": "HIGH"
    },
    {
        "file": "24.Rus-Ady_UAG.json",
        "title": "Rusça-Adıgece",
        "shortLabel": "Vodozhdokova (1960)",
        "author": "H. D. Vodozhdokova",
        "year": 1960,
        "dialect": "BATI",
        "sourceLanguage": "ru",
        "targetLanguage": "ady"
    },
    {
        "file": "25.Rus-Ady_UASP.json",
        "title": "Rusça-Adıgece Terimler Sözlüğü",
        "author": "UASP",
        "dialect": "BATI",
        "sourceLanguage": "ru",
        "targetLanguage": "ady"
    },
    {
        "file": "26.Tu-Kbd-Jonty.json",
        "title": "Türkçe-Kabardeyce Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU",
        "sourceLanguage": "tr",
        "targetLanguage": "kbd"
    },
    {
        "file": "27.Tur-Ady_Abaze.json",
        "title": "Türkçe-Adıgece Sözlük",
        "author": "İbrahim Alhaz Abaze",
        "publisher": "Ankara",
        "year": 2005,
        "total_words": 12351,
        "dialect": "BATI",
        "sourceLanguage": "tr",
        "targetLanguage": "ady",
        "confidence": "VERIFIED"
    },
    {
        "file": "28.Tur-Ady_Huvaj.json",
        "title": "Türkçe-Adıgece Sözlük",
        "author": "Fahri Huvaj",
        "dialect": "BATI",
        "sourceLanguage": "tr",
        "targetLanguage": "ady"
    },
    {
        "file": "29.Tur-Ady_Teshu.json",
        "title": "Türkçe-Adıgece Sözlük",
        "author": "Teshu Mehmet Yasin Çelikkıran",
        "year": 1991,
        "total_words": 12117,
        "dialect": "BATI",
        "sourceLanguage": "tr",
        "targetLanguage": "ady",
        "confidence": "VERIFIED"
    },
    {
        "file": "30.Ady-Rus_ThreeVolumes.json",
        "title": "Adıgece-Rusça",
        "shortLabel": "Tharkaho (1991)",
        "author": "Yunus Tharkaho",
        "year": 1991,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "ru"
    },
    {
        "file": "31.Tu-Ady_Hilmi.json",
        "title": "Türkçe-Adıgece Sözlük",
        "author": "Açumıj Hilmi",
        "year": 2013,
        "total_words": 26111,
        "dialect": "BATI",
        "sourceLanguage": "tr",
        "targetLanguage": "ady",
        "confidence": "VERIFIED"
    },
    {
        "file": "32.Rus-Kbd_Nalchik_2013.json",
        "title": "Rusça-Kabardeyce Sözlük",
        "author": "Nalçik Komisyonu",
        "publisher": "Nalçik",
        "year": 2013,
        "total_words": 20640,
        "dialect": "DOGU",
        "sourceLanguage": "ru",
        "targetLanguage": "kbd",
        "confidence": "HIGH"
    },
    {
        "file": "33.Ady-Rus-1960.json",
        "title": "Adıgece-Rusça Sözlük",
        "year": 1960,
        "dialect": "BATI",
        "sourceLanguage": "ady",
        "targetLanguage": "ru"
    }
];
}),
"[project]/src/utils/helpers.tsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// src/utils/helpers.tsx
__turbopack_context__.s([
    "hedefDilBul",
    ()=>hedefDilBul,
    "normalizeText",
    ()=>normalizeText,
    "tanimlariBicimlendir",
    ()=>tanimlariBicimlendir,
    "temizleHtml",
    ()=>temizleHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-ssr] (ecmascript)");
;
;
;
;
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
// Sayısal değerleri Roma rakamına (1 -> I, 2 -> II, 3 -> III vb.) çeviren yardımcı fonksiyon
const sayiyiRomaRakaminaCevir = (num)=>{
    const romaMap = [
        [
            10,
            "X"
        ],
        [
            9,
            "IX"
        ],
        [
            5,
            "V"
        ],
        [
            4,
            "IV"
        ],
        [
            1,
            "I"
        ]
    ];
    let result = "";
    for (const [val, char] of romaMap){
        while(num >= val){
            result += char;
            num -= val;
        }
    }
    return result;
};
function temizleHtml(html) {
    if (!html || typeof html !== "string") return "";
    let text = html.replace(/<\/(?:h[1-6]|p|div|li|tr)>/gi, "\n").replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity)=>{
        if (ENTITY_MAP[entity]) return ENTITY_MAP[entity];
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
const hedefDilBul = (dosyaAdi)=>{
    const metin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(dosyaAdi);
    if (!metin) return "diger";
    const isim = metin.toLowerCase();
    if (isim.includes("tur") || isim.includes("tu-")) return "tr";
    if (isim.includes("ara") || isim.includes("-ar")) return "ar";
    if (isim.includes("en") || isim.includes("kbd-en")) return "en";
    if (isim.includes("rus") || isim.includes("ru-")) return "ru";
    return "diger";
};
const normalizeText = (text)=>{
    const metin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(text);
    if (!metin) return "";
    return metin.normalize("NFC").toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]/gu, "").trim();
};
const tanimlariBicimlendir = (tanim, tema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VARSAYILAN_TEMA"], gecerliBaslikOrBoyut, metinBoyutuParam, kaynakParam, sozluklerListesi)=>{
    const tanimMetni = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metneCevir"])(tanim);
    if (!tanimMetni) return null;
    const gecerliTema = {
        ...tema,
        arkaPlan: tema?.arkaPlan || "#ffffff",
        kartArkaPlan: tema?.kartArkaPlan || "#f9fafb",
        yaziAna: tema?.yaziAna || "#111827",
        yaziAlt: tema?.yaziAlt || "#4b5563",
        kenarlik: tema?.kenarlik || "#e5e7eb",
        inputArkaPlan: tema?.inputArkaPlan || "#ffffff"
    };
    let gecerliBaslik = "";
    let metinBoyutu = 16;
    if (typeof gecerliBaslikOrBoyut === "number") {
        metinBoyutu = gecerliBaslikOrBoyut;
    } else if (typeof gecerliBaslikOrBoyut === "string") {
        gecerliBaslik = gecerliBaslikOrBoyut;
        if (typeof metinBoyutuParam === "number") metinBoyutu = metinBoyutuParam;
    }
    const temizBaslik = gecerliBaslik ? normalizeText(gecerliBaslik) : "";
    const satirListesi = tanimMetni.split("\n");
    const anlamlar = [];
    const benzersizAnlamlar = new Set();
    let turBilgisi = "";
    // sozluklerListesi parametresi alt fonksiyona geçiriliyor
    let kaynakBilgisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(kaynakParam, sozluklerListesi);
    const kirilVarMi = /[\u0400-\u04FF]/.test(tanimMetni);
    for (const satir of satirListesi){
        let temiz = satir.trim();
        if (!temiz) continue;
        if (/^definitions:?$/i.test(temiz)) continue;
        const typeMatch = temiz.match(/^type:\s*(.*)$/i);
        if (typeMatch) {
            turBilgisi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TUR_MAP"][typeMatch[1].trim().toLowerCase()] || typeMatch[1].trim();
            continue;
        }
        const sourceMatch = temiz.match(/^(?:source|kaynak):\s*(.*)$/i);
        if (sourceMatch) {
            // sozluklerListesi parametresi alt fonksiyona geçiriliyor
            kaynakBilgisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(sourceMatch[1].trim(), sozluklerListesi);
            continue;
        }
        // Roma rakamı ve başlık numaralarının temizleme esnasında kaybolmaması için \d\.\) çıkarıldı
        temiz = temiz.replace(/^[\s•*\-]+/, "").trim();
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
            gap: "12px",
            pointerEvents: "none"
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
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    anlamlar.map((anlam, idx)=>{
                        // I, II, III gibi Roma rakamları kontrolü
                        const isRomaRakami = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)(\.|\s|$)/i.test(anlam);
                        // 1. veya 1) gibi sayısal başlık kontrolü
                        const sayiMatch = anlam.match(/^(\d+)[\.\)]\s*(.*)$/);
                        const isSayiBasligi = Boolean(sayiMatch);
                        const isBaslik = isRomaRakami || isSayiBasligi;
                        // Eğer "1. толстый" gibi sayısal başlık varsa bunu "I. толстый" formatına dönüştür
                        let gosterilecekMetin = anlam;
                        if (isSayiBasligi && sayiMatch) {
                            const romaRakami = sayiyiRomaRakaminaCevir(parseInt(sayiMatch[1], 10));
                            const kalanMetin = sayiMatch[2];
                            gosterilecekMetin = kalanMetin ? `${romaRakami}. ${kalanMetin}` : romaRakami;
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: gecerliTema.yaziAna,
                                fontSize: isBaslik ? `${metinBoyutu * 1.05}px` : `${metinBoyutu * 0.95}px`,
                                fontWeight: isBaslik ? "bold" : "normal",
                                lineHeight: "1.6",
                                marginTop: isBaslik ? "10px" : "2px",
                                marginBottom: "2px",
                                paddingLeft: isBaslik ? "0px" : "12px"
                            },
                            children: [
                                !isBaslik && "• ",
                                gosterilecekMetin
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/utils/helpers.tsx",
                            lineNumber: 205,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 182,
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
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 225,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 224,
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
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 230,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/utils/helpers.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/utils/utils.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "getEnrichedDictionary",
    ()=>getEnrichedDictionary,
    "manifestData",
    ()=>manifestData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/dictionaries.json.[json].cjs [app-ssr] (ecmascript)");
;
;
;
const manifestData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function getEnrichedDictionary(file) {
    const fileNameOnly = file.replace(/\.json$/, '');
    const foundItem = manifestData?.items?.find((item)=>item.file === file || item.file === fileNameOnly);
    if (foundItem) {
        return {
            file: foundItem.file,
            title: foundItem.title,
            label: foundItem.label,
            dialect: foundItem.dialect
        };
    }
    return {
        file: fileNameOnly,
        title: fileNameOnly,
        label: '',
        dialect: fileNameOnly.includes('Kbd') ? 'DOGU' : 'BATI'
    };
}
}),
];

//# sourceMappingURL=_0ogmsai._.js.map