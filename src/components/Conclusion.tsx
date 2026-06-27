import React from 'react';
import { IconAward, IconSignature } from '@tabler/icons-react';

interface ConclusionProps {
    totalMuestras: number;
}

export const Conclusion: React.FC<ConclusionProps> = ({ totalMuestras }) => {
    return (
        <section className="animate-section space-y-12 pt-8" id="doc-conclusion">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h3 className="font-serif italic font-black text-xl">Conclusión</h3>
              <p className="font-serif text-sm leading-relaxed text-slate-800 italic">
                "Basado en los datos empíricos recolectados y la subsecuente validacion estadística, la secuencia generada exhibe propiedades consistentes con una distribución en el intervalo (0,1). No se detectó periodicidad significante dentro del conjunto de <b>{totalMuestras}</b> muestras. Se certifica por medio de la presente la validez de este lote de generación para su posterior modelado estocástico."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 items-stretch">

              <div className="flex flex-col justify-end">
                <div className="space-y-6">
                  <div className="stamp-box h-32 w-full flex flex-col items-center justify-center p-4">
                    <span className="font-sans text-[8px] text-center uppercase tracking-[0.5em] font-black text-slate-500 mb-4">Sello de la sangre de Cristo</span>
                    <div className="h-12 w-12 border-2 border-slate-300 rounded-full flex items-center justify-center">
                      <IconAward className="text-slate-400" size={20} />
                    </div>
                  </div>
                  <div className="border-t border-black pt-2 mt-12 text-center">
                    <p className="font-sans text-[10px] uppercase font-black">San Pedro el portero</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <div className="space-y-6">
                  <div className="stamp-box h-32 w-full flex flex-col items-center justify-center p-4">
                    <span className="font-sans text-[8px] text-center uppercase tracking-[0.5em] font-black text-slate-500 mb-4">Autorizacion de Papa Dios</span>
                    <div className="h-12 w-24 border border-dashed border-slate-400 flex items-center justify-center">
                      <span className="font-mono uppercase text-[10px] text-slate-500">Aprobado</span>
                    </div>
                  </div>
                  <div className="border-t border-black pt-2 mt-12 text-center">
                    <p className="font-sans text-[10px] uppercase font-black">Suprema corte del cielito</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
    );
}

