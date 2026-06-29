import type { FilaPrueba } from "../Types/Simulacion";
import { PruebaCard } from "./PruebaCard";

const mockTabla2: FilaPrueba[] = [
  {
    metodo: "Kolmogorov-Smirnov",
    ec: 0.02412,
    vc: 0.04300,
  },
  {
    metodo: "Varianza",
    ec: 98.016,
    vc: 1.01200,
  },
  {
    metodo: "Rachas (Independencia)",
    ec: 1.12054,
    vc: 1.96000,
  },
  {
    metodo: "Media",
    ec: 2.45012,
    vc: 1.96000,
  }
]
export function SectionPruebas() {
  return (
    <section className='space-y-6'>
      <h3 className="border-b-2 pb-6 font-serif italic font-black text-xl">III. Análisis de Resultados (Pruebas)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <PruebaCard estado="Rechazada" nombre="K-Smirnov" FilaDatos={[{ label: "D⁺", valor: 0.036127 }, { label: "D⁻", valor: 0.036804 }]} />
        <PruebaCard estado="Aprobada" nombre="Media" FilaDatos={[{ label: "Lim. Inf", valor: 0.443420 }, { label: "Lim. Sup", valor: 1.536580 }]} />
        <PruebaCard estado="Aprobada" nombre="Varianza" FilaDatos={[{ label: "Lim. Inf", valor: 0.443420 },{ label: "Lim. Sup", valor: 1.536580 }]} />
        <PruebaCard estado="Aprobada" nombre="Rachas" FilaDatos={[{ label: "μ", valor: 250.5 },{ label: "σ²", valor: 12.3}, { label: "c₀", valor: 240}]} />
      </div>

      <div className='overflow-x-auto'>
        <table className="w-full latex-table">
          <thead className='bg-slate-50'>
            <tr data-kid="86">
              <th data-kid="87">Método de Prueba</th>
              <th data-kid="88">Valor Estadístico</th>
              <th data-kid="89">Valor Crítico</th>
            </tr>
          </thead>
          <tbody data-kid="91">
            {mockTabla2.map((f) => (
              <tr data-kid="92">
                <td data-kid="93">{f.metodo}</td>
                <td className="mono" data-kid="94">{f.ec}</td>
                <td className="mono" data-kid="95">{f.vc}</td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </section>
  );
}