
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import MinecraftCommandTool from '@/components/MinecraftCommandTool';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl minecraft-font">MC</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Minecraft Command Tool
                  </h1>
                  <p className="text-slate-400 mt-1">
                    Autocompletador, validador e simulador de comandos interativo
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
