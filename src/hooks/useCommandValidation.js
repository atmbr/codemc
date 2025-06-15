
import { useState, useCallback } from 'react';

export const useCommandValidation = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const validateCommand = useCallback((parsedCommand) => {
    if (!parsedCommand) {
      setValidationErrors([]);
      setIsValid(true);
      return;
    }

    const errors = [];

    if (parsedCommand.arguments) {
      parsedCommand.arguments.forEach(arg => {
        const argErrors = validateArgument(arg);
        errors.push(...argErrors);
      });
    }

    setValidationErrors(errors);
    setIsValid(errors.length === 0);
  }, []);

  return {
    validationErrors,
    isValid,
    validateCommand
  };
};

const validateArgument = (argument) => {
  const errors = [];
  
  if (!argument.value && argument.required) {
    errors.push({
      argument: argument.name,
      message: `O argumento '${argument.name}' é obrigatório`,
      suggestion: `Digite um valor para ${argument.name}`
    });
    return errors;
  }

  if (!argument.value) return errors;

  switch (argument.type) {
    case 'player':
      if (!validatePlayer(argument.value)) {
        errors.push({
          argument: argument.name,
          message: `'${argument.value}' não é um seletor de jogador válido`,
          suggestion: 'Use @p, @a, @r, @s ou um nome de jogador'
        });
      }
      break;
      
    case 'number':
      if (!validateNumber(argument.value)) {
        errors.push({
          argument: argument.name,
          message: `'${argument.value}' não é um número válido`,
          suggestion: 'Digite um número inteiro'
        });
      }
      break;
      
    case 'coordinate':
      if (!validateCoordinate(argument.value)) {
        errors.push({
          argument: argument.name,
          message: `'${argument.value}' não é uma coordenada válida`,
          suggestion: 'Use números, ~ ou ~número (ex: ~10, -5, 100)'
        });
      }
      break;
      
    case 'item':
      if (!validateItem(argument.value)) {
        errors.push({
          argument: argument.name,
          message: `'${argument.value}' não é um item válido`,
          suggestion: 'Use o formato minecraft:item_name'
        });
      }
      break;
      
    case 'gamemode':
      if (!validateGamemode(argument.value)) {
        errors.push({
          argument: argument.name,
          message: `'${argument.value}' não é um modo de jogo válido`,
          suggestion: 'Use survival, creative, adventure ou spectator'
        });
      }
      break;
  }

  return errors;
};

const validatePlayer = (value) => {
  // Player selectors
  if (/^@[pars]$/.test(value)) return true;
  
  // Player name (basic validation)
  if (/^[a-zA-Z0-9_]{1,16}$/.test(value)) return true;
  
  return false;
};

const validateNumber = (value) => {
  return /^-?\d+$/.test(value);
};

const validateCoordinate = (value) => {
  // Relative coordinates (~, ~10, ~-5)
  if (/^~(-?\d+)?$/.test(value)) return true;
  
  // Absolute coordinates
  if (/^-?\d+$/.test(value)) return true;
  
  return false;
};

const validateItem = (value) => {
  // Basic minecraft item format
  if (/^minecraft:[a-z_]+$/.test(value)) return true;
  
  // Permitir nomes de itens simples (serão convertidos para minecraft:name)
  // if (/^[a-z_]+$/.test(value)) return true;
  
  return false;
};

const validateGamemode = (value) => {
  const validModes = ['survival', 'creative', 'adventure', 'spectator', 's', 'c', 'a', 'sp'];
  return validModes.includes(value.toLowerCase());
};
