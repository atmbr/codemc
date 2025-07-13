import { getListArg } from '@/data/getListArg';
export const simulateCommandExecution = (command) => {
  if (!command || !command.name) return null;
  const lists = getListArg();

function filterValid(filterV){
  var match = filterV.match(/\[([^\]]+)\]/)
  if(!match || !match[1]) return filterV
  return match[1].split(',').reduce((objV, item)=>{
  const [key, value] = item.split('=');
  objV[key] = value //cria um objeto com a chave e add o valor nessa chave Ex: type: "" antes vazio, agora type: 222
  if(objV.type || objV.name) return objV
  return [filterV, objV]
}, {}) // O {} no fim, converter toda string em objeto
}
function getNames(item, obj){
  var type = String(item.type).trim();
  var result = lists[type].find(a=>a.value == item.value)
  if(!result || !result.description) return item
  if(obj) return[item, result, result.description]
  return result.description
   
}

  const responses = {
    give: (args) => {
      const target = filterValid(args.find(a => a.type === 'player')?.value) || '@p';
  const tgt = `"${ typeof target === 'string'?target:target.type || 'Entidade'}"${target.name ? ` com o nome "${target.name}"` : ''}`;
      const item = getNames(args.find(a => a.type === 'item'), true) || 'minecraft:stone';
      const amount = args.find(a => a.type === 'number')?.value || '1';
      const itemDesc = !item[2]?item[1].value.replace('minecraft:', ''):item[2] || item.value
      return {
        success: true,
        message: `Deu ${amount}x ${itemDesc} para ${tgt}`,
        details: `${itemDesc} entregue com sucesso!`
      };
    },
    xp: (args) => {
      const action = args.find(a => a.name === 'action')?.value || 'query';
      const target = filterValid(args.find(a => a.type === 'player')?.value) || '@p';
  const tgt = `"${ typeof target === 'string'?target:target.type || 'Entidade'}"${target.name ? ` com o nome "${target.name}"` : ''}`;

      const amount = args.find(a => a.name === 'amount')?.value || '0';
      const unit = args.find(a => a.name === 'unit')?.value || 'points';
      switch(action) {
          case 'add':
              return {
                  success: true,
                  message: `Adicionado ${amount} ${unit} de experiência para ${tgt}`,
                  details: `Experiência alterada com sucesso!`
              };
          case 'set':
               return {
                  success: true,
                  message: `Experiência de ${tgt} definida para ${amount} ${unit}`,
                  details: `Experiência alterada com sucesso!`
              };
          case 'query':
               return {
                  success: true,
                  message: `Consultando experiência de ${tgt}`,
                  details: `Consulta de experiência realizada.`
              };
          default:
               return {
                  success: false,
                  message: `Ação '${action}' desconhecida para /xp`,
                  details: `Ação inválida.`
              };
      }
    },
    effect: (args) => {
  const action = args.find(a => a.name === 'effect_action_or_id')?.value;
  const duration = args.find(a => a.name === 'duration')?.value || '0';
const target = filterValid(args.find(a => a.type === 'player')?.value) || '@p';
  const tgt = `"${ typeof target === 'string'?target:target.type || 'Entidade'}"${target.name ? ` com o nome "${target.name}"` : ''}`;

  // Se for 'clear', remove todos os efeitos
  if (action === 'clear') {
    return {
      success: true,
      message: `Todos os efeitos foram removidos de ${tgt}`,
      details: `Ação de remoção de efeitos realizada com sucesso.`
    };
  }

  // Caso contrário, assume que está aplicando um efeito específico
  if (action?.startsWith('minecraft:')) {
    return {
      success: true,
      message: `Aplicado o efeito ${action.replace('minecraft:', '')} em ${tgt} por ${duration} segundos.`,
      details: `Efeito "${action}" com duração de ${duration} segundos adicionado com sucesso.`
    };
  }

  return {
    success: false,
    message: `Ação '${action}' desconhecida para /effect`,
    details: `Ação inválida ou efeito não reconhecido.`
  };
},
    tp: (args) => {
       const target = filterValid(args.find(a => a.type === 'player')?.value) || '@p';
  const tgt = `"${ typeof target === 'string'?target:target.type || 'Entidade'}"${target.name ? ` com o nome "${target.name}"` : ''}`;
      const coords = args.filter(a => ['coordinate', 'player_or_coordinate'].includes(a.type) && a.value);
      if (coords.length > 1) {
        return {
          success: true,
          message: `Teletransportado(a) ${target} para ${coords.map(c => c.value).join(' ')}`,
          details: `Teletransporte para coordenadas realizado!`
        };
      }
      if (coords.length === 1) {
         return {
           success: true,
           message: `Teletransportado(a) ${tgt} para ${coords[0].value}`,
           details: `Teletransporte de entidade p/ coordenada realizado!`
         };
      }
      return {
        success: true,
        message: `Teleportando ${tgt}`,
        details: `Comando de teletransporte processado!`
      };
    },
    gamemode: (args) => {
      const mode = args.find(a => a.type === 'gamemode')?.value || 'survival';
      const target = filterValid(args.find(a => a.type === 'player')?.value) || '@p';
  const tgt = `"${ typeof target === 'string'?target:target.type || 'Entidade'}"${target.name ? ` com o nome "${target.name}"` : ''}`;
      return {
        success: true,
        message: `Modo de jogo de ${tgt} alterado para ${mode}`,
        details: `Modo de jogo alterado com sucesso!`
      };
    },
    time: (args) => {
      const action = args.find(a => a.type === 'time_action')?.value || 'query';
      const value = args.find(a => a.type.includes('time_value'))?.value;
      if (action === 'set' && value) {
        return {
          success: true,
          message: `Tempo definido para ${value}`,
          details: `Horário do mundo alterado!`
        };
      }
      return {
        success: true,
        message: `Ação de tempo: ${action}`,
        details: `Comando de tempo executado!`
      };
    },
    say: (args) => {
      const message = args.find(a => a.name === 'mensagem')?.value || '';
      return {
        success: true,
        message: `[Você] ${message}`,
        details: `Mensagem enviada no chat.`
      };
    },
    // execute: (args) => {
    //   let message = "Executando: ";
    //   const buildExecuteMessage = (execArgs) => {
    //     if (!execArgs) return "";
    //     return execArgs.map(arg => {
    //       let part = arg.name;
    //       if (arg.arguments && arg.arguments.length > 0) {
    //         const simpleArgs = arg.arguments.filter(a => a.value && a.type !== 'execute_chain' && a.type !== 'command_string').map(a => a.value).join(' ');
    //         if (simpleArgs) part += ` ${simpleArgs}`;

    //         const chainArg = arg.arguments.find(a => a.type === 'execute_chain');
    //         if (chainArg && chainArg.subCommandArgs) {
    //           part += ` ${buildExecuteMessage(chainArg.subCommandArgs)}`;
    //         }
    //         const runArg = arg.arguments.find(a => a.type === 'command_string');
    //         if (runArg && runArg.value) {
    //           part += ` run /${runArg.value}`;
    //         }
    //       }
    //       return part;
    //     }).join(' ');
    //   };
    //   message += buildExecuteMessage(args);
    //   return {
    //     success: true,
    //     message: message,
    //     details: "Comando /execute processado."
    //   };
    // }
  };

  const handler = responses[command.name] || (() => ({
    success: true,
    message: `Comando /${command.name} executado`,
    details: `Comando processado com sucesso!`
  }));
  
  return handler(command.arguments || []);
};
