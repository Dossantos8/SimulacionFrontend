import React from 'react';
import type { ChartData } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

interface GraficosResultadosProps {
    datosHistograma: ChartData<'bar'>;
    datosLineas : ChartData<'line'>;
}

export const GraficosResultados: React.FC<GraficosResultadosProps> = ({ datosHistograma, datosLineas }) => {
  return (
    <section className="animate-section space-y-6" id="doc-results">
      <h3 className="border-b-2 pb-6 font-serif italic font-black text-xl">II. Resultados Gráficos</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="shadow-md border border-slate-200 p-4 bg-white rounded-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">Fig I. Histograma de Frecuencias Empíricas</p>
          <div className="h-[220px] w-full">
            <Bar
              data={datosHistograma}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { family: 'Courier New', size: 10 } } },
                  y: { grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Courier New', size: 10 } } }
                }
              }}
            />
          </div>
        </div>

        <div className="shadow-md border border-slate-200 p-4 bg-white rounded-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">Fig II. Comportamiento Estocástico Lineal (Primeras 30 r)</p>
          <div className="h-[220px] w-full">
            <Line
              data={datosLineas}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { family: 'Courier New', size: 10 } } },
                  y: { grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Courier New', size: 10 } } }
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};