(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SozlukEkrani$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SozlukEkrani.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/src/hooks/useDictionary'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    const dictionary = useDictionary();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SozlukEkrani$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(Home, "J9dMWuqdTzC/l0YJKN4Q0w5bwkQ=", false, function() {
    return [
        useDictionary
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AkilliKlavye.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AkilliKlavye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// @/components/AkilliKlavye.tsx
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
    _s();
    const [acik, setAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aktifDil, setAktifDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('adiyge');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AkilliKlavye.useEffect": ()=>{
            const kayitliDil = localStorage.getItem('aktifKlavye');
            if (kayitliDil && KLAVYE_DUZENLERI[kayitliDil]) {
                setAktifDil(kayitliDil);
            }
        }
    }["AkilliKlavye.useEffect"], []);
    const dilDegistir = (dil)=>{
        setAktifDil(dil);
        localStorage.setItem('aktifKlavye', dil);
    };
    const harfEkle = (harf)=>{
        const input = inputRef.current;
        // İnput yakalanamazsa doğrudan state sonuna ekle
        if (!input) {
            setSorgu((prev)=>prev + harf);
            return;
        }
        // İmlecin mevcut konumunu al ve araya ekle
        const baslangic = input.selectionStart ?? sorgu.length;
        const bitis = input.selectionEnd ?? sorgu.length;
        const yeniMetin = sorgu.substring(0, baslangic) + harf + sorgu.substring(bitis);
        setSorgu(yeniMetin);
        // React'in state güncellemesini bekle ve imleci harfin hemen sağına taşı
        setTimeout(()=>{
            input.focus();
            input.setSelectionRange(baslangic + harf.length, baslangic + harf.length);
        }, 0);
    };
    const arkaPlan = karanlikMod ? '#1e293b' : '#ffffff';
    const kenarlik = karanlikMod ? '#475569' : '#cbd5e1';
    const yaziRengi = karanlikMod ? '#f8fafc' : '#0f172a';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: '16px',
            textAlign: 'left'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                lineNumber: 89,
                columnNumber: 7
            }, this),
            acik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '10px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: `1px solid ${kenarlik}`,
                    backgroundColor: arkaPlan,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '6px',
                            overflowX: 'auto',
                            paddingBottom: '10px',
                            marginBottom: '12px'
                        },
                        children: Object.keys(KLAVYE_DUZENLERI).map((dilKey)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>dilDegistir(dilKey),
                                style: {
                                    padding: '6px 12px',
                                    borderRadius: '16px',
                                    // Kurumsal renk entegrasyonu (Aktif sekme kırmızı, pasif sekme standart)
                                    border: `1px solid ${aktifDil === dilKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : kenarlik}`,
                                    backgroundColor: aktifDil === dilKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : 'transparent',
                                    color: aktifDil === dilKey ? '#ffffff' : yaziRengi,
                                    fontSize: `${metinBoyutu * 0.8}px`,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontWeight: aktifDil === dilKey ? 'bold' : 'normal'
                                },
                                children: KLAVYE_DUZENLERI[dilKey].etiket
                            }, dilKey, false, {
                                fileName: "[project]/src/components/AkilliKlavye.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AkilliKlavye.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px'
                        },
                        children: KLAVYE_DUZENLERI[aktifDil].tuslar.map((harf, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                lineNumber: 148,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AkilliKlavye.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AkilliKlavye.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AkilliKlavye.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(AkilliKlavye, "4Lc0iBKBC6Nbdfe+SjjxGriWR/s=");
_c = AkilliKlavye;
var _c;
__turbopack_context__.k.register(_c, "AkilliKlavye");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/GununKelimesiKart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GununKelimesiKarti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript)");
;
;
;
function GununKelimesiKarti({ gununKelimesi, karanlikMod, metinBoyutu, tema, onClick }) {
    if (!gununKelimesi) return null;
    // Veri İşleme Öncelik Hiyerarşisi: 
    // 1. definitions[].meaning -> 2. full_definition_in_html -> 3. tanim / meaning
    const tanimMetni = gununKelimesi.definitions?.[0]?.meaning || gununKelimesi.full_definition_in_html || (typeof gununKelimesi.tanim === "string" ? gununKelimesi.tanim : "") || gununKelimesi.meaning || "";
    const arkaPlanRengi = karanlikMod ? "#1e293b" : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmiziAcik;
    const isBatil = gununKelimesi.dialect === "BATI";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        onKeyDown: (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        },
        style: {
            padding: "16px 20px",
            backgroundColor: arkaPlanRengi,
            borderLeft: `5px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi}`,
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            cursor: "pointer",
            textAlign: "left"
        },
        className: "transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500",
        role: "button",
        tabIndex: 0,
        "aria-label": "Günün kelimesi detaylarını aç",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                            fontSize: `${metinBoyutu * 0.85}px`
                        },
                        className: "font-bold uppercase tracking-wider",
                        children: "🌟 Günün Kelimesi"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GununKelimesiKart.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    gununKelimesi.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: `${metinBoyutu * 0.75}px`,
                            color: isBatil ? "#16a34a" : "#2563eb",
                            backgroundColor: isBatil ? "#16a34a15" : "#2563eb15"
                        },
                        className: "rounded-full px-2 py-0.5 font-bold",
                        children: isBatil ? "Batı Adıgece" : "Doğu Kabardeyce"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GununKelimesiKart.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GununKelimesiKart.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: `${metinBoyutu * 1.25}px`,
                    color: tema.yaziAna
                },
                className: "mt-1 font-bold",
                children: gununKelimesi.kelime
            }, void 0, false, {
                fileName: "[project]/src/components/GununKelimesiKart.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tanimlariBicimlendir"])(tanimMetni, tema, gununKelimesi.kelime, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(gununKelimesi.kaynak_sozluk))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GununKelimesiKart.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = GununKelimesiKarti;
