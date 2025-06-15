
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Hash, User, MapPin, Clock, AlertTriangle, Terminal } from 'lucide-react';

const CommandSuggestions = ({ suggestions, currentArgument, onSuggestionSelect, show, isUnknownCommand }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'player':
        return <User className="w-4 h-4" />;
      case 'coordinate':
        return <MapPin className="w-4 h-4" />;
      case 'number':
        return <Hash className="w-4 h-4" />;
      case 'time':
        return <Clock className="w-4 h-4" />;
      case 'command':
        return <Terminal className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'player':
        return 'text-blue-400 bg-blue-500/20';
      case 'coordinate':
        return 'text-purple-400 bg-purple-500/20';
      case 'number':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'item':
        return 'text-green-400 bg-green-500/20';
      case 'gamemode':
        return 'text-red-400 bg-red-500/20';
      case 'command':
        return 'text-orange-400 bg-orange-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!show || suggestions.length === 0) {
    return (
      <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700/50  p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-semibold text-white">Sugestões</h3>
        </div>
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Digite um comando para ver sugestões</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center space-x-3 mb-4">
        {isUnknownCommand ? <AlertTriangle className="w-6 h-6 text-red-400" /> : <Lightbulb className="w-6 h-6 text-yellow-400" />}
        <h3 className="text-xl font-semibold text-white">
          {isUnknownCommand ? "Comando não encontrado. Sugestões:" : "Sugestões"}
        </h3>
        {currentArgument && !isUnknownCommand && (
          <span className="text-sm text-slate-400">
            ({currentArgument.name})
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={`${suggestion.value}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSuggestionSelect(suggestion)}
              className="suggestion-item p-3 rounded-lg bg-300 hover:bg-slate-600/50 cursor-pointer border border-slate-600/30 hover:border-green-500/50"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                  {getTypeIcon(suggestion.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-white font-medium">
                      {suggestion.value}
                    </span>
                    {suggestion.type && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(suggestion.type)}`}>
                        {suggestion.type === 'command' ? 'comando' : suggestion.type}
                      </span>
                    )}
                  </div>
                  
                  {suggestion.description && (
                    <p className="text-sm text-slate-400 mt-1 truncate">
                      {suggestion.description}
                    </p>
                  )}
                </div>

                {suggestion.required && (
                  <div className="text-red-400 text-xs font-medium">
                    Obrigatório
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {currentArgument && currentArgument.description && !isUnknownCommand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30"
        >
          <p className="text-blue-400 text-sm">
            <span className="font-semibold">Argumento atual:</span> {currentArgument.description}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CommandSuggestions;
