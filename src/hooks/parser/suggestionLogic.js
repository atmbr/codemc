const generateStandardSuggestions = (argDef, currentText, commands) => {
  const suggestions = [];
   if (!argDef) return suggestions;
   switch (argDef.type) {
    case 'player':
    case 'origin':
    case 'target':
    case 'target_entity':
    case 'origin_entity':
    case 'target_entity_rotation':
    case 'target_selector':
    case 'target_score_holder':
    case 'source_score_holder':
      suggestions.push(
        { value: '@p', description: 'Jogador mais próximo', type: 'player' },
        { value: '@a', description: 'Todos os jogadores', type: 'player' },
        { value: '@r', description: 'Jogador aleatório', type: 'player' },
        { value: '@s', description: 'Você mesmo (executor)', type: 'player' },
        { value: '@e', description: 'Todas as entidades', type: 'player' }
      );
      break;
    case 'item':
    case 'block_id':
      suggestions.push(
        { value: 'minecraft:diamond_sword', description: 'Espada de Diamante', type: 'item' },
        { value: 'minecraft:stone', description: 'Pedra', type: 'item' },
        { value: 'minecraft:apple', description: 'Maçã', type: 'item' },
        { value: 'minecraft:dirt', description: 'Terra', type: 'item' },
        { value: 'minecraft:air', description: 'Ar', type: 'item' }
      );
      break;
    case 'number':
    case 'amount':
    case 'duration':
    case 'amplifier':
    case 'yaw':
    case 'pitch':
      suggestions.push({ value: '1', description: 'Um', type: 'number' }, { value: '10', description: 'Dez', type: 'number' }, { value: '64', description: 'Pack', type: 'number' });
      break;
    case 'coordinate':
    case 'x': case 'y': case 'z':
    case 'begin_x': case 'begin_y': case 'begin_z':
    case 'end_x': case 'end_y': case 'end_z':
    case 'destination_x': case 'destination_y': case 'destination_z':
      suggestions.push({ value: '~', description: 'Relativo à posição atual', type: 'coordinate' }, { value: '0', description: 'Coordenada zero', type: 'coordinate'});
      break;
    case 'axes_string':
       suggestions.push(
           { value: 'x', description: 'Eixo X', type: 'axes_string'}, 
           { value: 'y', description: 'Eixo Y', type: 'axes_string'}, 
           { value: 'z', description: 'Eixo Z', type: 'axes_string'}, 
           { value: 'xy', description: 'Eixos X e Y', type: 'axes_string'}, 
           { value: 'xz', description: 'Eixos X e Z', type: 'axes_string'}, 
           { value: 'yz', description: 'Eixos Y e Z', type: 'axes_string'}, 
           { value: 'xyz', description: 'Eixos X, Y e Z', type: 'axes_string'}
        );
       break;
    case 'player_or_coordinate':
        suggestions.push(
            { value: '@p', description: 'Jogador mais próximo', type: 'player' },
            { value: '~', description: 'Coordenada relativa X', type: 'coordinate' }
        );
        break;
    case 'time_value_or_keyword':
        suggestions.push(
            { value: '0', description: 'Início do dia (ticks)', type: 'number' },
            { value: 'day', description: 'Define para 1000 ticks', type: 'keyword' },
            { value: 'noon', description: 'Define para 6000 ticks', type: 'keyword' },
            { value: 'night', description: 'Define para 13000 ticks', type: 'keyword' },
            { value: 'midnight', description: 'Define para 18000 ticks', type: 'keyword' }
        );
        break;
    case 'effect_action_or_id':
        suggestions.push(
            { value: 'clear', description: 'Remove todos os efeitos', type: 'keyword' },
            { value: 'minecraft:speed', description: 'Efeito de Velocidade', type: 'item' },
            { value: 'minecraft:strength', description: 'Efeito de Força', type: 'item' }
        );
        break;
    case 'objective_name':
        suggestions.push(
            { value: 'health', description: 'Objetivo de Vida', type: 'objective' },
            { value: 'kills', description: 'Objetivo de Abates', type: 'objective' }
        );
        break;
    case 'integer_range':
        suggestions.push(
            { value: '1..5', description: 'De 1 a 5', type: 'range' },
            { value: '10', description: 'Exatamente 10', type: 'range' },
            { value: '..7', description: 'Até 7 (inclusive)', type: 'range' },
            { value: '0..', description: 'De 0 em diante', type: 'range' }
        );
        break;
    case 'text':
        return [];
    default:
      if (argDef.options) {
        argDef.options.forEach(option => {
          suggestions.push({
            value: option.value,
            description: option.description || option.value,
            type: argDef.type
          });
        });
      }
      break;
  }
  if (argDef.type === 'item' || argDef.type === 'block_id') {
  return suggestions.filter(s => s.value === currentText);
}
return suggestions.filter(s => s.value.toLowerCase().startsWith(currentText.toLowerCase()));
}


const getCurrentTextForSuggestionLogic = (input, cursorPosition) => {
  const textBeforeCursor = input.slice(0, cursorPosition);
  const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
  if (input.endsWith(' ') && cursorPosition === input.length) return ''; 
  return textBeforeCursor.slice(lastSpaceIndex + 1);
};

