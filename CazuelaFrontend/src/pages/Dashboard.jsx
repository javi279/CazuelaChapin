import { useEffect, useState } from 'react';
import SalesChart from '../components/dashboard/SalesChart';
import PopularItems from '../components/dashboard/PopularItems';
import WasteReport from '../components/dashboard/WasteReport';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('daily');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    // Aquí deberías llamar a tu API para traer datos
    // Mientras, simulamos datos:
    const fakeData = {
      sales: [12, 19, 3, 5, 2, 3, 7],
      popularItems: [
        { id: 1, name: "Tamal", count: 25 },
        { id: 2, name: "Combo Especial", count: 12 },
        { id: 3, name: "Atol", count: 18 }
      ],
      waste: {
        daily: 2,
        weekly: 10,
        monthly: 40,
      },
      totalSales: 1500.75
    };
    setStats(fakeData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>

      <div className="mb-6 space-x-3">
        <button
          onClick={() => setTimeRange('daily')}
          className={`px-4 py-2 rounded ${timeRange === 'daily' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Diario
        </button>
        <button
          onClick={() => setTimeRange('weekly')}
          className={`px-4 py-2 rounded ${timeRange === 'weekly' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Semanal
        </button>
        <button
          onClick={() => setTimeRange('monthly')}
          className={`px-4 py-2 rounded ${timeRange === 'monthly' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Mensual
        </button>
      </div>

      <SalesChart data={stats?.sales} />
      <PopularItems items={stats?.popularItems} />
      <WasteReport wasteData={stats?.waste} timeRange={timeRange} />

      <div className="mt-6 p-4 border rounded bg-gray-50 max-w-sm">
        <h3 className="font-bold text-lg mb-2">Ventas Totales</h3>
        <p className="text-xl font-semibold">Q {stats?.totalSales?.toFixed(2)}</p>
      </div>
    </div>
  );
}
