import sqlite3

def fts5_kurulum():
    conn = sqlite3.connect("sozluk.db")
    cur = conn.cursor()

    # FTS5 tablosu oluştur
    cur.execute("""
    CREATE VIRTUAL TABLE IF NOT EXISTS sozluk_index
    USING fts5(kelime, tanim, content='sozluk');
    """)

    # Eski indeksleri temizle
    cur.execute("DELETE FROM sozluk_index;")

    # Asıl sözlük tablosundan verileri indeksle
    cur.execute("""
    INSERT INTO sozluk_index (rowid, kelime, tanim)
    SELECT rowid, kelime, tanim FROM sozluk;
    """)

    conn.commit()
    conn.close()
    print("FTS5 indeksi hazırlandı.")

if __name__ == "__main__":
    fts5_kurulum()