const getCommandNameSuggestions = (input, commands, hasClosestMatch, closestCommandName, suggestAllOnEmpty = false) => {
  const commandNamePart = input.startsWith('/') ? input.slice(1).split(' ')[0] : input.split(' ')[0];
  
  if (suggestAllOnEmpty && !commandNamePart && !input.startsWith('/')) { 
     return commands.map(cmd => ({
      value: cmd.name,
      description: cmd.description,
      type: 'command'
    }));
  }
   if (suggestAllOnEmpty && input.trim() === '/') {
     return commands.map(cmd => ({
      value: cmd.name,
      description: cmd.description,
      type: 'command'
    }));
  }


  let filteredCommands = commands
    .filter(cmd => cmd.name.toLowerCase().startsWith(commandNamePart.toLowerCase()))
    .map(cmd => ({
      value: cmd.name,
      description: cmd.description,
      type: 'command'
    }));

  if (hasClosestMatch && closestCommandName && !filteredCommands.find(c => c.value === closestCommandName)) {
    const closestCmdObj = commands.find(c => c.name === closestCommandName);
    if (closestCmdObj) {
      filteredCommands.unshift({
        value: closestCmdObj.name,
        description: `Você quis dizer: ${closestCmdObj.description}`,
        type: 'command_suggestion' 
      });
    }
  }
  
  return filteredCommands;
};

export const generateSuggestionsLogic = (parsedCommand, currentArgumentDef, input, cursorPosition, currentArgValue, currentArgIndex, commands, suggestAllOnEmpty = false, closestCommandName = null) => {
  if (!parsedCommand && !suggestAllOnEmpty && !closestCommandName) return [];
  
  const currentTextForSuggestion = getCurrentTextForSuggestionLogic(input, cursorPosition);

  if (!parsedCommand) { 
    return getCommandNameSuggestions(input, commands, !!closestCommandName, closestCommandName, suggestAllOnEmpty);
  }

  const commandDef = parsedCommand.definition;

  if (parsedCommand.isExecute) {
    let suggestions = [];
    if (currentArgumentDef && currentArgumentDef.type === 'execute_start') {
        suggestions = commandDef.subCommands.map(sc => ({
            value: sc.name,
            description: sc.description,
            type: sc.type === 'execute_run' ? 'execute_run_option' : (sc.type === 'execute_conditional' ? `${sc.name}_conditional_option` : 'execute_subcommand_option')
        }));
    } else if (currentArgumentDef && currentArgumentDef.parentSubCommandName) {
        const parentSubDef = commandDef.subCommands.find(sc => sc.name === currentArgumentDef.parentSubCommandName);
        if (parentSubDef) {
            const allArgsForParentSub = [...parentSubDef.arguments];
            if(parentSubDef.conditionalArgs) allArgsForParentSub.push(...parentSubDef.conditionalArgs(parsedCommand.arguments.find(pa => pa.name === parentSubDef.name)?.arguments || [], parentSubDef.name));
            if(parentSubDef.subConditionalArgs) allArgsForParentSub.push(...parentSubDef.subConditionalArgs(parsedCommand.arguments.find(pa => pa.name === parentSubDef.name)?.arguments || []));

            const argDefToSuggestFor = allArgsForParentSub.find(ad => ad.name === currentArgumentDef.name);
            if (argDefToSuggestFor) {
                return generateStandardSuggestions(argDefToSuggestFor, currentTextForSuggestion, commands);
            }
        }
    } else if (currentArgumentDef && currentArgumentDef.type === 'command_string' && parsedCommand.name === 'execute') {
       const runCommandInput = currentTextForSuggestion;
       return getCommandNameSuggestions(runCommandInput.startsWith('/') ? runCommandInput : '/' + runCommandInput, commands, false, null, true);
    } else if (!currentArgumentDef && parsedCommand.arguments.length > 0) {
        const lastExecuteArg = parsedCommand.arguments[parsedCommand.arguments.length - 1];
        if (lastExecuteArg && lastExecuteArg.type === 'execute_subcommand_instance') {
            const lastSubDef = lastExecuteArg.definition;
            const chainLink = lastSubDef.arguments.find(a => a.type === 'execute_chain');
            if (chainLink) { 
                 suggestions = commandDef.subCommands.map(sc => ({
                    value: sc.name,
                    description: sc.description,
                    type: sc.type === 'execute_run' ? 'execute_run_option' : (sc.type === 'execute_conditional' ? `${sc.name}_conditional_option` : 'execute_subcommand_option')
                }));
            }
        }
    }
     else if (!currentArgumentDef && parsedCommand.arguments.length === 0 && input.trim().toLowerCase() === '/execute') {
        suggestions = commandDef.subCommands.map(sc => ({
            value: sc.name,
            description: sc.description,
            type: sc.type === 'execute_run' ? 'execute_run_option' : (sc.type === 'execute_conditional' ? `${sc.name}_conditional_option` : 'execute_subcommand_option')
        }));
    }
    return suggestions.filter(s => s.value.toLowerCase().startsWith(currentTextForSuggestion.toLowerCase()));
  }

  const allArgsForCmd = [...commandDef.arguments];
  if (commandDef.conditionalArgs) allArgsForCmd.push(...commandDef.conditionalArgs(parsedCommand.arguments));
  if (commandDef.subConditionalArgs) allArgsForCmd.push(...commandDef.subConditionalArgs(parsedCommand.arguments));


  if (currentArgIndex >= allArgsForCmd.length && allArgsForCmd.length > 0) {
    return []; 
  }

  let actualArgDef = currentArgumentDef;
  if (!actualArgDef && allArgsForCmd.length > 0 && currentArgIndex < allArgsForCmd.length) {
    actualArgDef = allArgsForCmd[currentArgIndex];
  } else if (!actualArgDef) {
    return [];
  }
  
  return generateStandardSuggestions(actualArgDef, currentTextForSuggestion, commands);
};
