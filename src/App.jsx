
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import MinecraftCommandTool from '@/components/MinecraftCommandTool';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import sobrePage from './pages/sobre.jsx';
import termoPage from './pages/termos.jsx';
import PaginaErro from './pages/404.jsx';
import siteInfo from "@/data/siteInfo.js";
function App() {
  const [SITENAME, SLOGAN, MINSLOGAN, DESCRIPTION, AUTHOR, GITHUB, YOUTUBE, KEYWORDS,VERSION, LANGUAGE, PAGES, SOCIAL] = Object.values(siteInfo);
  const [Sobre, sobreN, sobreP] = sobrePage;
const [Termos, termosN, termosP] = termoPage;

function PageWrapper() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = `${SITENAME} - ${SLOGAN}`;
        break;
      case sobreP:
        document.title = `${sobreN} - ${SITENAME}`;
        break;
      case termosP:
        document.title = `${termosN} - ${SITENAME}`;
        break;
      default:
        document.title = `${SITENAME} - ${SLOGAN}`;
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<MinecraftCommandTool />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="*" element={<PaginaErro />} />
    </Routes>
  );
}

  return (
   <HelmetProvider>
      <Helmet>
        <title>{SITENAME} - {SLOGAN}</title>
<link rel="icon" href="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc/favicon/favicon.ico" />
<link rel="shortcut icon" type="image/png" href="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="apple-touch-icon" sizes="180x180" href="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc/favicon/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content={SITENAME} />
        <meta
          name="description"
          content={DESCRIPTION}
        />

        <meta
          name="keywords"
          content={KEYWORDS.map(i => i.toLowerCase()).join(", ")}
        />

        <meta name="author" content={SITENAME} />
        <meta name="robots" content="index, follow" />

<meta itemprop="name" content={{SITENAME} - {SLOGAN}}  />
<meta itemprop="description" content={DESCRIPTION} />
<meta itemprop="image" content="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc-social.png" />
        {/* Open Graph para redes sociais */}
        <meta property="og:title" content={{SITENAME} - {SLOGAN}} />
        <meta
          property="og:description"
          content={DESCRIPTION}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codemc.vercel.app" />
        <meta property="og:image" content="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc-social.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={{SITENAME} - {SLOGAN}} />
        <meta
          name="twitter:description"
          content={DESCRIPTION}
        />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc-social.png" />

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
                <a href="/">
                  <img src="https://raw.githubusercontent.com/atmbr/codemc/main/src/assets/imagem/codemc/codemc-logo.png" alt="" className="w-auto h-auto  pointer-events-none" />
                </a>
                </div>
                <div>
                  <a href="/" className="block w-fit">
                  <h1 className="font-ten text-3xl bg-gradient-to-r bg-white bg-clip-text text-transparent  pointer-events-none">
                    Code<span  className='bg-green-500 e bg-clip-text text-transparent'>Mc</span>
                  </h1>
                  </a>
                  <p className="text-slate-400 mt-1">
                    {MINSLOGAN}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <React.StrictMode>
            <BrowserRouter>
              <PageWrapper />
            </BrowserRouter>
        </React.StrictMode>
        
        </main>
        <footer className="text-center py-8 mt-12 border-t border-slate-700/50">
        {/* <Modal setCommand={setCommand} isOpen={isModalOpen} history={true} setIsOpen={setIsModalOpen} title="Histórico:" description="Aqui estara o histrico." children="" footer=""/> */}
        <nav className='flex justify-center gap-4 mb-4 '>
          {PAGES.map(p => (
            <a key={p.path} href={p.path} className="hover:text-green-400">
              {p.shortName || p.name}
            </a>
          ))}
        </nav>
          <p className="text-slate-500 text-sm">
            Criado com <span className="text-red-400">❤️</span> por <a className="text-green-400 hover:underline" href={YOUTUBE} target='_blank'>{AUTHOR}</a>.
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Esta ferramenta não é afiliada à Mojang.
          </p>
          <p className="text-slate-600 text-xs mt-6 ">
            Versão {VERSION} - {LANGUAGE}
          </p>
        </footer>
      </div>
      
      <Toaster />
    </div>
    </HelmetProvider>
  );
}

export default App;
