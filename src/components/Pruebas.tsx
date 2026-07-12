import type { SimulacionResults } from "../Types/Simulacion";
import { PruebaCard } from "./PruebaCard";

interface Pruebas{
  resultados: SimulacionResults;
}

export function Pruebas( {resultados}: Pruebas) {

  const dPositivas = resultados.pruebas.K_Smirnov.diferencias_positivas;
  const dNegativas = resultados.pruebas.K_Smirnov.diferencias_negativas;

  const dMas = Math.max(...dPositivas);
  const dMenos = Math.max(...dNegativas);

  const tablaData = [
    { metodo: "Kolmogorov-Smirnov", ec: resultados.pruebas.K_Smirnov.estadistico_D.toFixed(4), vc: resultados.pruebas.K_Smirnov.valor_critico.toFixed(4) },
    { metodo: "Varianza", ec: resultados.pruebas.Varianza.valor_estadistico.toFixed(4), vc: resultados.pruebas.Varianza.valor_critico[1].toFixed(4) },
    { metodo: "Rachas (Independencia)", ec: resultados.pruebas.Rachas.estadistico_Z.toFixed(4), vc: resultados.pruebas.Rachas.valor_critico_Z.toFixed(4) },
    { metodo: "Media", ec: resultados.pruebas.Media.estadistico.toFixed(4), vc: resultados.pruebas.Media.valor_critico[1].toFixed(4) },
  ];
  return (
    <section className='space-y-6'>
      <h3 className="border-b-2 pb-6 font-serif italic font-black text-xl">III. Análisis de Resultados (Pruebas)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
       <PruebaCard 
          estado={resultados.pruebas.K_Smirnov.rechazar_H0 ? "Rechazada" : "Aprobada"} 
          nombre="K-Smirnov" 
          FilaDatos={[{ label: "D⁺", valor: dMas.toFixed(4) }, { label: "D⁻", valor: dMenos.toFixed(4) }]} 
        />
        <PruebaCard 
          estado={resultados.pruebas.Media.rechazar_H0 ? "Rechazada" : "Aprobada"} 
          nombre="Media" 
          FilaDatos={[{ label: "Lim. Inf", valor: resultados.pruebas.Media.valor_critico[0].toFixed(4) }, { label: "Lim. Sup", valor: resultados.pruebas.Media.valor_critico[1].toFixed(4) }]} 
        />
        <PruebaCard 
          estado={resultados.pruebas.Varianza.rechazar_H0 ? "Rechazada" : "Aprobada"} 
          nombre="Varianza" 
          FilaDatos={[{ label: "Lim. Inf", valor: resultados.pruebas.Varianza.chi2_limite_inferior.toFixed(4) }, { label: "Lim. Sup", valor: resultados.pruebas.Varianza.chi2_limite_superior.toFixed(4) }]} 
        />
        <PruebaCard 
          estado={resultados.pruebas.Rachas.rechazar_H0 ? "Rechazada" : "Aprobada"} 
          nombre="Rachas" 
          FilaDatos={[{ label: "μ", valor: resultados.pruebas.Rachas.rachas_esperadas.toFixed(4)}, { label: "c₀", valor: resultados.pruebas.Rachas.rachas_observadas.toFixed(4)}, { label: "σ²", valor: resultados.pruebas.Rachas.desviacion_estandar_R.toFixed(4)}]} 
        />
      </div>

      <div className='overflow-x-auto'>
        <table className="w-full latex-table border-separate border-spacing-y-2">
          <thead className='bg-slate-50'>
            <tr data-kid="86">
              <th className=" w-1/4 text-left pb-2">Método de Prueba</th>
              <th className="w-1/4 text-left pb-2">Valor Estadístico</th>
              <th className="w-1/4 text-left pb-2">Valor Crítico</th>
            </tr>
          </thead>
          <tbody data-kid="91">
            {tablaData.map((f, index) => (
              <tr key= {index} data-kid="92">
                <td className="py-2 px-4 border-b border-slate-200 mono" data-kid="93">{f.metodo}</td>
                <td className="py-2 px-4 border-b border-slate-200 mono" data-kid="94">{f.ec}</td>
                <td className="py-2 px-4 border-b border-slate-200 mono" data-kid="95">{f.vc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}