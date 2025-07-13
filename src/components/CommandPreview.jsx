
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, AlertCircle, Clock, HelpCircle } from 'lucide-react';

const CommandPreview = ({ parsedCommand, validationErrors, isComplete, unknownCommandError }) => {
  const hasErrors = validationErrors && validationErrors.length > 0;
  const getArgumentStatus = (arg) => {
    const error = validationErrors?.find(e => e.argument === arg.name);
    if (error) return 'error';
    if (arg.value) return 'valid';
    if (arg.required) return 'required';
    return 'optional';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'error':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'required':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'optional':
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  }; 

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'required':
        return <Clock className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-current" />;
    }
  };

  return (
    <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Eye className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Visualização do Comando</h3>
      </div>

      {unknownCommandError ? (
        <div className="text-center py-8">
          <HelpCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-400">{unknownCommandError.message}</p>
          {unknownCommandError.suggestion && (
             <p className="text-red-300 text-sm mt-1">Você quis dizer: <span className="font-semibold">{unknownCommandError.suggestion}</span>?</p>
          )}
        </div>
      ) : !parsedCommand || !parsedCommand.name ? (
        <div className="text-center py-8">
          <Eye className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Nenhum comando para visualizar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Command Name */}
          <div className="command-preview p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-green-400 font-bold minecraft-font text-lg">/</span>
              <span className="text-white font-bold minecraft-font text-lg">
                {parsedCommand.name}
              </span>
              {isComplete && !hasErrors && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </div>
            
            {parsedCommand.description && (
              <div>
              <p className="text-slate-300 text-sm mb-4">{parsedCommand.description} </p>
              <p className="text-slate-300 text-sm mb-4">Como usar: <span className="italic bg-gray-950 p-2 leading-9">"/{parsedCommand.name}{" "}
      {parsedCommand.arguments?.map((e) => {return `<${e.name}>`}).join(" ")}"</span></p>
              </div>
            )}

            {/* Arguments */}
            {parsedCommand.arguments && parsedCommand.arguments.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  Argumentos
                </h4>
                
                <div className="grid gap-3">
                  {parsedCommand.arguments.map((arg, index) => {
                    const status = getArgumentStatus(arg);
                    const error = validationErrors?.find(e => e.argument === arg.name);
                    
                    return (
                      <motion.div 
                        key={`${arg.name}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border  ${getStatusColor(status)}`}
                      >
                        <div className="flex items-start justify-between flex-col">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(status)}
                            <div className=' flex-col'>
                              <span className="font-medium">{arg.name}</span>
                              <span className="text-xs ml-2 opacity-75">({arg.type})</span>
                            </div>
                          </div>
                          
                          <div className="text-left">
                            {arg.value ? (
                              <span className="font-mono text-sm">{arg.value}</span>
                            ) : (
                              <span className="text-xs opacity-75">
                                {arg.required ? 'Obrigatório' : 'Opcional'}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {error && (
                          <div className="mt-2 text-xs opacity-90">
                            {error.message}
                          </div>
                        )}
                        
                        {arg.description && (
                          <div className="mt-2 text-xs opacity-75">
                            {arg.description}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Command Status */}
            <div className="mt-4 pt-4 border-t border-slate-600/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Status do comando:</span>
                <div className="flex items-center space-x-2">
                  {isComplete && !hasErrors ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Pronto para executar</span>
                    </>
                  ) : hasErrors ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm font-medium">Contém erros</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Incompleto</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPreview;
