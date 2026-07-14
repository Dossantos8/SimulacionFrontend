import React, { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import type { ChartData } from 'chart.js'

import { Header } from './components/Header';
import { AbstractParams } from './components/Parametros';
import { GraficosResultados } from './components/GraficosResultados';
import { Pruebas } from './components/Pruebas';
import { TablaLedger } from './components/TablaLedger';
import { Conclusion } from './components/Conclusion';
import type { SimulacionParams, FilaMuestra } from './Types/Simulacion';
import { useSimulacion } from './hooks/useSimulacion';

// Registrar plugins de GSAP y componentes de Chart.js
gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip);


export default function App(): React.JSX.Element {

  // Tipado correcto para las referencias de animaciones GSAP
  const mainDocRef = useRef<HTMLDivElement | null>(null);
  const headerAnimateRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Estados para los parámetros de generación
  const [metodo, setMetodo] = useState<string>('Congruencial Multiplicativo');
  const [distribucion, setDistribucion] = useState<string>('Uniforme');
  const [seed, setSeed] = useState<string>('16807');
  const [multiplier, setMultiplier] = useState<string>('48271');
  const [modulo, setModulo] = useState<string>('2147483647');
  const [sampleSize, setSampleSize] = useState<string>('1000');
  const [digitos, setDigitos] = useState<string>('4');

  const { resultados, ejecutarSimulacion, loading } = useSimulacion();

  // Estados de datos procesados 
  const [tablaDatos, setTablaDatos] = useState<FilaMuestra[]>([]);
  const [histogramData, setHistogramData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] });
  const [lineData, setLineData] = useState<ChartData<'line'>>({ labels: [], datasets: [] });

  useEffect(() => {
    if (metodo === 'Medios Cuadrados') {
      setSeed('3708'); // Semilla de 4 dígitos ideal para pruebas
    } else {
      setSeed('16807'); 
    }
  }, [metodo]);

  const ejecutarProtocolo = async(e?: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (e) e.preventDefault();

    const esCongruencial = metodo === 'Congruencial Multiplicativo';

  const ContenidoBase = {
    distribucion: distribucion.toLowerCase(), 
    n: Number(sampleSize) || 100,
    a: 0,
    b: 1,
    alpha: 0.05,
  };

  let contenido: SimulacionParams;

  if (esCongruencial) {
    contenido = {
      ...ContenidoBase,
      metodo: 'congruencial',
      parametros: {
        mult: Number(multiplier) || 16807,
        seed: Number(seed) || 1234,
        mod: Number(modulo) || 2147483647
      }
    };
  } else {
    contenido = {
      ...ContenidoBase,
      metodo: 'medios_cuadrados',
      parametros: {
        seed: Number(seed) || 1234,
        d: Number(digitos) || 4
      }
    };
  }
  
    await ejecutarSimulacion(contenido); 
  };

  useEffect(() => {
    if (resultados && resultados.data) {
      const normas = resultados.data;
      const n = normas.length;

      const modNum = parseInt(modulo) || 1; 
      const digNum = parseInt(digitos) || 4;

      const conteos = [0, 0, 0, 0, 0];
      normas.forEach((v: number) => {
        if (v < 0.2) conteos[0]++; 
        else if (v < 0.4) conteos[1]++;
        else if (v < 0.6) conteos[2]++; 
        else if (v < 0.8) conteos[3]++; 
        else conteos[4]++;
      });

      setHistogramData({
        labels: ['0.0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'],
        datasets: [{
          label: 'Frecuencia',
          data: conteos,
          backgroundColor: '#1E293B',
          borderColor: '#000000',
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.9,
        }]
      });

      const iteracionesLinea = Math.min(n, 20);
      setLineData({
        labels: Array.from({ length: iteracionesLinea }, (_, i) => i + 1),
        datasets: [{
          label: 'Valor Normalizado',
          data: normas.slice(0, iteracionesLinea),
          borderColor: '#000000',
          borderWidth: 1.5,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#1E293B',
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0,
        }]
      });

    const nuevasFilas: FilaMuestra[] = resultados.data.map((norm: number, index: number) => {
      let rawValue = 0;

      if (metodo === 'Congruencial Multiplicativo') {
        rawValue = Math.round(norm * (modNum - 1));
      } else if (metodo === 'Medios Cuadrados') {
        rawValue = Math.round(norm * Math.pow(10, digNum));
      }

      return {
        id: String(index + 1).padStart(4, '0'),
        raw: rawValue,          
        norm: norm.toFixed(6), 
      };
    });

    setTablaDatos(nuevasFilas);
  }
}, [resultados, metodo, modulo, digitos]); 

  // Ciclo de vida y animaciones usando gsap.context() para evitar memory leaks
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mainDocRef.current) {
        gsap.from(mainDocRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out'
        });
      }

      // Filtrar elementos nulos antes de animar el header
      const headersToAnimate = headerAnimateRef.current.filter(Boolean);
      if (headersToAnimate.length > 0) {
        gsap.from(headersToAnimate, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: 'power2.out'
        });
      }

      // Animaciones al hacer scroll mediante ScrollTrigger
      sectionsRef.current.forEach((section) => {
        if (section) {
          gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const simulacionGenerada = resultados !== null && !loading;
  
  const descargarPDF = () => {
    window.print();
  };

  const descargarCSV = () => {
    if (tablaDatos.length === 0) return;

    let csvContent = "sep=;\n";
    
    csvContent += "Indice;Salida Cruda (Xi);Valor Normalizado (Ri)\n";

    tablaDatos.forEach(row => {
      csvContent += `${row.id};${row.raw};${row.norm}\n`;
    });

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Simulacion_${metodo.replace(/\s+/g, '_')}_n${sampleSize}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen sm:p-4">
      <div
        ref={mainDocRef}
        className="max-w-[1200px] mx-auto paper-surface p-8 sm:p-12 md:p-16 relative overflow-hidden"
        id="main-document"
      >
        {/* Identificador Lateral Flotante */}
        <div className="hidden lg:block absolute left-12 top-24 opacity-30 rotate-90 origin-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Documento de carácter educativo.</p>
        </div>

        {/* Header */}
        <Header />

        <main className="space-y-20">

          {/* 2. Abstract e Inputs */}
          <AbstractParams
            metodo={metodo} setMetodo={setMetodo} seed={seed} setSeed={setSeed}
            distribucion={distribucion} setDistribucion={setDistribucion}
            multiplier={multiplier} setMultiplier={setMultiplier} modulo={modulo} setModulo={setModulo}
            sampleSize={sampleSize} setSampleSize={setSampleSize} digitos={digitos} setDigitos={setDigitos}
            loading={loading}
            onEjecutar={ejecutarProtocolo}
          />

          {simulacionGenerada && (
            <>
              {/* Sección II: Gráficos Reactivos */}
              <GraficosResultados datosHistograma={histogramData} datosLineas={lineData} />

              {/* III: Pruebas */}
              <Pruebas resultados={resultados} />

              {/* Sección IV: Tabla Ledger Dinámica */}
              <TablaLedger tabla={tablaDatos} verTodasFilas={false} setVerTodasFilas={() => {}} />

              {/* Sección V: Conclusión & Firmas de Autorización */}
              <Conclusion totalMuestras={parseInt(sampleSize)} />
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            {simulacionGenerada && (
              <>
                <button 
                  onClick={descargarPDF} 
                  className="font-sans text-[10px] uppercase font-black hover:text-slate-500 transition-colors cursor-pointer"
                >
                  Descargar PDF
                </button>
                <button 
                  onClick={descargarCSV} 
                  className="font-sans text-[10px] uppercase font-black hover:text-slate-500 transition-colors cursor-pointer"
                >
                  Exportar datos crudos (.CSV)
                </button>
              </>
            )}

          </div>
          <p className="font-sans text-[10px] uppercase font-black opacity-30 text-center">© 2026 Laboratorio de Simulación Estocástica | All Rights Reserved</p>
        </footer>

      </div>
    </div>
  );
}