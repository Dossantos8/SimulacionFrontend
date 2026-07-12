import React from "react";
import type { MouseEvent } from "react";

interface ParametrosProps {
  metodo: string;
  setMetodo: (val: string) => void;
  seed: string;
  distribucion: string;
  setDistribucion: (val: string) => void;
  setSeed: (val: string) => void;
  multiplier: string;
  setMultiplier: (val: string) => void;
  modulo: string;
  setModulo: (val: string) => void;
  sampleSize: string;
  setSampleSize: (val: string) => void;
  digitos: string;
  setDigitos: (val: string) => void;
  onEjecutar: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

export const AbstractParams: React.FC<ParametrosProps> = ({
  metodo,
  setMetodo,
  distribucion,
  setDistribucion,
  seed,
  setSeed,
  multiplier,
  setMultiplier,
  modulo,
  setModulo,
  sampleSize,
  setSampleSize,
  digitos,
  setDigitos,
  onEjecutar,
  loading
}) => {
  return (
    <section
      className="animate-section grid grid-cols-1 md:grid-cols-12 gap-12"
      id="doc-abstract-params"
    >
      <div className="md:col-span-5 space-y-4">
        <h3 className="font-serif italic font-black text-xl border-b border-black pb-1">
          Resumen / Abstract
        </h3>
        <p className="font-serif text-sm leading-relaxed text-slate-800 text-justify">
          Esta herramienta evalúa la consistencia empírica y la validez estadística de modelos de generación de números pseudo-aleatorios. Mediante el uso de los métodos congruencial multiplicativo y de los cuadrados medios, se busca analizar el comportamiento y la distribución de las secuencias generadas, sometiéndolas a pruebas de hipótesis estadística, bondad de ajuste e independencia. Los reportes aquí mostrados funcionan como una validación de la metodología computacional del <i className="italic font-bold">Laboratorio Estadístico</i> y su correspondencia con los estándares de equidistribución asintótica.
          </p>
      </div>

      {/* Formulario */}
      <div className="md:col-span-7">
        <div className="shadow-md border border-slate-200 p-8">
          {/* Titulo */}
          <h4 className="font-sans text-sm uppercase font-black tracking-[0.2em] border-b border-slate-300 pb-2 mb-8">
            Parámetros de Generación
          </h4>

          <div className="grid grid-cols-1 gap-8">
            {/* Metodo */}
            <div className="w-full">
              <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Método Generador</label>
              <select
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
                className="underlined-input w-full font-sans font-bold cursor-pointer"
              >
                <option>Congruencial Multiplicativo</option>
                <option>Medios Cuadrados</option>
              </select>
            </div>

            {/* Distribucion */}
            <div className="w-full">
              <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Distribución</label>
              <select
                value={distribucion}
                onChange={(e) => setDistribucion(e.target.value)}
                className="underlined-input w-full font-sans font-bold cursor-pointer"
              >
                <option>Uniforme</option>
              </select>
            </div>

            {/* Parametros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Semilla (X₀)</label>
                <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} className="underlined-input" />
              </div>

              {metodo === 'Congruencial Multiplicativo' && (
                <>
                  <div>
                    <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Multiplicador (a)</label>
                    <input type="text" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="underlined-input" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Modulo(m)</label>
                    <input type="text" value={modulo} onChange={(e) => setModulo(e.target.value)} className="underlined-input" />
                  </div>
                </>
              )}

              {metodo === 'Medios Cuadrados' && (
                <div>
                  <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Número de dígitos (d)</label>
                  <input type="text" value={digitos} onChange={(e) => setDigitos(e.target.value)} className="underlined-input" />
                </div>
              )}

              <div>
                <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Tamaño de la muestra (n)</label>
                <input type="text" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} className="underlined-input w-24" />
              </div>
            </div>
          </div>

          {/* Boton */}
          <div className="flex flex-wrap items-center justify-end mt-8 gap-8">
            {loading && ( 
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
              <svg className="animate-spin h-12 w-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          <button
            onClick={onEjecutar}
            disabled={loading}
            className={`
              relative p-3 font-bold uppercase text-xs tracking-[0.2em]
              border-2 border-slate-400 border-dashed text-slate-400 
              transition-all duration-200 ease-out transform origin-center select-none outline-none
              pointer-events-auto
              sm:hover:not-active:-translate-y-1
              sm:hover:not-active:rotate-[-5deg] sm:hover:not-active:scale-130 sm:hover:not-active:border-slate-500 sm:hover:not-active:text-slate-500
              sm:hover:not-active:shadow-lg
              active:scale-110
              active:-rotate-5
              active:translate-y-1 
              active:border-emerald-600 
              active:text-emerald-600 
              active:bg-emerald-50/50
              cursor-pointer select-none outline-none
              disabled cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disabled:transform-none
            `}
          >
            <span className="relative z-10">Generar</span>
          </button>
        </div>
      </div>
     </div>
    </section>
  );
};