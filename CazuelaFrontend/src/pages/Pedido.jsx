import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productosService';
import { obtenerCombos } from '../services/comboService';
import { enviarPedido } from '../services/pedidosService';

function Pedido() {
  const [productos, setProductos] = useState([]);
  const [combos, setCombos] = useState([]);
  const [pedido, setPedido] = useState({
    nombreCliente: '',
    direccion: '',
    productosSeleccionados: {},  // ahora es un objeto { id: cantidad }
    combosSeleccionados: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      setProductos(await obtenerProductos());
      setCombos(await obtenerCombos());
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleCantidadProducto = (id, cantidad) => {
    setPedido((prev) => ({
      ...prev,
      productosSeleccionados: {
        ...prev.productosSeleccionados,
        [id]: cantidad > 0 ? cantidad : 0,
      },
    }));
  };

  const handleCantidadCombo = (id, cantidad) => {
    setPedido((prev) => ({
      ...prev,
      combosSeleccionados: {
        ...prev.combosSeleccionados,
        [id]: cantidad > 0 ? cantidad : 0,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productosFinal = Object.entries(pedido.productosSeleccionados)
      .filter(([_, cantidad]) => cantidad > 0)
      .map(([id, cantidad]) => ({ id: parseInt(id), cantidad }));

    const combosFinal = Object.entries(pedido.combosSeleccionados)
      .filter(([_, cantidad]) => cantidad > 0)
      .map(([id, cantidad]) => ({ id: parseInt(id), cantidad }));

    if (productosFinal.length === 0 && combosFinal.length === 0) {
      alert('Selecciona al menos un producto o combo');
      return;
    }

    try {
      await enviarPedido({
        nombreCliente: pedido.nombreCliente,
        direccion: pedido.direccion,
        productos: productosFinal,
        combos: combosFinal,
      });
      alert('Pedido enviado correctamente');

      // Limpiar
      setPedido({
        nombreCliente: '',
        direccion: '',
        productosSeleccionados: {},
        combosSeleccionados: {},
      });
    } catch {
      alert('Hubo un error al enviar el pedido');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Realizar Pedido</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del cliente */}
        <div>
          <label className="block font-semibold mb-1">Nombre del cliente</label>
          <input
            name="nombreCliente"
            value={pedido.nombreCliente}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Dirección</label>
          <input
            name="direccion"
            value={pedido.direccion}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        {/* Productos */}
        <div>
          <h2 className="text-xl font-bold mb-3">Productos</h2>
          <div className="grid grid-cols-2 gap-4">
            {productos.map((p) => (
              <div key={p.id} className="border rounded p-3 shadow-sm">
                <div className="font-semibold">{p.nombre}</div>
                <div>Precio: Q{p.precio}</div>
                <input
                  type="number"
                  min="0"
                  value={pedido.productosSeleccionados[p.id] || ''}
                  onChange={(e) =>
                    handleCantidadProducto(p.id, parseInt(e.target.value) || 0)
                  }
                  className="mt-2 border px-2 py-1 w-full rounded"
                  placeholder="Cantidad"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Combos */}
        <div>
          <h2 className="text-xl font-bold mt-6 mb-3">Combos</h2>
          <div className="grid grid-cols-2 gap-4">
            {combos.map((c) => (
              <div key={c.id} className="border rounded p-3 shadow-sm">
                <div className="font-semibold">{c.nombre}</div>
                <div>Precio: Q{c.precio}</div>
                <input
                  type="number"
                  min="0"
                  value={pedido.combosSeleccionados[c.id] || ''}
                  onChange={(e) =>
                    handleCantidadCombo(c.id, parseInt(e.target.value) || 0)
                  }
                  className="mt-2 border px-2 py-1 w-full rounded"
                  placeholder="Cantidad"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Enviar Pedido
        </button>
      </form>
    </div>
  );
}

export default Pedido;
