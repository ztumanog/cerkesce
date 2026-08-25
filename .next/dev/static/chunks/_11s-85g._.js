(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$SozlukEkrani$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/SozlukEkrani.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDictionary.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    const dictionary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$SozlukEkrani$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(Home, "J9dMWuqdTzC/l0YJKN4Q0w5bwkQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dictionary/GununKelimesiKart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GununKelimesiKarti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-client] (ecmascript)");
;
;
;
function GununKelimesiKarti({ gununKelimesi, metinBoyutu, tema, onClick }) {
    if (!gununKelimesi) return null;
    const tanimMetni = gununKelimesi.definitions?.[0]?.meaning || gununKelimesi.full_definition_in_html || (typeof gununKelimesi.tanim === "string" ? gununKelimesi.tanim : "") || gununKelimesi.meaning || "";
    /*
   * Tüm renkler ortak tema yapısından alınıyor.
   * Böylece açık/koyu mod renkleri otomatik olarak uyumlu kalır.
   */ const arkaPlanRengi = tema.kartArkaPlan || tema.arkaPlan;
    const kenarlikRengi = tema.kenarlik;
    const anaYaziRengi = tema.yaziAna;
    const altYaziRengi = tema.yaziAlt;
    const vurguRengi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi || anaYaziRengi;
    const isBatil = gununKelimesi.dialect === "BATI";
    /*
   * Kaynak verisini güvenli şekilde al
   */ const rawKaynak = gununKelimesi.kaynak_sozluk;
    let kaynakStr = "";
    let kaynakMeta = null;
    if (typeof rawKaynak === "string") {
        kaynakStr = rawKaynak;
    } else if (rawKaynak && typeof rawKaynak === "object") {
        kaynakMeta = rawKaynak;
    }
    /*
   * Dosya adını string olarak al
   */ const dosyaAdi = typeof gununKelimesi.file === "string" ? gununKelimesi.file : kaynakStr;
    /*
   * Metadata veya yedek fonksiyondan kaynak ismi üret
   */ const metaObj = dosyaAdi ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOZLUK_META"][dosyaAdi] : undefined;
    let kaynakIsmi = "";
    if (metaObj) {
        kaynakIsmi = `${metaObj.dilCifti} — ${metaObj.yazar}`;
    } else if (kaynakMeta) {
        kaynakIsmi = `${kaynakMeta.dilCifti} — ${kaynakMeta.yazar}`;
    } else {
        const duzenlenmis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(dosyaAdi);
        if (typeof duzenlenmis === "string") {
            kaynakIsmi = duzenlenmis;
        } else if (duzenlenmis && typeof duzenlenmis === "object") {
            const obj = duzenlenmis;
            kaynakIsmi = `${obj.dilCifti} — ${obj.yazar}`;
        } else {
            kaynakIsmi = dosyaAdi;
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        onKeyDown: (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        },
        style: {
            backgroundColor: arkaPlanRengi,
            borderLeft: `4px solid ${vurguRengi}`,
            borderTop: `1px solid ${kenarlikRengi}`,
            borderRight: `1px solid ${kenarlikRengi}`,
            borderBottom: `1px solid ${kenarlikRengi}`
        },
        className: "box-border w-full cursor-pointer rounded-[3px] px-5 py-[18px] text-left shadow-[0_2px_5px_rgba(0,0,0,0.04)] transition-all duration-150 ease-in-out hover:brightness-[0.98] focus:outline-none focus:ring-1 focus:ring-red-900/20",
        role: "button",
        tabIndex: 0,
        "aria-label": "Günün kelimesi detaylarını aç",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2.5 flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: vurguRengi,
                            fontSize: `${Math.max(11, metinBoyutu * 0.75)}px`
                        },
                        className: "font-bold uppercase tracking-[1.5px]",
                        children: "✨ Günün Kelimesi"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dictionary/GununKelimesiKart.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    gununKelimesi.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: vurguRengi,
                            backgroundColor: arkaPlanRengi,
                            borderColor: kenarlikRengi,
                            fontSize: `${Math.max(10, metinBoyutu * 0.7)}px`
                        },
                        className: "rounded-[2px] border px-1.5 py-0.5 font-bold uppercase",
                        children: isBatil ? "🟢 BATI ADIGECE" : "🔵 DOĞU KABARDEYCE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dictionary/GununKelimesiKart.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dictionary/GununKelimesiKart.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: anaYaziRengi,
                    fontSize: `${metinBoyutu * 1.3}px`
                },
                className: "mb-1.5 font-serif font-bold leading-[1.3]",
                children: gununKelimesi.kelime
            }, void 0, false, {
                fileName: "[project]/src/components/dictionary/GununKelimesiKart.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: altYaziRengi,
                    fontSize: `${metinBoyutu * 0.9}px`
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tanimlariBicimlendir"])(tanimMetni, tema, gununKelimesi.kelime, metinBoyutu, kaynakIsmi)
            }, void 0, false, {
                fileName: "[project]/src/components/dictionary/GununKelimesiKart.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dictionary/GununKelimesiKart.tsx",
        lineNumber: 100,
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
"[project]/src/components/dictionary/KelimeKarti.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KelimeKarti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
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
        onMouseOver: (e)=>e.currentTarget.style.borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
        onMouseOut: (e)=>e.currentTarget.style.borderColor = tema.kenarlik,
        tabIndex: 0,
        "aria-label": `${kelimeMetni} kelimesi detayları`,
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
                        children: kelimeMetni
                    }, void 0, false, {
                        fileName: "[project]/src/components/dictionary/KelimeKarti.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tanimlariBicimlendir"])(tanimMetni, tema, kelimeMetni, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(dosyaVeyaSozluk))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dictionary/KelimeKarti.tsx",
        lineNumber: 79,
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
"[project]/src/components/dictionary/SozlukEkrani.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SozlukEkrani
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/GununKelimesiKart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$KelimeKarti$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dictionary/KelimeKarti.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/KelimeDetayDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Kaynaklar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Kaynaklar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-client] (ecmascript)");
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
function SozlukEkrani({ loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler }) {
    _s();
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(17);
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [kopyalandiId, setKopyalandiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [kaynaklarAcik, setKaynaklarAcik] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /*
   * "/" tuşuyla arama kutusuna odaklanma
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SozlukEkrani.useEffect": ()=>{
            const handleKeyDown = {
                "SozlukEkrani.useEffect.handleKeyDown": (event)=>{
                    const aktifElement = document.activeElement;
                    const yazimAlanindaMi = aktifElement?.tagName === "INPUT" || aktifElement?.tagName === "TEXTAREA" || aktifElement?.tagName === "SELECT" || aktifElement?.getAttribute("contenteditable") === "true";
                    if (event.key === "/" && !yazimAlanindaMi) {
                        event.preventDefault();
                        inputRef.current?.focus();
                    }
                }
            }["SozlukEkrani.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "SozlukEkrani.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKeyDown);
                }
            })["SozlukEkrani.useEffect"];
        }
    }["SozlukEkrani.useEffect"], []);
    /*
   * Karanlık mod
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    /*
   * Arama veya filtre değişince listeyi başa al
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SozlukEkrani.useEffect": ()=>{
            setGoruntulenenAdet(20);
        }
    }["SozlukEkrani.useEffect"], [
        searchQuery,
        hedefDil,
        seciliLehce,
        seciliDosya,
        mod
    ]);
    /*
   * Aktif tema
   */ const aktifTema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[aktifTema]": ()=>({
                arkaPlan: karanlikMod ? "#1A1614" : "#FDFBF7",
                kartArkaPlan: karanlikMod ? "#1F1A17" : "#FFFFFF",
                yaziAna: karanlikMod ? "#F4EFE6" : "#2C221E",
                yaziAlt: karanlikMod ? "#A89A8E" : "#8C7A6B",
                kenarlik: karanlikMod ? "#3D322C" : "#EADDC9",
                inputArkaPlan: karanlikMod ? "#26201D" : "#FAFAFA"
            })
    }["SozlukEkrani.useMemo[aktifTema]"], [
        karanlikMod
    ]);
    /*
   * Sonucun hedef dilini tespit eder
   */ const hedefDilBul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SozlukEkrani.useCallback[hedefDilBul]": (item)=>{
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
            const dosyaAdi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(itemRecord.file ?? itemRecord.kaynak_sozluk ?? "").toLowerCase();
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
        }
    }["SozlukEkrani.useCallback[hedefDilBul]"], []);
    /*
   * Sonuçları kelimeye göre gruplar
   */ const gruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[gruplanmisSonuclar]": ()=>{
            if (!searchQuery?.trim() || !Array.isArray(filtrelenmisSonuclar) || filtrelenmisSonuclar.length === 0) {
                return [];
            }
            const havuz = filtrelenmisSonuclar.filter({
                "SozlukEkrani.useMemo[gruplanmisSonuclar].havuz": (item)=>{
                    return item !== null && typeof item === "object" && ("kelime" in item || "spelling" in item);
                }
            }["SozlukEkrani.useMemo[gruplanmisSonuclar].havuz"]);
            const hedefDileGoreFiltreli = hedefDil === "tumu" ? havuz : havuz.filter({
                "SozlukEkrani.useMemo[gruplanmisSonuclar]": (item)=>hedefDilBul(item) === hedefDil
            }["SozlukEkrani.useMemo[gruplanmisSonuclar]"]);
            const gruplar = new Map();
            hedefDileGoreFiltreli.forEach({
                "SozlukEkrani.useMemo[gruplanmisSonuclar]": (item)=>{
                    const kelimeStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(item.kelime || item.spelling || "");
                    const key = kelimeStr.trim().toLowerCase();
                    if (!key) {
                        return;
                    }
                    if (!gruplar.has(key)) {
                        gruplar.set(key, []);
                    }
                    gruplar.get(key)?.push(item);
                }
            }["SozlukEkrani.useMemo[gruplanmisSonuclar]"]);
            return Array.from(gruplar.values()).map({
                "SozlukEkrani.useMemo[gruplanmisSonuclar]": (kaynaklar)=>{
                    const ilk = kaynaklar[0];
                    const kelimeBaslik = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(ilk.kelime || ilk.spelling || "");
                    const tespitEdilenLehce = (ilk.dialect || ilk.lehce || ilk.diyalekt || "BATI").toString();
                    return {
                        kelime: kelimeBaslik,
                        dialect: tespitEdilenLehce,
                        kaynaklar,
                        anlamlar: kaynaklar.map({
                            "SozlukEkrani.useMemo[gruplanmisSonuclar]": (kaynak)=>{
                                const kaynakObj = kaynak;
                                let secilenTanim = "";
                                if (Array.isArray(kaynak.definitions) && kaynak.definitions.length > 0 && kaynak.definitions[0]?.meaning) {
                                    secilenTanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.definitions[0].meaning);
                                } else if (kaynak.full_definition_in_html) {
                                    secilenTanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.full_definition_in_html);
                                } else {
                                    secilenTanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.tanim || kaynak.meaning || "");
                                }
                                const ozelLehce = kaynakObj.dialect || kaynakObj.lehce || kaynakObj.diyalekt;
                                return {
                                    tanim: secilenTanim,
                                    file: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.file || ""),
                                    kaynak_sozluk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.kaynak_sozluk || ""),
                                    dialect: ozelLehce ? ozelLehce.toString() : undefined,
                                    language: typeof kaynak.language === "string" ? kaynak.language : undefined
                                };
                            }
                        }["SozlukEkrani.useMemo[gruplanmisSonuclar]"])
                    };
                }
            }["SozlukEkrani.useMemo[gruplanmisSonuclar]"]);
        }
    }["SozlukEkrani.useMemo[gruplanmisSonuclar]"], [
        filtrelenmisSonuclar,
        searchQuery,
        hedefDil,
        hedefDilBul
    ]);
    /*
   * İstatistiklerde kullanılacak aktif sözlük listesi
   *
   * Bu liste;
   * - seçili dosyaya,
   * - seçili lehçeye
   * göre yeniden oluşturulur.
   */ const istatistikSozlukleri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[istatistikSozlukleri]": ()=>{
            if (!Array.isArray(aktifSozlukler)) {
                return [];
            }
            const normallestir = {
                "SozlukEkrani.useMemo[istatistikSozlukleri].normallestir": (deger)=>{
                    return String(deger ?? "").trim().toLocaleLowerCase("tr-TR");
                }
            }["SozlukEkrani.useMemo[istatistikSozlukleri].normallestir"];
            const dosyaFiltresi = normallestir(seciliDosya);
            const lehceFiltresi = normallestir(seciliLehce);
            const tumDegerler = [
                "",
                "tumu",
                "tüm",
                "all",
                "hepsi",
                "tum lehceler",
                "tüm lehçeler"
            ];
            const dosyaFiltreliMi = !tumDegerler.includes(dosyaFiltresi);
            const lehceFiltreliMi = !tumDegerler.includes(lehceFiltresi);
            return aktifSozlukler.filter({
                "SozlukEkrani.useMemo[istatistikSozlukleri]": (sozluk)=>{
                    if (!sozluk || typeof sozluk !== "object") {
                        return false;
                    }
                    const sozlukObj = sozluk;
                    /*
       * Sözlüğün dosya/kaynak bilgilerinde aranacak alanlar
       */ const kaynakDegerleri = [
                        sozlukObj.file,
                        sozlukObj.filename,
                        sozlukObj.fileName,
                        sozlukObj.kaynak_sozluk,
                        sozlukObj.kaynak,
                        sozlukObj.name,
                        sozlukObj.ad,
                        sozlukObj.id
                    ].map(normallestir).filter(Boolean);
                    /*
       * Dosya filtresi aktifse yalnızca seçili dosyayı bırak.
       */ if (dosyaFiltreliMi) {
                        const dosyaEslesiyor = kaynakDegerleri.some({
                            "SozlukEkrani.useMemo[istatistikSozlukleri].dosyaEslesiyor": (kaynak)=>kaynak === dosyaFiltresi || kaynak.includes(dosyaFiltresi) || dosyaFiltresi.includes(kaynak)
                        }["SozlukEkrani.useMemo[istatistikSozlukleri].dosyaEslesiyor"]);
                        if (!dosyaEslesiyor) {
                            return false;
                        }
                    }
                    /*
       * Lehçe alanları
       */ const lehceDegerleri = [
                        sozlukObj.dialect,
                        sozlukObj.lehce,
                        sozlukObj.diyalekt,
                        sozlukObj.dialectName,
                        sozlukObj.lehceAdi
                    ].map(normallestir).filter(Boolean);
                    /*
       * Lehçe filtresi aktifse yalnızca o lehçeyi bırak.
       */ if (lehceFiltreliMi) {
                        const lehceEslesiyor = lehceDegerleri.some({
                            "SozlukEkrani.useMemo[istatistikSozlukleri].lehceEslesiyor": (lehce)=>lehce === lehceFiltresi || lehce.includes(lehceFiltresi) || lehceFiltresi.includes(lehce)
                        }["SozlukEkrani.useMemo[istatistikSozlukleri].lehceEslesiyor"]);
                        if (!lehceEslesiyor) {
                            return false;
                        }
                    }
                    return true;
                }
            }["SozlukEkrani.useMemo[istatistikSozlukleri]"]);
        }
    }["SozlukEkrani.useMemo[istatistikSozlukleri]"], [
        aktifSozlukler,
        seciliDosya,
        seciliLehce
    ]);
    /*
   * Bir sözlüğün kayıt/kelime sayısını bulur.
   */ const sozlukKayitSayisiniBul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SozlukEkrani.useCallback[sozlukKayitSayisiniBul]": (sozluk)=>{
            if (!sozluk || typeof sozluk !== "object") {
                return 0;
            }
            const sozlukObj = sozluk;
            const rawCount = sozlukObj.kelimeSayisi ?? sozlukObj.kayitSayisi ?? sozlukObj.wordCount ?? sozlukObj.wordsCount ?? sozlukObj.count ?? sozlukObj.total_words ?? sozlukObj.totalWords ?? sozlukObj.toplamKelime ?? 0;
            /*
       * "202.425" gibi Türkçe sayı biçimlerini de destekler.
       */ if (typeof rawCount === "string") {
                const temizSayi = rawCount.trim().replace(/\./g, "").replace(",", ".");
                const sayi = Number(temizSayi);
                return Number.isNaN(sayi) ? 0 : sayi;
            }
            const sayi = Number(rawCount);
            return Number.isNaN(sayi) ? 0 : sayi;
        }
    }["SozlukEkrani.useCallback[sozlukKayitSayisiniBul]"], []);
    /*
   * Filtreye göre dinamik sözlük sayısı
   */ const dinamikSozlukSayisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[dinamikSozlukSayisi]": ()=>{
            /*
     * Arama yapılıyorsa sonuçlarda görünen
     * farklı sözlükleri say.
     */ if (searchQuery?.trim()) {
                const sozlukSeti = new Set();
                gruplanmisSonuclar.forEach({
                    "SozlukEkrani.useMemo[dinamikSozlukSayisi]": (grup)=>{
                        grup.kaynaklar?.forEach({
                            "SozlukEkrani.useMemo[dinamikSozlukSayisi]": (kaynak)=>{
                                const kaynakAdi = kaynak.file || kaynak.kaynak_sozluk || "";
                                const temizKaynakAdi = String(kaynakAdi).trim();
                                if (temizKaynakAdi) {
                                    sozlukSeti.add(temizKaynakAdi);
                                }
                            }
                        }["SozlukEkrani.useMemo[dinamikSozlukSayisi]"]);
                    }
                }["SozlukEkrani.useMemo[dinamikSozlukSayisi]"]);
                return sozlukSeti.size;
            }
            /*
     * Arama yoksa filtrelenmiş sözlük listesini kullan.
     */ if (istatistikSozlukleri.length > 0) {
                return istatistikSozlukleri.length;
            }
            return 0;
        }
    }["SozlukEkrani.useMemo[dinamikSozlukSayisi]"], [
        searchQuery,
        gruplanmisSonuclar,
        istatistikSozlukleri
    ]);
    /*
   * Arama ve filtreye göre dinamik kelime/kayıt sayısı
   */ const dinamikKayitSayisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SozlukEkrani.useMemo[dinamikKayitSayisi]": ()=>{
            /*
     * Arama yapılırken ekranda bulunan
     * tüm kaynak kayıtlarını say.
     */ if (searchQuery?.trim()) {
                return gruplanmisSonuclar.reduce({
                    "SozlukEkrani.useMemo[dinamikKayitSayisi]": (toplam, grup)=>toplam + (grup.kaynaklar?.length || 0)
                }["SozlukEkrani.useMemo[dinamikKayitSayisi]"], 0);
            }
            /*
     * Arama yoksa yalnızca filtrelenmiş sözlüklerin
     * kayıt sayılarını topla.
     *
     * Böylece:
     * - Doğu seçilince Doğu toplamı,
     * - Batı seçilince Batı toplamı,
     * - Tek dosya seçilince o dosyanın sayısı,
     * - Tümü seçilince genel toplam
     * hesaplanır.
     */ const toplam = istatistikSozlukleri.reduce({
                "SozlukEkrani.useMemo[dinamikKayitSayisi].toplam": (genelToplam, sozluk)=>genelToplam + sozlukKayitSayisiniBul(sozluk)
            }["SozlukEkrani.useMemo[dinamikKayitSayisi].toplam"], 0);
            return toplam;
        }
    }["SozlukEkrani.useMemo[dinamikKayitSayisi]"], [
        searchQuery,
        gruplanmisSonuclar,
        istatistikSozlukleri,
        sozlukKayitSayisiniBul
    ]);
    /*
   * Kelime seçme
   */ const handleKelimeSec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SozlukEkrani.useCallback[handleKelimeSec]": (grup)=>{
            setSeciliKelimeGrubu(grup);
        }
    }["SozlukEkrani.useCallback[handleKelimeSec]"], []);
    /*
   * Panoya kopyalama
   */ const handlePanoyaKopyala = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SozlukEkrani.useCallback[handlePanoyaKopyala]": async (kelime, tanim, id)=>{
            const metin = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kelime)}\n${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(tanim || "")}`;
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(metin);
                }
                if (id) {
                    setKopyalandiId(id);
                    window.setTimeout({
                        "SozlukEkrani.useCallback[handlePanoyaKopyala]": ()=>{
                            setKopyalandiId(null);
                        }
                    }["SozlukEkrani.useCallback[handlePanoyaKopyala]"], 2000);
                }
            } catch (error) {
                console.warn("Kopyalama engellendi:", error);
            }
        }
    }["SozlukEkrani.useCallback[handlePanoyaKopyala]"], []);
    /*
   * Sayfalama
   */ const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;
    /*
   * Günün kelimesi metinleri
   */ const gununKelimesiMetni = gununKelimesi ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.kelime || gununKelimesi.spelling || "") : "";
    const gununKelimesiTanimi = gununKelimesi ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.tanim || gununKelimesi.meaning || gununKelimesi.full_definition_in_html || "") : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            backgroundColor: aktifTema.arkaPlan,
            color: aktifTema.yaziAna,
            transition: "all 0.2s ease",
            padding: "8px 14px 0 14px",
            fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
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
                !searchQuery?.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                    file: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.file || ""),
                                    kaynak_sozluk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(gununKelimesi.kaynak_sozluk || ""),
                                    dialect: gununLehcesi
                                }
                            ]
                        });
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 745,
                    columnNumber: 13
                }, this),
                searchQuery?.trim() && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: "4px 0 0 2px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            lineNumber: 799,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "13px",
                                color: aktifTema.yaziAlt,
                                margin: 0
                            },
                            children: [
                                "Toplam",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: "#7A1C1C",
                                        fontWeight: "bold"
                                    },
                                    children: gruplanmisSonuclar.length
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                    lineNumber: 825,
                                    columnNumber: 15
                                }, this),
                                " ",
                                "kelime grubu bulundu."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                            lineNumber: 817,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 791,
                    columnNumber: 11
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    lineNumber: 840,
                    columnNumber: 11
                }, this) : searchQuery?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "12px"
                    },
                    children: [
                        gruplanmisSonuclar.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center",
                                padding: "20px 16px",
                                borderRadius: "4px",
                                border: `1px dashed ${aktifTema.kenarlik}`,
                                backgroundColor: aktifTema.kartArkaPlan
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        marginBottom: "4px",
                                        color: aktifTema.yaziAna
                                    },
                                    children: "Aradığınız kelime bulunamadı"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                    lineNumber: 872,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    lineNumber: 883,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                            lineNumber: 862,
                            columnNumber: 17
                        }, this) : gosterilenGruplar.map((grup, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dictionary$2f$KelimeKarti$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                idx: index,
                                grup: grup,
                                tema: aktifTema,
                                metinBoyutu: metinBoyutu,
                                kopyalandiId: kopyalandiId,
                                panoyaKopyala: handlePanoyaKopyala,
                                onClick: handleKelimeSec
                            }, `${grup.kelime}-${grup.kaynaklar?.length || 0}-${index}`, false, {
                                fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                lineNumber: 898,
                                columnNumber: 21
                            }, this)),
                        dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            lineNumber: 915,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 853,
                    columnNumber: 13
                }, this),
                seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    seciliKelime: seciliKelimeGrubu,
                    kapat: ()=>setSeciliKelimeGrubu(null),
                    tema: aktifTema,
                    metinBoyutu: metinBoyutu
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 949,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    aktifTema: aktifTema,
                    onKaynaklarAc: ()=>setKaynaklarAcik(true)
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 959,
                    columnNumber: 9
                }, this),
                kaynaklarAcik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                lineNumber: 1005,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Kaynaklar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                tema: aktifTema,
                                onClose: ()=>setKaynaklarAcik(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                                lineNumber: 1026,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                        lineNumber: 985,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
                    lineNumber: 968,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
            lineNumber: 729,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dictionary/SozlukEkrani.tsx",
        lineNumber: 718,
        columnNumber: 5
    }, this);
}
_s(SozlukEkrani, "BSysBEKNSlkIiDrI5Hb+hjwfBaU=");
_c = SozlukEkrani;
var _c;
__turbopack_context__.k.register(_c, "SozlukEkrani");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
"use client";
;
;
function Footer({ aktifTema, onKaynaklarAc }) {
    const kenarlikRengi = aktifTema?.kenarlik || "#EADDC9";
    const altYaziRengi = aktifTema?.yaziAlt || "#8C7A6B";
    const kartArkaPlanRengi = aktifTema?.kartArkaPlan || aktifTema?.arkaPlan || "#FFFFFF";
    const vurguRengi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi || "#7A1C1C";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: {
            borderTopColor: kenarlikRengi,
            color: altYaziRengi
        },
        className: "mt-6 flex flex-col items-start justify-between gap-3 border-t pt-4 pb-6 text-xs transition-colors duration-200 sm:flex-row sm:items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex max-w-full items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            backgroundColor: vurguRengi
                        },
                        className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full opacity-80",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold leading-4 tracking-[0.25px] opacity-80 sm:text-[11px]",
                        children: "AÇIK MEKTEP DİJİTAL YAYINCILIK — ÇERKESÇE DİL KORPUSU"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onKaynaklarAc,
                style: {
                    color: vurguRengi,
                    borderColor: kenarlikRengi,
                    backgroundColor: kartArkaPlanRengi
                },
                className: "cursor-pointer rounded-[4px] border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.5px] transition-all duration-150 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/30",
                "aria-label": "Kaynaklar ve referanslar penceresini aç",
                children: "Kaynaklar ve Referanslar →"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Kaynaklar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Kaynaklar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
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
function Kaynaklar({ onClose, tema }) {
    _s();
    const [aramaMetni, setAramaMetni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliDiyalekt, setSeciliDiyalekt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("HEPSİ");
    const aktifTema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Kaynaklar.useMemo[aktifTema]": ()=>({
                arkaPlan: tema?.arkaPlan || "#FDFBF7",
                kartArkaPlan: tema?.kartArkaPlan || "#FFFFFF",
                yaziAna: tema?.yaziAna || "#2C221E",
                yaziAlt: tema?.yaziAlt || "#8C7A6B",
                kenarlik: tema?.kenarlik || "#EADDC9",
                inputArkaPlan: tema?.inputArkaPlan || "#FAFAFA"
            })
    }["Kaynaklar.useMemo[aktifTema]"], [
        tema
    ]);
    const vurguRengi = "#7A1C1C";
    const doguRengi = "#A37015";
    const istatistikler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Kaynaklar.useMemo[istatistikler]": ()=>{
            let toplamKayit = 0;
            let batiCount = 0;
            let doguCount = 0;
            const hedefDiller = new Set();
            manifestData.forEach({
                "Kaynaklar.useMemo[istatistikler]": (sozluk)=>{
                    toplamKayit += sozluk.count;
                    if (sozluk.dialect === "BATI") {
                        batiCount++;
                    }
                    if (sozluk.dialect === "DOGU") {
                        doguCount++;
                    }
                    hedefDiller.add(sozluk.langPair);
                }
            }["Kaynaklar.useMemo[istatistikler]"]);
            return {
                toplamSozluk: manifestData.length,
                toplamKayit,
                batiCount,
                doguCount,
                hedefDilSayisi: hedefDiller.size
            };
        }
    }["Kaynaklar.useMemo[istatistikler]"], []);
    const filtrelenmisManifest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Kaynaklar.useMemo[filtrelenmisManifest]": ()=>{
            const arama = aramaMetni.toLocaleLowerCase("tr-TR").trim();
            return manifestData.filter({
                "Kaynaklar.useMemo[filtrelenmisManifest]": (sozluk)=>{
                    const aranabilirMetin = [
                        sozluk.title,
                        sozluk.author,
                        sozluk.publisher,
                        sozluk.langPair,
                        sozluk.year,
                        sozluk.id.toString()
                    ].join(" ").toLocaleLowerCase("tr-TR");
                    const aramaUyum = arama.length === 0 || aranabilirMetin.includes(arama);
                    const diyalektUyum = seciliDiyalekt === "HEPSİ" || seciliDiyalekt === "BATI" && sozluk.dialect === "BATI" || seciliDiyalekt === "DOĞU" && sozluk.dialect === "DOGU";
                    return aramaUyum && diyalektUyum;
                }
            }["Kaynaklar.useMemo[filtrelenmisManifest]"]);
        }
    }["Kaynaklar.useMemo[filtrelenmisManifest]"], [
        aramaMetni,
        seciliDiyalekt
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            backgroundColor: aktifTema.kartArkaPlan,
            color: aktifTema.yaziAna
        },
        className: "min-h-screen px-4 py-8 font-sans transition-colors duration-200 sm:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl",
            children: [
                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onClose,
                    style: {
                        color: vurguRengi
                    },
                    className: "mb-6 cursor-pointer border-0 bg-transparent p-0 text-xs font-bold uppercase tracking-[1px] transition-opacity hover:opacity-70 focus:outline-none",
                    children: "← Sözlüğe dön"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 451,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        backgroundColor: aktifTema.kartArkaPlan,
                        borderColor: aktifTema.kenarlik,
                        borderLeftColor: vurguRengi
                    },
                    className: "mb-6 rounded-[2px] border border-l-4 px-6 py-6 sm:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: vurguRengi
                            },
                            className: "mb-2 text-[10px] font-bold uppercase tracking-[1.5px] sm:text-[11px]",
                            children: "Açık Mektep Açık Erişim Dil Kaynakları Projesi"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 470,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                color: aktifTema.yaziAna
                            },
                            className: "mb-3 font-serif text-2xl font-semibold italic leading-tight sm:text-3xl",
                            children: "Çerkesçe Sözlük Projesi"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 477,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: aktifTema.yaziAlt
                            },
                            className: "mb-3 text-sm leading-7 sm:text-[15px]",
                            children: "Çerkesçe Sözlük, Batı Adıgece (Adıge) ve Doğu Adıgece (Kabardeyce) lehçelerine ait sözlükleri tek bir dijital platform altında bir araya getirmeyi amaçlayan açık erişimli bir dil kaynakları projesidir."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 484,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: aktifTema.yaziAlt
                            },
                            className: "m-0 text-sm leading-7 sm:text-[15px]",
                            children: "Proje kapsamında farklı dönemlerde yayımlanmış basılı sözlükler, akademik çalışmalar, açık erişimli dijital koleksiyonlar ve topluluk katkıları incelenmiş; elde edilen veriler ortak bir veri modeli altında bütünleştirilmiştir."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 494,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 462,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        backgroundColor: aktifTema.kartArkaPlan,
                        borderColor: aktifTema.kenarlik
                    },
                    className: "mb-6 rounded-[3px] border p-6 shadow-[0_2px_6px_rgba(0,0,0,0.02)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: vurguRengi
                            },
                            className: "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[1px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "📡"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 517,
                                    columnNumber: 13
                                }, this),
                                "Dijital Kaynak Koleksiyonu"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                color: aktifTema.yaziAna
                            },
                            className: "mb-2 text-lg font-bold sm:text-xl",
                            children: "Learn Circassian Raw Dictionary Collection"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 521,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: aktifTema.yaziAlt
                            },
                            className: "mb-4 text-sm leading-relaxed",
                            children: [
                                "Bu uygulamada kullanılan çok sayıda Adıgece ve Kabardeyce sözlük verisi, açık erişimli",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Learn Circassian Raw Dictionary Collection"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 534,
                                    columnNumber: 13
                                }, this),
                                " dijital arşivinden derlenmiştir."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 528,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://github.com/bihoqo/learn-circassian-raw-dictionary-collection",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                backgroundColor: vurguRengi
                            },
                            className: "inline-flex items-center gap-1.5 rounded-[3px] px-4 py-2 text-xs font-bold text-white transition-all hover:brightness-110 focus:outline-none",
                            children: "🔗 GitHub Koleksiyonunu Görüntüle"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 538,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 506,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: aktifTema.kartArkaPlan,
                                borderColor: aktifTema.kenarlik
                            },
                            className: "rounded-[3px] border p-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: vurguRengi
                                    },
                                    className: "text-xl font-bold sm:text-2xl",
                                    children: istatistikler.toplamSozluk
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 558,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: aktifTema.yaziAlt
                                    },
                                    className: "mt-1 text-xs font-medium uppercase tracking-wider",
                                    children: "Kaynak Sözlük"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 551,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: aktifTema.kartArkaPlan,
                                borderColor: aktifTema.kenarlik
                            },
                            className: "rounded-[3px] border p-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: vurguRengi
                                    },
                                    className: "text-xl font-bold sm:text-2xl",
                                    children: istatistikler.toplamKayit.toLocaleString("tr-TR")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 579,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: aktifTema.yaziAlt
                                    },
                                    className: "mt-1 text-xs font-medium uppercase tracking-wider",
                                    children: "Toplam Madde"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 585,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 572,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: aktifTema.kartArkaPlan,
                                borderColor: aktifTema.kenarlik
                            },
                            className: "rounded-[3px] border p-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: vurguRengi
                                    },
                                    className: "text-xl font-bold sm:text-2xl",
                                    children: istatistikler.batiCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 600,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: aktifTema.yaziAlt
                                    },
                                    className: "mt-1 text-xs font-medium uppercase tracking-wider",
                                    children: "Batı Adıgece"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 606,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 593,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: aktifTema.kartArkaPlan,
                                borderColor: aktifTema.kenarlik
                            },
                            className: "rounded-[3px] border p-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: doguRengi
                                    },
                                    className: "text-xl font-bold sm:text-2xl",
                                    children: istatistikler.doguCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 621,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: aktifTema.yaziAlt
                                    },
                                    className: "mt-1 text-xs font-medium uppercase tracking-wider",
                                    children: "Doğu (Kabardey)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 627,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 614,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 550,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    style: {
                        backgroundColor: aktifTema.kartArkaPlan,
                        borderColor: aktifTema.kenarlik
                    },
                    className: "mb-6 rounded-[3px] border p-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: aramaMetni,
                                onChange: (e)=>setAramaMetni(e.target.value),
                                placeholder: "Koleksiyonda sözlük veya yazar ara...",
                                style: {
                                    backgroundColor: aktifTema.inputArkaPlan,
                                    borderColor: aktifTema.kenarlik,
                                    color: aktifTema.yaziAna
                                },
                                className: "w-full rounded-[3px] border px-3 py-2 text-sm outline-none transition-colors focus:border-[#7A1C1C]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                lineNumber: 645,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 self-start sm:self-auto",
                                children: [
                                    "HEPSİ",
                                    "BATI",
                                    "DOĞU"
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSeciliDiyalekt(d),
                                        style: {
                                            backgroundColor: seciliDiyalekt === d ? d === "DOĞU" ? doguRengi : vurguRengi : "transparent",
                                            color: seciliDiyalekt === d ? "#FFFFFF" : aktifTema.yaziAlt,
                                            borderColor: seciliDiyalekt === d ? d === "DOĞU" ? doguRengi : vurguRengi : aktifTema.kenarlik
                                        },
                                        className: "rounded-[3px] border px-3 py-1.5 text-xs font-bold uppercase transition-all hover:opacity-90",
                                        children: d
                                    }, d, false, {
                                        fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                        lineNumber: 660,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                lineNumber: 658,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                        lineNumber: 644,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 637,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "flex flex-col gap-3",
                    children: filtrelenmisManifest.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderColor: aktifTema.kenarlik,
                            backgroundColor: aktifTema.kartArkaPlan
                        },
                        className: "rounded-[3px] border border-dashed p-8 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: aktifTema.yaziAna
                            },
                            className: "text-sm font-bold",
                            children: "Aramanızla eşleşen kaynak bulunamadı."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 699,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                        lineNumber: 692,
                        columnNumber: 13
                    }, this) : filtrelenmisManifest.map((sozluk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            style: {
                                backgroundColor: aktifTema.kartArkaPlan,
                                borderColor: aktifTema.kenarlik
                            },
                            className: "flex flex-col justify-between gap-3 rounded-[3px] border p-4 sm:flex-row sm:items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        backgroundColor: sozluk.dialect === "BATI" ? "#7A1C1C" : doguRengi
                                                    },
                                                    className: "rounded-[2px] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase",
                                                    children: sozluk.dialect === "BATI" ? "BATI ADIGE" : "KABARDEY"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 718,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        borderColor: aktifTema.kenarlik,
                                                        color: aktifTema.yaziAlt
                                                    },
                                                    className: "rounded-[2px] border px-1.5 py-0.5 text-[9px] font-mono font-bold",
                                                    children: sozluk.langPair
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 717,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                color: aktifTema.yaziAna
                                            },
                                            className: "text-base font-bold",
                                            children: sozluk.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 738,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: aktifTema.yaziAlt
                                            },
                                            className: "text-xs leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Yazar:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 749,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                sozluk.author,
                                                " •",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Yayın:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                sozluk.publisher,
                                                " (",
                                                sozluk.year,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 745,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 716,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between sm:flex-col sm:items-end sm:justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: vurguRengi
                                            },
                                            className: "text-sm font-bold",
                                            children: [
                                                sozluk.count.toLocaleString("tr-TR"),
                                                " madde"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 755,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: aktifTema.yaziAlt
                                            },
                                            className: "text-[10px] uppercase tracking-wider",
                                            children: "Kayıtlı"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                            lineNumber: 761,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                                    lineNumber: 754,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, sozluk.id, true, {
                            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                            lineNumber: 708,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Kaynaklar.tsx",
                    lineNumber: 690,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Kaynaklar.tsx",
            lineNumber: 449,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Kaynaklar.tsx",
        lineNumber: 442,
        columnNumber: 5
    }, this);
}
_s(Kaynaklar, "lt8F/2X1+l4VypDKOVGOze2qW5c=");
_c = Kaynaklar;
var _c;
__turbopack_context__.k.register(_c, "Kaynaklar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/KelimeDetayDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KelimeDetayDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const KURUMSAL_KIRMIZI = "#FF4030";
function KelimeDetayDrawer({ seciliKelime, kapat, tema, metinBoyutu }) {
    _s();
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const kapatBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Eski page.tsx'teki Klavye ve Odak Yönetimi Logic'i
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KelimeDetayDrawer.useEffect": ()=>{
            const handleKeyDown = {
                "KelimeDetayDrawer.useEffect.handleKeyDown": (e)=>{
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
                }
            }["KelimeDetayDrawer.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            setTimeout({
                "KelimeDetayDrawer.useEffect": ()=>kapatBtnRef.current?.focus()
            }["KelimeDetayDrawer.useEffect"], 50);
            return ({
                "KelimeDetayDrawer.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["KelimeDetayDrawer.useEffect"];
        }
    }["KelimeDetayDrawer.useEffect"], [
        kapat
    ]);
    // Kaynak listesi (Eski yapıdaki kaynaklar veya anlamlar dizisi)
    const kaynakListesi = seciliKelime.kaynaklar && seciliKelime.kaynaklar.length > 0 ? seciliKelime.kaynaklar : seciliKelime.anlamlar || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "drawer-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                            borderBottom: `1px solid ${tema.kenarlik}`,
                            paddingBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "drawer-title",
                                style: {
                                    margin: 0,
                                    fontSize: `${metinBoyutu * 1.4}px`,
                                    color: tema.yaziAna,
                                    fontWeight: "bold"
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(seciliKelime.kelime)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px"
                        },
                        children: kaynakListesi.map((kaynak, idx)=>{
                            const dosyaAdi = kaynak.kaynak_sozluk || kaynak.file || kaynak.kaynak;
                            const tanim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(kaynak.tanim || kaynak.anlam || kaynak.meaning || kaynak.full_definition_in_html);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "16px",
                                    borderRadius: "8px",
                                    backgroundColor: tema.inputArkaPlan,
                                    border: `1px solid ${tema.kenarlik}`
                                },
                                children: [
                                    dosyaAdi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: `${metinBoyutu * 0.85}px`,
                                            fontWeight: "bold",
                                            color: KURUMSAL_KIRMIZI,
                                            marginBottom: "6px"
                                        },
                                        children: [
                                            "📚 ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(dosyaAdi))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/KelimeDetayDrawer.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(KelimeDetayDrawer, "yEoU1vzvZ0PLvhl4+TvZyfIa5ik=");
_c = KelimeDetayDrawer;
var _c;
__turbopack_context__.k.register(_c, "KelimeDetayDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/dictionarySources.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/dictionaries.json.[json].cjs [app-client] (ecmascript)");
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
    const hedefListe = sozluklerListesi && sozluklerListesi.length > 0 ? sozluklerListesi : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useDictionary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "formatDictionaryTitle",
    ()=>formatDictionaryTitle,
    "useDictionary",
    ()=>useDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cleanHtml.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temizleHtml"])(obj.full_definition_in_html);
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
            const tanim = typeof itemObj.tanim === "string" && itemObj.tanim ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temizleHtml"])(itemObj.tanim) : parseTanim(itemObj);
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
    _s();
    const [aktifSozlukler, setAktifSozlukler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawWords, setRawWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wordsCount, setWordsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliLehce, setSeciliLehce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [seciliDosya, setSeciliDosya] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tumu"); // DÜZELTME: hedefDil State'i Eklendi
    const [gununKelimesi, setGununKelimesi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const cacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const deferredSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchQuery);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDictionary.useEffect": ()=>{
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
                const hedef = seciliDosya !== "TUMU" ? manifest.filter({
                    "useDictionary.useEffect.init": (d)=>d.file === seciliDosya
                }["useDictionary.useEffect.init"]) : seciliLehce !== "TUMU" ? manifest.filter({
                    "useDictionary.useEffect.init": (d)=>d.dialect === seciliLehce
                }["useDictionary.useEffect.init"]) : manifest;
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
                const ilkSonuclar = await Promise.allSettled(ilkGrup.map({
                    "useDictionary.useEffect.init": (meta)=>loadOne(meta, controller.signal)
                }["useDictionary.useEffect.init"]));
                ilkSonuclar.forEach({
                    "useDictionary.useEffect.init": (r)=>{
                        if (r.status === "fulfilled") ilkKelimeler.push(...r.value);
                    }
                }["useDictionary.useEffect.init"]);
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
                    const sonuclar = await Promise.allSettled(batch.map({
                        "useDictionary.useEffect.init": (meta)=>loadOne(meta, controller.signal)
                    }["useDictionary.useEffect.init"]));
                    const yeni = [];
                    sonuclar.forEach({
                        "useDictionary.useEffect.init": (r)=>{
                            if (r.status === "fulfilled") yeni.push(...r.value);
                        }
                    }["useDictionary.useEffect.init"]);
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
            return ({
                "useDictionary.useEffect": ()=>{
                    isMounted = false;
                    controller.abort();
                }
            })["useDictionary.useEffect"];
        }
    }["useDictionary.useEffect"], [
        seciliDosya,
        seciliLehce
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDictionary.useEffect": ()=>{
            if (rawWords.length === 0) return;
            const today = new Date().toISOString().slice(0, 10);
            const idx = hashString(today) % rawWords.length;
            setGununKelimesi(rawWords[idx]);
        }
    }["useDictionary.useEffect"], [
        rawWords
    ]);
    // DÜZELTME: Hedef Dil Filtrelemesi Entegre Edildi
    const filtrelenmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDictionary.useMemo[filtrelenmisSonuclar]": ()=>{
            let veri = rawWords;
            if (seciliLehce !== "TUMU") {
                veri = veri.filter({
                    "useDictionary.useMemo[filtrelenmisSonuclar]": (i)=>i.dialect === seciliLehce
                }["useDictionary.useMemo[filtrelenmisSonuclar]"]);
            }
            if (seciliDosya !== "TUMU") {
                veri = veri.filter({
                    "useDictionary.useMemo[filtrelenmisSonuclar]": (i)=>i.file === seciliDosya
                }["useDictionary.useMemo[filtrelenmisSonuclar]"]);
            }
            if (hedefDil !== "tumu") {
                const targetLang = hedefDil.toLowerCase();
                veri = veri.filter({
                    "useDictionary.useMemo[filtrelenmisSonuclar]": (i)=>{
                        const itemToLang = typeof i.toLang === "string" ? i.toLang.toLowerCase() : "";
                        const itemFromLang = typeof i.fromLang === "string" ? i.fromLang.toLowerCase() : "";
                        return itemToLang === targetLang || itemFromLang === targetLang;
                    }
                }["useDictionary.useMemo[filtrelenmisSonuclar]"]);
            }
            if (deferredSearch.trim()) {
                const q = normalizeText(deferredSearch);
                veri = veri.filter({
                    "useDictionary.useMemo[filtrelenmisSonuclar]": (i)=>i.normalizedKelime?.includes(q) || i.normalizedTanim?.includes(q)
                }["useDictionary.useMemo[filtrelenmisSonuclar]"]);
            }
            return veri;
        }
    }["useDictionary.useMemo[filtrelenmisSonuclar]"], [
        rawWords,
        seciliLehce,
        seciliDosya,
        hedefDil,
        deferredSearch
    ]);
    const conceptRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDictionary.useMemo[conceptRows]": ()=>{
            const groups = new Map();
            filtrelenmisSonuclar.forEach({
                "useDictionary.useMemo[conceptRows]": (item)=>{
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
                }
            }["useDictionary.useMemo[conceptRows]"]);
            return Array.from(groups.values());
        }
    }["useDictionary.useMemo[conceptRows]"], [
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
_s(useDictionary, "yMQ5IhvihJT9tRDTuWffDzh/Xp0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"]
    ];
});
const __TURBOPACK__default__export__ = useDictionary;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/cleanHtml.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/dictionaries.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/helpers.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/dictionarySources.ts [app-client] (ecmascript)");
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
    const metin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(dosyaAdi);
    if (!metin) return "diger";
    const isim = metin.toLowerCase();
    if (isim.includes("tur") || isim.includes("tu-")) return "tr";
    if (isim.includes("ara") || isim.includes("-ar")) return "ar";
    if (isim.includes("en") || isim.includes("kbd-en")) return "en";
    if (isim.includes("rus") || isim.includes("ru-")) return "ru";
    return "diger";
};
const normalizeText = (text)=>{
    const metin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(text);
    if (!metin) return "";
    return metin.normalize("NFC").toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]/gu, "").trim();
};
const tanimlariBicimlendir = (tanim, tema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VARSAYILAN_TEMA"], gecerliBaslikOrBoyut, metinBoyutuParam, kaynakParam, sozluklerListesi)=>{
    const tanimMetni = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metneCevir"])(tanim);
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
    let kaynakBilgisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(kaynakParam, sozluklerListesi);
    const kirilVarMi = /[\u0400-\u04FF]/.test(tanimMetni);
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
            // sozluklerListesi parametresi alt fonksiyona geçiriliyor
            kaynakBilgisi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$dictionarySources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(sourceMatch[1].trim(), sozluklerListesi);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            pointerEvents: "none"
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        lineNumber: 225,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 224,
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_11s-85g._.js.map