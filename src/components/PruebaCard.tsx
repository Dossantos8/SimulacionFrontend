import { useEffect, useState } from 'react';
import {CircleCheck, CircleX} from 'lucide-react';

interface FilaDatos {
  label: string;
  valor : number | string;
}

interface Props {
  nombre: string;
  rechazada: boolean;
  FilaDatos: FilaDatos[];
}
export function PruebaCard({ rechazada, nombre, FilaDatos }: Props) {

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const revisarPantalla = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    revisarPantalla();

    window.addEventListener('resize', revisarPantalla);

    return () => window.removeEventListener('resize', revisarPantalla);
  }, []);

  const estadoColor = !rechazada ? "text-emerald-500" : "text-red-500";

  return (
    <div className="shadow-md border border-slate-300 space-y-2 p-4 text-center">

      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
        <div className="mt-2 font-bold text-sm">{nombre}</div>
        <span className={`text-xs font-bold flex items-center justify-center shrink-0 ${estadoColor} ${!isMobile ? 'border-2 py-1 px-2' : ''}`}>
            {isMobile ? (!rechazada ? <CircleCheck /> : <CircleX />) : !rechazada ? "Aprobada" : "Rechazada"} 
        </span>

      </div>
      <div className="space-y-2 mt-2">
        {FilaDatos.map((fila, index) => (
          <div key= {index} className="flex justify-between text-xs border-b border-slate-300 pb-2">
            <span className="font-bold">{fila.label}</span>
            <span>{fila.valor}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}