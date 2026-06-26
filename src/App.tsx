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
import { Bar, Line } from 'react-chartjs-2';
import { IconId, IconBuildingCommunity, IconCalendarEvent, IconAward, IconSignature } from '@tabler/icons-react';

// Registrar plugins de GSAP y componentes de Chart.js
gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip);

// Interfaces para el tipado estricto
interface FilaTabla {
  id: string;
  raw: string;
  norm: string;
  entropia: string;
}

export default function App(): React.JSX.Element {
  // Tipado correcto para las referencias de animaciones GSAP
  const mainDocRef = useRef<HTMLDivElement | null>(null);
  const headerAnimateRef = useRef<(HTMLDivElement | HTMLParagraphElement | HTMLHeadingElement | null)[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Estados tipados para los parámetros del laboratorio
  const [model, setModel] = useState<string>('Linear Congruential (LCG)');
  const [seed, setSeed] = useState<string>('12345678');
  const [multiplier, setMultiplier] = useState<string>('16807');
  const [modulo, setModulo] = useState<string>('2147483647');
  const [sampleSize, setSampleSize] = useState<string>('1000');

  // Datos tipados del Ledger estadístico
  const mockTabla: FilaTabla[] = [
    { id: '0001', raw: '16807', norm: '0.0000078263', entropia: '0.9921' },
    { id: '0002', raw: '282475249', norm: '0.1315371424', entropia: '0.9984' },
    { id: '0003', raw: '1622650073', norm: '0.7556053421', entropia: '0.9972' },
    { id: '0004', raw: '984943658', norm: '0.4586512351', entropia: '0.9910' },
    { id: '0005', raw: '1144108930', norm: '0.5327671239', entropia: '0.9991' },
    { id: '0006', raw: '470211279', norm: '0.2189587311', entropia: '0.9954' },
    { id: '0007', raw: '17411077', norm: '0.0081076324', entropia: '0.9928' },
    { id: '0008', raw: '20112481', norm: '0.0093656112', entropia: '0.9912' },
  ];

  // Datos estructurados para el Histograma (Bar Chart)
  const mockHistograma: ChartData<'bar'> = {
    labels: ['0.0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'],
    datasets: [{
      data: [195, 210, 205, 192, 198],
      backgroundColor: '#1E293B',
      borderColor: '#000000',
      borderWidth: 1,
      barPercentage: 0.9,
      categoryPercentage: 0.9,
    }]
  };

  // Estado con tipado explícito de Chart.js para el Gráfico de Línea
  const [lineData, setLineData] = useState<ChartData<'line'>>({
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: [{
      data: Array.from({ length: 20 }, () => Math.random()),
      borderColor: '#000000',
      borderWidth: 1.5,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#1E293B',
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0,
    }]
  });

  // Manejador del botón con tipado de evento reactivo
  const triggerProtocol = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setLineData({
      labels: Array.from({ length: 20 }, (_, i) => i + 1),
      datasets: [{
        ...lineData.datasets![0],
        data: Array.from({ length: 20 }, () => Math.random()),
      }]
    });
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
    <div className="min-h-screen py-16 px-4 md:px-0">
      <div
        ref={mainDocRef}
        className="max-w-[1000px] mx-auto paper-surface p-12 md:p-20 relative overflow-hidden"
        id="main-document"
      >
        {/* Identificador Lateral Flotante */}
        <div className="hidden lg:block absolute left-12 top-24 opacity-30 rotate-90 origin-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Documento de carácter educativo.</p>
        </div>

        {/* Encabezado */}
        <header className="text-center mb-16" id="doc-header">
          <div ref={el => { headerAnimateRef.current[0] = el; }} className="h-[4px] bg-black w-full mb-4"></div>
          <p ref={el => { headerAnimateRef.current[1] = el; }} className="font-sans text-[11px] tracking-[0.4em] uppercase font-bold text-slate-500 mb-6">
            Universidad de Oriente — Núcleo Nueva Esparta
          </p>

          <h1 ref={el => { headerAnimateRef.current[2] = el; }} className="font-serif text-5xl md:text-6xl font-black leading-tight mb-8">
            Labotario de Simulación Estocástica
          </h1>

          <div ref={el => { headerAnimateRef.current[3] = el; }} className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-sans text-xs uppercase font-semibold text-slate-700 mb-10">
            <span className="flex items-center gap-2"><IconId size={16} /> Autores: Stephania Dos Santos, Saúl Ramos</span>
            <span className="flex items-center gap-2"><IconBuildingCommunity size={16} /> Dpto. Informática y Estadística.</span>
            <span className="flex items-center gap-2"><IconCalendarEvent size={16} /> Presentado: Julio, 2026</span>
          </div>

          <div ref={el => { headerAnimateRef.current[4] = el; }} className="h-[1px] bg-black w-full mb-2"></div>
          <div className="flex justify-between items-center px-1">
            <span className="font-mono text-xs uppercase tracking-widest opacity-40">Período: I-2026</span>
            <span className="font-mono text-xs uppercase tracking-widest opacity-40">Proyecto-I Simulación y Modelos</span>
          </div>
        </header>

        <main className="space-y-20">

          {/* Sección I: Abstract & Parámetros configurables */}
          <section
            ref={el => { sectionsRef.current[0] = el; }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
            id="doc-abstract-params"
          >
            <div className="md:col-span-4 space-y-4">
              <h3 className="font-serif italic font-black text-xl border-b border-black pb-1">Resumen / Abstract</h3>
              <p className="font-serif text-sm leading-relaxed text-slate-800 text-justify">
                Esta herramienta evalua la consistencia empirica de modelos de generación de números pseudo-aleatorios. Mediante el uso de los métodos congruencial multiplicativo y medio cuadrado, se busca medir la entropía y distribución de las secuencias generadas. Los reportes aquí mostrados funcionan como una validación de la metodología computacional del <i className="italic font-bold">Laboratorio Estadístico</i> y su correspondencia con los estándares de equidistribución asintótica.
              </p>
            </div>
            
            {/* Formulario */}
            <div className="md:col-span-8">
              <div className="bg-slate-50 border border-slate-200 p-8">

                {/* Titulo */}
                <h4 className="font-sans text-sm uppercase font-black tracking-[0.2em] border-b border-slate-300 pb-2 mb-8">
                  Parámetros de Generación
                </h4>

                <div className="grid grid-cols-1 space-y-8">

                  {/* Metodo */}
                  <div className="">
                    <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Método Generador</label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="underlined-input font-sans font-bold cursor-pointer"
                    >
                      <option>Congruencial Multiplicativo</option>
                      <option>Medios Cuadrados</option>
                    </select>
                  </div>

                  {/* Parametros */}
                  <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">

                    <div>
                      <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Semilla (X₀)</label>
                      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} className="underlined-input" />
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Multiplicador (a)</label>
                      <input type="text" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="underlined-input" />
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Modulo(m)</label>
                      <input type="text" value={modulo} onChange={(e) => setModulo(e.target.value)} className="underlined-input" />
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase font-bold text-slate-500 mb-2">Tamaño de la muestra (n)</label>
                      <input type="text" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} className="underlined-input w-24" />
                    </div>

                  </div>

                  {/* Boton */}
                  <div className='flex items-center justify-end'>
                      <button onClick={triggerProtocol} className="p-2 border-2 border-slate-500 border-dashed font-bold uppercase text-xs text-slate-500 tracking-[0.2em] transition-transform hover:-translate-y-5 hover:-rotate-10 hover:scale-120 hover:border-emerald-700 hover:text-emerald-700 cursor-pointer">
                        <span>Ejecutar</span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección II: Gráficos Reactivos */}
          <section ref={el => { sectionsRef.current[1] = el; }} className="space-y-8" id="doc-results">
            <h3 className="font-serif italic font-black text-xl">II. Resultados Gráficos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 p-4 bg-white">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">Fig I. Distribución de Frecuencia (Histograma)</p>
                <div className="h-[240px] w-full">
                  <Bar
                    data={mockHistograma}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false }, ticks: { font: { family: 'Space Mono', size: 9 } } },
                        y: { grid: { color: '#F1F1F1' }, ticks: { font: { family: 'Space Mono', size: 9 } } }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="border border-slate-200 p-4 bg-white">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">Fig II. Variación de Secuencia (Gráfico de Lineas)</p>
                <div className="h-[240px] w-full">
                  <Line
                    data={lineData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false }, ticks: { font: { family: 'Space Mono', size: 9 } } },
                        y: { grid: { color: '#F1F1F1' }, ticks: { font: { family: 'Space Mono', size: 9 } } }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sección III: Tabla Ledger Dinámica */}
          <section ref={el => { sectionsRef.current[2] = el; }} className="space-y-6" id="doc-data-table">
            <h3 className="font-serif italic font-black text-xl">III. Tabla de Observación Empírica</h3>

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
                  {mockTabla.map((row) => (
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
            <p className="font-serif italic text-sm text-slate-500 text-center">Nota: La tabla representa las primeras x observaciones de la secuencia (n=y). Aqui deberia haber un boton para ver todo si no lo hacemos paginado pq de repente paginado no le gusta ñiñiñi</p>
          </section>

          {/* Sección IV: Conclusión & Firmas de Autorización */}
          <section ref={el => { sectionsRef.current[3] = el; }} className="space-y-12 pt-8" id="doc-conclusion">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h3 className="font-serif italic font-black text-xl">Conclusión</h3>
              <p className="font-serif text-sm leading-relaxed text-slate-800 italic">
                "Basado en los datos empíricos recolectados y la subsecuente validacion estadística, la secuencia generada exhibe propiedades consistentes con una distribución en el intervalo (0,1). No se detectó periodicidad significante dentro del conjunto de [n] muestras. Se certifica por medio de la presente la validez de este lote de generación para su posterior modelado estocástico."
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-stretch">

              <div className="flex flex-col justify-end">
                <div className="space-y-6">
                  <div className="stamp-box h-32 w-full flex flex-col items-center justify-center p-4">
                    <span className="font-sans text-[8px] text-center uppercase tracking-[0.5em] font-black text-slate-500 mb-4">Sello de la sangre de Cristo</span>
                    <div className="h-12 w-12 border-2 border-slate-300 rounded-full flex items-center justify-center">
                      <IconAward className="text-slate-400" size={20} />
                    </div>
                  </div>
                  <div className="border-t border-black pt-2 mt-12 text-center">
                    <p className="font-sans text-[10px] uppercase font-black">San Pedro el portero</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col justify-end">
                <div className="space-y-4 text-center pb-1">
                  <IconSignature className="mx-auto opacity-20" size={32} />
                  <div className="border-b border-slate-200 w-full mb-4"></div>
                  <p className="font-sans text-[10px] uppercase font-black text-slate-400">Electronic Signature Hash</p>
                  <p className="font-mono text-[8px] truncate opacity-30">A78B-C112-9901-EEFF-4402</p>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <div className="space-y-6">
                  <div className="stamp-box h-32 w-full flex flex-col items-center justify-center p-4">
                    <span className="font-sans text-[8px] text-center uppercase tracking-[0.5em] font-black text-slate-500 mb-4">Autorizacion de Papa Dios</span>
                    <div className="h-12 w-24 border border-dashed border-slate-400 flex items-center justify-center">
                      <span className="font-mono uppercase text-[10px] text-slate-500">Aprobado</span>
                    </div>
                  </div>
                  <div className="border-t border-black pt-2 mt-12 text-center">
                    <p className="font-sans text-[10px] uppercase font-black">Suprema corte del cielito</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

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