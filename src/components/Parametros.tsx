import React, { useState } from 'react';
import type { MouseEvent } from "react";
import type { ParametrosSimulacion } from '../Types/Simulacion';

interface ParametrosProps {
  onEjecutar: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  formulario: ParametrosSimulacion;
  setFormulario: React.Dispatch<React.SetStateAction<ParametrosSimulacion>>;
}

export const Formulario: React.FC<ParametrosProps> = ({
  onEjecutar,
  loading,
  formulario,
  setFormulario
}) => {
  // Estado para manejar las pestañas
  const [activeTab, setActiveTab] = useState<'generador' | 'distribucion'>('generador');

  // Manejador para los campos principales (metodo, distribucion, sampleSize)
  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === 'n' ? Number(value) : value
    }));
  };

  // Manejador para los campos matemáticos dinámicos
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      parametros: {
        ...prev.parametros,
        [name]: Number(value) // Lo guardamos directamente como número
      }
    }));
  };

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

          {/* Navegación de Pestañas (Tabs) */}
          <div className="flex gap-8 border-b border-slate-200 mb-8">
            <button
              type="button" 
              onClick={() => setActiveTab("generador")}
              className={`font-sans text-xs uppercase tracking-[0.2em] pb-2 -mb-px border-b-2 transition-colors cursor-pointer ${
                activeTab === "generador" ? "border-slate-800 text-slate-800 font-black" : "border-transparent text-slate-400 font-bold hover:text-slate-600"}`}
            >
              Método Generador
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("distribucion")}
              className={`font-sans text-xs uppercase tracking-[0.2em] pb-2 -mb-px border-b-2 transition-colors cursor-pointer ${
                activeTab === "distribucion" ? "border-slate-800 text-slate-800 font-black" : "border-transparent text-slate-400 font-bold hover:text-slate-600"}`}
            >
              Distribución
            </button>
          </div>

          <div className="min-h-[250px]"> {/* Contenedor para evitar saltos bruscos de altura */}

            {/* PESTAÑA 1: GENERADOR */}
            {activeTab === 'generador' && (
              <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-300">
                <div className="w-full">
                  <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Método Generador</label>
                  <select
                    name='metodo'
                    value={formulario.metodo}
                    onChange={handleMainChange}
                    className="underlined-input w-full font-sans font-bold cursor-pointer"
                  >
                    <option>Congruencial</option>
                    <option>Medios Cuadrados</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Semilla (X₀)</label>
                    <input name='seed' type="text" value={formulario.parametros.seed} onChange={handleParamChange} className="underlined-input" />
                  </div>

                  {formulario.metodo === 'Congruencial' && (
                    <>
                      <div>
                        <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Multiplicador (a)</label>
                        <input name='multiplier' type="text" value={formulario.parametros.multiplier} onChange={handleParamChange} className="underlined-input" />
                      </div>
                      <div>
                        <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Aditivo (c)</label>
                        <input name='aditivo' type="text" value={formulario.parametros.aditivo} onChange={handleParamChange} className="underlined-input" />
                      </div>
                      <div>
                        <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Modulo (m)</label>
                        <input name='modulo' type="text" value={formulario.parametros.modulo} onChange={handleParamChange} className="underlined-input" />
                      </div>
                    </>
                  )}

                  {formulario.metodo === 'Medios Cuadrados' && (
                    <div>
                      <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Número de dígitos (d)</label>
                      <input name='digitos' type="text" value={formulario.parametros.digitos} onChange={handleParamChange} className="underlined-input" />
                    </div>
                  )}

                  <div>
                    <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Tamaño de la muestra (n)</label>
                    <input name='n' type="text" value={formulario.n} onChange={handleMainChange} className="underlined-input w-24" />
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 2: DISTRIBUCIÓN */}
            {activeTab === 'distribucion' && (
              <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-300">
                <div className="w-full">
                  <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Distribución</label>
                  <select
                    name='distribucion'
                    value={formulario.distribucion}
                    onChange={handleMainChange}
                    className="underlined-input w-full font-sans font-bold cursor-pointer"
                  >
                    <optgroup label="Variables Continuas">
                      <option>Uniforme</option>
                      <option>Exponencial</option>
                      <option>Normal</option>
                      <option>Erlang</option>
                    </optgroup>

                    <optgroup label="Variables Discretas">
                      <option>Bernoulli</option>
                      <option>Binomial</option>
                      <option>Poisson</option>
                    </optgroup>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {formulario.distribucion === 'Uniforme' && (
                    <>
                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Lím. Inferior (a)</label>
                        <input name='a' type="number" step="0.01" value={formulario.parametros.a} onChange={handleParamChange} className="underlined-input" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Lím. Superior (b)</label>
                        <input name='b' type="number" step="0.01" value={formulario.parametros.b} onChange={handleParamChange} className="underlined-input" />
                      </div>
                    </>
                  )}

                  {['Exponencial', 'Erlang', 'Poisson'].includes(formulario.distribucion) && (
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Tasa Lambda (λ)</label>
                      <input name='lam' type="number" step="0.01" value={formulario.parametros.lam} onChange={handleParamChange} className="underlined-input" />
                    </div>
                  )}

                  {formulario.distribucion === 'Normal' && (
                    <>
                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Media (μ)</label>
                        <input name='mu' type="number" step="0.01" value={formulario.parametros.mu} onChange={handleParamChange} className="underlined-input" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Desv. Estándar (σ)</label>
                        <input name='sigma' type="number" step="0.01" value={formulario.parametros.sigma} onChange={handleParamChange} className="underlined-input" />
                      </div>
                    </>
                  )}

                  {formulario.distribucion === 'Erlang' && (
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Forma (k)</label>
                      <input name='k' type="number" value={formulario.parametros.k} onChange={handleParamChange} className="underlined-input" />
                    </div>
                  )}

                  {['Bernoulli', 'Binomial'].includes(formulario.distribucion) && (
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Prob. de Éxito (p)</label>
                      <input name='p' type="number" step="0.01" min="0" max="1" value={formulario.parametros.p} onChange={handleParamChange} className="underlined-input" />
                    </div>
                  )}

                  {formulario.distribucion === 'Binomial' && (
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Ensayos (n)</label>
                      <input name='n_ensayos' type="number" value={formulario.parametros.n_ensayos} onChange={handleParamChange} className="underlined-input" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Boton Generar (Siempre visible) */}
          <div className="flex flex-wrap items-center justify-end mt-8 pt-6 border-t border-slate-200 gap-8">
            {/* {loading && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
                <svg className="animate-spin h-12 w-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )} */}

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
              disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disabled:transform-none
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