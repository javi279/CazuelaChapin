import { useEffect, useState } from 'react';
import { obtenerCombos } from '../services/comboService';

function Combos() {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerCombos();
      setCombos(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Combos disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {combos.map((combo) => (
          <div key={combo.id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold">{combo.nombre}</h2>
            <p className="text-gray-700">{combo.descripcion}</p>
            <p className="font-bold mt-2">Q{combo.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Combos;
