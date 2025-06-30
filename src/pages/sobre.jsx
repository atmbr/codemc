import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal'
import AlertModal from '@/components/AlertModal';
import useAlert from '@/hooks/useAlert';
import siteInfo from "@/data/siteInfo.js";
function Sobre() {
   const [SITENAME, SLOGAN, MINSLOGAN, DESCRIPTION, AUTHOR, GITHUB, YOUTUBE, KEYWORDS,VERSION, LANGUAGE, PAGES, SOCIAL] = Object.values(siteInfo);
      const [isModalOpen, setIsModalOpen] = useState(false);
      
    const {
      isAlertOpen: isNewsAlertOpen,
      checkAndShowAlert: checkAndShowNewsAlert,
      closeAlertAndRemember: closeNewsAlert,
      showAlert: showNewsAlert
    } = useAlert('alertModalSeen_v2');

     useEffect(() => {
        checkAndShowNewsAlert();
      }, [checkAndShowNewsAlert]);
    const onHelpClick = () => {
        setIsModalOpen(true)
    }
    const onAlertClick = () => {
        // alert("Atualizações futuras serão anunciadas aqui!");
    };
    return (
        <div className="max-w-3xl mx-auto p-6 md:p-8 text-white space-y-8">
      <div className="flex items-center gap-3">
        <TerminalIcon className="w-6 h-6 text-green-400" />
        <h1 className="flex gap-3 text-3xl font-bold">Sobre a Ferramenta.</h1>
      </div>

      <p className="text-base leading-relaxed">
        Opa! Tudo certo? 👋 Eu sou o <a href={YOUTUBE} target="_blank" className="text-green-400 font-semibold hover:underline">Atm</a>, só mais um jogador que adora explorar o lado técnico do Minecraft.
        Com o tempo, percebi que muita gente se confunde nessa parte, então pensei: por que não criar algo que torne tudo mais visual e fácil de entender?
      </p>

      <p className="text-base leading-relaxed">
        Foi aí que nasceu essa ferramenta. A ideia é simples: te ajudar a montar comandos, testar variações e entender melhor como eles funcionam, direto no navegador, sem complicação.
        Nada aqui é super profissional, mas tudo foi feito com carinho, pensando em quem tá começando ou só quer economizar tempo. 😊
      </p>

      <div className="border-l-4 border-yellow-400 pl-4 text-sm italic text-yellow-300">
        ⚠️ Só um aviso: essa ferramenta ainda está em construção. Pode conter alguns erros ou comportamentos inesperados. Se algo parecer estranho, respira fundo e, se puder, me manda um feedback. Vai ajudar muito!
      </div>

      <div className="space-y-3 text-base">
        <h2 className="text-xl font-semibold">💡 O que dá pra fazer por aqui?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Montar comandos com sugestões automáticas</li>
          <li>Evitar de perder tudo ao errar um comando no jogo</li>
          <li>Testar ideias rapidamente, sem abrir o mundo</li>
          <li>Explorar a estrutura de comandos com mais clareza</li>
        </ul>
      </div>

      <p className="text-sm text-slate-400">
        No fim das contas, essa é uma ferramenta feita por um jogador, para outros jogadores. Nada aqui é oficial, mas se te ajudar nem que seja um pouquinho, já valeu a pena 💚
      </p>

      <div className="pt-4 grid flex-wrap gap-3 grid-cols-1 items-center sm:grid-cols-3 max-w-xs sm:max-w-max m-auto ">
        <Button
          onClick={() => window.open(GITHUB, "_blank")}
          variant="default"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Ver código no GitHub
        </Button>
        <Button variant="ghost" className="text-slate-300 hover:text-blue-400" onClick={onHelpClick}>
          Como usar
        </Button>
        <Button variant="ghost" className="text-slate-300 hover:text-yellow-400" onClick={showNewsAlert}>
          Atualizações
        </Button>
      </div>

      <AlertModal isOpen={isNewsAlertOpen} onOpenChange={closeNewsAlert} />
      <Modal isOpen={isModalOpen} history={false} setIsOpen={setIsModalOpen} title="Como usar a ferramenta" description="Veja aqui um breve resumo de como funciona a ferramenta." />
    </div>


    );
}


export default [Sobre, "Sobre", "/sobre"];