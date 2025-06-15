import { parseCommandLogic } from '@/hooks/commandParserLogic';

const getDynamicArgsForSubCommand = (subCommandInstance) => {
    if (!subCommandInstance || !subCommandInstance.definition) return [];
    const subDef = subCommandInstance.definition;
    let dynamicArgs = [];
    if (subDef.conditionalArgs) {
        dynamicArgs = dynamicArgs.concat(subDef.conditionalArgs(subCommandInstance.arguments, subDef.name));
    }
    if (subDef.subConditionalArgs) {
        const relevantConditionalArgs = subCommandInstance.arguments.filter(arg => dynamicArgs.some(ca => ca.name === arg.name));
        dynamicArgs = dynamicArgs.concat(subDef.subConditionalArgs(relevantConditionalArgs));
    }
    return dynamicArgs;
};

export const getCurrentArgumentInfoLogic = (parsedCommand, input, cursorPosition, commands) => {
  if (!parsedCommand) return { argument: null, index: -1, currentValue: '' };

  const textBeforeCursor = input.slice(0, cursorPosition);
  let parts = textBeforeCursor.trim().split(/\s+/).filter(part => part.length > 0);
  
  let currentPartIndex = parts.length -1;
  if (input.endsWith(' ') && cursorPosition === input.length && parts.length > 0) {
    currentPartIndex++;
  }
  
  if (parsedCommand.isExecute) {
    let commandParts = parts.slice(1); 
    let currentChain = parsedCommand.arguments;
    let overallArgIndex = 0;
    let lastSubCommandInstance = null;

    for (let i = 0; i < commandParts.length; i++) {
      const part = commandParts[i];
      const subCommandInstance = currentChain?.find(sc => sc.name === part && sc.type === 'execute_subcommand_instance');
      
      if (subCommandInstance) {
        lastSubCommandInstance = subCommandInstance;
        overallArgIndex++; 
        
        if (subCommandInstance.name === 'run' && subCommandInstance.arguments) {
          const runArg = subCommandInstance.arguments.find(a => a.type === 'command_string');
          if (runArg && runArg.parsedRunCommand) {
            const runInputString = commandParts.slice(i + 1).join(' ');
            const relativeCursorPos = Math.max(0, cursorPosition - (parts.slice(0, i + 2).join(' ').length +1) );
            return getCurrentArgumentInfoLogic(runArg.parsedRunCommand, '/' + runInputString, relativeCursorPos, commands);
          }
        }
        
        const chainArgDef = subCommandInstance.definition.arguments.find(ad => ad.type === 'execute_chain');
        if (chainArgDef) {
            const chainArgInstance = subCommandInstance.arguments.find(sa => sa.type === 'execute_chain');
            currentChain = chainArgInstance ? chainArgInstance.subCommandArgs : null;
        } else {
            currentChain = null; 
        }
        continue;
      }

      if (lastSubCommandInstance) {
        const parentDef = lastSubCommandInstance.definition;
        const staticArgs = parentDef.arguments.filter(ad => ad.type !== 'execute_chain' && ad.type !== 'command_string');
        const dynamicArgs = getDynamicArgsForSubCommand(lastSubCommandInstance);
        const allPossibleArgsForSub = [...staticArgs, ...dynamicArgs];
        
        let argCountForLastSub = 0;
        for(const argDef of allPossibleArgsForSub) {
            const argValuePartIndex = commandParts.indexOf(lastSubCommandInstance.name) + 1 + argCountForLastSub;
            if (i === argValuePartIndex) { 
                return { argument: {...argDef, parentSubCommandName: lastSubCommandInstance.name}, index: overallArgIndex + argCountForLastSub, currentValue: part || '' };
            }
            if (argValuePartIndex < commandParts.length) { 
                argCountForLastSub++;
            } else { 
                 return { argument: {...argDef, parentSubCommandName: lastSubCommandInstance.name}, index: overallArgIndex + argCountForLastSub, currentValue: '' };
            }
        }
      }
      
      const nextSubCommandArgDef = parsedCommand.definition.arguments.find(a => a.type === 'execute_start');
      if (nextSubCommandArgDef && i < commandParts.length) { 
         return { argument: {...nextSubCommandArgDef, name: 'subcommand_or_run'}, index: overallArgIndex, currentValue: part || '' };
      } else if (nextSubCommandArgDef) { 
         return { argument: {...nextSubCommandArgDef, name: 'subcommand_or_run'}, index: overallArgIndex, currentValue: '' };
      }
      break; 
    }
    const nextSubCommandArgDef = parsedCommand.definition.arguments.find(a => a.type === 'execute_start');
    if (lastSubCommandInstance) {
        const lastSubArgs = lastSubCommandInstance.arguments;
        const chainArg = lastSubArgs.find(a => a.type === 'execute_chain');
        if (chainArg && (!chainArg.subCommandArgs || chainArg.subCommandArgs.length === 0)) {
             return { argument: {...nextSubCommandArgDef, name: 'subcommand_or_run'}, index: overallArgIndex, currentValue: '' };
        }
    } else if (nextSubCommandArgDef && commandParts.length === 0) { 
        return { argument: {...nextSubCommandArgDef, name: 'subcommand_or_run'}, index: 0, currentValue: '' };
    }
    return { argument: null, index: overallArgIndex, currentValue: '' };

  } else { 
    const argIndex = Math.max(0, currentPartIndex -1);
    const allArgsForCommand = [...parsedCommand.definition.arguments];
    if (parsedCommand.definition.conditionalArgs) {
        allArgsForCommand.push(...parsedCommand.definition.conditionalArgs(parsedCommand.arguments));
    }
     if (parsedCommand.definition.subConditionalArgs) {
        allArgsForCommand.push(...parsedCommand.definition.subConditionalArgs(parsedCommand.arguments));
    }

    if (argIndex < allArgsForCommand.length) {
      const currentArgDef = allArgsForCommand[argIndex];
      const currentVal = parsedCommand.arguments.find(pa => pa.name === currentArgDef.name)?.value || '';
      return { 
        argument: currentArgDef, 
        index: argIndex,
        currentValue: currentVal
      };
    }
    if (allArgsForCommand.length > 0 && argIndex >= allArgsForCommand.length) {
        return { argument: null, index: argIndex, currentValue: '' };
    }
  }
  return { argument: null, index: -1, currentValue: '' }; 
};