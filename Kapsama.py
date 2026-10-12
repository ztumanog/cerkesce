"""
L-KBD kayıtları için Türkçe karşılık ADAYLARI üretir (LLM kullanmaz).

Kullanım: proje köküne (E:\\projeler\\Cerkesce) koy ve çalıştır:
    python kapsama.py

Üretilen dosyalar (lexemes.json'a DOKUNULMAZ):
    lexemes.tr-candidates.json   makine okuyabilir adaylar
    tr-adaylar-inceleme.csv      Excel'de incelemek için (onay sütunu boş)
    kapsama_out.txt              rapor

Kaynaklar ve güven düzeyi:
    21 Kbd-Tu Jonty   doğrudan, doğu lehçesi            → yüksek
    26 Tu-Kbd Jonty   ters (anlam→madde başı), doğu     → orta
    8  Ady-Tur Huvaj  doğrudan, BATI lehçesi            → düşük
    28/29/31 Tur-Ady  ters, BATI lehçesi                → düşük
"""
import csv
import json
import random
import re
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent
if not (BASE / "public" / "data").exists():
    BASE = Path.cwd()
VERI = BASE / "public" / "data"
if not VERI.exists():
    print("HATA: public/data bulunamadı. Betiği proje köküne koy.")
    sys.exit(1)

KIRIL = re.compile(r"[\u0400-\u04FF]")
LATIN = re.compile(r"[A-Za-zÇĞİıÖŞÜçğöşü]")
PALOCHKA_VARYANT = {"\u04c0", "\u04cf", "I", "l", "1", "|"}

rapor = []


def yaz(*a):
    s = " ".join(str(x) for x in a)
    rapor.append(s)
    print(s)


def norm(s):
    """Palochka yazım farklarını ve büyük/küçük harfi eşitler (yalnızca Kiril içerenlerde)."""
    s = (s or "").strip()
    if KIRIL.search(s):
        s = "".join("\u04cf" if ch in PALOCHKA_VARYANT else ch for ch in s)
    return s.lower()


def tr_kucuk(s):
    """Türkçe küçük harf: İ→i, I→ı."""
    return s.replace("İ", "i").replace("I", "ı").lower()


def html_temizle(h):
    h = re.sub(r"&lt;&lt;.*?&gt;&gt;", " ", h or "")
    h = re.sub(r"&lt;.*?&gt;", " ", h)
    h = re.sub(r"<[^>]+>", " ", h)
    h = h.replace("&nbsp;", " ").replace("&amp;", "&")
    return re.sub(r"\s+", " ", h).strip()


def kiril_tokenlar(metin):
    """Metni virgül/noktalı virgül/eğik çizgi/numaralara göre bölüp kısa Kiril parçalarını döndürür."""
    metin = re.sub(r"\([^)]*\)", " ", metin or "")
    parcalar = re.split(r"[,;/\n\t|]|\d+\)|\d+\.", metin)
    cikti = []
    for p in parcalar:
        p = re.sub(r"\s+", " ", p).strip(" .:-–—")
        if not p or not KIRIL.search(p) or LATIN.search(p):
            continue
        if len(p) > 40 or len(p.split()) > 3:
            continue
        cikti.append(p)
    return cikti


def madde_basi_varyantlari(spelling):
    """'зэрыхъу(р) / зэрэхъурэр /' → ['зэрыхъу', 'зэрыхъур', 'зэрэхъурэр']"""
    varyantlar = []
    for parca in re.split(r"[/,]", spelling or ""):
        parca = parca.strip()
        if not parca:
            continue
        m = re.search(r"\(([^)]*)\)", parca)
        if m:
            varyantlar.append(re.sub(r"\([^)]*\)", "", parca).strip())
            varyantlar.append(re.sub(r"[()]", "", parca).strip())
        else:
            varyantlar.append(parca)
    return [v for v in dict.fromkeys(varyantlar) if v]


def yukle(ad):
    yol = VERI / ad
    if not yol.exists():
        yaz(f"  UYARI: {ad} yok")
        return {}
    d = json.load(open(yol, encoding="utf-8"))
    return d.get("words", {}) if isinstance(d, dict) else {}


# ---------------------------------------------------------------
# Adayları topla:  norm(form) -> { türkçe: {kaynak: set(), yontem: set()} }
# ---------------------------------------------------------------
adaylar = {}  # norm(kabardeyce form) -> {tr: {"kaynaklar": set, "guven": str}}

SIRA = {"yuksek": 3, "orta": 2, "dusuk": 1}


def ekle(kbd_form, tr, kaynak, guven):
    tr = re.sub(r"\s+", " ", tr or "").strip(" .;,")
    if not tr or not LATIN.search(tr) or KIRIL.search(tr) or len(tr) > 60:
        return
    anahtar = norm(kbd_form)
    if not anahtar:
        return
    kayit = adaylar.setdefault(anahtar, {}).setdefault(tr, {"kaynaklar": set(), "guven": guven})
    kayit["kaynaklar"].add(kaynak)
    if SIRA[guven] > SIRA[kayit["guven"]]:
        kayit["guven"] = guven


def kaynak_21():
    ad = "21.Kbd-Tu-Jonty.json"
    for k, r in yukle(ad).items():
        for d in r.get("definitions", []) or []:
            ekle(r.get("spelling") or k, tr_kucuk(str(d.get("meaning", ""))), "Jonty Kbd-Tu (21)", "yuksek")


