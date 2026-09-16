import React, { useState } from 'react';
import { ChevronDown, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function ADRDashboard() {
  const [expandedADR, setExpandedADR] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  const adrData = [
    {
      id: 'ADR-0001',
      title: 'Sprint B Stabilizasyon Yol Haritası',
      status: 'IN_PROGRESS',
      start: '13 Eyl',
      end: '27 Eyl',
      owner: 'Geliştirici Ekibi',
      dependencies: [],
      risks: 'Zaman basıncı',
      description: 'Sprint B\'nin temel hedefleri: 34 sözlük, 428K+ kayıt, Production Certified',
      progress: 20
    },
    {
      id: 'ADR-0002',
      title: 'Sözlük Tip Sistemi Standardizasyonu',
      status: 'ACCEPTED',
      start: '13 Eyl',
      end: '17 Eyl',
      owner: 'TypeScript Ekibi',
      dependencies: ['ADR-0001'],
      risks: 'Refactor süresi',
      description: 'TypeScript tip güvenliği: 0 hata hedefi',
      progress: 0
    },
    {
      id: 'ADR-0003',
      title: 'Veri Normalizasyon Pipeline\'ı',
      status: 'ACCEPTED',
      start: '13 Eyl',
      end: '20 Eyl',
      owner: 'Veri Ekibi',
      dependencies: ['ADR-0002'],
      risks: 'Veri kaybı',
      description: '[object Object] hatası çözülecek, veri tutarlılığı sağlanacak',
      progress: 0
    },
    {
      id: 'ADR-0004',
      title: 'useDictionary Hook Stabilizasyonu',
      status: 'ACCEPTED',
      start: '17 Eyl',
      end: '21 Eyl',
      owner: 'Frontend Ekibi',
      dependencies: ['ADR-0002', 'ADR-0003'],
      risks: 'Performance impact',
      description: 'Debouncing ve caching mekanizması eklenecek',
      progress: 0
    },
    {
      id: 'ADR-0005',
      title: 'Kelime Detay Drawer Sertifikasyonu',
      status: 'ACCEPTED',
      start: '20 Eyl',
      end: '24 Eyl',
      owner: 'QA Ekibi',
      dependencies: ['ADR-0004'],
      risks: 'Test kapsamı',
      description: '6 test senaryosu, UI/UX sertifikasyonu',
      progress: 0
    },
    {
      id: 'ADR-0006',
      title: 'Build Optimizasyonu ve Temizliği',
      status: 'ACCEPTED',
      start: '22 Eyl',
      end: '27 Eyl',
      owner: 'DevOps Ekibi',
      dependencies: ['ADR-0002', 'ADR-0004', 'ADR-0005'],
      risks: 'Breaking changes',
      description: 'Build time < 60s, Bundle size < 500KB',
      progress: 0
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-300';
      case 'IMPLEMENTED': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'IN_PROGRESS': return <Clock className="w-4 h-4" />;
      case 'ACCEPTED': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const milestones = [
    { date: '17 Eyl', title: 'ADR-0002 Tamamlandı', status: 'pending' },
    { date: '20 Eyl', title: 'ADR-0003 Tamamlandı', status: 'pending' },
    { date: '21 Eyl', title: 'ADR-0004 Tamamlandı', status: 'pending' },
    { date: '24 Eyl', title: 'ADR-0005 Tamamlandı', status: 'pending' },
    { date: '27 Eyl', title: 'Sprint B Tamamlandı', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🏗️ ADR Dashboard</h1>
              <p className="text-slate-400">Sprint B - Stabilizasyon Yol Haritası</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">6/6</div>
              <p className="text-slate-400">ADR Tanımlandı</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📊 Genel Bakış
          </button>
          <button
            onClick={() => setSelectedTab('timeline')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'timeline'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📅 Timeline
          </button>
          <button
            onClick={() => setSelectedTab('dependencies')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'dependencies'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🔗 Bağımlılıklar
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-4">
            {adrData.map((adr) => (
              <div
                key={adr.id}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
              >
                <button
                  onClick={() => setExpandedADR(expandedADR === adr.id ? null : adr.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-750"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(adr.status)}`}>
                      {getStatusIcon(adr.status)}
                      <span className="text-sm font-semibold">{adr.status}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{adr.id}</div>
                      <div className="text-sm text-slate-400">{adr.title}</div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedADR === adr.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedADR === adr.id && (
                  <div className="border-t border-slate-700 p-4 bg-slate-750 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Başlangıç - Bitiş</p>
                        <p className="text-white font-medium">{adr.start} → {adr.end}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Sorumlu</p>
                        <p className="text-white font-medium">{adr.owner}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Açıklama</p>
                      <p className="text-white">{adr.description}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Risk</p>
                      <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded px-3 py-2 text-red-200 text-sm">
                        ⚠️ {adr.risks}
                      </div>
                    </div>
                    {adr.dependencies.length > 0 && (
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Bağımlılıklar</p>
                        <div className="flex flex-wrap gap-2">
                          {adr.dependencies.map(dep => (
                            <span key={dep} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-sm">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-400 text-sm mb-2">İlerleme</p>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${adr.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">{adr.progress}%</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Timeline Tab */}
        {selectedTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">📅 Sprint Timeline</h3>
              <div className="space-y-4">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-24 text-right">
                      <span className="text-blue-400 font-semibold">{milestone.date}</span>
                    </div>
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{milestone.title}</p>
                    </div>
                    <div className="text-green-400">✓</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">📊 Gantt Chart</h3>
              <div className="space-y-3 text-sm">
                {adrData.map((adr) => (
                  <div key={adr.id} className="flex items-center gap-2">
                    <div className="w-20 text-slate-400 font-mono">{adr.id}</div>
                    <div className="flex-1 h-6 bg-slate-700 rounded relative">
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded opacity-70"></div>
                      <div className="absolute top-1 left-1 text-xs text-white font-semibold truncate">
                        {adr.title.substring(0, 30)}...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dependencies Tab */}
        {selectedTab === 'dependencies' && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">🔗 ADR Bağımlılık Grafiği</h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="bg-slate-750 p-4 rounded border border-slate-600">
                <p className="text-blue-400 font-bold">ADR-0001 (Sprint B Stabilizasyon)</p>
                <div className="ml-4 mt-2 text-slate-300">
                  <p>├── ADR-0002 (Tip Sistemi)</p>
                  <p>│   ├── ADR-0003 (Veri Normalizasyonu)</p>
                  <p>│   │   ├── ADR-0004 (Hook Stabilizasyonu)</p>
                  <p>│   │   │   ├── ADR-0005 (Drawer Sertifikasyonu)</p>
                  <p>│   │   │   └── ADR-0006 (Build Optimizasyonu)</p>
                  <p>│   │   └── ADR-0006 (Build Optimizasyonu)</p>
                  <p>│   └── ADR-0006 (Build Optimizasyonu)</p>
                  <p>└── ...</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-750 p-4 rounded border border-slate-600">
                  <p className="text-green-400 font-bold mb-2">✓ Tamamlanan</p>
                  <p className="text-slate-300">0/6</p>
                </div>
                <div className="bg-slate-750 p-4 rounded border border-slate-600">
                  <p className="text-blue-400 font-bold mb-2">🔄 Devam Eden</p>
                  <p className="text-slate-300">1/6</p>
                </div>
                <div className="bg-slate-750 p-4 rounded border border-slate-600">
                  <p className="text-yellow-400 font-bold mb-2">⏳ Beklemede</p>
                  <p className="text-slate-300">5/6</p>
                </div>
                <div className="bg-slate-750 p-4 rounded border border-slate-600">
                  <p className="text-purple-400 font-bold mb-2">📊 İlerleme</p>
                  <p className="text-slate-300">17%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Toplam ADR</p>
            <p className="text-3xl font-bold text-blue-400">6</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Sprint Süresi</p>
            <p className="text-3xl font-bold text-purple-400">14 Gün</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Ekipler</p>
            <p className="text-3xl font-bold text-green-400">6</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Sertifikasyon</p>
            <p className="text-xl font-bold text-pink-400">v12.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}