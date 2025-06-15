import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

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
import { useCommandValidation } from '@/hooks/useCommandValidation';
import { simulateCommandExecution } from '@/lib/commandSimulator';
import useAlert from '@/hooks/useAlert';


const MinecraftCommandTool = () => {
  const [input, setInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    validateCommand
  } = useCommandValidation();

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
    } else {
      validateCommand(null); 
    }
  }, [commandHistory,parsedCommand, validateCommand, input, unknownCommandError]);

  const handleInputChange = (value, position) => {
    setInput(value);
    setCursorPosition(position);
    setSimulationResult(null);
  };

  const handleSuggestionSelect = useCallback((suggestion) => {
    const textBeforeCursor = input.slice(0, cursorPosition);
    
    let startOfReplacement;
    if (textBeforeCursor.startsWith('/') && textBeforeCursor.indexOf(' ') === -1 && !textBeforeCursor.substring(1).includes(' ')) {
        startOfReplacement = 1;
    } else {
        const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
        startOfReplacement = lastSpaceIndex === -1 ? textBeforeCursor.length : lastSpaceIndex + 1;
    }

    const currentArgumentValue = textBeforeCursor.slice(startOfReplacement);
    
    let partBefore;
    if (input.slice(0, startOfReplacement).endsWith(currentArgumentValue)) {
      partBefore = input.slice(0, startOfReplacement - currentArgumentValue.length);
    } else {
      partBefore = input.slice(0, startOfReplacement);
    }
    
    const newInput = `${partBefore}${suggestion.value} `;
    const newPosition = newInput.length;

    setInput(newInput);
    setCursorPosition(newPosition);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  }, [input, cursorPosition]);

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
      
      <SimulationArea result={simulationResult} />
      
      <HelpModal isOpen={isHelpModalOpen} setIsOpen={setIsHelpModalOpen} />
      <AlertModal 
        isOpen={isNewsAlertOpen} 
        onOpenChange={closeNewsAlert}
        title="Melhorias na Ferramenta!"
      >
        <p className="mb-2">Olá! A sua ferramenta de comandos foi atualizada:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Agora a lógica de adicionar argumentos está mais robusta.</li>
            <li>O modal de alerta pode ser aberto por um botão e só aparece uma vez por padrão.</li>
            <li>O código foi refatorado para melhor organização e performance!</li>
        </ul>
        <p className="mt-3">Explore as novidades!</p>
      </AlertModal>
      <Modal setCommand={setCommand} isOpen={isModalOpen} history={true} setIsOpen={setIsModalOpen} title="Histórico:" description="Aqui estara o histrico." children="" footer=""/>
    </div>
  );
};

export default MinecraftCommandTool;
