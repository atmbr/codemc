
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import MinecraftCommandTool from '@/components/MinecraftCommandTool';
import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {
  return (
   <HelmetProvider>
      <Helmet>
        <title>CodeMC | Ferramenta para Comandos Minecraft</title>
<link rel="icon" href="https://i.imgur.com/RGnReHp.png" />
<link rel="shortcut icon" type="image/png" href="https://i.imgur.com/RGnReHp.png" sizes="96x96" />
<link rel="apple-touch-icon" sizes="180x180" href="https://i.imgur.com/RGnReHp.png" />
<meta name="apple-mobile-web-app-title" content="CodeMc" />
        <meta
          name="description"
          content="CodeMC ajuda jogadores Minecraft a criar, validar e simular comandos facilmente, eliminando erros e dúvidas. Use nosso editor intuitivo para comandos Minecraft e jogue sem complicação."
        />

        <meta
          name="keywords"
          content="comandos Minecraft, criar comandos Minecraft, validar comandos Minecraft, simular comandos Minecraft, editor de comandos Minecraft, ferramenta para jogadores, comandos sem erro, CodeMC, command, block, mcpe, minecraft, bedrock, java, online"
        />

        <meta name="author" content="CodeMC" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para redes sociais */}
        <meta property="og:title" content="CodeMC | Ferramenta para Comandos Minecraft" />
        <meta
          property="og:description"
          content="Crie, valide e simule comandos Minecraft com CodeMC e elimine erros no jogo. Ferramenta prática e fácil para todos os jogadores Minecraft."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codemc.vercel.app" />
        <meta property="og:image" content="https://codemc.vercel.app/imagem-codemc.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CodeMC | Ferramenta para Comandos Minecraft" />
        <meta
          name="twitter:description"
          content="Crie, valide e simule comandos Minecraft com CodeMC e elimine erros no jogo. Ferramenta prática e fácil para jogadores Minecraft."
        />
        <meta name="twitter:image" content="https://codemc.vercel.app/imagem-codemc.png" />

      </Helmet>
    <div className="min-h-screen bg-primary bg-100">
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="relative z-10">
        <header className="bg-header flex flex-col gap-3 leading-5 border-gray-500/60 border-b
         backdrop-blur-sm sticky top-0 z-50 h-fit bg-zinc-950/80">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 ">
                <div className="w-16 h-12 flex items-center justify-center">
                  <img src="./src/assets/imagem/codemc/codemc-logo.png" alt="" className="w-auto h-auto  pointer-events-none" />
                </div>
                <div>
                  <h1 className="font-ten text-3xl bg-gradient-to-r bg-white bg-clip-text text-transparent  pointer-events-none">
                    Code<span  className='bg-green-500 e bg-clip-text text-transparent'>Mc</span>
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
            Criado com <span className="text-red-400">❤️</span> por <a className="text-green-400 hover:underline" href="https://youtube.com/@atmdois" target='_blank'>Atm</a>.
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Esta ferramenta não é afiliada à Mojang.
          </p>
        </footer>
      </div>
      
      <Toaster />
    </div>
    </HelmetProvider>
  );
}

export default App;
