import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CommandInput from '@/components/CommandInput';
import CommandSuggestions from '@/components/CommandSuggestions';
import CommandPreview from '@/components/CommandPreview';
import HelpModal from '@/components/HelpModal';
import AlertModal from '@/components/AlertModal';
import ToolHeader from '@/components/tool/ToolHeader';
import ToolActions from '@/components/tool/ToolActions';
import SimulationArea from '@/components/tool/SimulationArea';
import Modal from '@/components/Modal'
import TemplateModal from '@/components/TemplateModal'
import { useCommandParser } from '@/hooks/useCommandParser';
import { useCommandValidation, getInput} from '@/hooks/useCommandValidation';
import { simulateCommandExecution } from '@/lib/commandSimulator';
import ReportBugsForm from '@/ReportBugsForm';
import siteInfo from "@/data/siteInfo.js";

import useAlert from '@/hooks/useAlert';
import SupportModal from '@/components/supportModal'
const MinecraftCommandTool = () => {
    const [SITENAME, SLOGAN, MINSLOGAN, DESCRIPTION, AUTHOR, GITHUB, YOUTUBE, KEYWORDS,VERSION, LANGUAGE, PAGES, SOCIAL] = Object.values(siteInfo);
// console.clear()

  const [input, setInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [showSupport, setShowSupport] = useState(false);
const [commandHistory, setCommand] = useState("");
  const inputRef = useRef(null);

  const {
  isAlertOpen: isNewsAlertOpen,
  checkAndShowAlert: checkAndShowNewsAlert,
  closeAlertAndRemember: closeNewsAlert,
  showAlert: showNewsAlert
} = useAlert('alertModalSeen_v2');

  useEffect(() => {
    checkAndShowNewsAlert();
  }, [checkAndShowNewsAlert]);

  const {
    parsedCommand,
    currentArgument,
    suggestions,
    isCommandComplete,
    unknownCommandError
  } = useCommandParser(input, cursorPosition);

  const {
    validationErrors,
    isValid,
    validateCommand,
    inputVr
  } = useCommandValidation();
  getInput(input) // Coletar o valor do input
  useEffect(() => {
    if (commandHistory) {
    setInput(commandHistory);  // Preenche o input
    setIsModalOpen(false);     // Fecha o modal

    setTimeout(() => {
      inputRef.current?.focus(); // Foca no input
    }, 0);

    setCommand(null); // <- limpa o valor para não reusar
  }
    if (input && !unknownCommandError) {
      validateCommand(parsedCommand);
      // //console.log(parsedCommand)
    } else {
      validateCommand(null); 
    }
  }, [commandHistory,parsedCommand, validateCommand, input, unknownCommandError]);

  const handleInputChange = (value, position) => {
    setInput(value.toLowerCase());
    setCursorPosition(position);
    setSimulationResult(null);
  };

const handleSuggestionSelect = useCallback((suggestion) => {
  let newInput = input;
  let newPosition = cursorPosition;
  const insertedText = suggestion.insertText || suggestion.value;
  const isSelector = /@\w\[[^\]]*]/g.test(newInput) || insertedText.includes('[') && insertedText.includes(']');
  // //console.log(isSelector, insertedText, insertedText.includes('['), insertedText.includes(']'), /@\w\[[^\]]*]/g.test(newInput) )
  const before = input.slice(0, cursorPosition);
  const after = input.slice(cursorPosition);
    newInput = `${before}${insertedText} `;
  if (!isSelector) {
    // //console.log("Não tem filtro!!")
    const openBracketIndex = before.length + insertedText.indexOf('[');
    // console.table({
    //   'before: ': before,
    //   'after: ': after,
    //   'insertedText: ': insertedText,
    //   'cursorPosition: ': cursorPosition,
    //   "openBracketIndex": openBracketIndex,
    //   'before.length': before.length,
    //   'insertedText.indexOf()': insertedText.indexOf('[')
    // })
    
    newInput = `${before}${insertedText}${after} `;
    
    newPosition = newInput.length + 1;

  } 
  if (isSelector) {
    // //console.log("Tem filtro!!")
    // //console.log(newInput, insertedText)
    // //console.log(1)
    const openBracketIndex = before.length + insertedText.indexOf('[');
    newPosition = newInput.trim().length - 1;
    const selectorRegex = /@\w\[[^\]]*]/g;

    const match = [...input.matchAll(selectorRegex)].find(m => {

      return cursorPosition >= m.index && cursorPosition <= m.index + m[0].length;
    });


    if (match) {
  const fullMatch = match[0];
  const beforeSelector = input.slice(0, match.index);
  const afterSelector = input.slice(match.index + fullMatch.length);

  const inside = fullMatch.slice(fullMatch.indexOf('[') + 1, fullMatch.indexOf(']'));
  const filters = inside ? inside.split(',').map(f => f.trim()).filter(f => f) : [];

  // Determinar qual filtro está sendo editado
  const relativeCursor = cursorPosition - (match.index + fullMatch.indexOf('[') + 1);

  let charCount = 0;
  let currentFilterIndex = -1;
  for (let i = 0; i < filters.length; i++) {
    if (relativeCursor <= charCount + filters[i].length) {
      currentFilterIndex = i;
      break;
    }
    charCount += filters[i].length + 1; // +1 para a vírgula
  }

  if (currentFilterIndex === -1) {
  // Adiciona filtro novo (ex: type=zombie)
  filters.push(insertedText);
} else {
  // Se insertedText contém '=' é filtro completo, substitui filtro todo
  if (insertedText.includes('=')) {
    filters[currentFilterIndex] = insertedText;
  } else {
    // Só valor, então mantém chave atual e substitui valor
    const currentFilter = filters[currentFilterIndex];
    const [key] = currentFilter.split('=');
    filters[currentFilterIndex] = `${key}=${insertedText}`;
  }
}
  const newInside = filters.join(',');
  const updatedSelector = `${fullMatch.slice(0, fullMatch.indexOf('[') + 1)}${newInside}]`;
  newInput = `${beforeSelector}${updatedSelector}${afterSelector}`;

  const openBracketIndex = beforeSelector.length + updatedSelector.indexOf('[');
  console.table([
    'input.lenght:', input.length,
    'openBracketIndex', openBracketIndex,
    'insertedText.length', insertedText.length,

  ])
  newPosition = input.length + openBracketIndex + insertedText.length - openBracketIndex - 2; // cursor após o texto inserido
  }

  }

  setInput(newInput);
  setCursorPosition(newPosition);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newPosition, newPosition);
    }
  }, 0);
}, [input, cursorPosition]);




  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      const isInputFocused = document.activeElement === inputRef.current;
      if (isInputFocused) {
        handleSimulate();
      }
    }
  })
  const handleSimulate = () => {
    if (unknownCommandError) {
       toast({
        title: "Comando desconhecido",
        description: unknownCommandError.message,
        variant: "destructive"
      });
      return;
    }

    if (!isValid) {
      toast({
        title: "Comando inválido",
        description: "Corrija os erros antes de simular o comando.",
        variant: "destructive"
      });
      return;
    }

    if (!isCommandComplete) {
      toast({
        title: "Comando incompleto",
        description: "Complete todos os argumentos obrigatórios antes de simular.",
        variant: "destructive"
      });
      return;
    }

    const result = simulateCommandExecution(parsedCommand);
    setSimulationResult(result);
    // //console.log(parsedCommand, result)
    if(result){
      let history = JSON.parse(localStorage.getItem('history')) || [];
      history.push(input.toLowerCase());
      localStorage.setItem('history', JSON.stringify(history));
    }
    toast({
      title: "Comando simulado!",
      description: "Veja o resultado da simulação abaixo.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    toast({
      title: "Copiado!",
      description: "Comando copiado para a área de transferência.",
    });
  };

  const handleReset = () => {
    setInput('');
    setCursorPosition(0);
    setSimulationResult(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
    const handleHistory = () => {
    setIsModalOpen(true);
    setInput('');
  };
  
  const shouldShowSuggestions = () => {
    if (input.trim() === '/') return true;
    if (!input.trim() && !unknownCommandError) return false;
    if (unknownCommandError) return true; 
    
    const lastCharIsSpace = input.endsWith(' ');
    const noExactMatchSuggestion = !suggestions.some(s => s.value === currentArgument?.value);

    return suggestions.length > 0 && (lastCharIsSpace || !currentArgument?.value || noExactMatchSuggestion);
  };
const SupportSection = ({ language = "pt", showSupport, setShowSupport }) => {
  const labels = {
    pt: {
      button: "Apoiar Projeto ❤️",
      notice: "Novidades e melhorias a caminho — seu apoio faz a diferença!",
    },
    en: {
      button: "Support Project ❤️",
      notice: "New features and improvements coming soon — your support makes a difference!",
    },
  };

  const { button, notice } = labels[language] || labels.pt;

  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 rounded-xl max-w-xs mx-auto text-center shadow-xl ring-2 ring-pink-400 hover:ring-pink-500 transition duration-300 ease-in-out">
      <Button
        onClick={() => setShowSupport(true)}
        className="bg-white text-pink-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out"
        type="button"
      >
        {button}
      </Button>
      <p className="mt-2 text-sm text-pink-100 font-medium select-none">{notice}</p>

      <SupportModal
        isOpen={showSupport}
        onOpenChange={() => setShowSupport(false)}
        language={language}
      />
    </div>
  );
};


  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card backdrop-blur-sm rounded-xl border border-gray-600/60  p-6 shadow-2xl"
      >
        <ToolHeader onHelpClick={() => setIsHelpModalOpen(true)} onAlertClick={showNewsAlert} />

        <div className="space-y-4">
          <CommandInput
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onCursorChange={setCursorPosition}
            validationErrors={validationErrors}
            parsedCommand={parsedCommand}
            unknownCommandError={unknownCommandError}
          />

          <ToolActions
            input={input}
            isValid={isValid}
            isCommandComplete={isCommandComplete}
            unknownCommandError={unknownCommandError}
            onSimulate={handleSimulate}
            onCopy={handleCopy}
            onReset={handleReset}
            onHistory={handleHistory}
          />
        </div>

        {/* <SupportSection
  language="pt"
  showSupport={showSupport}
  setShowSupport={setShowSupport}
/> */}
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CommandSuggestions
            suggestions={suggestions}
            currentArgument={currentArgument}
            onSuggestionSelect={handleSuggestionSelect}
            show={shouldShowSuggestions()}
            isUnknownCommand={!!unknownCommandError}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CommandPreview
            parsedCommand={parsedCommand}
            validationErrors={validationErrors}
            isComplete={isCommandComplete}
            unknownCommandError={unknownCommandError}
          />
        </motion.div>
      </div>
      <div className="bg-[linear-gradient(45deg,_#0d1117_0%,_#0d1713_100%)] bg-card mt-10 border border-green-600 rounded-xl p-6 text-center text-slate-300 bg-slate-800 shadow-xl">
  <h2 className="text-2xl font-bold text-white mb-2">💚 Gostou da ferramenta?</h2>
  <p className="text-base mb-4">
    Se ela te ajudou de alguma forma, considere apoiar ou divulgar o projeto. Qualquer contribuição faz a diferença!
  </p>
  <a
    href={GITHUB}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
  >
    Contribuir no GitHub
  </a>
</div>

      <SimulationArea result={simulationResult} />
      <ReportBugsForm />
      <HelpModal isOpen={isHelpModalOpen} setIsOpen={setIsHelpModalOpen} />
      <AlertModal 
        isOpen={isNewsAlertOpen} 
        onOpenChange={closeNewsAlert}
      />
      
      
      <Modal setCommand={setCommand} isOpen={isModalOpen} history={true} setIsOpen={setIsModalOpen} title="Histórico:" description="O histórico aparecerá apenas 10 itens vísiveis." children="" footer=""/>
    </div>
  );
};

export default MinecraftCommandTool;