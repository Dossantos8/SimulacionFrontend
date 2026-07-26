import type { FilaMuestra } from '../Types/Simulacion';

export const descargarCSV = (
  tablaDatos: FilaMuestra[], 
  metodo: string, 
  n: number
): void => {
  if (tablaDatos.length === 0) return;

  let csvContent = "sep=;\n";
  csvContent += "Indice;Salida Cruda (Xi);Valor Normalizado (Ri)\n";

  tablaDatos.forEach(row => {
    csvContent += `${row.id};${row.u};${row.x}\n`;
  });

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  
  const nombreMetodo = metodo.replace(/\s+/g, '_');
  link.setAttribute("download", `Simulacion_${nombreMetodo}_n${n}.csv`);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url); 
};