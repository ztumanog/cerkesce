module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnaSayfa
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchBox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GununKelimesiKart.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KelimeDetayDrawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDictionary.ts [app-ssr] (ecmascript)");
// src/app/page.tsx
"use client";
;
;
;
;
;
;
;
function AnaSayfa() {
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(16);
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(20);
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null); // TS2322 Çözümü
    const { loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDictionary"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (karanlikMod) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [
        karanlikMod
    ]);
    const aktifTema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
            kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
            yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
            yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
            kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
            inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff"
        }), [
        karanlikMod
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors px-4 py-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 max-w-4xl w-full mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    karanlikMod: karanlikMod,
                    toggleKaranlikMod: ()=>setKaranlikMod(!karanlikMod),
                    metinBoyutu: metinBoyutu,
                    setMetinBoyutu: setMetinBoyutu,
                    tema: aktifTema
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                !searchQuery.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GununKelimesiKart$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    gununKelimesi: gununKelimesi,
                    karanlikMod: karanlikMod,
                    metinBoyutu: metinBoyutu,
                    tema: aktifTema,
                    onClick: ()=>setSeciliKelimeGrubu({
                            kelime: gununKelimesi.kelime,
                            kaynaklar: [
                                gununKelimesi
                            ]
                        })
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    searchQuery: searchQuery,
                    setSearchQuery: setSearchQuery,
                    mod: mod,
                    setMod: setMod,
                    hedefDil: hedefDil,
                    setHedefDil: setHedefDil,
                    seciliLehce: seciliLehce,
                    setSeciliLehce: setSeciliLehce,
                    seciliDosya: seciliDosya,
                    setSeciliDosya: setSeciliDosya,
                    aktifSozlukler: aktifSozlukler,
                    metinBoyutu: metinBoyutu,
                    karanlikMod: karanlikMod,
                    tema: aktifTema,
                    inputRef: inputRef,
                    harfEkle: (harf)=>setSearchQuery((prev)=>prev + harf),
                    kaynagiDuzenle: (dosyaAdi)=>dosyaAdi || "",
                    limit: 20,
                    setGoruntulenenAdet: setGoruntulenenAdet
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 text-slate-500 font-medium",
                    children: "📖 Sözlük verileri yükleniyor..."
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    "aria-label": "Arama Sonuçları",
                    className: "flex flex-col gap-4"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this),
                seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KelimeDetayDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    seciliKelime: seciliKelimeGrubu,
                    kapat: ()=>setSeciliKelimeGrubu(null),
                    tema: aktifTema,
                    metinBoyutu: metinBoyutu
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 56,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
// @/components/AkilliKlavye.tsx
'use client';
;
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
                lineNumber: 89,
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
                                    // Kurumsal renk entegrasyonu (Aktif sekme kırmızı, pasif sekme standart)
                                    border: `1px solid ${aktifDil === dilKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : kenarlik}`,
                                    backgroundColor: aktifDil === dilKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : 'transparent',
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
}),
"[project]/src/components/GununKelimesiKart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @/components/GununKelimesiKarti.tsx
__turbopack_context__.s([
    "default",
    ()=>GununKelimesiKarti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-ssr] (ecmascript)");
;
;
;
function GununKelimesiKarti({ gununKelimesi, karanlikMod, metinBoyutu, tema, onClick }) {
    // Veri yoksa bileşeni boş (null) döndürerek güvenli hale getiriyoruz
    if (!gununKelimesi) return null;
    const arkaPlanRengi = karanlikMod ? "#1e293b" : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmiziAcik;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        style: {
            padding: "16px 20px",
            backgroundColor: arkaPlanRengi,
            borderLeft: `5px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi}`,
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            cursor: "pointer",
            textAlign: "left"
        },
        role: "button",
        tabIndex: 0,
        "aria-label": "Günün kelimesi detaylarını aç",
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
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                            fontWeight: "bold",
                            fontSize: `${metinBoyutu * 0.85}px`,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        },
                        children: "🌟 Günün Kelimesi"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GununKelimesiKart.tsx",
                        lineNumber: 45,
                        columnNumber: 9
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
                        fileName: "[project]/src/components/GununKelimesiKart.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GununKelimesiKart.tsx",
                lineNumber: 44,
                columnNumber: 7
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
                fileName: "[project]/src/components/GununKelimesiKart.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tanimlariBicimlendir"])(gununKelimesi.tanim, tema, gununKelimesi.kelime, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(gununKelimesi.kaynak_sozluk))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GununKelimesiKart.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @/components/Header.tsx
