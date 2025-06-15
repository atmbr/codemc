export const simulateCommandExecution = (command) => {
  if (!command || !command.name) return null;

  const responses = {
    give: (args) => {
      const target = args.find(a => a.type === 'player')?.value || '@p';
      const item = args.find(a => a.type === 'item')?.value || 'minecraft:stone';
      const amount = args.find(a => a.type === 'number')?.value || '1';
      return {
        success: true,
        message: `Deu ${amount}x ${item.replace('minecraft:', '')} para ${target}`,
        details: `Item entregue com sucesso!`
      };
    },
    xp: (args) => {
      const action = args.find(a => a.name === 'action')?.value || 'query';
      const target = args.find(a => a.name === 'target')?.value || '@p';
      const amount = args.find(a => a.name === 'amount')?.value || '0';
      const unit = args.find(a => a.name === 'unit')?.value || 'points';
      
      switch(action) {
          case 'add':
              return {
                  success: true,
                  message: `Adicionado ${amount} ${unit} de experiência para ${target}`,
                  details: `Experiência alterada com sucesso!`
              };
          case 'set':
               return {
                  success: true,
                  message: `Experiência de ${target} definida para ${amount} ${unit}`,
                  details: `Experiência alterada com sucesso!`
              };
          case 'query':
               return {
                  success: true,
                  message: `Consultando experiência de ${target}`,
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
    tp: (args) => {
      const target = args.find(a => a.name === 'target')?.value || '@p';
      const coords = args.filter(a => ['coordinate', 'player_or_coordinate'].includes(a.type) && a.value);
      
      if (coords.length > 1) {
        return {
          success: true,
          message: `Teleportou ${target} para ${coords.map(c => c.value).join(' ')}`,
          details: `Teletransporte para coordenadas realizado!`
        };
      }
      if (coords.length === 1) {
         return {
           success: true,
           message: `Teleportou ${target} para ${coords[0].value}`,
           details: `Teletransporte para entidade/coordenada realizado!`
         };
      }
      return {
        success: true,
        message: `Teleportando ${target}`,
        details: `Comando de teletransporte processado!`
      };
    },
    gamemode: (args) => {
      const mode = args.find(a => a.type === 'gamemode')?.value || 'survival';
      const target = args.find(a => a.type === 'player')?.value || '@p';
      return {
        success: true,
        message: `Modo de jogo de ${target} alterado para ${mode}`,
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
      const target = args.find(a => a.name === 'target')?.value;
      const message = args.find(a => a.name === 'mensagem')?.value || '';
      if(target){
          return {
              success: true,
              message: `[Você sussurra para ${target}] ${message}`,
              details: `Sussurro enviado.`
          };
      }
      return {
        success: true,
        message: `[Você] ${message}`,
        details: `Mensagem enviada no chat.`
      };
    },
    execute: (args) => {
      let message = "Executando: ";
      const buildExecuteMessage = (execArgs) => {
        if (!execArgs) return "";
        return execArgs.map(arg => {
          let part = arg.name;
          if (arg.arguments && arg.arguments.length > 0) {
            const simpleArgs = arg.arguments.filter(a => a.value && a.type !== 'execute_chain' && a.type !== 'command_string').map(a => a.value).join(' ');
            if (simpleArgs) part += ` ${simpleArgs}`;

            const chainArg = arg.arguments.find(a => a.type === 'execute_chain');
            if (chainArg && chainArg.subCommandArgs) {
              part += ` ${buildExecuteMessage(chainArg.subCommandArgs)}`;
            }
            const runArg = arg.arguments.find(a => a.type === 'command_string');
            if (runArg && runArg.value) {
              part += ` run /${runArg.value}`;
            }
          }
          return part;
        }).join(' ');
      };
      message += buildExecuteMessage(args);
      return {
        success: true,
        message: message,
        details: "Comando /execute processado."
      };
    }
  };

  const handler = responses[command.name] || (() => ({
    success: true,
    message: `Comando /${command.name} executado`,
    details: `Comando processado com sucesso!`
  }));
  
  return handler(command.arguments || []);
};