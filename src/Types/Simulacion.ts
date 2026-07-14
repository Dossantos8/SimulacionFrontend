// Interfaces para el tipado estricto
export interface FilaMuestra {
  id: string;
  raw: string | number;
  norm: string;
}

interface BaseParams {
  distribucion: string; 
  n: number; 
  a: number; 
  b: number; 
  alpha: number; 
}

export interface CongruencialParams extends BaseParams{
  metodo: 'congruencial'; 
  parametros: {
    mult: number; 
    seed: number; 
    mod: number; 
  };
}

export interface MediosCuadradosParams extends BaseParams{
  metodo:'medios_cuadrados'; 
  parametros: {
    seed: number; 
    d: number; 
  } 
}

export type SimulacionParams = CongruencialParams | MediosCuadradosParams; 

export interface KSmirnovTest {
  estadistico_D: number;
  valor_critico: number; 
  rechazar_H0: boolean; 
  interpretacion: string; 
  frecuencia_teorica: number[];
  frecuencia_empirica: number[]; 
  frecuencia_empirica_anterior: number[]; 
  diferencias_positivas: number[]; 
  diferencias_negativas: number[]; 
}

export interface VarianzaTest {
  valor_estadistico: number; 
  grados_libertad: number; 
  valor_critico:[number, number]; 
  p_valor: number; 
  rechazar_H0: boolean;
  interpretacion: string; 
  varianza_muestral: number; 
  desviacion_estandar_muestral: number; 
  varianza_teorica_esperada: number; 
  chi2_limite_inferior: number; 
  chi2_limite_superior: number;
}

export interface MediaTest{
  distribucion: string; 
  estadistico: number; 
  media_muestral: number; 
  valor_critico: [number, number];
  p_valor: number; 
  rechazar_H0: boolean;
  interpretacion: string; 
  grados_libertad: number | null; 
  desviacion_estandar_muestral: number; 
  error_estandar_media: number; 
  media_esperada_H0: number; 
}

export interface RachasTest{
  rachas_observadas: number; 
  rachas_esperadas: number; 
  n1: number; 
  n2: number; 
  estadistico_Z: number; 
  valor_critico_Z: number; 
  p_valor: number; 
  rechazar_H0: boolean;
  interpretacion: string; 
  umbral_utilizado: number; 
  criterio: string; 
  secuencia_binaria: number[]; 
  desviacion_estandar_R: number;
}

export interface SimulacionResults{
  meta?: any; 
  data: number[];
  pruebas: {
    K_Smirnov: KSmirnovTest; 
    Varianza: VarianzaTest; 
    Media: MediaTest; 
    Rachas: RachasTest;
  }
  
}



