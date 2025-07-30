// src/components/PedidoForm.jsx
import { useState } from "react";

function PedidoForm({ item, tipo }) {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...form,
      tipo, // 'producto' o 'combo'
      itemId: item.id,
    };

    try {
      const res = await fetch("http://localhost:5073/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("Pedido realizado con éxito 🎉");
        setForm({ nombre: "", direccion: "", telefono: "" });
      } else {
        alert("Hubo un problema al enviar el pedido");
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pedido-form">
      <h3>Realizar pedido para: {item.nombre}</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Tu nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <button type="submit">Enviar Pedido</button>
    </form>
  );
}

export default PedidoForm;
