(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Cerkesce/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/src/hooks/useDictionary.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Home() {
    _s();
    const { loading, wordsCount, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDictionary"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "20px",
            fontFamily: "sans-serif",
            maxWidth: "800px",
            margin: "0 auto",
            color: "#333"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    borderBottom: "2px solid #e2e8f0",
                    paddingBottom: "15px",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#f0f9ff",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    border: "1px solid #bae6fd"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#f8fafc",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                                    aktifSozlukler.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    background: "#fff"
                },
                children: filtrelenmisSonuclar.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
                }, this) : filtrelenmisSonuclar.slice(0, 50).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            padding: "12px 16px",
                            borderBottom: "1px solid #f1f5f9"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(Home, "46hUY5iPRAGY7eKjypU306CEiYo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDictionary"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Cerkesce/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Cerkesce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Cerkesce/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Cerkesce/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/Cerkesce/src/hooks/useDictionary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDictionary",
    ()=>useDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cerkesce/src/utils/cleanHtml.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    if (val?.full_definition_in_html) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temizleHtml"])(val.full_definition_in_html);
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
            const tanim = item?.tanim ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temizleHtml"])(item.tanim) : parseTanim(item);
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
    _s();
    const [aktifSozlukler, setAktifSozlukler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawWords, setRawWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wordsCount, setWordsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliLehce, setSeciliLehce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [seciliDosya, setSeciliDosya] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [gununKelimesi, setGununKelimesi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const cacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const deferredSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchQuery);
    const loadOne = async (meta)=>{
        if (cacheRef.current[meta.file]) return cacheRef.current[meta.file];
        const res = await fetch(`/data/${meta.file}`);
        if (!res.ok) throw new Error(`${meta.file} 404`);
        const raw = await res.json();
        const result = parseDictionaryData(raw, meta);
        cacheRef.current[meta.file] = result;
        return result;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDictionary.useEffect": ()=>{
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
                // 3. İlk 3 sözlüğü hemen yükle → ekran açılsın
                const ilkGrup = hedef.slice(0, 3);
                const kalanGrup = hedef.slice(3);
                let ilkKelimeler = [];
                const ilkSonuclar = await Promise.allSettled(ilkGrup.map(loadOne));
                ilkSonuclar.forEach({
                    "useDictionary.useEffect.init": (r)=>{
                        if (r.status === "fulfilled") ilkKelimeler.push(...r.value);
                    }
                }["useDictionary.useEffect.init"]);
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
                    sonuclar.forEach({
                        "useDictionary.useEffect.init": (r)=>{
                            if (r.status === "fulfilled") yeni.push(...r.value);
                        }
                    }["useDictionary.useEffect.init"]);
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
            return ({
                "useDictionary.useEffect": ()=>{
                    isMounted = false;
                }
            })["useDictionary.useEffect"];
        }
    }["useDictionary.useEffect"], [
        seciliDosya,
        seciliLehce
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDictionary.useEffect": ()=>{
            if (rawWords.length === 0) return;
            const today = new Date().toISOString().slice(0, 10);
            const idx = hashString(today) % rawWords.length;
            setGununKelimesi(rawWords[idx]);
        }
    }["useDictionary.useEffect"], [
        rawWords
    ]);
    const filtrelenmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDictionary.useMemo[filtrelenmisSonuclar]": ()=>{
            let veri = rawWords;
            if (seciliLehce !== "TUMU") veri = veri.filter({
                "useDictionary.useMemo[filtrelenmisSonuclar]": (i)=>i.dialect === seciliLehce
            }["useDictionary.useMemo[filtrelenmisSonuclar]"]);
            if (seciliDosya !== "TUMU") veri = veri.filter({
                "useDictionary.useMemo[filtrelenmisSonuclar]": (i)=>i.file === seciliDosya
            }["useDictionary.useMemo[filtrelenmisSonuclar]"]);
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
        deferredSearch
    ]);
    const conceptRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDictionary.useMemo[conceptRows]": ()=>{
            const groups = new Map();
            filtrelenmisSonuclar.forEach({
                "useDictionary.useMemo[conceptRows]": (item)=>{
                    const key = item.normalizedTanim || item.tanim;
                    if (!groups.has(key)) groups.set(key, {});
                    const row = groups.get(key);
                    const lang = getLanguageName(item);
                    row[lang] = item.kelime;
                    if (!row["Türkçe"]) row["Türkçe"] = item.tanim.split(";")[0].trim();
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
        gununKelimesi,
        filtrelenmisSonuclar,
        conceptRows,
        aktifSozlukler
    };
}
_s(useDictionary, "t/D15r1M2RLu1VaJazoqGMCOon0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Cerkesce$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Cerkesce/src/utils/cleanHtml.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
]);

//# sourceMappingURL=Cerkesce_0pu3a3g._.js.map