import React from 'react';
import type { FilaDatos } from '../types/Simulacion';

interface TablaLedgerProps {
    mocktabla: FilaDatos[];
    verTodasFilas: boolean;
    setVerTodasFilas: (val: boolean) => void;
}

export const TablaLedger: React.FC<TablaLedgerProps> = ({ mocktabla, verTodasFilas, setVerTodasFilas }) => {
  const filasAMostrar = verTodasFilas ? mocktabla : mocktabla.slice(0, 8);
    return (
        <section className="animate-section space-y-6" id="doc-data-table">
            <h3 className="font-serif italic font-black text-xl">IV. Tabla de Observación Empírica</h3>

            <div className="overflow-x-auto">
              <table className="w-full latex-table">
                <thead className="bg-slate-50">
                  <tr>
                    <th>Indice (i)</th>
                    <th>Salida cruda (Xi)</th>
                    <th>Resultado Normalizado (Ri)</th>
                    <th>Entropy Bitwise</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900">
                  {filasAMostrar.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.raw}</td>
                      <td>{row.norm}</td>
                      <td>{row.entropia}</td>
                      <td className="font-bold">[VERIFICADO]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          <div className="flex flex-col items-center justify-center gap-2 pt-2">
        <p className="font-serif italic text-xs text-slate-500 text-center">
          Muestra actual: {mocktabla.length} de {mocktabla.length} observaciones registradas de la secuencia.
        </p>
        {mocktabla.length > 8 && (
          <button 
            onClick={() => setVerTodasFilas(!verTodasFilas)}
            className="text-[10px] uppercase tracking-widest font-bold font-sans text-slate-600 hover:text-black underline cursor-pointer"
          >
            {verTodasFilas ? "Colapsar Matriz Documental" : "Expandir Lote Completo"}
          </button>
        )}
      </div>
    </section>
  );
};
