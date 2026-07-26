import React, { useMemo } from 'react';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Registramos todos los componentes necesarios (incluyendo Scatter)
ChartJS.register(...registerables);

interface GraficosResultadosProps {
  muestras: number[]; // Ahora recibimos los datos crudos, el componente hace el trabajo duro
}

export const GraficosResultados: React.FC<GraficosResultadosProps> = ({ muestras }) => {
  
  const { histogramData, lineData, scatterData } = useMemo(() => {
    if (!muestras || muestras.length === 0) {
      return { histogramData: null, lineData: null, scatterData: null };
    }

    const n = muestras.length;

    // --- Histograma Dinámico (Regla de Sturges) ---
    const k = Math.max(5, Math.ceil(1 + 3.322 * Math.log10(n))); 
    const min = Math.min(...muestras);
    const max = Math.max(...muestras);
    const range = max - min;
    const binWidth = range === 0 ? 1 : range / k;

    const bins = Array(k).fill(0);
    muestras.forEach(val => {
      let index = Math.floor((val - min) / binWidth);
      if (index >= k) index = k - 1; 
      bins[index]++;
    });

    const histogramLabels = Array.from({ length: k }, (_, i) => {
      const start = (min + i * binWidth).toFixed(2);
      const end = (min + (i + 1) * binWidth).toFixed(2);
      return `${start} - ${end}`;
    });

    const computedHistogram = {
      labels: histogramLabels,
      datasets: [{
        label: 'Frecuencia',
        data: bins,
        backgroundColor: '#1E293B',
        borderColor: '#000000',
        borderWidth: 1,
        barPercentage: 0.95,
        categoryPercentage: 1.0,
      }]
    };

    // --- Comportamiento Lineal ---
    const limiteLinea = Math.min(n, 150);
    const datosRecortados = muestras.slice(0, limiteLinea);
    
    const computedLine = {
      labels: Array.from({ length: limiteLinea }, (_, i) => i + 1),
      datasets: [{
        label: 'Valor (Xi)',
        data: datosRecortados,
        borderColor: '#000000',
        borderWidth: 1, // Trazado más fino y preciso
        // Desactivamos los puntos geométricos si hay muchas muestras para mantener 
        // la estética de señal continua, típica en papers científicos.
        pointRadius: limiteLinea > 50 ? 0 : 2, 
        pointHoverRadius: 4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#000000',
        tension: 0, // Mantiene los saltos estocásticos puros sin suavizado artificial
      }]
    };

    // --- Gráfico de Dispersión (Lag 1: X_i vs X_{i+1}) ---
    const scatterPuntos = [];
    for (let i = 0; i < n - 1; i++) {
      scatterPuntos.push({ x: muestras[i], y: muestras[i + 1] });
    }
    const computedScatter = {
      datasets: [{
        label: 'Dispersión Lag-1',
        data: scatterPuntos,
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderColor: '#1E293B',
        pointRadius: 3,
      }]
    };

    return { histogramData: computedHistogram, lineData: computedLine, scatterData: computedScatter };
  }, [muestras]);

  // Configuración base de diseño para limpiar los gráficos
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { font: { family: 'Courier New', size: 10 } } 
      },
      y: { 
        // Corregido: Sección transparente en lugar de gris
        grid: { color: 'transparent' }, 
        ticks: { font: { family: 'Courier New', size: 10 } },
        beginAtZero: true
      }
    }
  };

  if (!histogramData) return null;

  return (
    <section className="animate-section space-y-6" id="doc-results">
      <h3 className="border-b-2 pb-4 font-serif italic font-black text-xl text-slate-800">
        II. Resultados Gráficos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Histograma */}
        <div className="shadow-sm border border-slate-200 p-5 bg-white rounded-md">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-2">
            Fig I. Histograma Empírico (Clases Dinámicas)
          </p>
          <div className="h-[220px] w-full">
            <Bar data={histogramData} options={baseOptions} />
          </div>
        </div>

        {/* Líneas */}
        <div className="shadow-sm border border-slate-200 p-5 bg-white rounded-md">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-2">
            Fig II. Comportamiento Estocástico de la Serie (n = {Math.min(muestras.length, 150)})
          </p>
          <div className="h-[220px] w-full">
            <Line data={lineData} options={baseOptions} />
          </div>
        </div>

        {/* Dispersión (Lag Plot) - Ocupa ambas columnas si hay espacio */}
        <div className="shadow-sm border border-slate-200 p-5 bg-white rounded-md md:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-100 pb-2">
            Fig III. Gráfico de Dispersión de Independencia (Lag-1)
          </p>
          <div className="h-[250px] w-full">
            <Scatter 
              data={scatterData!} 
              options={{
                ...baseOptions,
                scales: {
                  x: { 
                    ...baseOptions.scales.x, 
                    title: { display: true, text: 'X (i)', font: { family: 'Courier New', size: 11 } }
                  },
                  y: { 
                    ...baseOptions.scales.y, 
                    title: { display: true, text: 'X (i+1)', font: { family: 'Courier New', size: 11 } },
                    beginAtZero: false 
                  }
                }
              }} 
            />
          </div>
        </div>

      </div>
    </section>
  );
};