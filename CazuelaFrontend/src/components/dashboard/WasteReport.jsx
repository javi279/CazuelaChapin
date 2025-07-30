export default function WasteReport({ wasteData, timeRange }) {
  if (!wasteData) return <p>Cargando reporte de desperdicios...</p>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Reporte de Desperdicios ({timeRange})</h2>
      <p>Cantidad desperdiciada: {wasteData[timeRange]} unidades</p>
    </div>
  );
}
