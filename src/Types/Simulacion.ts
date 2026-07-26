export interface FilaMuestra {
  id: string;
  x: string | number;
  u: string | number;
}

export interface ParametrosSimulacion {
  metodo: string | undefined;
  distribucion: string;
  n: number;
  alpha: number;
  parametros: Record<string, number>; 
}
export interface PruebaBondadAjuste {
  nombre_prueba: string;
  estadistico: number;
  valor_critico: number;
  rechazar_H0: boolean;
  interpretacion: string;
  diferencias_positivas?: number[];
  diferencias_negativas?: number[];
  frecuencia_teorica?: number[];
  frecuencia_empirica?: number[];
  grados_libertad?: number;
}

export interface ResultadoSimulacion{
  meta?: any;
  u: number[];
  x: number[];
  pruebas: {
    Bondad_Ajuste: PruebaBondadAjuste;
    Varianza: any;
    Media: any;
    Rachas: any;
  }
}