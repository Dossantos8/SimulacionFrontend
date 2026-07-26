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

/* Componentes Locales */
import { Header } from './components/Header';
import { Formulario } from './components/Parametros';
import { GraficosResultados } from './components/GraficosResultados';
import { Pruebas } from './components/Pruebas';
import { TablaLedger } from './components/TablaLedger';
import { Conclusion } from './components/Conclusion';
import { Footer } from './components/Footer';
import { SkeletonLoader } from './components/SkeletonLoader';

/* Types y Hooks */
import type { ParametrosSimulacion, FilaMuestra } from './Types/Simulacion';
import { useSimulacion } from './hooks/useSimulacion';

/* Utils */
import { descargarCSV } from './utils/exportaciones';

// Registrar plugins de GSAP y componentes de Chart.js
gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip);

const MAPEO_METODOS: Record<string, string> = {
  'Congruencial': 'congruencial',
  'Medios Cuadrados': 'medios_cuadrados',
};
const MAPEO_DISTRIBUCIONES: Record<string, string> = {
  'Uniforme': 'uniforme',
  'Exponencial': 'exponencial',
  'Normal': 'normal',
  'Erlang': 'erlang',
  'Bernoulli': 'bernoulli',
  'Binomial': 'binomial',
  'Poisson': 'poisson'
};

const obtenerParametrosMetodo = (metodo: string, params: any) => {
  const constructores: Record<string, any> = {
    'congruencial': {
      mult: params.multiplier,
      seed: params.seed,
      mod: params.modulo,
      // Se inyecta aditivo solo si no es 0 para usar el Mixto
      ...(params.aditivo !== 0 ? { aditivo: params.aditivo } : {})
    },
    'medios_cuadrados': {
      seed: params.seed,
      d: params.digitos
    }
  };
  return constructores[metodo] || {};
};

const obtenerParametrosDistribucion = (distribucion: string, params: any) => {
  const constructores: Record<string, any> = {
    'uniforme': { a: params.a, b: params.b },
    'exponencial': { lam: params.lam },
    'normal': { mu: params.mu, sigma: params.sigma },
    'erlang': { k: params.k, lam: params.lam },
    'bernoulli': { p: params.p },
    'binomial': { n_ensayos: params.n_ensayos, p: params.p },
    'poisson': { lam: params.lam }
  };
  return constructores[distribucion] || {};
};

export default function App(): React.JSX.Element {

  // Referencias de animaciones GSAP
  const mainDocRef = useRef<HTMLDivElement | null>(null);
  const headerAnimateRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // States: Formulario
  const FormularioInitialState: ParametrosSimulacion = {
    metodo: 'Congruencial',
    distribucion: 'Uniforme',
    n: 100,
    alpha: 0.05,
    parametros: {
      seed: 16807,
      multiplier: 48271,
      modulo: 2147483647,
      aditivo: 0,
      digitos: 4,
      a: 0.0, b: 1.0, 
      lam: 2.5, 
      mu: 0.0, sigma: 1.0, 
      k: 3, 
      p: 0.5, 
      n_ensayos: 10
    }
  };
  const [formulario, setFormulario] = useState<ParametrosSimulacion>(FormularioInitialState);

  // States: datos procesados
  const [tablaDatos, setTablaDatos] = useState<FilaMuestra[]>([]);

  // Array de resultados
  const { resultados, ejecutarSimulacion, loading } = useSimulacion();

  const simulacionGenerada = resultados !== null && !loading;

  const ejecutarProtocolo = async (e?: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (e) e.preventDefault();

    const metodoBackend = MAPEO_METODOS[formulario.metodo!];
    const distribucionBackend = MAPEO_DISTRIBUCIONES[formulario.distribucion];
    if (!metodoBackend) return;

    const payload: ParametrosSimulacion = {
      metodo: metodoBackend,
      distribucion: distribucionBackend,
      n: formulario.n,
      alpha: formulario.alpha,
      parametros: {
        ...obtenerParametrosMetodo(metodoBackend, formulario.parametros),
        ...obtenerParametrosDistribucion(distribucionBackend, formulario.parametros)
      }
    };
    
    await ejecutarSimulacion(payload);
  };

  //  Super Hardcodeado esto, habria que pasarlo a otro componente
  //  De paso quitar el useEffect, para que queremos actualizar el histograma si los datos vienen del backend?  
  useEffect(() => {
    if (resultados && resultados.x && resultados.u) {
      const muestrasX = resultados.x; // Datos de la distribución
      const muestrasU = resultados.u; // Base (0,1)

      const conteos = [0, 0, 0, 0, 0];
      muestrasX.forEach((v: number) => {
        if (v < 0.2) conteos[0]++;
        else if (v < 0.4) conteos[1]++;
        else if (v < 0.6) conteos[2]++;
        else if (v < 0.8) conteos[3]++;
        else conteos[4]++;
      });

      const nuevasFilas: FilaMuestra[] = muestrasX.map((valX: number, index: number) => ({
        id: String(index + 1).padStart(4, '0'),
        // Si es distribución discreta (entero) mostramos sin decimales, si es continua, 4 decimales
        x: Number.isInteger(valX) ? valX : valX.toFixed(4), 
        u: muestrasU[index].toFixed(4),
      }));

      setTablaDatos(nuevasFilas);
    }
  }, [resultados, formulario.metodo, formulario.parametros.modulo, formulario.parametros.digitos]);

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

        <Header />

        <main className="space-y-20">

          {/* 2. Formulario */}
          <Formulario
            loading={loading}
            onEjecutar={ejecutarProtocolo}
            formulario={formulario}
            setFormulario={setFormulario}
          />

          {loading ? (
             <SkeletonLoader /> 
          ) : simulacionGenerada ? (
            <>
              {/* Sección II: Gráficos Reactivos */}
              <GraficosResultados muestras={resultados.x} />
              {/* III: Pruebas */}
              <Pruebas resultados={resultados} />
              {/* Sección IV: Tabla Ledger Dinámica */}
              <TablaLedger tabla={tablaDatos} verTodasFilas={false} setVerTodasFilas={() => { }} />
              {/* Sección V: Conclusión & Firmas de Autorización */}
              <Conclusion totalMuestras={formulario.n} />
            </>
          ) : null}
        </main>

        <Footer simulacionGenerada={simulacionGenerada} descargarCSV={() => descargarCSV(tablaDatos, formulario.metodo!, formulario.n)} />

      </div>
    </div>
  );
}