
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
import displayMessage from '@/alertdata'
  import { Lightbulb, BookOpen, Terminal, Zap } from 'lucide-react';

const HelpModal = ({ isOpen, setIsOpen }) => {
  const commonCommands = displayMessage.dicas.command.info;

  const executeTips = displayMessage.dicas.command.extra;
console.log(executeTips.title)
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
           {commonCommands.on &&
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
              <Terminal className="w-5 h-5 mr-2"/> {commonCommands.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {commonCommands.content.map((cmd, idx) => (
                <li key={idx} className="p-3 bg-slate-700/50 rounded-md border border-slate-600/50">
                  <p className="font-mono text-green-300">{cmd.name}</p>
                  <p className="text-slate-300 text-xs mt-1">{cmd.description}</p>
                </li>
              ))}
            </ul>
          </div>
          }
          {executeTips.on && 
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2"/> {executeTips.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {executeTips.info.map((tip, idx) => (
                <li key={idx} className="p-3 bg-slate-700/50 rounded-md border border-slate-600/50">
                  <p className="font-mono text-yellow-300">{tip}</p>
                </li>
              ))}
            </ul>
             <p className="text-xs text-slate-500 mt-3">
               {executeTips.description}
            </p>
          </div>
          }
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
