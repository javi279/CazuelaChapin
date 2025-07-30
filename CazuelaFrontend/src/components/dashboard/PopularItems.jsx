export default function PopularItems({ items }) {
  if (!items) return <p>Cargando artículos populares...</p>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Artículos Populares</h2>
      <ul className="list-disc list-inside">
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.count} pedidos
          </li>
        ))}
      </ul>
    </div>
  );
}
