
interface FilaDatos {
  label: string;
  valor : number | string;
}

interface Props {
  estado: string;
  nombre: string;
  FilaDatos: FilaDatos[];
}
export function PruebaCard({ estado, nombre, FilaDatos }: Props) {
  return (
    <div className="shadow-md border border-slate-300 space-y-2 p-4 text-center">

      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
        <div className="mt-2 font-bold text-sm">{nombre}</div>
        <span className="border-2 border-emerald-300 py-1 px-2 text-xs text-emerald-500 font-bold">
          {estado}
        </span>

      </div>
      <div className="space-y-2 mt-2">
        {FilaDatos.map((fila) => (
          <div className="flex justify-between text-xs border-b border-slate-300 pb-2">
            <span className="font-bold">{fila.label}</span>
            <span>{fila.valor}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}