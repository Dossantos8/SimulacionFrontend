import type { ParametrosSimulacion, ResultadoSimulacion } from "../Types/Simulacion";

const API_URL= import.meta.env.VITE_API_URL; 

export const generarMuestras = async (datos: ParametrosSimulacion): Promise<ResultadoSimulacion> => {
  const endpoint = `${API_URL}/muestras/generar`;
  const respuesta = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!respuesta.ok) {
    throw new Error('Error al comunicarse con el servidor');
  }
  return await respuesta.json();
};