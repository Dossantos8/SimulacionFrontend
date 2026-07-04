import type { FilaMuestra } from '../Types/Simulacion';
import React, { useState } from 'react'; 

interface TablaLedgerProps {
    tabla: FilaMuestra[];
    verTodasFilas: boolean;
    setVerTodasFilas: (val: boolean) => void;
}

export const TablaLedger: React.FC<TablaLedgerProps> = ({ tabla}) => {

  const [esPantallaCompleta, setEsPantallaCompleta] = useState(false);

    return (
        <section id="doc-data-table" className={`animate-section space-y-4 ${esPantallaCompleta ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto' : ''}`}>

            <h3 className="font-serif italic font-black text-xl">IV. Tabla de Observación Empírica</h3>

          <div className="flex justify-end mb-2">
            <button 
            onClick={() => setEsPantallaCompleta(!esPantallaCompleta)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title={esPantallaCompleta ? "Minimizar" : "Expandir tabla"}>{esPantallaCompleta ? (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>)}
            </button>
         </div>

            <div className={`overflow-x-auto overflow-y-auto border-b border-slate-200 ${ esPantallaCompleta ? 'sticky top-0 bg-white z-20 py-2 border-b border-slate-300' : 'max-h-[400px]'}`}>
              <table className="w-full table-fixed latex-table">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th className="w-1/4 text-left">Indice (i)</th>
                    <th className="w-1/4 text-left">Salida cruda (Xi)</th>
                    <th className="w-1/4 text-left">Valor Normalizado (Ri)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900">
                  {tabla.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.raw}</td>
                      <td>{row.norm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          <div className="flex flex-col items-center justify-center gap-2 pt-2">
        <p className="font-serif italic text-xs text-slate-500 text-center">
          Muestra actual: {tabla.length} de {tabla.length} observaciones registradas de la secuencia.
        </p>
      </div>
    </section>
  );
};
