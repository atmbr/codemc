
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb, BookOpen, Terminal, Zap } from 'lucide-react';

const HelpModal = ({ isOpen, setIsOpen }) => {
  const commonCommands = [
    { name: '/give <jogador> <item> [quantidade]', description: 'Dá um item a um jogador.' },
    { name: '/tp <jogador> <x> <y> <z>', description: 'Teleporta um jogador para coordenadas.' },
    { name: '/gamemode <modo> [jogador]', description: 'Altera o modo de jogo.' },
    { name: '/time set <valor>', description: 'Define o tempo do mundo (day, night, 0-24000).' },
    { name: '/weather <tipo> [duração]', description: 'Altera o clima (clear, rain, thunder).' },
    { name: '/kill [alvo]', description: 'Mata entidades.' },
    { name: '/effect give <jogador> <efeito> [duração] [amplificador]', description: 'Aplica um efeito de status.' },
  ];

  const executeTips = [
    { tip: 'Use `as @e[type=armor_stand]` para executar como todos os suportes de armadura.' },
    { tip: '`at @s` executa o comando na sua posição atual.' },
    { tip: '`if block ~ ~-1 ~ minecraft:grass_block` verifica se há um bloco de grama abaixo.' },
    { tip: '`run say Olá` no final de uma cadeia execute para executar um comando simples.' },
    { tip: 'Combine subcomandos: `/execute as @a at @s if entity @s[distance=..5] run say Perto!`' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-3">
            <BookOpen className="w-7 h-7 text-blue-400" />
            <DialogTitle className="text-2xl text-slate-50">Guia Rápido de Comandos</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">
            Dicas e exemplos para te ajudar a dominar os comandos do Minecraft.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
              <Terminal className="w-5 h-5 mr-2"/> Comandos Comuns
            </h3>
            <ul className="space-y-2 text-sm">
              {commonCommands.map((cmd, idx) => (
                <li key={idx} className="p-3 bg-slate-700/50 rounded-md border border-slate-600/50">
                  <p className="font-mono text-green-300">{cmd.name}</p>
                  <p className="text-slate-300 text-xs mt-1">{cmd.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2"/> Dicas para /execute
            </h3>
            <ul className="space-y-2 text-sm">
              {executeTips.map((tip, idx) => (
                <li key={idx} className="p-3 bg-slate-700/50 rounded-md border border-slate-600/50">
                  <p className="font-mono text-yellow-300">{tip.tip}</p>
                </li>
              ))}
            </ul>
             <p className="text-xs text-slate-500 mt-3">
                O comando `/execute` é poderoso! Ele permite modificar o contexto de execução de outros comandos.
                Experimente combinar <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">as</code>, <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">at</code>, <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">if/unless</code>, <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">positioned</code>, <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">rotated</code>, <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">facing</code>, <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">in</code> e finalize com <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded">run &lt;comando&gt;</code>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2"/> Dicas Gerais
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 pl-2">
              <li>Use <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300">@p</code> para o jogador mais próximo.</li>
              <li><code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300">@a</code> para todos os jogadores.</li>
              <li><code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300">@s</code> para o executor do comando.</li>
              <li><code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300">~</code> em coordenadas é relativo à posição atual.</li>
              <li>Pressione <code className="font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300">Espaço</code> para ver sugestões de argumentos.</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white">
            Entendido!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
