const API_URL = 'http://localhost:5073/api/combos';

export const obtenerCombos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
      throw new Error('Error al obtener combos');
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
