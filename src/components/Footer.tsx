
interface props{
    simulacionGenerada: boolean;
    descargarCSV: () => void;
}
export function Footer({simulacionGenerada, descargarCSV}: props){
    return(
        <footer className="mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            {simulacionGenerada && (
              <>
                <button
                  onClick={() => window.print()}
                  className="font-sans text-[10px] uppercase font-black hover:text-slate-500 transition-colors cursor-pointer"
                >
                  Descargar PDF
                </button>
                <button
                  onClick={descargarCSV}
                  className="font-sans text-[10px] uppercase font-black hover:text-slate-500 transition-colors cursor-pointer"
                >
                  Exportar datos crudos (.CSV)
                </button>
              </>
            )}

          </div>
          <p className="font-sans text-[10px] uppercase font-black opacity-30 text-center">© 2026 Laboratorio de Simulación Estocástica | All Rights Reserved</p>
        </footer>
    );
}