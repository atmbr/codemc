import { parseCommandLogic as chainedParse } from '@/hooks/commandParserLogic';

const parseConditionalArgs = (subCommandDef, existingSubCommandArgs, commands, currentArgIndexOffsetRef) => {
    let conditionalArguments = [];
    if (subCommandDef.conditionalArgs) {
        conditionalArguments = subCommandDef.conditionalArgs(existingSubCommandArgs, subCommandDef.name);
    }
    
    let subConditionalArguments = [];
    if (subCommandDef.subConditionalArgs && conditionalArguments.length > 0) {
        const relevantConditionalArgs = existingSubCommandArgs.filter(arg => conditionalArguments.some(ca => ca.name === arg.name));
        subConditionalArguments = subCommandDef.subConditionalArgs(relevantConditionalArgs);
    }
    
    const allDynamicArgs = [...conditionalArguments, ...subConditionalArguments];
    const dynamicArgsValues = [];

    for (const dynArgDef of allDynamicArgs) {
        const value = currentArgIndexOffsetRef.remainingArgs.shift();
        if (value === undefined && dynArgDef.required) {
            dynamicArgsValues.push({ ...dynArgDef, value: '', index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
            currentArgIndexOffsetRef.consumedForSub++;
        } else if (value !== undefined) {
            dynamicArgsValues.push({ ...dynArgDef, value: value, index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
            currentArgIndexOffsetRef.consumedForSub++;
        } else {
            dynamicArgsValues.push({ ...dynArgDef, value: '', index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
        }
    }
    return dynamicArgsValues;
};

const findParentChain = (rootArgs, targetChain) => {
    for (const arg of rootArgs) {
        if (arg.subCommandArgs === targetChain) return rootArgs;
        if (arg.arguments) {
            for (const subArg of arg.arguments) {
                if (subArg.type === 'execute_chain' && subArg.subCommandArgs === targetChain) {
                    return subArg.subCommandArgs;
                }
                if (subArg.subCommandArgs) {
                    const found = findParentChain(subArg.subCommandArgs, targetChain);
                    if (found) return found;
                }
            }
        }
    }
    return null;
};

export const parseCommandLogic = (input, commands, isChained = false) => {
  const baseInput = isChained ? input : input.slice(1);
  if (!isChained && !input.startsWith('/')) return null;

  const parts = baseInput.split(/\s+/).filter(part => part.length > 0);
  if (parts.length === 0) return null;
  
  const commandName = parts[0];
  if (!commandName) return null;
  
  const commandDef = commands.find(cmd => cmd.name.toLowerCase() === commandName.toLowerCase());
  if (!commandDef) return null;

  const args = parts.slice(1);
  const parsedArgs = [];
  
  let currentArgIndexOffsetRef = { offset: 0, remainingArgs: [...args], consumedForSub: 0 };


  if (commandDef.isExecute) {
    let currentExecuteChain = parsedArgs; 
    let depth = 0;

    while(currentArgIndexOffsetRef.remainingArgs.length > 0 && depth < 10) { 
      depth++;
      currentArgIndexOffsetRef.consumedForSub = 0;
      const subCommandName = currentArgIndexOffsetRef.remainingArgs.shift();
      if (!subCommandName) break;

      const subCommandDef = commandDef.subCommands.find(sc => sc.name === subCommandName);
      if (!subCommandDef) {
        currentArgIndexOffsetRef.remainingArgs.unshift(subCommandName); 
        break;
      }

      const subCommandArgs = [];
      
      for (const argDef of subCommandDef.arguments) {
        if (argDef.type === 'execute_chain') {
          const subCmdChain = { ...argDef, value: '', subCommandArgs: [], parentSubCommandName: subCommandName };
          subCommandArgs.push(subCmdChain);
          currentExecuteChain = subCmdChain.subCommandArgs; 
          break; 
        }
        if (argDef.type === 'command_string') {
           const runCommandStr = currentArgIndexOffsetRef.remainingArgs.join(' ');
           const runCommandParsed = chainedParse('/' + runCommandStr, commands, true); 
           subCommandArgs.push({ ...argDef, value: runCommandStr, parsedRunCommand: runCommandParsed, index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
           currentArgIndexOffsetRef.consumedForSub++;
           currentArgIndexOffsetRef.remainingArgs = []; 
           break;
        }
        
        const value = currentArgIndexOffsetRef.remainingArgs.shift();
        if (value === undefined && argDef.required) {
          subCommandArgs.push({ ...argDef, value: '', index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
        } else if (value !== undefined) {
          subCommandArgs.push({ ...argDef, value: value, index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
        } else {
           subCommandArgs.push({ ...argDef, value: '', index: currentArgIndexOffsetRef.offset + currentArgIndexOffsetRef.consumedForSub });
        }
        currentArgIndexOffsetRef.consumedForSub++;
      }
      
      const dynamicArgs = parseConditionalArgs(subCommandDef, subCommandArgs, commands, currentArgIndexOffsetRef);
      subCommandArgs.push(...dynamicArgs);
      
      const parentChain = findParentChain(parsedArgs, currentExecuteChain);
      const newSubCommandInstance = {
        name: subCommandName,
        type: 'execute_subcommand_instance',
        description: subCommandDef.description,
        arguments: subCommandArgs,
        definition: subCommandDef,
        index: currentArgIndexOffsetRef.offset
      };

      if (parentChain) {
        parentChain.push(newSubCommandInstance);
      } else {
         parsedArgs.push(newSubCommandInstance);
      }
      currentArgIndexOffsetRef.offset += currentArgIndexOffsetRef.consumedForSub +1;


      if (subCommandName === 'run' || !subCommandArgs.find(a => a.type === 'execute_chain')) {
        break; 
      }
    }
  } else { 
     let currentArgsForConditional = [];
     for (const argDef of commandDef.arguments) {
        if (argDef.greedy) {
            const value = currentArgIndexOffsetRef.remainingArgs.join(' ');
            const currentArg = { ...argDef, value: value || '', index: parsedArgs.length };
            parsedArgs.push(currentArg);
            currentArgsForConditional.push(currentArg);
            currentArgIndexOffsetRef.remainingArgs = [];
            break; 
        }

        const value = currentArgIndexOffsetRef.remainingArgs.shift();
        const currentArg = { ...argDef, value: value || '', index: parsedArgs.length };
        parsedArgs.push(currentArg);
        currentArgsForConditional.push(currentArg);
     }

     if (commandDef.conditionalArgs) {
        const dynamicArgs = parseConditionalArgs(commandDef, currentArgsForConditional, commands, currentArgIndexOffsetRef);
        parsedArgs.push(...dynamicArgs);
    }
  }
 
  return {
    name: commandName,
    description: commandDef.description,
    arguments: parsedArgs,
    definition: commandDef,
    isExecute: !!commandDef.isExecute
  };
};