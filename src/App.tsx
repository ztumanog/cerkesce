import React, { useState } from 'react';

interface ConceptEntry {
  conceptId: string;
  icon: string;
  universalLabel: string;
  translations: {
    ADY: string;
    KAB: string;
    TR: string;
    EN: string;
    RU: string;
  };
  relatedConcepts: string[];
}

const SAMPLE_CONCEPTS: ConceptEntry[] = [
  {
    conceptId: 'CONCEPT_WATER',
    icon: 'ğŸ’§',
    universalLabel: 'WATER / SU',
    translations: {
      ADY: 'ĞŸÑÑ‹',
      KAB: 'ĞŸÑÑ‹',
      TR: 'Su / Nehir',
      EN: 'Water / River',
      RU: 'Ğ’Ğ¾Ğ´Ğ° / Ğ ĞµĞºĞ°'
    },
    relatedConcepts: ['Nehir (ĞŸÑÑ‹Ñ…ÑŠĞ¾)', 'SÄ±cak Su (ĞŸÑÑ‹Ñ„Ğ°Ğ±Ñ)', 'AteÅŸ (ĞœĞ°Ñ„IÑ)', 'Buz (ĞœÑ‹Ğ»)']
  },
  {
    conceptId: 'CONCEPT_FIRE',
    icon: 'ğŸ”¥',
    universalLabel: 'FIRE / ATEÅ',
    translations: {
      ADY: 'ĞœĞ°Ñ„IÑ',
      KAB: 'ĞœĞ°Ñ„IÑ',
      TR: 'AteÅŸ',
      EN: 'Fire',
      RU: 'ĞĞ³Ğ¾Ğ½ÑŒ'
    },
    relatedConcepts: ['Su (ĞŸÑÑ‹)', 'SÄ±caklÄ±k (Ğ¤Ğ°Ğ±Ñ)', 'Duman (Ğ“ÑŠÑƒĞ°Ğ³ÑŠÑ)']
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedDialect, setSelectedDialect] = useState('ALL');
  const [activeView, setActiveView] = useState<'CONCEPT' | 'GRAPH'>('CONCEPT');
  const [selectedConcept, setSelectedConcept] = useState<ConceptEntry | null>(SAMPLE_CONCEPTS[0]);

  const filteredConcepts = SAMPLE_CONCEPTS.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      !term ||
      c.universalLabel.toLowerCase().includes(term) ||
      c.translations.TR.toLowerCase().includes(term) ||
      c.translations.ADY.toLowerCase().includes(term) ||
      c.translations.KAB.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      
      {/* Platform Ãœst Bar */}
      <header style={{ maxWidth: '800px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#38bdf8' }}>ğŸ›ï¸ Circassian Knowledge Graph</h1>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>UIX 2.0 â€¢ Concept-Centric Discovery Platform</span>
        </div>
        <span style={{ background: '#0369a1', color: '#e0f2fe', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
          v12.0 Enterprise
        </span>
      </header>

      {/* Seviye 1: Minimalist OdaklÄ± Arama Motoru */}
      <div style={{ maxWidth: '800px', margin: '0 auto 20px auto', background: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Kavram, kelime veya anlam ara (Ã–rn: su, Ğ¿ÑÑ‹, fire)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '14px 18px', borderRadius: '12px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '15px' }}
          />
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            style={{ padding: '0 16px', borderRadius: '12px', border: '1px solid #475569', background: showAdvancedFilters ? '#334155' : '#0f172a', color: '#cbd5e1', cursor: 'pointer', fontSize: '13px' }}
          >
            âš™ï¸ Filtreler
          </button>
        </div>

        {/* Seviye 2: AÃ§Ä±lÄ±r GeliÅŸmiÅŸ Filtre Paneli */}
        {showAdvancedFilters && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #334155', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Diyalekt</label>
              <select value={selectedDialect} onChange={(e) => setSelectedDialect(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#0f172a', border: '1px solid #475569', color: '#fff', fontSize: '12px' }}>
                <option value="ALL">TÃ¼m Diyalektler</option>
                <option value="KAB">DoÄŸu (Kabardey)</option>
                <option value="ADY">BatÄ± (AdÄ±ge)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>GÃ¶rÃ¼nÃ¼m Modu</label>
              <button onClick={() => setActiveView(activeView === 'CONCEPT' ? 'GRAPH' : 'CONCEPT')} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#0284c7', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                {activeView === 'CONCEPT' ? 'ğŸŒ AÄŸ GrafiÄŸine GeÃ§' : 'ğŸ—‚ï¸ Kavram KartlarÄ±na GeÃ§'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Concept-Centric Discovery EkranÄ± */}
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        {activeView === 'CONCEPT' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredConcepts.map((concept) => (
              <div key={concept.conceptId} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                {/* Kavram BaÅŸlÄ±ÄŸÄ± */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px' }}>{concept.icon}</span>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9' }}>{concept.universalLabel}</h2>
                    <span style={{ fontSize: '11px', color: '#0284c7', fontFamily: 'monospace' }}>{concept.conceptId}</span>
                  </div>
                </div>

                {/* Ã‡ok Dilli ve Ã‡ok Diyalektli EÅŸleÅŸme IzgarasÄ± */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', background: '#0f172a', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>BatÄ± (AdÄ±ge)</span>
                    <strong style={{ color: '#38bdf8', fontSize: '14px' }}>{concept.translations.ADY}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>DoÄŸu (Kabardey)</span>
                    <strong style={{ color: '#38bdf8', fontSize: '14px' }}>{concept.translations.KAB}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>TÃ¼rkÃ§e</span>
                    <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{concept.translations.TR}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', display: 'block' }}>Ä°ngilizce</span>
                    <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{concept.translations.EN}</span>
                  </div>
                </div>

                {/* Ä°lgili BaÄŸlantÄ±lÄ± Kavramlar */}
                <div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Ä°liÅŸkili Kavram AÄŸÄ±:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {concept.relatedConcepts.map((rel, idx) => (
                      <span key={idx} style={{ background: '#334155', color: '#e2e8f0', padding: '4px 10px', borderRadius: '16px', fontSize: '12px' }}>
                        â€¢ {rel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* WebGL Graph Canvas SimÃ¼lasyonu */
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', minHeight: '400px', border: '1px solid #334155', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: '#38bdf8' }}>ğŸŒ Concept Graph Visualization (Cytoscape / WebGL)</h3>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Semantik kavram baÄŸÄ± gÃ¶rÃ¼nÃ¼mÃ¼ aktif. DÃ¼ÄŸÃ¼mler arasÄ± iliÅŸki aÄŸÄ±rlÄ±klarÄ± render ediliyor.</p>
            <div style={{ height: '250px', background: '#0f172a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #475569' }}>
              <span style={{ color: '#38bdf8', fontSize: '14px' }}>[ Interactive WebGL Graph Canvas Loaded ]</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
