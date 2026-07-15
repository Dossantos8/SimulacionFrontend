import type { FilaMuestra } from '../Types/Simulacion';
import React, { useState, useRef, useEffect } from 'react'; 

interface TablaLedgerProps {
    tabla: FilaMuestra[];
    verTodasFilas: boolean;
    setVerTodasFilas: (val: boolean) => void;
}

export const TablaLedger: React.FC<TablaLedgerProps> = ({ tabla}) => {

  const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);
  
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(50); // Muestra 50 por defecto

  const tablaRef = useRef<HTMLDivElement>(null);

  const scrollPrevioRef = useRef<number>(0);

  useEffect(() => {
  if (esPantallaCompleta) {

    scrollPrevioRef.current = window.scrollY;
    tablaRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, scrollPrevioRef.current);
  }
}, [esPantallaCompleta]);


  const totalPaginas = Math.ceil(tabla.length / itemsPorPagina);
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  
  const itemsActuales = tabla.slice(indicePrimerItem, indiceUltimoItem);
  
  const irPaginaAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const irPaginaSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));
  const cambiarItemsPorPagina = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPorPagina(Number(e.target.value));
    setPaginaActual(1); 
  };

    return (
        <section id="doc-data-table" className={`animate-section space-y-4 ${esPantallaCompleta ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto' : ''}`}>
          
          <div className="flex items-center justify-between shrink-0 mt-2">
            <h3 className="font-serif italic font-black text-xl">IV. Tabla de Observación Empírica</h3>
              <button 
              onClick={() => setEsPantallaCompleta(!esPantallaCompleta)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              title={esPantallaCompleta ? "Minimizar" : "Expandir tabla"}>{esPantallaCompleta ? (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>)}
            </button>
          </div>
            {/* Controles de paginación */}
            <div className="flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div></div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold tracking-wide">Mostrar:</label>
                <select
                  id="itemsPorPagina"
                  value={itemsPorPagina}
                  onChange={cambiarItemsPorPagina}
                  className="border border-slate-300 rounded-md px-2 py-1 text-sm cursor-pointer outline-none focus:ring-0 focus:border-black-500"
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={tabla.length > 0 ? tabla.length : 1}>Todos</option>
                </select>
              </div>
            </div>
          

            <div ref={tablaRef} className={`overflow-x-auto border-b border-slate-200 ${esPantallaCompleta ? 'flex-1 overflow-y-auto relative min-h-0' : 'max-h-[400px] overflow-y-auto'}`}>
              <table className="w-full table-fixed latex-table border-separate border-spacing-y-2">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th className="w-1/4 text-left pb-2">Indice (i)</th>
                    <th className="w-1/4 text-left pb-2">Salida cruda (Xi)</th>
                    <th className="w-1/4 text-left pb-2">Valor Normalizado (Ri)</th>
                  </tr>
                </thead>
                <tbody data-kid="91">
                  {itemsActuales.map((row) => (
                    <tr key={row.id} data-kid="92">
                      <td className="py-3 border-b border-slate-200 mono" data-kid="93">{String(row.id).padStart(4, '0')}</td>
                      <td className="py-3 border-b border-slate-200 mono"data-kid="94">{row.raw}</td>
                      <td className="py-3 border-b border-slate-200 mono"data-kid="95">{row.norm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          <div className="flex flex-col items-center justify-center gap-2 pt-2">

          <div className="flex items-center gap-2 pt-2 mb-4">
                <button
                  onClick={irPaginaAnterior}
                  disabled={paginaActual === 1}
                  className="flex items-center justify-center gap-1 min-w-[2rem] h-8 sm:px-3 rounded-lg text-sm font-bold tracking-wide transition-all disabled:bg-transparent disabled:border disabled:border-slate-200 disabled:text-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-transparent">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                <span className="font-sans text-sm font-bold text-slate-600 whitespace-nowrap px-1">
                  Pág {paginaActual} / {totalPaginas > 0 ? totalPaginas : 1}
                </span>
                <button
                  onClick={irPaginaSiguiente}
                  disabled={paginaActual === totalPaginas}
                  className="flex items-center justify-center gap-1 min-w-[2rem] h-8 sm:px-3 rounded-lg text-sm font-bold tracking-wide transition-all disabled:bg-transparent disabled:border disabled:border-slate-200 disabled:text-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-transparent">
                  <span className="hidden sm:inline">Siguiente</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
        <p className="font-serif italic text-xs text-slate-500 text-center">
          Mostrando de {tabla.length > 0 ? indicePrimerItem + 1 : 0} a {Math.min(indiceUltimoItem, tabla.length)} de {tabla.length} observaciones registradas de la secuencia.        </p>
      </div>
    </section>
  );
};