__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
;
;
;
function Header({ karanlikMod, toggleKaranlikMod, metinBoyutu, setMetinBoyutu, tema }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
            borderBottom: `2px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].sari}`,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/logo.png",
                        alt: "Açık Mektep Logosu",
                        width: 42,
                        height: 42,
                        style: {
                            objectFit: "contain",
                            borderRadius: "8px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.75}px`,
                                    fontWeight: "bold",
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    display: "block"
                                },
                                children: "Açık Mektep"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    color: tema.yaziAna,
                                    margin: 0,
                                    fontSize: `${metinBoyutu * 1.5}px`
                                },
                                children: "📖 Çerkesçe Sözlük"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 33,
                columnNumber: 7
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
                        onClick: ()=>setMetinBoyutu((p)=>Math.max(14, p - 2)),
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
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMetinBoyutu((p)=>Math.min(24, p + 2)),
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
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 69,
                        columnNumber: 9
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
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/KelimeDetayDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SozlukEkrani
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// src/components/SozlukEkrani.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helpers.tsx [app-ssr] (ecmascript)");
;
;
;
function SozlukEkrani({ seciliKelime, kapat, tema, metinBoyutu }) {
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.key === "Escape") kapat();
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        kapat
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/50 flex justify-end transition-opacity",
        onClick: kapat,
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: drawerRef,
            className: "w-full max-w-md h-full p-6 overflow-y-auto shadow-xl flex flex-col",
            style: {
                backgroundColor: tema.kartArkaPlan
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex justify-between items-center mb-6 pb-4 border-b",
                    style: {
                        borderColor: tema.kenarlik
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                color: tema.yaziAna,
                                margin: 0,
                                fontSize: `${metinBoyutu * 1.3}px`,
                                fontWeight: "bold"
                            },
                            children: seciliKelime.kelime
                        }, void 0, false, {
                            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: kapat,
                            className: "px-3 py-2 rounded-md border text-sm hover:opacity-80 transition-opacity",
                            style: {
                                borderColor: tema.kenarlik,
                                color: tema.yaziAna
                            },
                            children: "✕ Kapat"
                        }, void 0, false, {
                            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 space-y-6",
                    children: seciliKelime.kaynaklar.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "pb-4 border-b last:border-0",
                            style: {
                                borderColor: tema.kenarlik
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tanimlariBicimlendir"])(item.tanim, tema, seciliKelime.kelime, metinBoyutu, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helpers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kaynagiDuzenle"])(item.file || item.kaynak_sozluk))
                        }, index, false, {
                            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/KelimeDetayDrawer.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/SearchBox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AkilliKlavye.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
// @/components/SearchBox.tsx
"use client";
;
;
;
function SearchBox({ searchQuery, setSearchQuery, mod, setMod, hedefDil, setHedefDil, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, aktifSozlukler, metinBoyutu, karanlikMod, tema, inputRef, harfEkle, kaynagiDuzenle, setGoruntulenenAdet, limit }) {
    const ozelKarakterler = [
        "Ӏ",
        "I",
        "а",
        "э",
        "гь",
        "кь"
    ];
    // React State Setter yapısına uygun hale getirildi
    const handleSearchChange = (val)=>{
        setSearchQuery(val);
        setGoruntulenenAdet(limit);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
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
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 65,
                        columnNumber: 9
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
                                    border: `2px solid ${seciliLehce === lehce.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kenarlik}`,
                                    backgroundColor: seciliLehce === lehce.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kartArkaPlan,
                                    color: seciliLehce === lehce.kod ? "#ffffff" : tema.yaziAna,
                                    cursor: "pointer"
                                },
                                children: lehce.etiket
                            }, lehce.kod, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "TUMU",
                                children: seciliLehce === "TUMU" ? "📖 Tüm Sözlüklerde Ara" : `📖 Tüm ${seciliLehce === "BATI" ? "Batı" : "Doğu"} Sözlüklerinde Ara`
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 113,
                                columnNumber: 11
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
                                    fileName: "[project]/src/components/SearchBox.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 64,
                columnNumber: 7
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
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 126,
                        columnNumber: 9
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
                                    border: `1px solid ${hedefDil === dil.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kenarlik}`,
                                    backgroundColor: hedefDil === dil.kod ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi : tema.kartArkaPlan,
                                    color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna,
                                    cursor: "pointer"
                                },
                                children: dil.etiket
                            }, dil.kod, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 125,
                columnNumber: 7
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
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 160,
                        columnNumber: 9
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
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                inputRef: inputRef,
                sorgu: searchQuery,
                setSorgu: handleSearchChange,
                metinBoyutu: metinBoyutu,
                karanlikMod: karanlikMod
            }, void 0, false, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 186,
                columnNumber: 7
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
                                    outlineColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KURUMSAL"].kirmizi,
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 191,
                                columnNumber: 11
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
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 190,
                        columnNumber: 9
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
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "icinde",
                                children: "İçinde Geçen"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "tam",
                                children: "Tam Eşleşen"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SearchBox.tsx",
        lineNumber: 62,
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
        if (!meta.file) return []; // Undefined hatasını önleyen güvenlik kontrolü
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
            // 3. İlk 3 sözlüğü hemen yükle
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
            setLoading(false);
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
            if (!row["Türkçe"] && item.tanim) row["Türkçe"] = item.tanim.split(";")[0].trim();
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
"[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @/lib/dictionaryConstants.ts
__turbopack_context__.s([
    "BATI_SOZLUKLERI",
    ()=>BATI_SOZLUKLERI,
    "DOGU_SOZLUKLERI",
    ()=>DOGU_SOZLUKLERI,
    "KAYNAK_HARITASI",
    ()=>KAYNAK_HARITASI,
    "KURUMSAL",
    ()=>KURUMSAL,
    "TUR_MAP",
    ()=>TUR_MAP,
    "VARSAYILAN_TEMA",
    ()=>VARSAYILAN_TEMA
]);
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
    "1.Ady-Ady_AP.json": "Adıgece-Rusça Sözlük — Prof. Dr. Mirabil L. Apaşev (2008)"
};
const DOGU_SOZLUKLERI = {
    "5.Ady-Rus_Qarden.json": "Kardanov Kabardeyce-Rusça Sözlük — B. M. Kardanov (1957)",
    "6.Ady-Rus_Sherdjes.json": "Sherdjes Aliy Kabardeyce/Adıgece-Rusça Sözlük — Ali İ. Çerkes (1994)"
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
"[project]/src/utils/helpers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dictionaryConstants.ts [app-ssr] (ecmascript)");
;
;
const kaynagiDuzenle = (dosyaAdi)=>{
    if (!dosyaAdi) return "";
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KAYNAK_HARITASI"][dosyaAdi] || dosyaAdi;
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
const tanimlariBicimlendir = (tanim, tema = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VARSAYILAN_TEMA"], gecerliBaslikOrBoyut, metinBoyutuParam, kaynakParam)=>{
    if (!tanim) return null;
    const gecerliTema = tema || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VARSAYILAN_TEMA"];
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
            turBilgisi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dictionaryConstants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TUR_MAP"][typeMatch[1].trim().toLowerCase()] || typeMatch[1].trim();
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
                        fileName: "[project]/src/utils/helpers.tsx",
                        lineNumber: 99,
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
                        lineNumber: 111,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/utils/helpers.tsx",
                lineNumber: 110,
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
}),
];

//# sourceMappingURL=_09javjr._.js.map