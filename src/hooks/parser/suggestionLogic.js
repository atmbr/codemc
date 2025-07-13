import {getMinecraftCommands, targetFilter} from '@/data/minecraftCommands';
import { getListArg } from '@/data/getListArg';
const generateStandardSuggestions = (argDef, currentText, commands, input, cursorPosition) => {
  const lists = getListArg();
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
      const playerSelectorFilters = targetFilter

      if (currentText.startsWith('@') && currentText.includes('[')) {
  const openBracketIndex = currentText.indexOf('[');
  const insideBrackets = currentText.slice(openBracketIndex + 1);
  const filters = insideBrackets.split(',');

  const relativeCursor = cursorPosition - input.indexOf('[') - 1;

  // Encontrar filtro atual e posição dele
  let charCount = 0;
  let currentFilterRaw = '';
  let currentFilterIndex = 0;
  for (let i = 0; i < filters.length; i++) {
    const f = filters[i];
    if (relativeCursor <= charCount + f.length) {
      currentFilterRaw = f.trim();
      currentFilterIndex = i;
      break;
    }
    charCount += f.length + 1; // +1 para vírgula
  }

  const [key = '', value = ''] = currentFilterRaw.split('=');
  const cursorBeforeEqual = relativeCursor <= (charCount + key.length);

  const matchedFilter = playerSelectorFilters.find(f => f.value === key);

  const baseIndex = input.indexOf('[') + 1;
  const filterStart = baseIndex + charCount; // início do filtro atual

  if (matchedFilter && currentFilterRaw.includes('=') && !cursorBeforeEqual) {
  const suggestionsForValues = [];

  const equalPos = filterStart + key.length; // posição do '='
  const valueStart = equalPos + 1; // início do valor (logo após '=')
  const valueEnd = filterStart + currentFilterRaw.length; // fim do valor atual

  if (key === 'type') {
    suggestionsForValues.push(...lists.mob);
  } else if (key === 'distance') {
    suggestionsForValues.push(...lists.filterDistance);
  } else if (key === 'sort') {
    suggestionsForValues.push(...lists.filterShort
    );
  }

  return suggestionsForValues
  .filter(s => s.value.toLowerCase().startsWith(value.toLowerCase()))
  .map(s => ({
    value: s.value,
    insertText: `${s.value},`,
    description: s.description,
    type: s.type,
    replacementRange: { start: valueStart, end: valueEnd },
    insertTextFormat: 2, // indica snippet, se suportar
  }));

}


  // Sugestões de filtros antes do '=' (para trocar o nome do filtro)
  const partialKey = key.toLowerCase();
  const usedKeys = filters.map(f => f.split('=')[0].trim());
  const availableFilters = playerSelectorFilters.filter(f => !usedKeys.includes(f.value) || f.value === key);

  const replaceStart = filterStart;
  const replaceEnd = filterStart + key.length;

  return availableFilters
    .filter(f => f.value.toLowerCase().startsWith(partialKey))
    .map(f => ({
      value: f.value,
      insertText: `${f.value}=`,
      description: f.description,
      type: f.type,
      replacementRange: { start: replaceStart, end: replaceEnd }
    }));
}
      suggestions.push(...lists.playerSelector);
      break;
    case 'item':
    case 'block_id':
      suggestions.push(...lists.item);
      break;
    case 'number':
    case 'amount':
    case 'duration':
    case 'amplifier':
    case 'yaw':
    case 'pitch':
      suggestions.push(...lists.number);
      break;
    case 'coordinate':
    case 'x': case 'y': case 'z':
    case 'begin_x': case 'begin_y': case 'begin_z':
    case 'end_x': case 'end_y': case 'end_z':
    case 'destination_x': case 'destination_y': case 'destination_z':
       suggestions.push(...lists.coordinate);
      break;
    case 'axes_string':
       suggestions.push(...lists.axe);
       break;
    case 'player_or_coordinate':
        suggestions.push(...lists.playerOrCoord);
        break;
    case 'time_value_or_keyword':
        suggestions.push(...lists.timeValue);
        break;
    case 'effect_action_or_id':
       suggestions.push(...lists.effectAction);
        break;
    case 'objective_name':
       suggestions.push(...lists.objective);
        break;
    case 'integer_range':
        suggestions.push(...lists.range);
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
  if (['origin', 'target', 'player'].includes(argDef.type)
) {
  // return suggestions.filter(s => s.value.toLowerCase().includes(currentText.toLowerCase()));
}
  if (argDef.type === 'item' || argDef.type === 'block_id') {
    // //console.log(suggestions.map(s => s.value.toLocaleLowerCase() === currentText.toLowerCase()));
  return suggestions.filter(s => s.value.toLowerCase().includes(currentText.toLowerCase()));
}
return suggestions.filter(s => s.value.toLowerCase().includes(currentText.toLowerCase()));
}


const getCurrentTextForSuggestionLogic = (input, cursorPosition) => {
 
  const textBeforeCursor = input.slice(0, cursorPosition);
  const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
   let t = textBeforeCursor?.split(' ') || false;
  if(t && t.length > 1) //console.log(t);
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
  
  return generateStandardSuggestions(actualArgDef, currentTextForSuggestion, commands, input, cursorPosition);

};