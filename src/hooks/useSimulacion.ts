import type { ParametrosSimulacion, ResultadoSimulacion } from "../Types/Simulacion";
import { generarMuestras } from "../services/SimulacionService";
import { useState } from "react";

export const useSimulacion = () => {
  const [resultados, setResultados] = useState<ResultadoSimulacion | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ejecutarSimulacion = async (parametros: ParametrosSimulacion) => {
    setLoading(true);    
    setResultados(null);
    setError(null);      

    try {
      const data = await generarMuestras(parametros);
      setResultados(data);
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return { resultados, ejecutarSimulacion, loading, error };
};