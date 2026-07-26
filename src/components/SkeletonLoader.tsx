import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full space-y-12 animate-pulse mt-8">
      {/* Skeleton for GraficosResultados */}
      <section className="space-y-6">
        <div className="h-8 bg-slate-100 w-1/3 mb-6"></div> {/* Title skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[280px] bg-slate-100 rounded-md"></div>
          <div className="h-[280px] bg-slate-100 rounded-md"></div>
          <div className="h-[280px] bg-slate-100 rounded-md md:col-span-2"></div>
        </div>
      </section>

      {/* Skeleton Pruebas */}
      <section className="space-y-6">
        <div className="h-8 bg-slate-100 w-1/4 mb-6"></div> {/* Title skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
           {/* 4 Cards Skeleton */}
          <div className="h-32 bg-slate-100 rounded-md"></div>
          <div className="h-32 bg-slate-100 rounded-md"></div>
          <div className="h-32 bg-slate-100 rounded-md"></div>
          <div className="h-32 bg-slate-100 rounded-md"></div>
        </div>
        {/* Skeleton Tabla */}
        <div className="h-48 bg-slate-100 w-full rounded-md"></div>
      </section>

      {/* Skeleton TablaLedger */}
      <section className="space-y-6">
        <div className="flex justify-between items-center mb-4">
            <div className="h-8 bg-slate-100 w-1/4"></div>
            <div className="h-8 bg-slate-100 w-8"></div>
        </div>
        <div className="h-[400px] bg-slate-100 w-full rounded-md"></div>
      </section>
    </div>
  );
};