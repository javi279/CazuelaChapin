const API_URL = 'http://localhost:5073/api/pedidos';

export const enviarPedido = async (pedido) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });

    if (!respuesta.ok) {
      throw new Error('Error al enviar el pedido');
    }

    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};