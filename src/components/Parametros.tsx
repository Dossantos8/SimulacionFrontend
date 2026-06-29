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
          Esta herramienta evalua la consistencia empirica de modelos de generación de números pseudo-aleatorios. Mediante el uso de los métodos congruencial multiplicativo y medio cuadrado, se busca medir la entropía y distribución de las secuencias generadas. Los reportes aquí mostrados funcionan como una validación de la metodología computacional del <i className="italic font-bold">Laboratorio Estadístico</i> y su correspondencia con los estándares de equidistribución asintótica.
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
            <div className="">
              <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Método Generador</label>
              <select
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
                className="underlined-input font-sans font-bold cursor-pointer"
              >
                <option>Congruencial Multiplicativo</option>
                <option>Medios Cuadrados</option>
              </select>
            </div>

            {/* Distribucion */}
            <div className="">
              <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Distribución</label>
              <select
                value={distribucion}
                onChange={(e) => setDistribucion(e.target.value)}
                className="underlined-input font-sans font-bold cursor-pointer"
              >
                <option>Uniforme</option>
              </select>
            </div>

            {/* Parametros */}
            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
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
          <div className="flex items-center justify-end mt-8">
            <button
              onClick={onEjecutar}
              className="relative p-3 font-bold uppercase text-xs tracking-[0.2em] border-2 border-slate-400 border-dashed text-slate-400 transition-all duration-50 ease-out transform origin-center pointer-events-auto sm:hover:not-active:-translate-y-1 sm:hover:not-active:rotate-[-5deg] sm:hover:not-active:scale-130 sm:hover:not-active:border-slate-500 sm:hover:not-active:text-slate-500 sm:hover:not-active:shadow-lg active:scale-110 active:-rotate-5 active:translate-y-1 active:border-emerald-600 active:text-emerald-600 active:bg-emerald-50/50 cursor-pointer select-none outline-none"
            >
              <span className="relative z-10">Generar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};