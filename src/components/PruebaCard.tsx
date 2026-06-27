interface Props {
  estado: string;
  nombre: string;
  variable: string;
  valor: number;
}
export function PruebaCard({ estado, nombre, variable, valor }: Props) {
  return (
    <div className="shadow-md border border-slate-300 space-y-2 p-4 text-center">
      <span className="border-2 border-emerald-300 py-1 px-2 text-xs text-emerald-500 font-bold">{estado}</span>
      <div className="mt-2 font-bold text-sm">{nombre}</div>
      <div className="mono text-xs font-bold text-slate-700 mt-1">{variable} = {valor}</div>
    </div>
  );
}