import type { FilaPrueba } from "../types/Simulacion";
import { PruebaCard } from "./PruebaCard";


const mockTabla2: FilaPrueba[] = [
  {
    metodo: "Kolmogorov-Smirnov",
    ec: 0.02412,
    vc: 0.04300,
    estado: "H₀ no rechazada"
  },
  {
    metodo: "Varianza",
    ec: 98.016,
    vc: 1.01200,
    estado: "H₀ no rechazada"
  },
  {
    metodo: "Rachas (Independencia)",
    ec: 1.12054,
    vc: 1.96000,
    estado: "H₀ no rechazada"
  },
  {
    metodo: "Media",
    ec: 2.45012,
    vc: 1.96000,
    estado: "H₀ no rechazada"
  }
]
export function SectionPruebas() {
  return (
    <section className='space-y-6'>
      <h3 className="border-b-2 pb-6 font-serif italic font-black text-xl">III. Análisis de Resultados (Pruebas)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <PruebaCard estado="Aprobada" nombre="K-Smirnov" variable="D" valor={0.0241} />
        <PruebaCard estado="Aprobada" nombre="Rachas" variable="Z" valor={1.1205} />
        <PruebaCard estado="Aprobada" nombre="Media" variable="Z" valor={2.4501} />
        <PruebaCard estado="Aprobada" nombre="Varianza" variable="ChiÑo" valor={98.4} />
      </div>

      <div className='overflow-x-auto'>
        <table className="w-full latex-table">
          <thead className='bg-slate-50'>
            <tr data-kid="86">
              <th data-kid="87">Método de Prueba</th>
              <th data-kid="88">Estadístico Calculado</th>
              <th data-kid="89">Valor Crítico</th>
              <th data-kid="90">P-Valor / Estado</th>
            </tr>
          </thead>
          <tbody data-kid="91">
            {mockTabla2.map((f) => (
              <tr data-kid="92">
                <td data-kid="93">{f.metodo}</td>
                <td className="mono" data-kid="94">{f.ec}</td>
                <td className="mono" data-kid="95">{f.vc}</td>
                <td data-kid="96"><span className="text-green-700 font-bold" data-kid="97">{f.estado}</span></td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </section>
  );
}