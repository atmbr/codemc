
import { useState, useCallback } from 'react';
import {getMinecraftCommands, targetFilter} from '@/data/minecraftCommands';
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
        const argErrors = validateArgument(parsedCommand,arg);

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
var t;
export const getInput = (value) =>{
  t = value;
  // console.log(t, value)
}
  // console.log(111,t!==undefined?t:'')

const allArguments = [];
const validateArgument = (pCommand,argument) => {
  const errors = [];
  const alreadyExists = allArguments.some(arg => arg.name === argument.name);

  if (!alreadyExists) {
    allArguments.push(argument);
  }

  //console.log("Acumulado até agora:", allArguments, pCommand);

  // Tenta gerar uma descrição do comando
  // const resumo = gerarResumoComando(pCommand.name, allArguments);
  // if (resumo) {
  //   //console.log("Resumo:", resumo);
  // }
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
    case 'player': {
  const result = validatePlayer(argument.value);

  if (!result.valid) {
    errors.push({
      argument: argument.name,
      message: result.error || `'${argument.value}' não é um seletor de jogador válido`,
      suggestion: result.suggestion || 'Use @p, @a, @r, @s ou um nome de jogador'
    });
  }

  break;
}

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
const validSelectorKeys = targetFilter.map(f => f.value) || [];
const validatePlayer = (value) => {
  // Seletor com filtros: @p[...], @e[...], etc
  const selectorWithFilters = /^@[pares]\[([^\]]*)\]$/;
  const match = value.match(selectorWithFilters);
  const m = match? match[0] : value;
  if (typeof value === 'string') {
  if (
    !/@\w\[[^\]]+\]/.test(m) && 
    (m.includes('[') && m.includes(']'))
  ) {
    //console.log(1)
    return {
      valid: false,
      error: `Filtro vazio: "${m.substring(2)}"`,
      suggestion: 'Filtro deve conter algum valor tipo: [type=, name=, distance=,...]'
    };
  }
}

  
  if (match) {
    const inside = match[1]; // conteúdo entre os colchetes
    const filters = inside.split(',').map(f => f.trim()).filter(f => f);

    for (const filter of filters) {
      if (!filter.includes('=')) {
        return {
          valid: false,
          error: `Filtro incompleto: "${filter}"`,
          suggestion: 'Filtros devem estar no formato chave=valor'
        };
      }

      const [key, val] = filter.split('=').map(s => s.trim());

      if (!validSelectorKeys.includes(key)) {
        return {
          valid: false,
          error: `Filtro inválido: "${key}"`,
          suggestion: `Use filtros válidos como: [${validSelectorKeys.join(', ')}]`
        };
      }

      if (!val) {
        return {
          valid: false,
          error: `O filtro "${key}" está sem valor`,
          suggestion: `Especifique um valor para "${key}"`
        };
      }
    }

    return { valid: true };
  }

  // Seletor simples: @p, @a, @r, @s, @e
  if (/^@[pares]$/.test(value)) return { valid: true };

  // Nome de jogador: até 16 caracteres, letras, números, _
  if (/^[a-zA-Z0-9_]{1,16}$/.test(value)) return { valid: true };

  return {
    valid: false,
    error: `Valor inválido: "${value}"`,
    suggestion: 'Use um nome de jogador ou um seletor como @p, @e, etc.'
  };
};


const validateNumber = (value) => {
  return /^-?\d+$/.test(value);
};

const validateCoordinate = (value) => {
  if (typeof value !== 'string') return false;
  const coords = value.trim().split(/\s+/); // separa por espaço
// console.log(value, coords)

  if (coords.length === 0 || coords.length > 3) return false;

  return coords.every(coord => {
    // Coordenada relativa: ~ ou ~-10, ~0, ~123
    if (/^~(-?\d+)?$/.test(coord)) return true;

    // Coordenada absoluta: -10, 0, 123
    if (/^-?\d+$/.test(coord)) return true;

    // Qualquer outra coisa é inválida
    return false;
  });
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