var _c;
__turbopack_context__.k.register(_c, "GununKelimesiKarti");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Header({ karanlikMod, toggleKaranlikMod, metinBoyutu, setMetinBoyutu, tema }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex flex-col items-center justify-between pb-4 border-b gap-3",
        style: {
            borderColor: tema.kenarlik
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold tracking-tight",
                            style: {
                                color: tema.yaziAna
                            },
                            children: "Çerkesçe Sözlük"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs sm:text-sm font-medium",
                            style: {
                                color: tema.yaziAlt
                            },
                            children: "34 Sözlük • 428.679+ Kayıt • Açık Mektep Dijital Arşivi"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center rounded-lg p-1 border",
                            style: {
                                borderColor: tema.kenarlik
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMetinBoyutu((prev)=>Math.max(12, prev - 2)),
                                    className: "px-2 py-1 text-xs font-bold rounded hover:opacity-80",
                                    style: {
                                        color: tema.yaziAna
                                    },
                                    title: "Metni Küçült",
                                    children: "A-"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs px-1",
                                    style: {
                                        color: tema.yaziAlt
                                    },
                                    children: [
                                        metinBoyutu,
                                        "px"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMetinBoyutu((prev)=>Math.min(24, prev + 2)),
                                    className: "px-2 py-1 text-xs font-bold rounded hover:opacity-80",
                                    style: {
                                        color: tema.yaziAna
                                    },
                                    title: "Metni Büyüt",
                                    children: "A+"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleKaranlikMod,
                            className: "p-2 rounded-lg border text-sm font-semibold hover:opacity-80 transition-opacity",
                            style: {
                                borderColor: tema.kenarlik,
                                color: tema.yaziAna
                            },
                            title: "Karanlık Mod Değiştir",
                            children: karanlikMod ? "☀️" : "🌙"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/IstatistikBandi.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IstatistikBandi",
    ()=>IstatistikBandi,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const IstatistikBandi = ({ wordsCount, sozlukSayisi = 34, aktifTema })=>{
    const yaziAna = aktifTema.yaziAna || "inherit";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            color: aktifTema.yaziAlt,
            fontSize: "13px",
            textAlign: "center",
            marginTop: "-12px",
            marginBottom: "4px",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: yaziAna,
                        fontWeight: 700
                    },
                    children: [
                        sozlukSayisi,
                        " Sözlük"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/IstatistikBandi.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/IstatistikBandi.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    opacity: 0.35
                },
                children: "•"
            }, void 0, false, {
                fileName: "[project]/src/components/IstatistikBandi.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        style: {
                            color: yaziAna,
                            fontWeight: 700
                        },
                        children: [
                            wordsCount.toLocaleString("tr-TR"),
                            "+"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/IstatistikBandi.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    " ",
                    "Kelime Kaydı"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IstatistikBandi.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    opacity: 0.35
                },
                children: "•"
            }, void 0, false, {
                fileName: "[project]/src/components/IstatistikBandi.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#10b981",
                            display: "inline-block"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/IstatistikBandi.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Açık Dijital Arşiv"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IstatistikBandi.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/IstatistikBandi.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = IstatistikBandi;
const __TURBOPACK__default__export__ = IstatistikBandi;
var _c;
__turbopack_context__.k.register(_c, "IstatistikBandi");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/KelimeDetayDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KelimeDetayDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function KelimeDetayDrawer({ seciliKelime, kapat, tema, metinBoyutu }) {
    _s();
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KelimeDetayDrawer.useEffect": ()=>{
            const handleKeyDown = {
                "KelimeDetayDrawer.useEffect.handleKeyDown": (e)=>{
                    if (e.key === "Escape") kapat();
                }
            }["KelimeDetayDrawer.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "KelimeDetayDrawer.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["KelimeDetayDrawer.useEffect"];
        }
    }["KelimeDetayDrawer.useEffect"], [
        kapat
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/50 flex justify-end transition-opacity",
        onClick: kapat,
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: drawerRef,
            className: "w-full max-w-md h-full p-6 overflow-y-auto shadow-xl flex flex-col",
            style: {
                backgroundColor: tema.kartArkaPlan
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex justify-between items-center mb-6 pb-4 border-b",
                    style: {
                        borderColor: tema.kenarlik
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                color: tema.yaziAna,
                                margin: 0,
                                fontSize: `${metinBoyutu * 1.3}px`,
                                fontWeight: "bold"
                            },
                            children: seciliKelime.kelime
                        }, void 0, false, {
                            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: kapat,
                            className: "px-3 py-2 rounded-md border text-sm hover:opacity-80 transition-opacity",
                            style: {
                                borderColor: tema.kenarlik,
                                color: tema.yaziAna
                            },
                            children: "✕ Kapat"
                        }, void 0, false, {
                            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 space-y-6",
                    children: seciliKelime.kaynaklar.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "pb-4 border-b last:border-0",
                            style: {
                                borderColor: tema.kenarlik
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tanimlariBicimlendir"])(item.tanim, tema, seciliKelime.kelime, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(item.file || item.kaynak_sozluk))
                        }, index, false, {
                            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "mt-8 pt-4 border-t flex justify-end opacity-90",
                    style: {
                        borderColor: tema.kenarlik
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/imza.png",
                        alt: "Açık Mektep Kurumsal İmza",
                        width: 120,
                        height: 40,
                        className: "object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(KelimeDetayDrawer, "zpfhS5AtJ8mv0psA4vpzGeSZovg=");
_c = KelimeDetayDrawer;
var _c;
__turbopack_context__.k.register(_c, "KelimeDetayDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/KelimeKarti.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KelimeKarti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
;
;
;
function KelimeKarti({ grup, idx, tema, metinBoyutu, kopyalandiId, panoyaKopyala, onClick }) {
    const ilkKaynak = grup.kaynaklar[0];
    const dosyaVeyaSozluk = ilkKaynak?.file || ilkKaynak?.kaynak_sozluk || ilkKaynak?.dictionaryName;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>onClick(grup),
        style: {
            padding: "16px",
            backgroundColor: tema.kartArkaPlan,
            border: `1px solid ${tema.kenarlik}`,
            borderRadius: "8px",
            cursor: "pointer",
            transition: "border-color 0.2s"
        },
        onMouseOver: (e)=>e.currentTarget.style.borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
        onMouseOut: (e)=>e.currentTarget.style.borderColor = tema.kenarlik,
        role: "article",
        tabIndex: 0,
        "aria-label": `${grup.kelime} kelimesi detayları`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            margin: 0,
                            fontSize: `${metinBoyutu * 1.1}px`,
                            color: tema.yaziAna
                        },
                        children: grup.kelime
                    }, void 0, false, {
                        fileName: "[project]/src/components/KelimeKarti.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            panoyaKopyala(grup.kelime, ilkKaynak?.tanim, `g-${idx}`);
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
                        fileName: "[project]/src/components/KelimeKarti.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/KelimeKarti.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tanimlariBicimlendir"])(ilkKaynak?.tanim || "", tema, grup.kelime, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(dosyaVeyaSozluk))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/KelimeKarti.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = KelimeKarti;
var _c;
__turbopack_context__.k.register(_c, "KelimeKarti");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SearchBox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchBox,
    "searchWords",
    ()=>searchWords
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AkilliKlavye.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
"use client";
;
;
;
function searchWords(allWords, query, dialect = "TUMU", selectedFile = "TUMU", limit = 50) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allWords.filter((item)=>{
        if (dialect !== "TUMU" && item.dialect !== dialect) return false;
        if (selectedFile !== "TUMU" && item.file !== selectedFile) return false;
        return (item.kelime?.toLowerCase() || "").includes(q) || (item.tanim?.toLowerCase() || "").includes(q);
    }).slice(0, limit);
}
function SearchBox({ searchQuery, setSearchQuery, mod, setMod, hedefDil, setHedefDil, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, aktifSozlukler, metinBoyutu, karanlikMod, tema, inputRef, harfEkle, kaynagiDuzenle, setGoruntulenenAdet, limit }) {
    const ozelKarakterler = [
        "Ӏ",
        "I",
        "а",
        "э",
        "гь",
        "кь"
    ];
    const handleSearchChange = (val)=>{
        setSearchQuery(val);
        setGoruntulenenAdet(limit);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                style: {
                    border: "none",
                    padding: 0,
                    margin: "0 0 16px 0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        style: {
                            fontSize: `${metinBoyutu * 0.85}px`,
                            fontWeight: "600",
                            color: tema.yaziAlt,
                            marginBottom: "8px"
                        },
                        children: "Lehçe & Sözlük Seçimi:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map((lehce)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    border: `2px solid ${seciliLehce === lehce.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kenarlik}`,
                                    backgroundColor: seciliLehce === lehce.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kartArkaPlan,
                                    color: seciliLehce === lehce.kod ? "#ffffff" : tema.yaziAna,
                                    cursor: "pointer"
                                },
                                children: lehce.etiket
                            }, lehce.kod, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: seciliDosya,
                        onChange: (e)=>{
                            setSeciliDosya(e.target.value);
                            setGoruntulenenAdet(limit);
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "TUMU",
                                children: seciliLehce === "TUMU" ? "📖 Tüm Sözlüklerde Ara" : `📖 Tüm ${seciliLehce === "BATI" ? "Batı" : "Doğu"} Sözlüklerinde Ara`
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            aktifSozlukler?.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: d.file,
                                    children: [
                                        d.title || kaynagiDuzenle(d.file),
                                        " (",
                                        d.total_words?.toLocaleString("tr-TR") || 0,
                                        " kelime)"
                                    ]
                                }, d.file, true, {
                                    fileName: "[project]/src/components/SearchBox.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                style: {
                    border: "none",
                    padding: 0,
                    margin: "0 0 16px 0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        style: {
                            fontSize: `${metinBoyutu * 0.85}px`,
                            fontWeight: "600",
                            color: tema.yaziAlt,
                            marginBottom: "8px"
                        },
                        children: "Hedef Dil Filtresi:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map((dil)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setHedefDil(dil.kod),
                                "aria-pressed": hedefDil === dil.kod,
                                style: {
                                    padding: "6px 12px",
                                    fontSize: `${metinBoyutu * 0.8}px`,
                                    fontWeight: hedefDil === dil.kod ? "bold" : "normal",
                                    borderRadius: "16px",
                                    border: `1px solid ${hedefDil === dil.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kenarlik}`,
                                    backgroundColor: hedefDil === dil.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kartArkaPlan,
                                    color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna,
                                    cursor: "pointer"
                                },
                                children: dil.etiket
                            }, dil.kod, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                style: {
                    border: "none",
                    padding: 0,
                    margin: "0 0 16px 0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        style: {
                            fontSize: `${metinBoyutu * 0.85}px`,
                            fontWeight: "600",
                            color: tema.yaziAlt,
                            marginBottom: "8px"
                        },
                        children: "Çerkesçe Hızlı Harfler:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                        },
                        children: ozelKarakterler.map((harf, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                inputRef: inputRef,
                sorgu: searchQuery,
                setSorgu: handleSearchChange,
                metinBoyutu: metinBoyutu,
                karanlikMod: karanlikMod
            }, void 0, false, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "10px",
                    marginBottom: "16px",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: "1 1 240px",
                            position: "relative"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                    outlineColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "baslayan",
                                children: "İle Başlayan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "icinde",
                                children: "İçinde Geçen"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "tam",
                                children: "Tam Eşleşen"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SearchBox.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = SearchBox;
var _c;
__turbopack_context__.k.register(_c, "SearchBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SozlukEkrani.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SozlukEkrani
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Alt Bileşenler
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$IstatistikBandi$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/IstatistikBandi.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GununKelimesiKart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchBox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KelimeKarti$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KelimeKarti.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KelimeDetayDrawer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function SozlukEkrani({ loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler, wordsCount = 428679 }) {
    _s();
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(16);
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [kopyalandiId, setKopyalandiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SozlukEkrani.useEffect": ()=>{
            if (karanlikMod) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }["SozlukEkrani.useEffect"], [
        karanlikMod
    ]);
    const aktifTema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[aktifTema]": ()=>({
                arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
                kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
                yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
                yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
                kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
                inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff"
            })
    }["SozlukEkrani.useMemo[aktifTema]"], [
        karanlikMod
    ]);
    // Hook'tan gelen filtrelenmisSonuclar (DictionaryItem[]) verisini arayüz için GruplanmisKelime yapısına çeviriyoruz
    const gruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[gruplanmisSonuclar]": ()=>{
            if (!searchQuery?.trim() || !filtrelenmisSonuclar || filtrelenmisSonuclar.length === 0) {
                return [];
            }
            const gruplar = new Map();
            filtrelenmisSonuclar.forEach({
                "SozlukEkrani.useMemo[gruplanmisSonuclar]": (item)=>{
                    const key = item.kelime?.trim().toLowerCase();
                    if (!key) return;
                    if (!gruplar.has(key)) gruplar.set(key, []);
                    gruplar.get(key).push(item);
                }
            }["SozlukEkrani.useMemo[gruplanmisSonuclar]"]);
            return Array.from(gruplar.values()).map({
                "SozlukEkrani.useMemo[gruplanmisSonuclar]": (kaynaklar)=>({
                        kelime: kaynaklar[0].kelime,
                        dialect: kaynaklar[0].dialect,
                        kaynaklar,
                        anlamlar: kaynaklar.map({
                            "SozlukEkrani.useMemo[gruplanmisSonuclar]": (k)=>({
                                    tanim: k.tanim,
                                    file: k.file,
                                    kaynak_sozluk: k.kaynak_sozluk,
                                    dialect: k.dialect,
                                    language: k.language
                                })
                        }["SozlukEkrani.useMemo[gruplanmisSonuclar]"])
                    })
            }["SozlukEkrani.useMemo[gruplanmisSonuclar]"]);
        }
    }["SozlukEkrani.useMemo[gruplanmisSonuclar]"], [
        filtrelenmisSonuclar,
        searchQuery
    ]);
    const handleKelimeSec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SozlukEkrani.useCallback[handleKelimeSec]": (grup)=>{
            setSeciliKelimeGrubu(grup);
        }
    }["SozlukEkrani.useCallback[handleKelimeSec]"], []);
    const handlePanoyaKopyala = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SozlukEkrani.useCallback[handlePanoyaKopyala]": async (kelime, tanim, id)=>{
            const metin = `${kelime}\n${tanim || ""}`;
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(metin);
                }
                if (id) {
                    setKopyalandiId(id);
                    setTimeout({
                        "SozlukEkrani.useCallback[handlePanoyaKopyala]": ()=>setKopyalandiId(null)
                    }["SozlukEkrani.useCallback[handlePanoyaKopyala]"], 2000);
                }
            } catch (err) {
                console.warn("Kopyalama engellendi:", err);
            }
        }
    }["SozlukEkrani.useCallback[handlePanoyaKopyala]"], []);
    const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen transition-colors px-4 py-6",
        style: {
            backgroundColor: aktifTema.arkaPlan
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 max-w-4xl w-full mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    karanlikMod: karanlikMod,
                    toggleKaranlikMod: ()=>setKaranlikMod(!karanlikMod),
                    metinBoyutu: metinBoyutu,
                    setMetinBoyutu: setMetinBoyutu,
                    tema: aktifTema
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                !searchQuery?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$IstatistikBandi$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    wordsCount: wordsCount,
                    sozlukSayisi: aktifSozlukler?.length || 34,
                    aktifTema: aktifTema
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this),
                !searchQuery?.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    gununKelimesi: gununKelimesi,
                    karanlikMod: karanlikMod,
                    metinBoyutu: metinBoyutu,
                    tema: aktifTema,
                    onClick: ()=>handleKelimeSec({
                            kelime: gununKelimesi.kelime,
                            dialect: gununKelimesi.dialect,
                            kaynaklar: [
                                gununKelimesi
                            ],
                            anlamlar: [
                                {
                                    tanim: gununKelimesi.tanim,
                                    file: gununKelimesi.file,
                                    kaynak_sozluk: gununKelimesi.kaynak_sozluk,
                                    dialect: gununKelimesi.dialect
                                }
                            ]
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                searchQuery?.trim() && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-medium",
                    style: {
                        color: aktifTema.yaziAlt
                    },
                    children: [
                        "Toplam ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: gruplanmisSonuclar.length
                        }, void 0, false, {
                            fileName: "[project]/src/components/SozlukEkrani.tsx",
                            lineNumber: 187,
                            columnNumber: 20
                        }, this),
                        " kelime grubu bulundu."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 186,
                    columnNumber: 11
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 text-slate-500 font-medium",
                    children: "📖 Sözlük verileri yükleniyor..."
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    "aria-label": "Arama Sonuçları",
                    className: "flex flex-col gap-4",
                    children: [
                        gosterilenGruplar.map((grup, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KelimeKarti$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                idx: idx,
                                grup: grup,
                                tema: aktifTema,
                                metinBoyutu: metinBoyutu,
                                kopyalandiId: kopyalandiId,
                                panoyaKopyala: handlePanoyaKopyala,
                                onClick: handleKelimeSec
                            }, `${grup.kelime}-${grup.kaynaklar?.length || 0}-${idx}`, false, {
                                fileName: "[project]/src/components/SozlukEkrani.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)),
                        dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setGoruntulenenAdet((prev)=>prev + 20),
                            className: "mt-4 w-full p-3 bg-[#FF4030] text-white font-bold rounded-lg hover:opacity-90 transition-opacity",
                            children: [
                                "Daha Fazla Göster (",
                                gruplanmisSonuclar.length - goruntulenenAdet,
                                " kalan)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SozlukEkrani.tsx",
                            lineNumber: 211,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 196,
                    columnNumber: 11
                }, this),
                seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    seciliKelime: seciliKelimeGrubu,
                    kapat: ()=>setSeciliKelimeGrubu(null),
                    tema: aktifTema,
                    metinBoyutu: metinBoyutu
                }, void 0, false, {
                    fileName: "[project]/src/components/SozlukEkrani.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SozlukEkrani.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SozlukEkrani.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(SozlukEkrani, "etyUoh/NF9cLNWnqg9HnNRUFKEE=");
_c = SozlukEkrani;
var _c;
__turbopack_context__.k.register(_c, "SozlukEkrani");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/helpers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/helpers.tsx
__turbopack_context__.s([
    "hedefDilBul",
    ()=>hedefDilBul,
    "kaynagiDuzenle",
    ()=>kaynagiDuzenle,
    "normalizeText",
    ()=>normalizeText,
    "tanimlariBicimlendir",
    ()=>tanimlariBicimlendir
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
;
;
const kaynagiDuzenle = (dosyaAdi)=>{
    if (!dosyaAdi) return "";
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KAYNAK_HARITASI"][dosyaAdi] || dosyaAdi;
};
const hedefDilBul = (dosyaAdi)=>{
    if (!dosyaAdi) return "diger";
    const isim = dosyaAdi.toLowerCase();
    if (isim.includes("tur") || isim.includes("tu-")) return "tr";
    if (isim.includes("ara") || isim.includes("-ar")) return "ar";
    if (isim.includes("en") || isim.includes("kbd-en")) return "en";
    if (isim.includes("rus") || isim.includes("ru-")) return "ru";
    return "diger";
};
const normalizeText = (text)=>text.normalize("NFC").toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]/gu, "").trim();
const tanimlariBicimlendir = (tanim, tema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VARSAYILAN_TEMA"], gecerliBaslikOrBoyut, metinBoyutuParam, kaynakParam)=>{
    if (!tanim) return null;
    const gecerliTema = tema || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VARSAYILAN_TEMA"];
    let gecerliBaslik = "";
    let metinBoyutu = 16;
    if (typeof gecerliBaslikOrBoyut === "number") {
        metinBoyutu = gecerliBaslikOrBoyut;
    } else if (typeof gecerliBaslikOrBoyut === "string") {
        gecerliBaslik = gecerliBaslikOrBoyut;
        if (typeof metinBoyutuParam === "number") metinBoyutu = metinBoyutuParam;
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
            turBilgisi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TUR_MAP"][typeMatch[1].trim().toLowerCase()] || typeMatch[1].trim();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
        },
        children: [
            anlamlar.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        style: {
                            fontSize: `${metinBoyutu * 0.85}px`,
                            fontWeight: 600,
                            color: gecerliTema.yaziAlt,
                            margin: "0 0 6px 0"
                        },
                        children: "📖 Karşılıklar"
                    }, void 0, false, {
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    anlamlar.map((anlam, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            fileName: "[project]/src/utils/helpers.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Boolean(turBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: "8px",
                    borderTop: `1px solid ${gecerliTema.kenarlik}`,
                    fontSize: `${metinBoyutu * 0.85}px`,
                    color: gecerliTema.yaziAlt,
                    fontWeight: 500
                },
                children: [
                    "🏷 Tür: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: gecerliTema.yaziAna,
                            fontWeight: 600
                        },
                        children: turBilgisi
                    }, void 0, false, {
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 111,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Boolean(kaynakBilgisi) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: turBilgisi ? "4px" : "8px",
                    borderTop: turBilgisi ? "none" : `1px solid ${gecerliTema.kenarlik}`,
                    fontSize: `${metinBoyutu * 0.8}px`,
                    color: gecerliTema.yaziAlt,
                    fontStyle: "italic"
                },
                children: [
                    "📚 Kaynak: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 500
                        },
                        children: kaynakBilgisi
                    }, void 0, false, {
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 116,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/utils/helpers.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1txw16o._.js.map