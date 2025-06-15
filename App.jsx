
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import MinecraftCommandTool from '@/components/MinecraftCommandTool';

function App() {
  return (
    <div className="min-h-screen bg-primary bg-100">
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="relative z-10">
        <header className="bg-header flex flex-col gap-3 leading-5 border-gray-500/60 border-b
         backdrop-blur-sm sticky top-0 z-50 h-fit bg-zinc-950/80">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-seven">MC</span>
                </div>
                <div>
                  <h1 className="font-ten text-3xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Minecraft Command Tools
                  </h1>
                  <p className="text-slate-400 mt-1">
                    Escreva, valide e simule comandos com facilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </header>

        <main className="container mx-auto px-4 py-8">
          <MinecraftCommandTool />
        </main>

        <footer className="text-center py-8 mt-12 border-t border-slate-700/50">
          <p className="text-slate-500 text-sm">
            Criado com <span className="text-red-400">❤️</span> por Hostinger Horizons AI.
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Minecraft é uma marca registrada da Mojang Synergies AB. Esta ferramenta não é afiliada à Mojang.
          </p>
        </footer>
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
