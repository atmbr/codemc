import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { InfoIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Modal = ({ setCommand, isOpen, setIsOpen, title, description, footer, history, children }) => {
  const [history2, setHistory] = useState([]);

  // useEffect só para carregar o histórico do localStorage quando abrir o modal
  useEffect(() => {
    if (isOpen && history) {
      try {
        const stored = JSON.parse(localStorage.getItem('history'));
        setHistory(Array.isArray(stored) ? stored : []);
      } catch {
        setHistory([]);
      }
    }
  }, [isOpen, history]);

  // deleteItem sempre definido, usa useCallback para memoizar
  const deleteItem = useCallback(
    (item, all) => {
      if (!all && confirm(`Apagar "${item}" do histórico?`)) {
        const updated = history2.filter((h) => h !== item);
        console.log(updated)
        localStorage.setItem('history', JSON.stringify(updated));
        setHistory(updated);
      }
      if (all && confirm(`Apagar todos os itens do histórico?`)) {
        console.log('Apagando todo o histórico...');
        // localStorage.removeItem('history');
        // const updated = [];
        // setHistory(updated);
      }
    },
    [history2]
  );
  // console.log(history2?.slice(0, 10))

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100 sm:h-[80vh]">
        <DialogHeader>
          {title && <DialogTitle className="text-2xl text-slate-50">{title}</DialogTitle>}
          {description && <DialogDescription className="text-slate-400">{description}</DialogDescription>}
        </DialogHeader>

        <div className="overflow-y-auto space-y-2 text-md list-none ">
          {history === true ? (
            history2.length === 0 ? (
              <div className="flex items-center justify-center text-slate-400 font-mono text-xl p-8 bg-slate-800/40 rounded-md select-none">
                <InfoIcon className="h-6 w-6 mr-2 text-blue-400" />
                <span>Não há histórico!</span>
              </div>
            ) : (
              <>
              {history2?.slice(0, 10).map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => setCommand(item)}
                  className="p-3 bg-slate-700/50 rounded-md border border-slate-600/50 hover:bg-slate-600/50 cursor-pointer flex justify-between"
                  title={`Adicionar "${item}" ao campo de entrada`}
                >
                  <p className="font-mono text-yellow-300">{item}</p>
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item, false);
                    }}
                    title={`Apagar "${item}" do histórico`}
                    role="button"
                    className="w-4 h-auto mr-2 font-bold text-red-400 hover:text-red-600"
                  />
                </li>
              ))}
              <div className='flex justify-end !mt-4'>
                <Button onClick={() => deleteItem("", true)} className="bg-red-500 hover:bg-red-600 text-white grid right-0">
                Limpar Histórico
                </Button>
              </div>
              </>
            )
) : (
 <div className="rounded-3xl p-8 max-w-4xl mx-auto text-slate-200 shadow-lg select-none h-[80vh] sm:auto">

  <div className="grid md:grid-cols-1 gap-10">
    {/* Campo principal */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img
        src="../src/assets/imagem/help/input-cmd-1.png"
        alt="Campo para digitar o comando"
        className="rounded-lg border border-slate-700 max-w-full max-h-62 object-contain shadow-md"
      />
      <h3 className="text-xl font-semibold text-left w-full">Campo principal</h3>
      <p className="text-sm text-slate-300 text-left w-full">
        Aqui você monta seu comando do Minecraft. Aqui será informado se houver <span className="text-red-500 font-bold">Error</span> ou se está  <span className="text-green-500 font-bold">Correto</span>.
      </p>
    </div>

    {/* Sugestões inteligentes */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img
        src="../src/assets/imagem/help/sugg-cmd-1.png"
        alt="Sugestões automáticas"
        className="rounded-lg border border-slate-700 max-w-full max-h-auto object-cover shadow-md overflow-hidden "
      />
      <h3 className="text-xl font-semibold text-left w-full">Sugestões inteligentes</h3>
      <p className="text-sm text-slate-300  text-left w-full">
        Enquanto você digita, é moestrado sugestões para completar o comando e evitar erros, tornando tudo mais rápido e simples.
      </p>
    </div>
    {/* Detalhes e requisitos */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img
        src="../src/assets/imagem/help/requisit-cmd-1.png"
        alt="Requisitos do comando"
        className="rounded-lg border border-slate-700 max-w-full max-h-62 object-contain shadow-md"
      />
      <h3 className="text-xl font-semibold text-left w-full">Detalhes e requisitos</h3>
      <p className="text-sm text-slate-300 text-left w-full">
        Aqui você vê as condições para o comando funcionar direito — como o alvo, a posição ou outras opções específicas do comando.
      </p>
    </div>

    {/* Resultado final */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img
        src="../src/assets/imagem/help/result-cmd-1.png"
        alt="Resultado do comando"
        className="rounded-lg border border-slate-700 max-w-full max-h-62 object-contain shadow-md"
      />
      <h3 className="text-xl font-semibold text-left w-full">Resultado final</h3>
      <p className="text-sm text-slate-300  text-left w-full">
        Aqui você vê o comando completo simulado pela ferramenta. Após isso, Copie e cole no Minecraft para testar se tudo está funcionando.
      </p>
    </div>

    
  </div>
</div>


)}
        </div>

        <DialogFooter>{footer || null}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
