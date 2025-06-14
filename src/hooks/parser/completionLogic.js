import { parseCommandLogic } from '@/hooks/commandParserLogic';
import { checkCommandCompleteLogic as checkCommandCompleteLogicChained } from '@/hooks/parser/completionLogic';


const checkArgsComplete = (args, argDefs, parsedCommand, commands, parentSubCommandName = null) => {
    if (!argDefs) return true;
    for (const argDef of argDefs) {
        const providedArg = args.find(pa => pa.name === argDef.name);
        if (typeof argDef.required === 'function' ? argDef.required(args) : argDef.required) {
            if (!providedArg || !providedArg.value) return false;
        }

        if (argDef.type === 'execute_chain') {
            if (!providedArg || !providedArg.subCommandArgs) {
                 if (parentSubCommandName !== 'run') return false; 
            } else if (providedArg.subCommandArgs.length === 0 && parentSubCommandName !== 'run') {
                 const nextSubCmdDef = parsedCommand.definition.subCommands.find(sc => sc.name === providedArg.parentSubCommandName);
                 if(nextSubCmdDef && nextSubCmdDef.arguments.find(a => a.type === 'execute_chain' && a.required)) return false;
            }
            else if (providedArg.subCommandArgs.length > 0) {
                if (!checkChain(providedArg.subCommandArgs, parsedCommand.definition, commands)) return false;
            }
        } else if (argDef.type === 'command_string' && parentSubCommandName === 'run') {
            if (!providedArg || !providedArg.value) return false;
            const runCmdParsed = parseCommandLogic('/' + providedArg.value, commands, true);
            if (!runCmdParsed || !checkCommandCompleteLogicChained(runCmdParsed, commands)) return false;
        }
    }
    return true;
};
  
const checkChain = (chainElements, parentCommandDef, commands) => {
    if (!chainElements || chainElements.length === 0) {
        const lastParentArg = parentCommandDef?.arguments[parentCommandDef.arguments.length-1];
        if (lastParentArg && lastParentArg.type === 'execute_chain' && parentCommandDef.name !== 'run') {
             return false;
        }
        return true;
    }

    for (const element of chainElements) {
        if (element.type === 'execute_subcommand_instance') {
            if (!element.definition || !element.arguments) return false;
            
            let allArgDefsForSub = [...element.definition.arguments];
            if (element.definition.conditionalArgs) {
                allArgDefsForSub.push(...element.definition.conditionalArgs(element.arguments, element.name));
            }
            if (element.definition.subConditionalArgs) {
                 allArgDefsForSub.push(...element.definition.subConditionalArgs(element.arguments));
            }

            if (!checkArgsComplete(element.arguments, allArgDefsForSub, parentCommandDef, commands, element.name)) return false;
        } else {
            return false; 
        }
    }
    return true;
};

export const checkCommandCompleteLogic = (parsedCommand, commands) => {
  if (!parsedCommand) return false;

  if (parsedCommand.isExecute) {
    return checkChain(parsedCommand.arguments, parsedCommand.definition, commands);
  } else { 
     if (!parsedCommand.arguments) return false;
     let allArgDefsForCmd = [...parsedCommand.definition.arguments];
     if (parsedCommand.definition.conditionalArgs) {
        allArgDefsForCmd.push(...parsedCommand.definition.conditionalArgs(parsedCommand.arguments));
     }
      if (parsedCommand.definition.subConditionalArgs) {
        allArgDefsForCmd.push(...parsedCommand.definition.subConditionalArgs(parsedCommand.arguments));
     }
     return checkArgsComplete(parsedCommand.arguments, allArgDefsForCmd, parsedCommand, commands);
  }
};