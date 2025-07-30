import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productosService";

function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const data = await obtenerProductos();
      setProductos(data);
    }

    cargarProductos();
  }, []);

  return (
    <div>
      <h2>Catálogo</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Catalogo;
