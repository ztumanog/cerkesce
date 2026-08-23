(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SozlukEkrani$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SozlukEkrani.tsx [app-client] (ecmascript)");
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SozlukEkrani$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
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
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/src/components/SozlukEkrani.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
                        const itemToLang = (i.toLang || "").toLowerCase();
                        return itemToLang === targetLang || itemToLang.startsWith(targetLang);
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
]);

//# sourceMappingURL=_1xoelnr._.js.map