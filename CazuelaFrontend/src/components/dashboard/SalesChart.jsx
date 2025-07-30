import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesChart({ data }) {
  if (!data) return <p>Cargando gráfico de ventas...</p>;

  const chartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas',
        data,
        backgroundColor: 'rgba(34,197,94,0.7)',
      },
    ],
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Ventas</h2>
      <Bar data={chartData} />
    </div>
  );
}
