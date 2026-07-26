import type { ResultadoSimulacion } from "../Types/Simulacion";
import { PruebaCard } from "./PruebaCard";

interface Pruebas {
  resultados: ResultadoSimulacion;
}

export function Pruebas({ resultados }: Pruebas) {

  const bondad = resultados.pruebas.Bondad_Ajuste;
  const esKS = bondad.nombre_prueba.includes("Kolmogorov");
  let filasBondad = [];
  if (esKS && bondad.diferencias_positivas && bondad.diferencias_negativas) {
    const dMas = Math.max(...bondad.diferencias_positivas);
    const dMenos = Math.max(...bondad.diferencias_negativas);
    filasBondad = [
      { label: "D+", valor: dMas.toFixed(4) },
      { label: "D-", valor: dMenos.toFixed(4) }
    ];
  } else {
    filasBondad = [
      { label: "χ²", valor: bondad.estadistico.toFixed(4) },
      { label: "g.l.", valor: bondad.grados_libertad || 0 }
    ];
  }

  const tablaData = [
    { metodo: bondad.nombre_prueba, ec: bondad.estadistico.toFixed(4), vc: bondad.valor_critico.toFixed(4) },
    { metodo: "Varianza", ec: resultados.pruebas.Varianza.valor_estadistico.toFixed(4), vc: resultados.pruebas.Varianza.valor_critico[1].toFixed(4) },
    { metodo: "Rachas (Independencia)", ec: resultados.pruebas.Rachas.estadistico_Z.toFixed(4), vc: resultados.pruebas.Rachas.valor_critico_Z.toFixed(4) },
    { metodo: "Media", ec: resultados.pruebas.Media.estadistico.toFixed(4), vc: resultados.pruebas.Media.valor_critico[1].toFixed(4) },
  ];

  const cardsData = [
    { nombre: esKS ? "K-Smirnov" : "Chi-Cuadrado", rechazada: bondad.rechazar_H0, FilaDatos: filasBondad },
    { nombre: "Media", rechazada: resultados.pruebas.Media.rechazar_H0, FilaDatos: [{ label: "Lim. Inf", valor: resultados.pruebas.Media.valor_critico[0].toFixed(4) }, { label: "Lim. Sup", valor: resultados.pruebas.Media.valor_critico[1].toFixed(4) }] },
    { nombre: "Varianza", rechazada: resultados.pruebas.Varianza.rechazar_H0, FilaDatos: [{ label: "Lim. Inf", valor: resultados.pruebas.Varianza.chi2_limite_inferior.toFixed(4) }, { label: "Lim. Sup", valor: resultados.pruebas.Varianza.chi2_limite_superior.toFixed(4) }] },
    { nombre: "Rachas", rechazada: resultados.pruebas.Rachas.rechazar_H0, FilaDatos: [{ label: "μ", valor: resultados.pruebas.Rachas.rachas_esperadas.toFixed(4) }, { label: "c", valor: resultados.pruebas.Rachas.rachas_observadas.toFixed(4) }, { label: "σ", valor: resultados.pruebas.Rachas.desviacion_estandar_R.toFixed(4) }] },
  ];
  return (
    <section className='space-y-6'>
      <h3 className="border-b-2 pb-6 font-serif italic font-black text-xl">III. Análisis de Resultados (Pruebas)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {cardsData.map((c, index) => (
          <PruebaCard
            key={index}
            nombre={c.nombre}
            rechazada={c.rechazada}
            FilaDatos={c.FilaDatos}
          />
        ))}
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
              <tr key={index} data-kid="92">
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