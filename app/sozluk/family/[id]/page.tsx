'use client';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 50;

export default function FamilyDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [lexemes, setLexemes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Kürasyon Seçim Durumu
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [targetFamilyInput, setTargetFamilyInput] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchLexemes = () => {
    setLoading(true);
    fetch('/data/linguistic/lexemes.json')
      .then((r) => r.json())
      .then((raw) => {
        const lex = Array.isArray(raw) ? raw : raw.lexemes ?? [];
        const filt = lex.filter((l: any) => l.wordFamilyId === id);
        setLexemes(filt);
      })
      .catch((err) => console.error('Lexeme yükleme hatası:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLexemes();
    setSelectedIds([]);
  }, [id]);

  // Arama filtresi
  const filteredLexemes = useMemo(() => {
    if (!searchQuery.trim()) return lexemes;
    const q = searchQuery.toLowerCase().trim();
    return lexemes.filter((m: any) => {
      const form = (m.form || m.text || '').toLowerCase();
      const tr = (m.translations?.tr || '').toLowerCase();
      const lexId = (m.id || '').toLowerCase();
      return form.includes(q) || tr.includes(q) || lexId.includes(q);
    });
  }, [lexemes, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredLexemes.length / ITEMS_PER_PAGE) || 1;
  const paginatedLexemes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLexemes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLexemes, currentPage]);

  // Seçim Yöneticisi
  const toggleSelectAllPage = () => {
    const pageIds = paginatedLexemes.map((l) => l.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectOne = (lexId: string) => {
    setSelectedIds((prev) =>
      prev.includes(lexId) ? prev.filter((i) => i !== lexId) : [...prev, lexId]
    );
  };

  // Toplu Aileye Taşıma
  const handleBatchAssign = async () => {
    if (!targetFamilyInput.trim()) {
      alert('Lütfen hedef Aile ID (ör. WF-NESYN, WF-DELHYN) girin.');
      return;
    }
    if (selectedIds.length === 0) {
      alert('Lütfen taşınacak en az 1 kelime seçin.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/curation/batch-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lexemeIds: selectedIds,
          targetFamilyId: targetFamilyInput.trim().toUpperCase(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification(data.message);
        setSelectedIds([]);
        setTargetFamilyInput('');
        fetchLexemes();
      } else {
        alert(`Hata: ${data.error || 'İşlem başarısız'}`);
      }
    } catch (err: any) {
      alert(`Sunucu Bağlantı Hatası: ${err.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const isUnclearFamily = id === 'WF-UNCLEAR';

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* Üst Navigasyon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          ← Geri
        </button>
        <span style={{ fontSize: '12px', color: '#64748b' }}>Kaynak: lexemes.json</span>
      </div>

      {/* Başlık ve Durum */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0, color: '#0f172a' }}>{id}</h1>
        <span style={{ fontSize: '15px', color: '#64748b', fontWeight: '500' }}>
          · Toplam {lexemes.length.toLocaleString('tr-TR')} lexeme
        </span>
      </div>

      {/* Bildirim Paneli */}
      {notification && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px 16px',
            background: '#dcfce7',
            color: '#15803d',
            borderRadius: '10px',
            fontWeight: '600',
            border: '1px solid #bbf7d0',
          }}
        >
          ✓ {notification}
        </div>
      )}

      {/* Toplu Kürasyon Modülü Barı */}
      <div
        style={{
          marginTop: '16px',
          padding: '14px 18px',
          background: selectedIds.length > 0 ? '#eff6ff' : '#f8fafc',
          borderRadius: '12px',
          border: selectedIds.length > 0 ? '1.5px solid #3b82f6' : '1px solid #e2e8f0',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
          transition: 'all 0.2s ease',
        }}
      >
        <button
          onClick={toggleSelectAllPage}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          {paginatedLexemes.every((l) => selectedIds.includes(l.id)) ? 'Sayfa Seçimini Kaldır' : 'Sayfayı Tümünü Seç'}
        </button>

        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e40af' }}>
          Seçilen: {selectedIds.length} kelime
        </span>

        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', flex: '1', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Hedef Aile ID (Ör: WF-NESYN)..."
            value={targetFamilyInput}
            onChange={(e) => setTargetFamilyInput(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleBatchAssign}
            disabled={saving || selectedIds.length === 0}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: saving || selectedIds.length === 0 ? '#94a3b8' : '#2563eb',
              color: '#ffffff',
              cursor: saving || selectedIds.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '13px',
            }}
          >
            {saving ? 'Aktarılıyor...' : 'Taşı'}
          </button>
        </div>
      </div>

      {/* Arama Çubuğu */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Kelime, Türkçe karşılık veya ID ile ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Kelime Listesi */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {paginatedLexemes.map((m: any) => {
          const isSelected = selectedIds.includes(m.id);
          const hasConcept = !!m.conceptId;
          return (
            <div
              key={m.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1.2fr 1fr 1fr 0.8fr 70px',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: isSelected ? '#dbeafe' : hasConcept ? '#f0fdf4' : '#fffbe5',
                borderLeft: `6px solid ${isSelected ? '#2563eb' : hasConcept ? '#22c55e' : '#facc15'}`,
                borderTop: '1px solid #e2e8f0',
                borderRight: '1px solid #e2e8f0',
                borderBottom: '1px solid #e2e8f0',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectOne(m.id)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '15px' }}>{m.form || m.text}</span>
              <span style={{ color: '#334155', fontSize: '14px' }}>{m.translations?.tr || ''}</span>
              <span style={{ fontSize: '12px', color: hasConcept ? '#15803d' : '#854d0e' }}>
                {m.conceptId || 'Kavramsız'}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>{m.id}</span>
              <button
                onClick={() => router.push(`/admin/curation/${m.id}`)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                Düzenle
              </button>
            </div>
          );
        })}
      </div>

      {/* Sayfalama Kontrolleri */}
      {!loading && totalPages > 1 && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: currentPage === 1 ? '#f1f5f9' : '#ffffff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Önceki
          </button>
          <span style={{ fontSize: '13px' }}>
            Sayfa <strong>{currentPage}</strong> / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: currentPage === totalPages ? '#f1f5f9' : '#ffffff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            Sonraki →
          </button>
        </div>
      )}
    </div>
  );
}