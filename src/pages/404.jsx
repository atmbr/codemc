import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PaginaErro() {
  return (
     <div className="flex items-center justify-center min-h-screen text-slate-300 px-4">
      <div className="rounded-2xl p-8 md:p-10 shadow-xl text-center max-w-md w-full space-y-6">
        <div className="text-8xl font-black text-white">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Página não encontrada</h1>
        <p className="text-sm md:text-base leading-relaxed text-slate-400">
          Opa! Parece que você tentou acessar uma página que não existe ou foi movida. 😕
        </p>
        <Button 
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={() => window.location.href = '/'}
        >
          Voltar para a página inicial
        </Button>
        <div className="text-xs text-slate-500 pt-2">
          Erro 404 – Recurso não encontrado
        </div>
      </div>
    </div>
  );
}

export default PaginaErro;
