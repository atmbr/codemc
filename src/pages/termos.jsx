import React from 'react';
import { ShieldCheck } from 'lucide-react';
import siteInfo from "@/data/siteInfo.js";
 const [SITENAME, SLOGAN, MINSLOGAN, DESCRIPTION, AUTHOR, GITHUB, YOUTUBE, KEYWORDS,VERSION, LANGUAGE, PAGES, SOCIAL] = Object.values(siteInfo);
function Termos() {
  return (
     <div className="max-w-3xl mx-auto p-6 md:p-8 text-white space-y-8">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-blue-500" />
        <h1 className="text-3xl font-bold">Termos de Uso</h1>
      </div>

      <p className="text-base leading-relaxed">
        Oi! 👋 Antes de você sair explorando a ferramenta, vale a pena dar uma olhadinha nestes termos. Nada complicado, prometo — é só pra deixar tudo claro entre a gente 🙂
      </p>

      <div className="space-y-6 text-base">
        <div>
          <h2 className="font-semibold text-xl">1. Uso da ferramenta</h2>
          <p>
            Essa ferramenta foi feita de fã pra fã, com o único objetivo de facilitar a vida de quem gosta de brincar com comandos no Minecraft.
            É totalmente gratuita e voltada para uso pessoal, educativo ou só por diversão mesmo. Sinta-se à vontade para usar!
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">2. Não é oficial, beleza?</h2>
          <p>
            Só pra reforçar: isso aqui não é um produto da Mojang ou da Microsoft. Eu sou só um jogador tentando ajudar outros jogadores.
            Tudo que você vê aqui foi feito de forma independente, com base em informações públicas do jogo.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">3. Você no controle</h2>
          <p>
            Os comandos que você monta aqui são responsabilidade sua. Então antes de colar algo num servidor ou mundo importante, dá uma revisada. 
            A ideia é ajudar, mas não consigo garantir que tudo vai funcionar 100% sempre.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">4. Privacidade em primeiro lugar</h2>
          <p>
            Eu não coleto nenhuma informação sua. Nada de cookies espiões, rastreadores ou servidores salvando o que você digita. Tudo acontece só no seu navegador, de forma local.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">5. Ainda em construção 🚧</h2>
          <p>
            A ferramenta está em constante desenvolvimento. Pode ter erros, bugs ou funcionalidades que mudam com o tempo.
            Eu faço tudo com cuidado, mas não dá pra prometer perfeição — conto com sua paciência e feedback.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">6. Quer ajudar?</h2>
          <p>
            Toda sugestão ou contribuição é muito bem-vinda! Se quiser colaborar, apontar erros ou mandar ideias, passa lá no
            <a href={GITHUB} target="_blank" className="text-blue-400 hover:underline ml-1">repositório no GitHub</a>.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">7. Mudanças futuras</h2>
          <p>
            Esses termos podem mudar à medida que a ferramenta evolui, mas prometo tentar manter tudo transparente. Se algo importante mudar, vou avisar.
          </p>
        </div>
      </div>

      <div className="text-sm italic pt-6 border-t border-slate-600">
        Última atualização: Junho de 2025
      </div>
    </div>
  );
}

export default [Termos, "Termos de Uso", "/termos"];
