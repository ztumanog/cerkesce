"""
Türkçe sözlük dosyalarını inceler ve L-KBD kayıtları için kapsamayı ölçer.

Kullanım: bu dosyayı proje köküne (E:\\projeler\\Cerkesce) koy ve çalıştır:
    python peek.py
Thonny'den de çalışır; proje kökünü dosyanın kendi konumundan bulur.
Çıktı peek_out.txt dosyasına da yazılır.
"""
import json
import re
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent
if not (BASE / "public" / "data").exists():
    BASE = Path.cwd()
VERI = BASE / "public" / "data"
if not VERI.exists():
    print("HATA: public/data bulunamadı. peek.py'yi proje köküne koy.")
    sys.exit(1)

YAPI_DOSYALARI = [
    "21.Kbd-Tu-Jonty.json",
    "26.Tu-Kbd-Jonty.json",
    "8.Ady-Tur_Huvaj.json",
    "28.Tur-Ady_Huvaj.json",
    "29.Tur-Ady_Teshu.json",
    "31.Tu-Ady_Hilmi.json",
]
# Madde başı Kabardeyce/Adigece olan (doğrudan aranabilir) sözlükler
DOGRUDAN = ["21.Kbd-Tu-Jonty.json", "8.Ady-Tur_Huvaj.json"]
KIRP = 600

satirlar = []


def yaz(*a):
    s = " ".join(str(x) for x in a)
    satirlar.append(s)
    print(s)


def kisalt(obj):
    s = json.dumps(obj, ensure_ascii=False)
    return s if len(s) <= KIRP else s[:KIRP] + " …"


KIRIL = re.compile(r"[\u0400-\u04FF]")
PALOCHKA_VARYANT = {"\u04c0", "\u04cf", "I", "l", "1", "|"}


def norm(s):
    """Palochka yazım farklarını ve büyük/küçük harfi eşitler."""
    s = (s or "").strip()
    if KIRIL.search(s):
        s = "".join("\u04cf" if ch in PALOCHKA_VARYANT else ch for ch in s)
    return s.lower()


def kapsayici(d):
    """Dosyanın ana kayıt kapsayıcısını (anahtar, kayıt) çiftleri olarak döndürür."""
    if isinstance(d, list):
        return [(None, r) for r in d]
    if isinstance(d, dict):
        if isinstance(d.get("words"), dict):
            return list(d["words"].items())
        for v in d.values():
            if isinstance(v, dict) and len(v) > 50:
                return list(v.items())
            if isinstance(v, list) and len(v) > 50:
                return [(None, r) for r in v]
    return []


def yukle(ad):
    yol = VERI / ad
    if not yol.exists():
        return None
    try:
        return json.load(open(yol, encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        yaz("  okunamadı:", ad, e)
        return None


def yapi(ad):
    yaz("=" * 70)
    yaz(ad)
    d = yukle(ad)
    if d is None:
        yaz("  (dosya yok ya da okunamadı)")
        return
    yaz("  tür:", type(d).__name__,
        "| üst anahtarlar:" if isinstance(d, dict) else "",
        list(d.keys())[:12] if isinstance(d, dict) else "")
    kayit = kapsayici(d)
    yaz("  kayıt sayısı:", len(kayit))
    for k, r in kayit[:2]:
        yaz("  örnek:", k, "→", kisalt(r))


for ad in YAPI_DOSYALARI:
    yapi(ad)

# ---- Kapsama ölçümü ----
yaz("=" * 70)
yaz("KAPSAMA (palochka normalleştirmeli)")
lex = json.load(open(VERI / "linguistic" / "lexemes.json", encoding="utf-8"))
kbd = [l for l in lex if str(l.get("id", "")).startswith("L-KBD-")]
formlar = {norm(l.get("form", "")): l.get("form", "") for l in kbd}
yaz(f"  L-KBD kayıt: {len(kbd)}, normalleştirilmiş farklı form: {len(formlar)}")

bulunan_tum = set()
for ad in DOGRUDAN:
    d = yukle(ad)
    if d is None:
        yaz(f"  {ad}: dosya yok")
        continue
    madde_basi = set()
    for k, r in kapsayici(d):
        if k:
            madde_basi.add(norm(str(k)))
        if isinstance(r, dict):
            for alan in ("spelling", "word", "kelime", "headword", "lemma"):
                if r.get(alan):
                    madde_basi.add(norm(str(r[alan])))
    esles = set(formlar) & madde_basi
    bulunan_tum |= esles
    yaz(f"  {ad}: {len(esles)} / {len(formlar)} "
        f"(%{100 * len(esles) / max(1, len(formlar)):.1f}), madde başı sayısı: {len(madde_basi)}")

yaz(f"  İki sözlüğün birleşimi: {len(bulunan_tum)} / {len(formlar)} "
    f"(%{100 * len(bulunan_tum) / max(1, len(formlar)):.1f})")

bulunmayan = [v for n, v in formlar.items() if n not in bulunan_tum][:12]
yaz("  Eşleşmeyen örnek formlar:", bulunmayan)

# ---- dictionaries.json ----
yaz("=" * 70)
yaz("dictionaries.json (ilk 1500 karakter)")
dj = VERI / "dictionaries.json"
yaz(dj.read_text(encoding="utf-8")[:1500] if dj.exists() else "  (dosya yok)")

(BASE / "peek_out.txt").write_text("\n".join(satirlar), encoding="utf-8")
print(f"\nKaydedildi: {BASE / 'peek_out.txt'}", file=sys.stderr)