"""
C-9.5 — Aile bazli lexeme genisletme
=====================================
20 zayif aile icin +61 lexeme hedefi.

Her lexeme icin:
- Adyghe formu
- Kabardey formu
- Anlam (TR/EN)
- Root eslestirme
- Corpus frekansi (varsa)
"""

FAMILY_EXPANSIONS = {
    "WF-NE": [
        {"ady": "нэшхъэй", "kbd": "нэшхъей", "tr": "goz bebegi", "root": "R-NE"},
        {"ady": "нэф",     "kbd": "нэф",     "tr": "isik",       "root": "R-NE"},
        {"ady": "нэпцӀ",   "kbd": "нэпцӏ",   "tr": "gorunus",    "root": "R-NE"},
    ],
    "WF-GU": [
        {"ady": "гущыӀэ",  "kbd": "гущӏэ",   "tr": "soz",        "root": "R-GU"},
        {"ady": "гукӀэгъу", "kbd": "гукӏэгъу", "tr": "gonul bagi", "root": "R-GU"},
        {"ady": "гуфӀэ",   "kbd": "гуфӏэ",   "tr": "sevgi",      "root": "R-GU"},
    ],
    "WF-1E": [
        {"ady": "Ӏэпэ",    "kbd": "ӏэпэ",    "tr": "parmak",     "root": "R-1E"},
        {"ady": "Ӏэгу",    "kbd": "ӏэгу",    "tr": "avuc",       "root": "R-1E"},
    ],
    # ...
}