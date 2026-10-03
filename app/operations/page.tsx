import { OperationsDashboardViewService } from '@/infra/ui/OperationsDashboardViewService';

export default function OperationsPage() {
  const view = OperationsDashboardViewService.getView();

  const statusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Operations Dashboard</h1>
      <p className="text-gray-600 mb-6">{view.summary}</p>

      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded border ${statusColor(view.overallStatus)}`}>
          Overall: {view.overallStatus.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {view.widgets.map((widget) => (
          <div
            key={widget.id}
            className={`p-4 rounded-lg border-2 ${statusColor(widget.status)}`}
          >
            <h3 className="font-semibold text-lg mb-2">{widget.title}</h3>
            <p className="text-2xl font-bold mb-1">{widget.value}</p>
            <p className="text-sm opacity-75">{widget.details}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        Last updated: {new Date(view.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
