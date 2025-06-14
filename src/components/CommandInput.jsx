
import React, { forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const CommandInput = forwardRef(({ 
  value, 
  onChange, 
  onCursorChange, 
  validationErrors, 
  parsedCommand,
  unknownCommandError
}, ref) => {
  
  useEffect(() => {
    const handleSelectionChange = () => {
      if (ref.current && document.activeElement === ref.current) {
        onCursorChange(ref.current.selectionStart);
      }
    };

    const handleKeyUp = (e) => {
      if (ref.current && document.activeElement === ref.current) {
        onCursorChange(ref.current.selectionStart);
      }
    };

    const handleClick = (e) => {
      if (ref.current && document.activeElement === ref.current) {
        onCursorChange(ref.current.selectionStart);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    if (ref.current) {
      ref.current.addEventListener('keyup', handleKeyUp);
      ref.current.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (ref.current) {
        ref.current.removeEventListener('keyup', handleKeyUp);
        ref.current.removeEventListener('click', handleClick);
      }
    };
  }, [ref, onCursorChange]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const position = e.target.selectionStart;
    onChange(newValue, position);
  };

  const hasErrors = validationErrors && validationErrors.length > 0;
  const displayError = unknownCommandError || hasErrors;

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-bold minecraft-font">
          /
        </div>
        
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Digite um comando do Minecraft..."
          className={`
            w-full pl-8 pr-4 py-4 rounded-lg text-lg minecraft-font
            bg-slate-900/80 border-2 text-white placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-green-500/50
            transition-all duration-300
            ${displayError 
              ? 'border-red-500/50 focus:border-red-500' 
              : 'border-slate-600/50 focus:border-green-500'
            }
          `}
          autoComplete="off"
          spellCheck="false"
        />

        {value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <div className={`w-3 h-3 rounded-full ${displayError ? 'bg-red-400' : 'bg-green-400'} glow-effect`} />
          </motion.div>
        )}
      </div>

      {/* Validation Errors */}
      {unknownCommandError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <div
            className="flex items-start space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
          >
            <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
            <div>
              <p className="text-red-400 text-sm font-medium">{unknownCommandError.message}</p>
              {unknownCommandError.suggestion && (
                <p className="text-red-300 text-xs mt-1">💡 {unknownCommandError.suggestion}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      {hasErrors && !unknownCommandError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          {validationErrors.map((error, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
            >
              <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-red-400 text-sm font-medium">{error.message}</p>
                {error.suggestion && (
                  <p className="text-red-300 text-xs mt-1">💡 {error.suggestion}</p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Command Structure Hint */}
      {parsedCommand && parsedCommand.name && !unknownCommandError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30"
        >
          <p className="text-blue-400 text-sm">
            <span className="font-semibold">Comando:</span> {parsedCommand.name}
            {parsedCommand.description && (
              <span className="ml-2 text-blue-300">- {parsedCommand.description}</span>
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
});

CommandInput.displayName = 'CommandInput';

export default CommandInput;
