module.exports = [
"[project]/Cerkesce/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/src/hooks/useDictionary.ts [app-ssr] (ecmascript)");
"use client";
;
;
function Home() {
    const { loading, wordsCount, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDictionary"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "20px",
            fontFamily: "sans-serif",
            maxWidth: "800px",
            margin: "0 auto",
            color: "#333"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    borderBottom: "2px solid #e2e8f0",
                    paddingBottom: "15px",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            margin: "0 0 8px 0",
                            color: "#1e293b",
                            fontSize: "28px"
                        },
                        children: "📖 Çerkesçe Sözlük"
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            color: "#64748b",
                            fontSize: "14px"
                        },
                        children: loading ? "Veritabanı hazırlanıyor..." : `Toplam ${wordsCount} kelime yüklendi.`
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#f0f9ff",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    border: "1px solid #bae6fd"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        style: {
                            color: "#0369a1",
                            fontSize: "12px",
                            textTransform: "uppercase"
                        },
                        children: "Günün Kelimesi"
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "bold",
                            margin: "4px 0",
                            color: "#0c4a6e"
                        },
                        children: gununKelimesi.kelime
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#0369a1",
                            fontSize: "14px"
                        },
                        children: gununKelimesi.tanim
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#f8fafc",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Kelime veya anlam ara...",
                        value: searchQuery,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        style: {
                            width: "100%",
                            padding: "12px",
                            fontSize: "16px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "6px",
                            boxSizing: "border-box",
                            marginBottom: "12px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSeciliLehce("TUMU"),
                                style: {
                                    padding: "6px 12px",
                                    background: seciliLehce === "TUMU" ? "#2563eb" : "#e2e8f0",
                                    color: seciliLehce === "TUMU" ? "#fff" : "#334155",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: 500
                                },
                                children: "Tümü"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSeciliLehce("BATI"),
                                style: {
                                    padding: "6px 12px",
                                    background: seciliLehce === "BATI" ? "#2563eb" : "#e2e8f0",
                                    color: seciliLehce === "BATI" ? "#fff" : "#334155",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: 500
                                },
                                children: "Batı (Adıgece)"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSeciliLehce("DOGU"),
                                style: {
                                    padding: "6px 12px",
                                    background: seciliLehce === "DOGU" ? "#2563eb" : "#e2e8f0",
                                    color: seciliLehce === "DOGU" ? "#fff" : "#334155",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: 500
                                },
                                children: "Doğu (Kabardeyce)"
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: seciliDosya,
                                onChange: (e)=>setSeciliDosya(e.target.value),
                                style: {
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    border: "1px solid #cbd5e1",
                                    marginLeft: "auto",
                                    background: "#fff"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "TUMU",
                                        children: [
                                            "Tüm Sözlükler (",
                                            aktifSozlukler.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    aktifSozlukler.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: s.file,
                                            children: s.title
                                        }, s.file, false, {
                                            fileName: "[project]/Cerkesce/app/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b"
                },
                children: "📖 Sözlükler yükleniyor, lütfen bekleyin..."
            }, void 0, false, {
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    background: "#fff"
                },
                children: filtrelenmisSonuclar.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    style: {
                        padding: "20px",
                        textAlign: "center",
                        color: "#94a3b8"
                    },
                    children: "Sonuç bulunamadı."
                }, void 0, false, {
                    fileName: "[project]/Cerkesce/app/page.tsx",
                    lineNumber: 93,
                    columnNumber: 13
                }, this) : filtrelenmisSonuclar.slice(0, 50).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            padding: "12px 16px",
                            borderBottom: "1px solid #f1f5f9"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        style: {
                                            fontSize: "16px",
                                            color: "#0f172a"
                                        },
                                        children: item.kelime
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#64748b",
                                            background: "#f1f5f9",
                                            padding: "2px 6px",
                                            borderRadius: "4px"
                                        },
                                        children: item.kaynak_sozluk || item.file
                                    }, void 0, false, {
                                        fileName: "[project]/Cerkesce/app/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 97,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0 0",
                                    color: "#334155",
                                    fontSize: "14px",
                                    whiteSpace: "pre-line"
                                },
                                children: item.tanim
                            }, void 0, false, {
                                fileName: "[project]/Cerkesce/app/page.tsx",
                                lineNumber: 103,
                                columnNumber: 17
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/Cerkesce/app/page.tsx",
                        lineNumber: 96,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Cerkesce/app/page.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Cerkesce/app/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/Cerkesce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Cerkesce/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/Cerkesce/src/hooks/useDictionary.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDictionary",
    ()=>useDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useDictionary() {
    const [aktifSozlukler, setAktifSozlukler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawWords, setRawWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliLehce, setSeciliLehce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [seciliDosya, setSeciliDosya] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        async function loadData() {
            try {
                // 1. Manifest'i al
                const resManifest = await fetch("/data/dictionaries.json");
                const manifest = await resManifest.json();
                if (!isMounted) return;
                setAktifSozlukler(manifest);
                // 2. Ana sözlükleri yükle
                const tumVeriler = [];
                for (const meta of manifest){
                    try {
                        const res = await fetch(`/data/${meta.file}`);
                        if (!res.ok) continue;
                        const raw = await res.json();
                        const wordsObj = raw.words || raw;
                        if (Array.isArray(wordsObj)) {
                            for (const item of wordsObj){
                                const kelime = item.kelime || item.spelling;
                                const tanim = item.tanim || (Array.isArray(item.definitions) ? item.definitions.join("; ") : "");
                                if (kelime && tanim) {
                                    tumVeriler.push({
                                        kelime,
                                        tanim: String(tanim),
                                        file: meta.file,
                                        kaynak_sozluk: meta.title,
                                        dialect: meta.dialect
                                    });
                                }
                            }
                        } else if (typeof wordsObj === "object" && wordsObj !== null) {
                            for (const [key, val] of Object.entries(wordsObj)){
                                const tanim = typeof val === "string" ? val : val?.tanim || val?.meaning || "";
                                if (tanim) {
                                    tumVeriler.push({
                                        kelime: key,
                                        tanim: String(tanim),
                                        file: meta.file,
                                        kaynak_sozluk: meta.title,
                                        dialect: meta.dialect
                                    });
                                }
                            }
                        }
                    } catch (e) {
                        console.warn(`${meta.file} okunamadı, atlanıyor.`);
                    }
                }
                if (isMounted) {
                    setRawWords(tumVeriler);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Yükleme hatası:", err);
                if (isMounted) setLoading(false);
            }
        }
        loadData();
        return ()=>{
            isMounted = false;
        };
    }, []); // Bağımlılıklar boş: Sadece ilk açılışta 1 kez çalışır!
    const filtrelenmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let veri = rawWords;
        if (seciliLehce !== "TUMU") veri = veri.filter((i)=>i.dialect === seciliLehce);
        if (seciliDosya !== "TUMU") veri = veri.filter((i)=>i.file === seciliDosya);
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            veri = veri.filter((i)=>i.kelime.toLowerCase().includes(q) || i.tanim.toLowerCase().includes(q));
        }
        return veri;
    }, [
        rawWords,
        seciliLehce,
        seciliDosya,
        searchQuery
    ]);
    const gununKelimesi = rawWords.length > 0 ? rawWords[0] : null;
    return {
        wordsCount: rawWords.length,
        loading,
        searchQuery,
        setSearchQuery,
        seciliLehce,
        setSeciliLehce,
        seciliDosya,
        setSeciliDosya,
        gununKelimesi,
        filtrelenmisSonuclar,
        aktifSozlukler
    };
}
}),
];

//# sourceMappingURL=Cerkesce_1pf0cl8._.js.map