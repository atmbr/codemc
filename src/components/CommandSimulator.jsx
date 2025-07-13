
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle, AlertCircle, Zap } from 'lucide-react';

const CommandSimulator = ({ result }) => {
  // //console.log(result)
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Terminal className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Resultado da Simulação</h3>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className={`p-4 rounded-lg border ${
          result.success 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="flex items-center space-x-3">
            {result.success ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-400" />
            )}
            <div>
              <h4 className={`font-semibold ${
                result.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.success ? 'Comando executado com sucesso!' : 'Erro na execução'}
              </h4>
              <p className={`text-sm mt-1 ${
                result.success ? 'text-green-300' : 'text-red-300'
              }`}>
                {result.message}
              </p>
            </div>
          </div>
        </div>

        {/* Console Output */}
        <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-600/50">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-slate-400 text-sm ml-2">Console do Minecraft</span>
          </div>
          
          <div className="font-mono text-sm space-y-2">
            <div className="text-slate-400">
              [INFO] Executando comando...
            </div>
            <div className={`${result.success ? 'text-green-400' : 'text-red-400'}`}>
              [RESULTADO] {result.message}
            </div>
            {result.details && (
              <div className="text-blue-400">
                [DETALHES] {result.details}
              </div>
            )}
            <div className="text-slate-400">
              [INFO] Comando processado em {Math.random() * 50 + 10 | 0}ms
            </div>
          </div>
        </div>

        {/* Visual Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-3"
            >
              <Zap className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <p className="text-white font-medium">Simulação concluída!</p>
            <p className="text-slate-400 text-sm mt-1">
              O comando seria executado no jogo com este resultado
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CommandSimulator;
