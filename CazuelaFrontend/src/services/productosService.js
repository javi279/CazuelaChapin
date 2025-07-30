// src/services/productosService.js

const API_URL = 'http://localhost:5073/api/productos'; // Ajusta la URL según tu backend

export async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
