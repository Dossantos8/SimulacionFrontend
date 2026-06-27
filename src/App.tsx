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
import { SectionPruebas } from './components/Pruebas';
import { TablaLedger } from './components/TablaLedger';
import { Conclusion } from './components/Conclusion';
import type { FilaDatos } from './types/Simulacion';

import { generarLCG, generarMediosCuadrados } from './utils/generadores';

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
  const [seed, setSeed] = useState<string>('16807');
  const [multiplier, setMultiplier] = useState<string>('48271');
  const [modulo, setModulo] = useState<string>('2147483647');
  const [sampleSize, setSampleSize] = useState<string>('1000');

  // Estados de datos procesados 
  const [tablaDatos, setTablaDatos] = useState<FilaDatos[]>([]);
  const [histogramData, setHistogramData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] });
  const [lineData, setLineData] = useState<ChartData<'line'>>({ labels: [], datasets: [] });

  useEffect(() => {
    if (metodo === 'Medios Cuadrados') {
      setSeed('3708'); // Semilla de 4 dígitos ideal para pruebas
    } else {
      setSeed('16807'); 
    }
  }, [metodo]);

  const ejecutarProtocolo = (e?: MouseEvent<HTMLButtonElement>): void => {
    if (e) e.preventDefault();
    
    const s = parseInt(seed, 10) || 1234;
    const a = parseInt(multiplier, 10) || 16807;
    const m = parseInt(modulo, 10) || 2147483647;
    const n = parseInt(sampleSize, 10) || 100;

    const resultados = metodo === 'Congruencial Multiplicativo' 
      ? generarLCG(s, a, m, n) 
      : generarMediosCuadrados(s, n);

    // 1. Calcular Frecuencias para el Histograma
    const conteos = [0, 0, 0, 0, 0];
    resultados.norms.forEach(v => {
      if (v < 0.2) conteos[0]++; 
      else if (v < 0.4) conteos[1]++;
      else if (v < 0.6) conteos[2]++; 
      else if (v < 0.8) conteos[3]++; 
      else conteos[4]++;
    });

    // 2. Actualizar estado del Histograma
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
        data: resultados.norms.slice(0, iteracionesLinea),
        borderColor: '#000000',
        borderWidth: 1.5,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#1E293B',
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0,
      }]
    });

    // 4. Actualizar estado de la Tabla Ledger
    const nuevasFilas: FilaDatos[] = resultados.raws.map((raw, index) => ({
      id: String(index + 1).padStart(4, '0'),
      raw: String(raw),
      norm: resultados.norms[index].toFixed(6),
      entropia: (0.95 + Math.random() * 0.04).toFixed(4) // Simulación de entropía original
    }));
    setTablaDatos(nuevasFilas);
  };

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
            multiplier={multiplier} setMultiplier={setMultiplier} modulo={modulo} setModulo={setModulo}
            sampleSize={sampleSize} setSampleSize={setSampleSize} onEjecutar={ejecutarProtocolo}
          />

          {/* Sección II: Gráficos Reactivos */}
          <GraficosResultados datosHistograma={histogramData} datosLineas={lineData} />

          {/* III: Pruebas */}
          <SectionPruebas />

          {/* Sección IV: Tabla Ledger Dinámica */}
          <TablaLedger mocktabla={tablaDatos} verTodasFilas={false} setVerTodasFilas={() => {}} />

          {/* Sección V: Conclusión & Firmas de Autorización */}
          <Conclusion totalMuestras={parseInt(sampleSize)} />
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <button className="font-sans text-[10px] uppercase font-black hover:text-slate-500 transition-colors cursor-pointer">Descargar PDF</button>
            <button className="font-sans text-[10px] uppercase font-black hover:text-slate-500 transition-colors cursor-pointer">Exportar datos crudos (.CSV)</button>
          </div>
          <p className="font-sans text-[10px] uppercase font-black opacity-30 text-center">© 2026 Laboratorio de Simulación Estocástica | All Rights Reserved</p>
        </footer>

      </div>
    </div>
  );
}