import { useState, useEffect, useMemo } from 'react';
import { getMinecraftCommands } from '@/data/minecraftCommands';
import { parseCommandLogic } from '@/hooks/commandParserLogic';
import { getCurrentArgumentInfoLogic } from '@/hooks/parser/argumentInfoLogic';
import { generateSuggestionsLogic } from '@/hooks/parser/suggestionLogic';
import { checkCommandCompleteLogic } from '@/hooks/parser/completionLogic';
import { findClosestCommand } from '@/lib/commandUtils';

export const useCommandParser = (input, cursorPosition) => {
  const [parsedCommand, setParsedCommand] = useState(null);
  const [currentArgument, setCurrentArgument] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isCommandComplete, setIsCommandComplete] = useState(false);
  const [activeArgumentIndex, setActiveArgumentIndex] = useState(-1); 
  const [unknownCommandError, setUnknownCommandError] = useState(null);

  const commands = useMemo(() => getMinecraftCommands(), []);

  useEffect(() => {
    const trimmedInput = input.trimStart();
    setUnknownCommandError(null);

    if (!trimmedInput) {
      setParsedCommand(null);
      setCurrentArgument(null);
      setSuggestions([]);
      setIsCommandComplete(false);
      setActiveArgumentIndex(-1);
      return;
    }

    if (trimmedInput === '/') {
      setParsedCommand(null);
      setCurrentArgument({ name: 'command', description: 'Escolha um comando para começar.', type: 'command', value: '' });
      setSuggestions(generateSuggestionsLogic(null, null, '/', 1, '', 0, commands, true));
      setIsCommandComplete(false);
      setActiveArgumentIndex(0);
      return;
    }

    const commandNameMatch = trimmedInput.match(/^\/([a-zA-Z0-9_]+)/);
    const typedCommandName = commandNameMatch ? commandNameMatch[1] : '';

    const parsed = parseCommandLogic(trimmedInput, commands);
    setParsedCommand(parsed);

    if (parsed) {
      const currentArgInfo = getCurrentArgumentInfoLogic(parsed, trimmedInput, cursorPosition, commands);
      setCurrentArgument(currentArgInfo.argument);
      setActiveArgumentIndex(currentArgInfo.index);
      
      const suggestionList = generateSuggestionsLogic(parsed, currentArgInfo.argument, trimmedInput, cursorPosition, currentArgInfo.currentValue, currentArgInfo.index, commands);
      setSuggestions(suggestionList);
      
      const complete = checkCommandCompleteLogic(parsed, commands);
      setIsCommandComplete(complete);
    } else {
      const closest = findClosestCommand(typedCommandName, commands);
      if (trimmedInput.startsWith('/') && typedCommandName) {
        setUnknownCommandError({
          message: `Comando '${typedCommandName}' não encontrado.`,
          suggestion: closest ? `Você quis dizer '/${closest}'?` : null
        });
      }
      setSuggestions(generateSuggestionsLogic(null, null, trimmedInput, cursorPosition, '', trimmedInput.startsWith('/') ? 0 : -1, commands, !!closest, closest));
      setCurrentArgument(null);
      setIsCommandComplete(false);
      setActiveArgumentIndex(trimmedInput.startsWith('/') ? 0 : -1);
    }
  }, [input, cursorPosition, commands]);

  return {
    parsedCommand,
    currentArgument,
    suggestions,
    isCommandComplete,
    activeArgumentIndex,
    unknownCommandError
  };
};