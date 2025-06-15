import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  RotateCcw,
  BookOpen,
  HistoryIcon,
} from 'lucide-react';

const ToolActions = ({
  input,
  isValid,
  isCommandComplete,
  unknownCommandError,
  onSimulate,
  onCopy,
  onReset,
  onHistory
}) => (
  <div className="flex flex-wrap items-center gap-3">
    <Button
      onClick={onSimulate}
      disabled={(!isValid || !isCommandComplete) && !unknownCommandError}
      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all"
    >
      <Play className="w-4 h-4 mr-2" />
      Simular Comando
    </Button>

    <Button
      variant="outline"
      onClick={onCopy}
      disabled={!input}
      className="border-slate-600 hover:border-blue-500 hover:text-blue-400 transition-colors"
    >
      <Copy className="w-4 h-4 mr-2" />
      Copiar
    </Button>

    <Button
      variant="outline"
      onClick={onReset}
      className="border-slate-600 hover:border-red-500 hover:text-red-400 transition-colors"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      Limpar
    </Button>
     <Button
      variant="outline"
      onClick={onHistory}
      className="border-slate-600 hover:border-orange-500 hover:text-orange-400 transition-colors"
    >
      <HistoryIcon className="w-4 h-4 mr-2" />
      Histórico
    </Button>

    <div className="flex items-center space-x-2 ml-auto">
      {isValid && isCommandComplete && !unknownCommandError && (
        <motion.div 
          initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}}
          className="flex items-center text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full text-xs font-medium"
        >
          <CheckCircle className="w-4 h-4 mr-1.5" />
          Válido
        </motion.div>
      )}
      {(!isValid || unknownCommandError) && input.trim() && (
         <motion.div 
          initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}}
          className="flex items-center text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full text-xs font-medium"
        >
          <AlertCircle className="w-4 h-4 mr-1.5" />
          Inválido
        </motion.div>
      )}
    </div>
  </div>
);

export default ToolActions;