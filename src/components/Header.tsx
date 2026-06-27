import React from "react";
import { IconId, IconBuildingCommunity, IconCalendarEvent } from "@tabler/icons-react";

export const Header: React.FC = () => {
    return (
         <header className="text-center mb-16" id="doc-header">
          <div className="animate-header h-[4px] bg-black w-full mb-4"></div>
          <p className="animate-header font-sans text-[11px] tracking-[0.4em] uppercase font-bold text-slate-500 mb-6">
            Universidad de Oriente — Núcleo Nueva Esparta
          </p>

          <h1 className="animate-header font-serif text-3xl sm:text-5xl font-black leading-tight mb-8">
            Laboratorio de Simulación Estocástica
          </h1>

          <div className="animate-header flex flex-wrap justify-start sm:justify-center gap-x-8 gap-y-4 font-sans text-xs uppercase font-semibold text-slate-700 mb-8">
            <span className="flex items-start text-start sm:text-center sm:items-center gap-2"><IconId size={16} /> Autores: Stephania Dos Santos, Saúl Ramos</span>
            <span className="flex items-start sm:items-center gap-2"><IconBuildingCommunity size={16} /> Dpto. Informática y Estadística.</span>
            <span className="flex items-start sm:items-center gap-2"><IconCalendarEvent size={16} /> Presentado: Julio, 2026</span>
          </div>

          <div className="animate-header h-[1px] bg-black w-full mb-2"></div>
          <div className="flex justify-between items-center px-1">
            <span className="font-mono text-xs uppercase tracking-widest opacity-40">Período: I-2026</span>
            <span className="font-mono text-xs uppercase tracking-widest opacity-40">Proyecto-I Simulación y Modelos</span>
          </div>
        </header>
    );
};
 
