(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDictionary.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AkilliKlavye.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/constants/dictionary'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const LIMIT = 20;
function Home() {
    _s();
    const { wordsCount, loading, searchQuery, setSearchQuery, seciliLehce, setSeciliLehce, seciliDosya, setSeciliDosya, gununKelimesi, filtrelenmisSonuclar, aktifSozlukler } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDictionary"])();
    const [mod, setMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("baslayan");
    const [hedefDil, setHedefDil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tumu");
    const [goruntulenenAdet, setGoruntulenenAdet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(LIMIT);
    const [karanlikMod, setKaranlikMod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [metinBoyutu, setMetinBoyutu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(16);
    const [kopyalandiId, setKopyalandiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [duyuruMetni, setDuyuruMetni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliKelimeGrubu, setSeciliKelimeGrubu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawerKapatBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sonOdaklanilanElemanRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ozelKarakterler = [
        "Ӏ",
        "I",
        "а",
        "э",
        "гь",
        "кь"
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const kayitliKaranlik = localStorage.getItem("darkMode");
            if (kayitliKaranlik) {
                setKaranlikMod(JSON.parse(kayitliKaranlik));
            }
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    const kaynagiDuzenle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[kaynagiDuzenle]": (dosyaAdi)=>{
            if (!dosyaAdi) return "";
            return KAYNAK_HARITASI[dosyaAdi] || dosyaAdi;
        }
    }["Home.useCallback[kaynagiDuzenle]"], []);
    const hedefDilBul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[hedefDilBul]": (dosyaAdi)=>{
            if (!dosyaAdi) return "diger";
            const isim = dosyaAdi.toLowerCase();
            if (isim.includes("tur") || isim.includes("tu-")) return "tr";
            if (isim.includes("ara") || isim.includes("-ar")) return "ar";
            if (isim.includes("en") || isim.includes("kbd-en")) return "en";
            if (isim.includes("rus") || isim.includes("ru-")) return "ru";
            return "diger";
        }
    }["Home.useCallback[hedefDilBul]"], []);
    const gruplanmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[gruplanmisSonuclar]": ()=>{
            if (!searchQuery.trim()) return [];
            let sonucHavuzu = filtrelenmisSonuclar || [];
            const q = searchQuery.trim().toLowerCase();
            if (mod === "baslayan") {
                sonucHavuzu = sonucHavuzu.filter({
                    "Home.useMemo[gruplanmisSonuclar]": (item)=>item.kelime?.toLowerCase().startsWith(q)
                }["Home.useMemo[gruplanmisSonuclar]"]);
            } else if (mod === "tam") {
                sonucHavuzu = sonucHavuzu.filter({
                    "Home.useMemo[gruplanmisSonuclar]": (item)=>item.kelime?.toLowerCase() === q
                }["Home.useMemo[gruplanmisSonuclar]"]);
            } else if (mod === "icinde") {
                sonucHavuzu = sonucHavuzu.filter({
                    "Home.useMemo[gruplanmisSonuclar]": (item)=>item.kelime?.toLowerCase().includes(q) || item.tanim?.toLowerCase().includes(q)
                }["Home.useMemo[gruplanmisSonuclar]"]);
            }
            if (hedefDil !== "tumu") {
                sonucHavuzu = sonucHavuzu.filter({
                    "Home.useMemo[gruplanmisSonuclar]": (item)=>{
                        const dosya = item.file || item.kaynak_sozluk || item.kaynak;
                        return hedefDilBul(dosya) === hedefDil;
                    }
                }["Home.useMemo[gruplanmisSonuclar]"]);
            }
            const gruplar = {};
            sonucHavuzu.forEach({
                "Home.useMemo[gruplanmisSonuclar]": (item)=>{
                    const kelimeKey = (item.kelime || "").trim().toLowerCase();
                    if (!kelimeKey) return;
                    if (!gruplar[kelimeKey]) gruplar[kelimeKey] = [];
                    gruplar[kelimeKey].push(item);
                }
            }["Home.useMemo[gruplanmisSonuclar]"]);
            return Object.values(gruplar).map({
                "Home.useMemo[gruplanmisSonuclar]": (kaynaklar)=>({
                        kelime: kaynaklar[0].kelime,
                        dialect: kaynaklar[0].dialect,
                        kaynaklar
                    })
            }["Home.useMemo[gruplanmisSonuclar]"]);
        }
    }["Home.useMemo[gruplanmisSonuclar]"], [
        filtrelenmisSonuclar,
        searchQuery,
        mod,
        hedefDil,
        hedefDilBul
    ]);
    const handleSearchChange = (val)=>{
        setSearchQuery(val);
        setGoruntulenenAdet(LIMIT);
    };
    const harfEkle = (harf)=>{
        handleSearchChange(searchQuery + harf);
        setDuyuruMetni(`${harf} harfi eklendi.`);
        inputRef.current?.focus();
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
    const tema = {
        arkaPlan: karanlikMod ? "#0c0f17" : "#f8fafc",
        kartArkaPlan: karanlikMod ? "#141a29" : "#ffffff",
        yaziAna: karanlikMod ? "#f8fafc" : "#0f172a",
        yaziAlt: karanlikMod ? "#cbd5e1" : "#334155",
        kenarlik: karanlikMod ? "#334155" : "#cbd5e1",
        inputArkaPlan: karanlikMod ? "#1a2236" : "#ffffff"
    };
    const metniVurgula = (metin, aktifTema)=>{
        const parcalar = metin.split(/(-[^\:]+\:|◊)/g);
        return parcalar.map((parca, index)=>{
            if (!parca) return null;
            if (parca === "◊") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: KURUMSAL.kirmizi,
                        margin: "0 4px",
                        fontWeight: "bold"
                    },
                    children: "◊"
                }, index, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 199,
                    columnNumber: 11
                }, this);
            }
            if (parca.startsWith("-") && parca.endsWith(":")) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    style: {
                        color: aktifTema.yaziAna,
                        fontWeight: "700"
                    },
                    children: [
                        parca,
                        " "
                    ]
                }, index, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this);
            }
            return parca;
        });
    };
    const tanimlariBicimlendir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[tanimlariBicimlendir]": (tanimMetni, kelimeBasligiVeyaTema, aktifTema)=>{
            if (!tanimMetni || tanimMetni === "Tanım yok") return null;
            const gecerliBaslik = typeof kelimeBasligiVeyaTema === "string" ? kelimeBasligiVeyaTema : "";
            const gecerliTema = (typeof kelimeBasligiVeyaTema === "object" ? kelimeBasligiVeyaTema : aktifTema) || tema;
            const hamSatirlar = tanimMetni.split(/;|\n/).map({
                "Home.useCallback[tanimlariBicimlendir].hamSatirlar": (item)=>item.trim()
            }["Home.useCallback[tanimlariBicimlendir].hamSatirlar"]).filter(Boolean);
            let kelimeTipi = "";
            const tanimVeOrnekler = [];
            for (const satir of hamSatirlar){
                const temiz = satir.replace(/^(\d+[\.\)]\s*)+/, "").trim();
                if (!temiz) continue;
                if (gecerliBaslik && temiz.toLowerCase() === gecerliBaslik.toLowerCase()) continue;
                if (/^definitions:?$/i.test(temiz)) continue;
                if (/^type:\s*/i.test(temiz)) {
                    const hamTip = temiz.replace(/^type:\s*/i, "").trim().toLowerCase();
                    const turkceTip = TYPE_MAP[hamTip] || hamTip.charAt(0).toUpperCase() + hamTip.slice(1);
                    kelimeTipi = `Tür: ${turkceTip}`;
                    continue;
                }
                const isExample = temiz.includes("—") || temiz.startsWith("—");
                tanimVeOrnekler.push({
                    metin: temiz,
                    isExample
                });
            }
            if (!kelimeTipi && tanimVeOrnekler.length === 0) return null;
            const parantezVeMetinBiçimlendir = {
                "Home.useCallback[tanimlariBicimlendir].parantezVeMetinBiçimlendir": (metin)=>{
                    const parcalar = metin.split(/(\[[^\]]+\])/g);
                    return parcalar.map({
                        "Home.useCallback[tanimlariBicimlendir].parantezVeMetinBiçimlendir": (p, idx)=>{
                            if (p.startsWith("[") && p.endsWith("]")) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: KURUMSAL.kirmizi,
                                        fontWeight: "500",
                                        marginRight: "4px"
                                    },
                                    children: p
                                }, idx, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this);
                            }
                            return metniVurgula(p, gecerliTema);
                        }
                    }["Home.useCallback[tanimlariBicimlendir].parantezVeMetinBiçimlendir"]);
                }
            }["Home.useCallback[tanimlariBicimlendir].parantezVeMetinBiçimlendir"];
            const toplamTanimSayisi = tanimVeOrnekler.filter({
                "Home.useCallback[tanimlariBicimlendir]": (x)=>!x.isExample
            }["Home.useCallback[tanimlariBicimlendir]"]).length;
            let tanimSayaci = 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "left"
                },
                children: [
                    kelimeTipi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: `${metinBoyutu * 0.85}px`,
                            fontStyle: "italic",
                            fontWeight: "500",
                            color: gecerliTema?.yaziAlt,
                            marginBottom: "6px"
                        },
                        children: kelimeTipi
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 278,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        style: {
                            display: "block",
                            fontSize: `${metinBoyutu * 0.9}px`,
                            fontWeight: "bold",
                            color: gecerliTema?.yaziAna,
                            marginBottom: "6px"
                        },
                        children: "Tanımlar:"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px"
                        },
                        children: tanimVeOrnekler.map({
                            "Home.useCallback[tanimlariBicimlendir]": (item, idx)=>{
                                if (!item.isExample) tanimSayaci++;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: `${metinBoyutu * 0.95}px`,
                                        lineHeight: "1.6",
                                        color: gecerliTema?.yaziAna,
                                        paddingLeft: item.isExample ? "20px" : "0px"
                                    },
                                    children: !item.isExample ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "6px",
                                            alignItems: "baseline"
                                        },
                                        children: [
                                            toplamTanimSayisi > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: "bold",
                                                    color: gecerliTema?.yaziAna,
                                                    minWidth: "16px"
                                                },
                                                children: [
                                                    tanimSayaci,
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: parantezVeMetinBiçimlendir(item.metin)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: gecerliTema?.yaziAlt,
                                            fontStyle: "italic",
                                            fontSize: `${metinBoyutu * 0.9}px`
                                        },
                                        children: parantezVeMetinBiçimlendir(item.metin)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 21
                                    }, this)
                                }, idx, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 308,
                                    columnNumber: 17
                                }, this);
                            }
                        }["Home.useCallback[tanimlariBicimlendir]"])
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 276,
                columnNumber: 9
            }, this);
        }
    }["Home.useCallback[tanimlariBicimlendir]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        metinBoyutu,
        tema
    ]);
    const benzerKelimeler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[benzerKelimeler]": ()=>{
            if (!seciliKelimeGrubu || !seciliKelimeGrubu.kelime || !filtrelenmisSonuclar) return [];
            const kok = seciliKelimeGrubu.kelime.slice(0, 3).toLowerCase();
            if (!kok) return [];
            const eslesenler = filtrelenmisSonuclar.filter({
                "Home.useMemo[benzerKelimeler].eslesenler": (w)=>w.kelime?.toLowerCase().startsWith(kok) && w.kelime?.toLowerCase() !== seciliKelimeGrubu.kelime.toLowerCase()
            }["Home.useMemo[benzerKelimeler].eslesenler"]).map({
                "Home.useMemo[benzerKelimeler].eslesenler": (w)=>w.kelime
            }["Home.useMemo[benzerKelimeler].eslesenler"]);
            return Array.from(new Set(eslesenler)).slice(0, 8);
        }
    }["Home.useMemo[benzerKelimeler]"], [
        seciliKelimeGrubu,
        filtrelenmisSonuclar
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui, sans-serif",
                color: "#64748b"
            },
            children: "📖 Sözlük veritabanı yükleniyor..."
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 372,
            columnNumber: 7
        }, this);
    }
    const gosterilenGruplar = gruplanmisSonuclar.slice(0, goruntulenenAdet);
    const dahaFazlaVar = gruplanmisSonuclar.length > goruntulenenAdet;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: tema.arkaPlan,
            minHeight: "100vh",
            padding: "24px 16px",
            transition: "background-color 0.2s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                fileName: "[project]/app/page.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: "840px",
                    margin: "0 auto",
                    fontFamily: "system-ui, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    color: tema.yaziAna,
                                                    margin: 0,
                                                    fontSize: `${metinBoyutu * 1.5}px`
                                                },
                                                children: "📖 Çerkesçe Sözlük"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "center"
                                },
                                role: "toolbar",
                                "aria-label": "Görünüm kontrolleri",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 462,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 483,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: tema.yaziAlt,
                            fontSize: `${metinBoyutu * 0.9}px`,
                            marginBottom: "20px"
                        },
                        children: [
                            "📚 ",
                            aktifSozlukler?.length || 33,
                            " sözlük • 📖",
                            " ",
                            (wordsCount ?? 0).toLocaleString("tr-TR"),
                            "+ kayıt •",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                style: {
                                    color: KURUMSAL.kirmizi
                                },
                                children: "Açık Mektep Dijital Sözlük Ekosistemi"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 522,
                        columnNumber: 9
                    }, this),
                    !searchQuery.trim() && gununKelimesi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setSeciliKelimeGrubu({
                                kelime: gununKelimesi.kelime,
                                dialect: gununKelimesi.dialect,
                                kaynaklar: [
                                    gununKelimesi
                                ]
                            }),
                        style: {
                            padding: "16px 20px",
                            backgroundColor: karanlikMod ? "#1e293b" : "#FFF1F0",
                            borderLeft: `5px solid ${KURUMSAL.kirmizi}`,
                            borderRadius: "8px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                            cursor: "pointer",
                            textAlign: "left"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: KURUMSAL.kirmizi,
                                            fontWeight: "bold",
                                            fontSize: `${metinBoyutu * 0.85}px`,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em"
                                        },
                                        children: "🌟 Günün Kelimesi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 15
                                    }, this),
                                    gununKelimesi.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 548,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: `${metinBoyutu * 1.25}px`,
                                    fontWeight: "bold",
                                    color: tema.yaziAna,
                                    marginTop: "4px"
                                },
                                children: gununKelimesi.kelime
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 576,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: `${metinBoyutu * 0.95}px`,
                                    color: tema.yaziAlt,
                                    marginTop: "4px",
                                    lineHeight: "1.5"
                                },
                                children: gununKelimesi.tanim
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 586,
                                columnNumber: 13
                            }, this),
                            gununKelimesi.kaynak_sozluk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                style: {
                                    color: tema.yaziAlt,
                                    display: "block",
                                    marginTop: "6px",
                                    fontSize: "12px"
                                },
                                children: [
                                    "📚 Kaynak: ",
                                    kaynagiDuzenle(gununKelimesi.kaynak_sozluk)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 529,
                        columnNumber: 11
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
                                children: "Lehçe & Sözlük Seçimi:"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 607,
                                columnNumber: 11
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
                                            border: `2px solid ${seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kenarlik}`,
                                            backgroundColor: seciliLehce === lehce.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                                            color: seciliLehce === lehce.kod ? "#ffffff" : tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: lehce.etiket
                                    }, lehce.kod, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 623,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: seciliDosya,
                                onChange: (e)=>{
                                    setSeciliDosya(e.target.value);
                                    setGoruntulenenAdet(LIMIT);
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 666,
                                        columnNumber: 13
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
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 672,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 649,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 606,
                        columnNumber: 9
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
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 681,
                                columnNumber: 11
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
                                            border: `1px solid ${hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kenarlik}`,
                                            backgroundColor: hedefDil === dil.kod ? KURUMSAL.kirmizi : tema.kartArkaPlan,
                                            color: hedefDil === dil.kod ? "#ffffff" : tema.yaziAna,
                                            cursor: "pointer"
                                        },
                                        children: dil.etiket
                                    }, dil.kod, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 691,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 680,
                        columnNumber: 9
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
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 724,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap"
                                },
                                children: ozelKarakterler.map((harf, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 736,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 734,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 723,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AkilliKlavye$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        inputRef: inputRef,
                        sorgu: searchQuery,
                        setSorgu: handleSearchChange,
                        metinBoyutu: metinBoyutu,
                        karanlikMod: karanlikMod
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 757,
                        columnNumber: 9
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 767,
                                        columnNumber: 13
                                    }, this),
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
                                            outlineColor: KURUMSAL.kirmizi,
                                            boxSizing: "border-box"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 779,
                                        columnNumber: 13
                                    }, this),
                                    searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 766,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 822,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "baslayan",
                                        children: "İle Başlayan"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 848,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "icinde",
                                        children: "İçinde Geçen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 849,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "tam",
                                        children: "Tam Eşleşen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 850,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 834,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 765,
                        columnNumber: 9
                    }, this),
                    searchQuery.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: tema.yaziAlt,
                            fontSize: `${metinBoyutu * 0.9}px`,
                            marginBottom: "16px"
                        },
                        role: "status",
                        children: [
                            "Toplam ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: gruplanmisSonuclar.length
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 863,
                                columnNumber: 20
                            }, this),
                            " kelime grubu bulundu."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 855,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        "aria-label": "Arama Sonuçları",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px"
                            },
                            children: [
                                gosterilenGruplar.map((grup, index)=>{
                                    const ilkKaynak = grup.kaynaklar[0];
                                    const benzersizKey = `grup_${grup.kelime}_${index}`;
                                    const kaynakDosya = ilkKaynak.file || ilkKaynak.kaynak_sozluk || ilkKaynak.kaynak;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        style: {
                                            padding: "20px",
                                            borderRadius: "8px",
                                            backgroundColor: tema.kartArkaPlan,
                                            border: `1px solid ${tema.kenarlik}`,
                                            position: "relative",
                                            textAlign: "left"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    gap: "12px",
                                                    marginBottom: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    margin: 0,
                                                                    color: tema.yaziAna,
                                                                    fontWeight: "bold",
                                                                    fontSize: `${metinBoyutu * 1.3}px`
                                                                },
                                                                children: grup.kelime
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 896,
                                                                columnNumber: 23
                                                            }, this),
                                                            grup.kaynaklar.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                                    fontWeight: "bold",
                                                                    color: "#ffffff",
                                                                    backgroundColor: KURUMSAL.kirmizi,
                                                                    padding: "2px 8px",
                                                                    borderRadius: "10px",
                                                                    display: "inline-block",
                                                                    marginTop: "4px"
                                                                },
                                                                children: [
                                                                    grup.kaynaklar.length,
                                                                    " Farklı Sözlük"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 907,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 895,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            grup.dialect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: `${metinBoyutu * 0.75}px`,
                                                                    fontWeight: "bold",
                                                                    color: grup.dialect === "BATI" ? "#16a34a" : "#2563eb",
                                                                    backgroundColor: grup.dialect === "BATI" ? "#16a34a15" : "#2563eb15",
                                                                    padding: "4px 8px",
                                                                    borderRadius: "12px",
                                                                    border: `1px solid ${grup.dialect === "BATI" ? "#16a34a" : "#2563eb"}`
                                                                },
                                                                children: grup.dialect === "BATI" ? "Batı Adıgece" : "Doğu Kabardeyce"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 933,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>panoyaKopyala(ilkKaynak.kelime, ilkKaynak.tanim, benzersizKey),
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
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 951,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 924,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 886,
                                                columnNumber: 19
                                            }, this),
                                            tanimlariBicimlendir(ilkKaynak.tanim, tema),
                                            kaynakDosya && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    kaynagiDuzenle(kaynakDosya),
                                                    " ",
                                                    ilkKaynak.author ? `— ${ilkKaynak.author}` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 975,
                                                columnNumber: 21
                                            }, this),
                                            grup.kaynaklar.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "14px",
                                                    textAlign: "right"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                    children: [
                                                        "Tüm Kaynakları İncele (",
                                                        grup.kaynaklar.length,
                                                        ") →"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 992,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 991,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, benzersizKey, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 875,
                                        columnNumber: 17
                                    }, this);
                                }),
                                dahaFazlaVar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "center",
                                        marginTop: "20px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setGoruntulenenAdet((prev)=>prev + LIMIT),
                                        style: {
                                            padding: "10px 20px",
                                            borderRadius: "8px",
                                            border: `1px solid ${tema.kenarlik}`,
                                            backgroundColor: tema.kartArkaPlan,
                                            color: tema.yaziAna,
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            fontSize: `${metinBoyutu * 0.9}px`
                                        },
                                        children: [
                                            "Daha Fazla Göster (",
                                            gruplanmisSonuclar.length - goruntulenenAdet,
                                            " kelime kaldı)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1015,
                                    columnNumber: 15
                                }, this),
                                searchQuery.trim() && gruplanmisSonuclar.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "center",
                                        padding: "40px 0",
                                        color: tema.yaziAlt
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: `${metinBoyutu}px`
                                        },
                                        children: "Aradığınız kriterlere uygun kelime bulunamadı."
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 868,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 867,
                        columnNumber: 9
                    }, this),
                    seciliKelimeGrubu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            justifyContent: "flex-end",
                            zIndex: 1000
                        },
                        onClick: ()=>setSeciliKelimeGrubu(null),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: drawerRef,
                            onClick: (e)=>e.stopPropagation(),
                            style: {
                                width: "100%",
                                maxWidth: "520px",
                                height: "100%",
                                backgroundColor: tema.kartArkaPlan,
                                color: tema.yaziAna,
                                padding: "24px",
                                overflowY: "auto",
                                boxShadow: "-4px 0 20px rgba(0,0,0,0.3)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                margin: 0,
                                                fontSize: `${metinBoyutu * 1.4}px`,
                                                color: tema.yaziAna
                                            },
                                            children: seciliKelimeGrubu.kelime
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            ref: drawerKapatBtnRef,
                                            onClick: ()=>setSeciliKelimeGrubu(null),
                                            "aria-label": "Paneli kapat",
                                            style: {
                                                border: "none",
                                                background: "transparent",
                                                fontSize: `${metinBoyutu * 1.3}px`,
                                                color: tema.yaziAna,
                                                cursor: "pointer"
                                            },
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1088,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1076,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: 0,
                                        color: tema.yaziAlt,
                                        fontSize: `${metinBoyutu * 0.85}px`
                                    },
                                    children: [
                                        "Bu kelime toplam",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: seciliKelimeGrubu.kaynaklar.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 17
                                        }, this),
                                        " farklı sözlük kaynağında yer almaktadır."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                    style: {
                                        borderColor: tema.kenarlik,
                                        margin: "4px 0"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px"
                                    },
                                    children: seciliKelimeGrubu.kaynaklar.map((kaynakItem, idx)=>{
                                        const kDosya = kaynakItem.file || kaynakItem.kaynak_sozluk || kaynakItem.kaynak;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: "14px",
                                                borderRadius: "6px",
                                                border: `1px solid ${tema.kenarlik}`,
                                                backgroundColor: tema.inputArkaPlan
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: `${metinBoyutu * 0.8}px`,
                                                        fontWeight: "bold",
                                                        color: KURUMSAL.kirmizi,
                                                        marginBottom: "4px"
                                                    },
                                                    children: [
                                                        "📚 ",
                                                        kaynagiDuzenle(kDosya)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1126,
                                                    columnNumber: 23
                                                }, this),
                                                tanimlariBicimlendir(kaynakItem.tanim, tema)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1117,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1112,
                                    columnNumber: 15
                                }, this),
                                benzerKelimeler.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "16px",
                                        borderTop: `1px solid ${tema.kenarlik}`,
                                        paddingTop: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: `${metinBoyutu * 0.9}px`,
                                                color: tema.yaziAlt,
                                                marginBottom: "8px"
                                            },
                                            children: "Benzer Kelimeler:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1150,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "6px",
                                                flexWrap: "wrap"
                                            },
                                            children: benzerKelimeler.map((bKelime, bIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSeciliKelimeGrubu(null);
                                                        handleSearchChange(bKelime);
                                                    },
                                                    style: {
                                                        padding: "4px 10px",
                                                        borderRadius: "4px",
                                                        border: `1px solid ${tema.kenarlik}`,
                                                        backgroundColor: tema.kartArkaPlan,
                                                        color: tema.yaziAna,
                                                        fontSize: `${metinBoyutu * 0.8}px`,
                                                        cursor: "pointer"
                                                    },
                                                    children: bKelime
                                                }, bIdx, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1161,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1159,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1143,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1059,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1045,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 391,
        columnNumber: 5
    }, this);
}
_s(Home, "XQUHNHoEUXVmyUVWdzX8N01PsXk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDictionary"]
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
    "AkilliKlavye",
    ()=>AkilliKlavye,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CERKESCE_HARFLER = [
    'I',
    'ӏ',
    'Гъ',
    'Дж',
    'Дз',
    'Къ',
    'КӀ',
    'ПӀ',
    'ТӀ',
    'Хь',
    'Хъ',
    'ЦӀ',
    'ШӀ',
    'ЩӀ'
];
const AkilliKlavye = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = function AkilliKlavye({ inputRef, sorgu, setSorgu, metinBoyutu = 16, karanlikMod = false, onKeyClick, onDelete }) {
    const handleHarfEkle = (harf)=>{
        setSorgu((prev)=>prev + harf);
        onKeyClick?.(harf);
        inputRef.current?.focus();
    };
    const handleSil = ()=>{
        setSorgu((prev)=>prev.slice(0, -1));
        onDelete?.();
        inputRef.current?.focus();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "region",
        "aria-label": "Çerkesçe Özel Karakter Klavyesi",
        className: `flex flex-wrap gap-1.5 p-3 rounded-xl border transition-colors ${karanlikMod ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'}`,
        style: {
            fontSize: `${metinBoyutu}px`
        },
        children: [
            CERKESCE_HARFLER.map((harf)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>handleHarfEkle(harf),
                    className: "px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 select-none",
                    children: harf
                }, harf, false, {
                    fileName: "[project]/src/components/AkilliKlavye.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleSil,
                "aria-label": "Son karakteri sil",
                className: "px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-semibold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 select-none ml-auto",
                children: "Sil ⌫"
            }, void 0, false, {
                fileName: "[project]/src/components/AkilliKlavye.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AkilliKlavye.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
});
_c1 = AkilliKlavye;
const __TURBOPACK__default__export__ = AkilliKlavye;
var _c, _c1;
__turbopack_context__.k.register(_c, "AkilliKlavye$memo");
__turbopack_context__.k.register(_c1, "AkilliKlavye");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useDictionary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDictionary",
    ()=>useDictionary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cleanHtml.ts [app-client] (ecmascript)");
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
    if (val?.full_definition_in_html) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temizleHtml"])(val.full_definition_in_html);
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
            const tanim = item?.tanim ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cleanHtml$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temizleHtml"])(item.tanim) : parseTanim(item);
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
    const [aktifSozlukler, setAktifSozlukler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rawWords, setRawWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wordsCount, setWordsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [seciliLehce, setSeciliLehce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [seciliDosya, setSeciliDosya] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TUMU");
    const [gununKelimesi, setGununKelimesi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const cacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const deferredSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchQuery);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
                // 3. İlk 3 sözlüğü hemen yükle
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
    const filtrelenmisSonuclar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
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
    const conceptRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDictionary.useMemo[conceptRows]": ()=>{
            const groups = new Map();
            filtrelenmisSonuclar.forEach({
                "useDictionary.useMemo[conceptRows]": (item)=>{
                    const key = item.normalizedTanim || item.tanim;
                    if (!groups.has(key)) groups.set(key, {});
                    const row = groups.get(key);
                    const lang = getLanguageName(item);
                    row[lang] = item.kelime;
                    if (!row["Türkçe"] && item.tanim) row["Türkçe"] = item.tanim.split(";")[0].trim();
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/cleanHtml.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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

//# sourceMappingURL=_028p6b3._.js.map