import React from 'react';
import { NetworkAnalyticsResultDTO } from '../../domain/analytics/dto/NetworkAnalyticsDTO';

export interface AnalyticsDashboardPageProps {
  analyticsData?: NetworkAnalyticsResultDTO | null;
  coverageScore?: number;
}

export const AnalyticsDashboardPage: React.FC<AnalyticsDashboardPageProps> = ({
  analyticsData,
  coverageScore = 0
}) => {
  if (!analyticsData) {
    return React.createElement('div', { 
      className: 'p-8 text-center text-gray-500',
      'data-testid': 'dashboard-empty'
    }, 'Analiz verisi yükleniyor veya bulunamadı.');
  }

  return React.createElement('div', { className: 'p-6 space-y-6 bg-gray-50 min-h-screen' },
    React.createElement('h1', { className: 'text-2xl font-bold text-gray-800 border-b pb-3' }, '📊 Knowledge Graph Analytics Dashboard'),
    
    React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
      React.createElement('div', { className: 'bg-white p-5 rounded-lg border shadow-sm', 'data-testid': 'metric-coverage' },
        React.createElement('div', { className: 'text-sm font-semibold text-gray-500' }, 'Diyalekt Kapsama Oranı (Scov)'),
        React.createElement('div', { className: 'text-3xl font-extrabold text-indigo-600 mt-2' }, `%${(coverageScore * 100).toFixed(1)}`)
      ),
      React.createElement('div', { className: 'bg-white p-5 rounded-lg border shadow-sm', 'data-testid': 'metric-density' },
        React.createElement('div', { className: 'text-sm font-semibold text-gray-500' }, 'Graf Yoğunluğu (Density)'),
        React.createElement('div', { className: 'text-3xl font-extrabold text-emerald-600 mt-2' }, analyticsData.density.toFixed(4))
      ),
      React.createElement('div', { className: 'bg-white p-5 rounded-lg border shadow-sm', 'data-testid': 'metric-isolated' },
        React.createElement('div', { className: 'text-sm font-semibold text-gray-500' }, 'İzole Düğüm Sayısı'),
        React.createElement('div', { className: 'text-3xl font-extrabold text-amber-600 mt-2' }, analyticsData.isolatedNodes.length)
      )
    )
  );
};