def kaynak_8():
    ad = "8.Ady-Tur_Huvaj.json"
    for k, r in yukle(ad).items():
        html = r.get("full_definition_in_html") or ""
        # Türkçe karşılık: sınıfsız <i>…</i>, Latin harfli
        turkce = [
            m.strip() for m in re.findall(r"<i>([^<]+)</i>", html)
            if LATIN.search(m) and not KIRIL.search(m)
        ]
        if not turkce:
            continue
        for ver in madde_basi_varyantlari(r.get("spelling") or k) + ([k] if k else []):
            for t in turkce:
                ekle(ver, tr_kucuk(t), "Huvaj Ady-Tur (8)", "dusuk")


def ters(ad, etiket, guven, alan="html"):
    for k, r in yukle(ad).items():
        tr_madde = (r.get("spelling") or k or "").strip()
        if not tr_madde or tr_madde.startswith("-") or not LATIN.search(tr_madde):
            continue
        metinler = []
        for d in r.get("definitions", []) or []:
            metinler.append(str(d.get("meaning", "")))
        if not metinler and r.get("full_definition_in_html"):
            metinler.append(html_temizle(r["full_definition_in_html"]))
        for m in metinler:
            for tok in kiril_tokenlar(m):
                ekle(tok, tr_kucuk(tr_madde), etiket, guven)


yaz("Kaynaklar okunuyor…")
kaynak_21()
kaynak_8()
ters("26.Tu-Kbd-Jonty.json", "Jonty Tu-Kbd ters (26)", "orta")
ters("28.Tur-Ady_Huvaj.json", "Huvaj Tur-Ady ters (28)", "dusuk")
ters("29.Tur-Ady_Teshu.json", "Teshu Tur-Ady ters (29)", "dusuk")
ters("31.Tu-Ady_Hilmi.json", "Hilmi Tu-Ady ters (31)", "dusuk")

# ---------------------------------------------------------------
# L-KBD kayıtlarıyla eşleştir
# ---------------------------------------------------------------
lex = json.load(open(VERI / "linguistic" / "lexemes.json", encoding="utf-8"))
kbd = [l for l in lex if str(l.get("id", "")).startswith("L-KBD-")]
yaz(f"L-KBD kayıt: {len(kbd)}")

sonuc = {}
for l in kbd:
    a = adaylar.get(norm(l.get("form", "")))
    if not a:
        continue
    liste = [
        {"tr": tr, "kaynaklar": sorted(v["kaynaklar"]), "guven": v["guven"]}
        for tr, v in a.items()
    ]
    liste.sort(key=lambda x: (-SIRA[x["guven"]], -len(x["kaynaklar"]), x["tr"]))
    sonuc[l["id"]] = {"form": l["form"], "adaylar": liste[:6]}

toplam = len(kbd)


def oran(n):
    return f"{n} / {toplam} (%{100 * n / max(1, toplam):.1f})"


en_iyi = {"yuksek": 0, "orta": 0, "dusuk": 0}
for v in sonuc.values():
    en_iyi[v["adaylar"][0]["guven"]] += 1

yaz("=" * 60)
yaz("KAPSAMA (en az bir Türkçe aday bulunan L-KBD kaydı)")
yaz("  Toplam            :", oran(len(sonuc)))
yaz("  En iyi aday yüksek:", oran(en_iyi["yuksek"]), " (Jonty Kbd-Tu, doğu lehçesi)")
yaz("  En iyi aday orta  :", oran(en_iyi["orta"]), " (Jonty Tu-Kbd ters)")
yaz("  En iyi aday düşük :", oran(en_iyi["dusuk"]), " (Batı Adigecesi kaynaklı, lehçe riski)")

bulunmayan = [l for l in kbd if l["id"] not in sonuc]
random.seed(1)
yaz("=" * 60)
yaz("ADAYI OLMAYAN 15 RASTGELE FORM:")
for l in random.sample(bulunmayan, min(15, len(bulunmayan))):
    yaz("  ", l["id"], l["form"])

# ---------------------------------------------------------------
# Çıktılar
# ---------------------------------------------------------------
(BASE / "lexemes.tr-candidates.json").write_text(
    json.dumps(
        {"meta": {"toplam_lkbd": toplam, "adayli": len(sonuc),
                  "not": "Doğrulanmamış adaylar. lexemes.json'a ancak inceleme sonrası işlenmeli."},
         "adaylar": sonuc},
        ensure_ascii=False, indent=1),
    encoding="utf-8")

with open(BASE / "tr-adaylar-inceleme.csv", "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f)
    w.writerow(["id", "form", "aday_tr", "guven", "kaynaklar", "onay_tr (sen doldur)"])
    for lid, v in sonuc.items():
        trler = " | ".join(a["tr"] for a in v["adaylar"])
        kaynaklar = " ; ".join(sorted({k for a in v["adaylar"] for k in a["kaynaklar"]}))
        w.writerow([lid, v["form"], trler, v["adaylar"][0]["guven"], kaynaklar, ""])

(BASE / "kapsama_out.txt").write_text("\n".join(rapor), encoding="utf-8")
print(f"\nYazıldı: {BASE / 'lexemes.tr-candidates.json'}", file=sys.stderr)
print(f"Yazıldı: {BASE / 'tr-adaylar-inceleme.csv'}", file=sys.stderr)