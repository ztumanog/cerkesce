module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Kaynaklar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/dictionaries.json.[json].cjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
/** İnce, tekrar eden baklava-dizi süslemesi — Çerkes gümüş işlemeciliğinden
 * ödünç alınmış bir motif. Sayfada yalnızca iki yerde (başlık altı / dipnot
 * üstü) kullanılır; abartılmaz. */ function SusBandi({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 400 12",
        preserveAspectRatio: "none",
        className: `w-full h-3 ${className}`,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "6",
                x2: "400",
                y2: "6",
                stroke: "currentColor",
                strokeWidth: "0.75",
                opacity: "0.35"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            Array.from({
                length: 20
            }).map((_, i)=>{
                const x = 10 + i * 20;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `M ${x - 4} 6 L ${x} 1.5 L ${x + 4} 6 L ${x} 10.5 Z`,
                    fill: i % 2 === 0 ? "currentColor" : "none",
                    stroke: "currentColor",
                    strokeWidth: "0.75",
                    opacity: i % 2 === 0 ? 0.9 : 0.35
                }, i, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
function Kaynaklar({ onClose }) {
    const [aramaMetni, setAramaMetni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliDiyalekt, setSeciliDiyalekt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("HEPSİ");
    // İstatistik Hesaplamaları
    const istatistikler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const toplamSozluk = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].length;
        let toplamKayit = 0;
        let batiCount = 0;
        let doguCount = 0;
        const hedefDiller = new Set();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forEach((s)=>{
            toplamKayit += Number(s.count || s.total_words || s.kayitSayisi || 0);
            const dialect = (s.dialect || s.lehce || "").toUpperCase();
            if (dialect.includes("BATI") || dialect.includes("ADY")) batiCount++;
            if (dialect.includes("DOGU") || dialect.includes("KBD")) doguCount++;
            const lang = (s.targetLanguage || s.language || s.dil || "").toLowerCase();
            if (lang) hedefDiller.add(lang);
        });
        return {
            toplamSozluk,
            toplamKayit,
            batiCount,
            doguCount,
            hedefDilSayisi: hedefDiller.size || 4
        };
    }, []);
    // Filtrelenmiş Manifest Verisi
    const filtrelenmisManifest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dictionaries$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].filter((sozluk)=>{
            const baslik = (sozluk.title || sozluk.ad || sozluk.file || "").toLowerCase();
            const yazar = (sozluk.author || sozluk.yazar || "").toLowerCase();
            const sehir = (sozluk.publisher || sozluk.city || sozluk.yayinEvi || "").toLowerCase();
            const idStr = (sozluk.id || "").toString();
            const dialect = (sozluk.dialect || sozluk.lehce || "").toUpperCase();
            const aramaUyum = baslik.includes(aramaMetni.toLowerCase()) || yazar.includes(aramaMetni.toLowerCase()) || sehir.includes(aramaMetni.toLowerCase()) || idStr.includes(aramaMetni);
            let diyalektUyum = true;
            if (seciliDiyalekt === "BATI") diyalektUyum = dialect.includes("BATI") || dialect.includes("ADY");
            if (seciliDiyalekt === "DOĞU") diyalektUyum = dialect.includes("DOGU") || dialect.includes("KBD");
            return aramaUyum && diyalektUyum;
        });
    }, [
        aramaMetni,
        seciliDiyalekt
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-5140c71e19eb48a1" + " " + "min-h-screen bg-[#F4EFE1] dark:bg-[#161C16] text-[#1E2A22] dark:text-[#EDE7D6] font-body",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "5140c71e19eb48a1",
                children: '@import "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";.font-display{font-family:Fraunces,ui-serif,Georgia,serif}.font-body{font-family:IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}.font-mono-plex{font-family:IBM Plex Mono,ui-monospace,monospace}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-5140c71e19eb48a1" + " " + "max-w-5xl mx-auto px-5 sm:px-8 py-10",
                children: [
                    onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        "aria-label": "Kaynaklar sayfasını kapat ve sözlüğe dön",
                        className: "jsx-5140c71e19eb48a1" + " " + "group mb-10 inline-flex items-center gap-2 text-[11px] font-mono-plex font-medium tracking-wide uppercase text-[#5B6B57] dark:text-[#9AAE93] hover:text-[#1F4D3A] dark:hover:text-[#C7B36A] transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-5140c71e19eb48a1" + " " + "transition-transform duration-300 group-hover:-translate-x-1",
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-5140c71e19eb48a1" + " " + "border-b border-transparent group-hover:border-current pb-0.5",
                                children: "Sözlüğe dön"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "jsx-5140c71e19eb48a1" + " " + "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "text-[11px] font-mono-plex font-semibold tracking-[0.2em] uppercase text-[#9C6B2E] dark:text-[#C7B36A] mb-3",
                                children: "Dijital Korpus — Bibliyografya Fişi"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-5140c71e19eb48a1" + " " + "font-display italic font-medium text-4xl md:text-5xl leading-[1.05] text-[#1F4D3A] dark:text-[#EDE7D6] mb-4",
                                children: [
                                    "Kaynak Sözlükler",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-5140c71e19eb48a1"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "not-italic font-semibold text-[#1E2A22] dark:text-[#EDE7D6]",
                                        children: "Katalog Künyesi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-5140c71e19eb48a1" + " " + "text-[#5B6B57] dark:text-[#9AAE93] text-sm md:text-[15px] max-w-2xl leading-relaxed font-body",
                                children: "Platformda indekslenen sözlüklerin özgün yayın künyeleri, yazar ve edisyon bilgileri ile diyalektik dağılımları — her eser, tek bir kart olarak fişlenmiştir."
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SusBandi, {
                        className: "text-[#9C6B2E] dark:text-[#C7B36A] mb-10"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5140c71e19eb48a1" + " " + "grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D9CCA6] dark:divide-[#2C3A2A] mb-12 border-y border-[#D9CCA6] dark:border-[#2C3A2A]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "px-4 py-5 first:pl-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "font-display font-semibold text-3xl text-[#1F4D3A] dark:text-[#EDE7D6] tabular-nums",
                                        children: istatistikler.toplamSozluk
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "text-[10.5px] font-mono-plex font-medium text-[#8A7A52] dark:text-[#9AAE93] mt-1 uppercase tracking-wider",
                                        children: "Kataloglu Eser"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "px-4 py-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "font-display font-semibold text-3xl text-[#9C4A32] dark:text-[#D4795E] tabular-nums",
                                        children: istatistikler.toplamKayit.toLocaleString("tr-TR")
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "text-[10.5px] font-mono-plex font-medium text-[#8A7A52] dark:text-[#9AAE93] mt-1 uppercase tracking-wider",
                                        children: "Dijitalize Madde"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "px-4 py-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "font-display font-semibold text-2xl text-[#1E2A22] dark:text-[#EDE7D6] tabular-nums",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-5140c71e19eb48a1" + " " + "text-[#1F4D3A] dark:text-[#7FA88C]",
                                                children: istatistikler.batiCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-5140c71e19eb48a1" + " " + "mx-1.5 text-[#D9CCA6] dark:text-[#2C3A2A] font-body",
                                                children: "/"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-5140c71e19eb48a1" + " " + "text-[#9C4A32] dark:text-[#D4795E]",
                                                children: istatistikler.doguCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "text-[10.5px] font-mono-plex font-medium text-[#8A7A52] dark:text-[#9AAE93] mt-1 uppercase tracking-wider",
                                        children: "Batı / Doğu Diyalekti"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "px-4 py-5 last:pr-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "font-display font-semibold text-3xl text-[#9C6B2E] dark:text-[#C7B36A] tabular-nums",
                                        children: istatistikler.hedefDilSayisi
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "text-[10.5px] font-mono-plex font-medium text-[#8A7A52] dark:text-[#9AAE93] mt-1 uppercase tracking-wider",
                                        children: "Hedef Dil Çifti"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-5140c71e19eb48a1" + " " + "mb-10 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "w-full sm:w-72",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-5140c71e19eb48a1" + " " + "block text-[10.5px] font-mono-plex font-semibold uppercase tracking-wider text-[#8A7A52] dark:text-[#9AAE93] mb-1.5",
                                        children: "Fişlerde Ara"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Eser adı, yazar veya ID (ör: 18)",
                                        value: aramaMetni,
                                        onChange: (e)=>setAramaMetni(e.target.value),
                                        className: "jsx-5140c71e19eb48a1" + " " + "w-full px-0 py-2 bg-transparent border-0 border-b-2 border-[#D9CCA6] dark:border-[#2C3A2A] text-sm font-body placeholder:text-[#B3A57C] dark:placeholder:text-[#5B6B57] focus:outline-none focus:border-[#1F4D3A] dark:focus:border-[#C7B36A] transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "flex items-center gap-5 text-xs font-mono-plex font-semibold uppercase tracking-wide",
                                children: [
                                    "HEPSİ",
                                    "BATI",
                                    "DOĞU"
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSeciliDiyalekt(d),
                                        className: "jsx-5140c71e19eb48a1" + " " + `pb-1 border-b-2 transition-colors ${seciliDiyalekt === d ? "border-[#1F4D3A] dark:border-[#C7B36A] text-[#1F4D3A] dark:text-[#C7B36A]" : "border-transparent text-[#9C917A] dark:text-[#6B7A66] hover:text-[#5B6B57] dark:hover:text-[#9AAE93]"}`,
                                        children: d === "HEPSİ" ? "Tüm Korpus" : d === "BATI" ? "Batı · Adıgece" : "Doğu · Kabardeyce"
                                    }, d, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-5140c71e19eb48a1" + " " + "mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-5140c71e19eb48a1" + " " + "grid gap-6 md:grid-cols-2",
                                children: filtrelenmisManifest.map((sozluk, idx)=>{
                                    const yazar = sozluk.author || sozluk.yazar || "Belirtilmemiş";
                                    const baslik = sozluk.title || sozluk.ad || sozluk.file;
                                    const yil = sozluk.year || sozluk.yil;
                                    const sehirYayin = sozluk.publisher || sozluk.city || sozluk.yayinEvi;
                                    const kayitSayisi = sozluk.count || sozluk.total_words || sozluk.kayitSayisi;
                                    const lehce = (sozluk.dialect || sozluk.lehce || "GENEL").toUpperCase();
                                    const dilCifti = sozluk.langPair || sozluk.dilCifti || `${lehce} → HEDEF`;
                                    const sozlukId = sozluk.id !== undefined ? sozluk.id : idx + 1;
                                    const batiMi = lehce.includes("BATI") || lehce.includes("ADY");
                                    const doguMu = lehce.includes("DOGU") || lehce.includes("KBD");
                                    const kenarRengi = batiMi ? "border-l-[#1F4D3A] dark:border-l-[#7FA88C]" : doguMu ? "border-l-[#9C4A32] dark:border-l-[#D4795E]" : "border-l-[#9C6B2E] dark:border-l-[#C7B36A]";
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "jsx-5140c71e19eb48a1" + " " + `relative pl-6 pr-5 py-5 border-l-4 ${kenarRengi} bg-[#FBF8EF] dark:bg-[#1C231C] shadow-[2px_2px_0_0_#D9CCA6] dark:shadow-[2px_2px_0_0_#2C3A2A] hover:shadow-[3px_3px_0_0_#D9CCA6] dark:hover:shadow-[3px_3px_0_0_#2C3A2A] hover:-translate-y-[1px] transition-all duration-200 flex flex-col justify-between`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-5140c71e19eb48a1" + " " + "absolute -left-[7px] top-5 w-[9px] h-[9px] rounded-full bg-[#F4EFE1] dark:bg-[#161C16] border border-[#D9CCA6] dark:border-[#2C3A2A]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-5140c71e19eb48a1" + " " + "absolute -left-[7px] bottom-5 w-[9px] h-[9px] rounded-full bg-[#F4EFE1] dark:bg-[#161C16] border border-[#D9CCA6] dark:border-[#2C3A2A]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-5140c71e19eb48a1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-5140c71e19eb48a1" + " " + "flex items-start justify-between gap-3 mb-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-5140c71e19eb48a1" + " " + "font-mono-plex text-[10.5px] font-semibold text-[#8A7A52] dark:text-[#9AAE93] tracking-wide",
                                                                children: [
                                                                    "FİŞ № ",
                                                                    sozlukId
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-5140c71e19eb48a1" + " " + "text-[10.5px] font-mono-plex font-medium text-[#8A7A52] dark:text-[#9AAE93] whitespace-nowrap",
                                                                children: dilCifti
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-5140c71e19eb48a1" + " " + "font-display font-semibold text-[19px] leading-snug text-[#1E2A22] dark:text-[#EDE7D6]",
                                                        children: baslik
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-5140c71e19eb48a1" + " " + "mt-2.5 text-[13px] text-[#4A5647] dark:text-[#C4CFBE] font-body",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-5140c71e19eb48a1" + " " + "text-[#8A7A52] dark:text-[#9AAE93]",
                                                                children: "Yazar / Hazırlayan — "
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-5140c71e19eb48a1" + " " + "font-medium",
                                                                children: yazar
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 21
                                                    }, this),
                                                    (yil || sehirYayin) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-5140c71e19eb48a1" + " " + "mt-1 flex flex-wrap gap-x-4 text-[12px] text-[#8A7A52] dark:text-[#9AAE93] font-mono-plex",
                                                        children: [
                                                            yil && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-5140c71e19eb48a1",
                                                                children: yil
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 33
                                                            }, this),
                                                            sehirYayin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-5140c71e19eb48a1",
                                                                children: sehirYayin
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 40
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-5140c71e19eb48a1" + " " + "mt-4 pt-3 border-t border-dashed border-[#D9CCA6] dark:border-[#2C3A2A] flex items-center justify-between text-[11px] font-mono-plex text-[#9C917A] dark:text-[#6B7A66]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        title: sozluk.file,
                                                        className: "jsx-5140c71e19eb48a1" + " " + "truncate max-w-[190px]",
                                                        children: sozluk.file
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 21
                                                    }, this),
                                                    kayitSayisi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-5140c71e19eb48a1" + " " + "font-semibold text-[#1F4D3A] dark:text-[#C7B36A]",
                                                        children: [
                                                            Number(kayitSayisi).toLocaleString("tr-TR"),
                                                            " madde"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, sozluk.file || idx, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            filtrelenmisManifest.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-5140c71e19eb48a1" + " " + "text-center text-sm text-[#8A7A52] dark:text-[#9AAE93] font-body py-16",
                                children: "Aramanızla eşleşen bir fiş bulunamadı."
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SusBandi, {
                        className: "text-[#9C6B2E] dark:text-[#C7B36A] mb-6"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "jsx-5140c71e19eb48a1" + " " + "text-center text-[11px] font-mono-plex uppercase tracking-wider text-[#9C917A] dark:text-[#6B7A66] pb-4",
                        children: "Çerkesçe Sözlük Platformu — Dijital Korpus Bibliyografyası"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/node_modules/styled-jsx/dist/index/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.r("[project]/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)");
var React = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof process !== "undefined" && process.env && ("TURBOPACK compile-time value", "development") === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = ("TURBOPACK compile-time value", "undefined") !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (("TURBOPACK compile-time value", "undefined") !== "undefined" && this._optimizeForSpeed) //TURBOPACK unreachable
        ;
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if ("TURBOPACK compile-time truthy", 1) {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        //TURBOPACK unreachable
        ;
        var sheet;
        var insertionPoint;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || ("TURBOPACK compile-time value", "undefined") === "undefined") {
            var sheet = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else //TURBOPACK unreachable
        {
            var tag;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if ("TURBOPACK compile-time truthy", 1) {
            this._serverSheet.deleteRule(index);
            return;
        }
        //TURBOPACK unreachable
        ;
        var tag;
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if ("TURBOPACK compile-time truthy", 1) {
            return this._serverSheet.cssRules;
        }
        //TURBOPACK unreachable
        ;
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if ("TURBOPACK compile-time truthy", 1) {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (("TURBOPACK compile-time value", "undefined") !== "undefined" && !this._fromServer) //TURBOPACK unreachable
        ;
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState(function() {
        return rootRegistry || configuredRegistry || createStyleRegistry();
    }), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined;
function JSXStyle(props) {
    var registry = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        registry.add(props);
        return null;
    }
    //TURBOPACK unreachable
    ;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;
}),
"[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/styled-jsx/dist/index/index.js [app-ssr] (ecmascript)").style;
}),
"[project]/src/utils/dictionaries.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "file": "0.Ady-Ady_AIG.json",
        "title": "Adıgece Açıklamalı Sözlük",
        "originalTitle": "Адыгабзэм изэхэф гущы1алъ",
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
];

//# sourceMappingURL=_120wo1-._.js.map