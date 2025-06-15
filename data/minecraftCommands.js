export const getMinecraftCommands = () => {
  const executeSubCommands = [
    {
      name: 'align',
      type: 'execute_subcommand',
      description: 'Alinha a posição atual aos eixos especificados.',
      arguments: [
        { name: 'axes', type: 'axes_string', required: true, description: 'Eixos para alinhar (ex: "xz", "y").' },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ]
    },
    {
      name: 'anchored',
      type: 'execute_subcommand',
      description: 'Define a âncora da entidade (olhos ou pés) para os próximos subcomandos.',
      arguments: [
        { name: 'anchor_point', type: 'anchor_point', required: true, description: 'Ponto de âncora: "eyes" ou "feet".', options: [{value: 'eyes', description: 'Olhos da entidade'}, {value: 'feet', description: 'Pés da entidade'}] },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ]
    },
    {
      name: 'as',
      type: 'execute_subcommand',
      description: 'Executa o comando como se fosse a(s) entidade(s) alvo.',
      arguments: [
        { name: 'origin', type: 'player', required: true, description: 'Entidade(s) para executar como (ex: @a, @p, nome_do_jogador).' },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ]
    },
    {
      name: 'at',
      type: 'execute_subcommand',
      description: 'Executa o comando na posição da(s) entidade(s) alvo.',
      arguments: [
        { name: 'origin', type: 'player', required: true, description: 'Entidade(s) para usar a posição (ex: @e[type=armor_stand], @s).' },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ]
    },
    {
      name: 'facing',
      type: 'execute_subcommand',
      description: 'Define a rotação do executor para encarar um ponto ou entidade.',
      arguments: [
        { 
          name: 'facing_type', 
          type: 'execute_facing_type', 
          required: true, 
          description: 'Encarar "entity" ou uma "pos" (coordenadas).', 
          options: [
            {value: 'entity', description: 'Encarar uma entidade.'}, 
            {value: 'pos', description: 'Encarar uma posição (x y z).'}
          ] 
        },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ],
      conditionalArgs: (currentArgs) => {
        const facingTypeArg = currentArgs.find(arg => arg.name === 'facing_type');
        if (facingTypeArg && facingTypeArg.value === 'entity') {
          return [
            { name: 'target_entity', type: 'player', required: true, description: 'Entidade a ser encarada.' },
            { name: 'anchor', type: 'anchor_point', required: true, description: 'Ponto da entidade alvo para encarar.', options: [{value: 'eyes', description: 'Olhos'}, {value: 'feet', description: 'Pés'}] }
          ];
        } else if (facingTypeArg && facingTypeArg.value === 'pos') {
          return [
            { name: 'x', type: 'coordinate', required: true, description: 'Coordenada X do ponto a encarar.' },
            { name: 'y', type: 'coordinate', required: true, description: 'Coordenada Y do ponto a encarar.' },
            { name: 'z', type: 'coordinate', required: true, description: 'Coordenada Z do ponto a encarar.' }
          ];
        }
        return [];
      }
    },
    {
      name: 'in',
      type: 'execute_subcommand',
      description: 'Executa o comando em uma dimensão específica.',
      arguments: [
        { name: 'dimension', type: 'dimension', required: true, description: 'Dimensão (overworld, the_nether, the_end).', options: [{value: 'overworld', description: 'Dimensão Normal'}, {value: 'the_nether', description: 'Dimensão do Nether'}, {value: 'the_end', description: 'Dimensão do Fim'}] },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ]
    },
    {
      name: 'positioned',
      type: 'execute_subcommand',
      description: 'Define a posição de execução do comando.',
      arguments: [
         { 
           name: 'positioned_type', 
           type: 'execute_positioned_type', 
           required: true, 
           description: 'Posicionar "as" (como uma entidade) ou em "pos" (coordenadas).', 
           options: [
            {value: 'as', description: 'Usar posição de uma entidade.'}, 
            {value: 'pos', description: 'Usar coordenadas (x y z).'}
           ] 
         },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ],
      conditionalArgs: (currentArgs) => {
        const positionedTypeArg = currentArgs.find(arg => arg.name === 'positioned_type');
        if (positionedTypeArg && positionedTypeArg.value === 'as') {
          return [{ name: 'origin_entity', type: 'player', required: true, description: 'Entidade para obter a posição.' }];
        } else if (positionedTypeArg && positionedTypeArg.value === 'pos') {
          return [
            { name: 'x', type: 'coordinate', required: true, description: 'Coordenada X para executar.' },
            { name: 'y', type: 'coordinate', required: true, description: 'Coordenada Y para executar.' },
            { name: 'z', type: 'coordinate', required: true, description: 'Coordenada Z para executar.' }
          ];
        }
        return [];
      }
    },
    {
      name: 'rotated',
      type: 'execute_subcommand',
      description: 'Define a rotação de execução do comando.',
      arguments: [
        { 
          name: 'rotated_type', 
          type: 'execute_rotated_type', 
          required: true, 
          description: 'Rotacionar "as" (como uma entidade) ou para "rot" (yaw pitch).', 
          options: [
            {value: 'as', description: 'Usar rotação de uma entidade.'}, 
            {value: 'rot', description: 'Usar valores yaw/pitch.'}
          ] 
        },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ],
      conditionalArgs: (currentArgs) => {
        const rotatedTypeArg = currentArgs.find(arg => arg.name === 'rotated_type');
        if (rotatedTypeArg && rotatedTypeArg.value === 'as') {
          return [{ name: 'target_entity_rotation', type: 'player', required: true, description: 'Entidade para obter a rotação.' }];
        } else if (rotatedTypeArg && rotatedTypeArg.value === 'rot') {
          return [
            { name: 'yaw', type: 'number', required: true, description: 'Valor de Yaw (rotação horizontal).' },
            { name: 'pitch', type: 'number', required: true, description: 'Valor de Pitch (rotação vertical).' }
          ];
        }
        return [];
      }
    },
    {
      name: 'if',
      type: 'execute_conditional',
      description: 'Executa se uma condição for verdadeira (if) ou falsa (unless).',
      arguments: [
        { 
          name: 'condition_type', 
          type: 'execute_condition_type', 
          required: true, 
          description: 'Tipo de condição: block, blocks, entity, score.', 
          options: [
            {value: 'block', description: 'Verifica um bloco específico.'},
            {value: 'blocks', description: 'Verifica uma região de blocos.'},
            {value: 'entity', description: 'Verifica uma(s) entidade(s).'},
            {value: 'score', description: 'Verifica um placar (score).'}
          ]
        },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ],
      conditionalArgs: (currentArgs, mainCommandName) => {
        const conditionTypeArg = currentArgs.find(arg => arg.name === 'condition_type');
        if (!conditionTypeArg || !conditionTypeArg.value) return [];

        switch (conditionTypeArg.value) {
          case 'block':
            return [
              { name: 'x', type: 'coordinate', required: true, description: 'Coordenada X do bloco.' },
              { name: 'y', type: 'coordinate', required: true, description: 'Coordenada Y do bloco.' },
              { name: 'z', type: 'coordinate', required: true, description: 'Coordenada Z do bloco.' },
              { name: 'block_id', type: 'item', required: true, description: 'ID do bloco a ser verificado.' }
            ];
          case 'blocks':
            return [
              { name: 'begin_x', type: 'coordinate', required: true, description: 'Início X da região.' },
              { name: 'begin_y', type: 'coordinate', required: true, description: 'Início Y da região.' },
              { name: 'begin_z', type: 'coordinate', required: true, description: 'Início Z da região.' },
              { name: 'end_x', type: 'coordinate', required: true, description: 'Fim X da região.' },
              { name: 'end_y', type: 'coordinate', required: true, description: 'Fim Y da região.' },
              { name: 'end_z', type: 'coordinate', required: true, description: 'Fim Z da região.' },
              { name: 'destination_x', type: 'coordinate', required: true, description: 'Destino X para comparação.' },
              { name: 'destination_y', type: 'coordinate', required: true, description: 'Destino Y para comparação.' },
              { name: 'destination_z', type: 'coordinate', required: true, description: 'Destino Z para comparação.' },
              { name: 'scan_mode', type: 'scan_mode', required: true, description: 'Modo de varredura (all ou masked).', options: [{value: 'all', description:'Todos os blocos'}, {value: 'masked', description:'Ignora blocos de ar'}] }
            ];
          case 'entity':
            return [{ name: 'target_selector', type: 'player', required: true, description: 'Seletor de entidade(s) a verificar.' }];
          case 'score':
            return [
              { name: 'target_score_holder', type: 'player', required: true, description: 'Alvo do placar.' },
              { name: 'target_objective', type: 'objective_name', required: true, description: 'Objetivo do alvo.' },
              { name: 'condition_operator_or_matches', type: 'score_condition_type', required: true, description: 'Operador de comparação ou "matches".', options: [{value:'<', description:'Menor que'},{value:'<=', description:'Menor ou igual a'},{value:'=', description:'Igual a'},{value:'>=', description:'Maior ou igual a'},{value:'>', description:'Maior que'},{value:'matches', description:'Verifica um intervalo'}] },
            ];
          default: return [];
        }
      },
      subConditionalArgs: (currentArgs) => {
        const scoreConditionType = currentArgs.find(arg => arg.name === 'condition_operator_or_matches');
        if (scoreConditionType && scoreConditionType.value && scoreConditionType.value !== 'matches') {
          return [
            { name: 'source_score_holder', type: 'player', required: true, description: 'Fonte do placar para comparação.' },
            { name: 'source_objective', type: 'objective_name', required: true, description: 'Objetivo da fonte.' }
          ];
        } else if (scoreConditionType && scoreConditionType.value === 'matches') {
          return [{ name: 'range', type: 'integer_range', required: true, description: 'Intervalo de placar (ex: 1..5, 10, ..7).' }];
        }
        return [];
      }
    },
    {
      name: 'unless',
      type: 'execute_conditional',
      description: 'Executa se uma condição for falsa.',
      arguments: [
        { 
          name: 'condition_type', 
          type: 'execute_condition_type', 
          required: true, 
          description: 'Tipo de condição: block, blocks, entity, score.', 
          options: [
            {value: 'block', description: 'Verifica um bloco específico.'},
            {value: 'blocks', description: 'Verifica uma região de blocos.'},
            {value: 'entity', description: 'Verifica uma(s) entidade(s).'},
            {value: 'score', description: 'Verifica um placar (score).'}
          ]
        },
        { name: 'chainedCommand', type: 'execute_chain', required: true, description: 'Próximo subcomando execute ou run.' }
      ],
      conditionalArgs: (currentArgs, mainCommandName) => { 
        const conditionTypeArg = currentArgs.find(arg => arg.name === 'condition_type');
        if (!conditionTypeArg || !conditionTypeArg.value) return [];
        switch (conditionTypeArg.value) {
          case 'block': return [{ name: 'x', type: 'coordinate', required: true }, { name: 'y', type: 'coordinate', required: true }, { name: 'z', type: 'coordinate', required: true }, { name: 'block_id', type: 'item', required: true }];
          case 'blocks': return [{ name: 'begin_x', type: 'coordinate', required: true }, { name: 'begin_y', type: 'coordinate', required: true }, { name: 'begin_z', type: 'coordinate', required: true }, { name: 'end_x', type: 'coordinate', required: true }, { name: 'end_y', type: 'coordinate', required: true }, { name: 'end_z', type: 'coordinate', required: true }, { name: 'destination_x', type: 'coordinate', required: true }, { name: 'destination_y', type: 'coordinate', required: true }, { name: 'destination_z', type: 'coordinate', required: true }, { name: 'scan_mode', type: 'scan_mode', required: true, options: [{value: 'all'}, {value: 'masked'}] }];
          case 'entity': return [{ name: 'target_selector', type: 'player', required: true }];
          case 'score': return [{ name: 'target_score_holder', type: 'player', required: true }, { name: 'target_objective', type: 'objective_name', required: true }, { name: 'condition_operator_or_matches', type: 'score_condition_type', required: true, options: [{value:'<'},{value:'<='},{value:'='},{value:'>='},{value:'>'},{value:'matches'}] }];
          default: return [];
        }
      },
      subConditionalArgs: (currentArgs) => {
        const scoreConditionType = currentArgs.find(arg => arg.name === 'condition_operator_or_matches');
        if (scoreConditionType && scoreConditionType.value && scoreConditionType.value !== 'matches') return [{ name: 'source_score_holder', type: 'player', required: true }, { name: 'source_objective', type: 'objective_name', required: true }];
        if (scoreConditionType && scoreConditionType.value === 'matches') return [{ name: 'range', type: 'integer_range', required: true }];
        return [];
      }
    },
    {
      name: 'run',
      type: 'execute_run',
      description: 'Executa um comando normal no final da cadeia execute.',
      arguments: [
        { name: 'command', type: 'command_string', required: true, description: 'Comando a ser executado (ex: /say Olá, /give @p stone).' }
      ]
    }
  ];

  return [
    {
      name: 'give',
      description: 'Dá um item para o jogador especificado.',
      arguments: [
        { name: 'target', type: 'player', required: true, description: 'O jogador que receberá o item.' },
        { name: 'item', type: 'item', required: true, description: 'O item a ser dado.' },
        { name: 'amount', type: 'number', required: false, description: 'Quantidade do item (padrão: 1).' }
      ]
    },
    {
      name: 'tell',
      description: 'Envia uma mensagem no chat para todos os jogadores.',
      arguments: [
        { name: 'target', type: 'player', required: false, description: 'O jogador para quem a mensagem será sussurrada (opcional).' },
        { name: 'mensagem', type: 'text', required: true, greedy: true, description: 'A mensagem a ser enviada.' }
      ]
    },
    {
      name: 'say',
      description: 'Envia uma mensagem no chat para todos os jogadores.',
      arguments: [
        { name: 'target', type: 'player', required: false, description: 'O jogador para quem a mensagem será sussurrada (opcional).' },
        { name: 'mensagem', type: 'text', required: true, greedy: true, description: 'A mensagem a ser enviada.' }
      ]
    },
    {
      name: 'tp',
      description: 'Teleporta um jogador para uma localização ou outro jogador.',
      arguments: [
        { name: 'target', type: 'player', required: true, description: 'O jogador a ser teleportado.' },
        { name: 'destination_player_or_x', type: 'player_or_coordinate', required: true, description: 'Jogador destino ou coordenada X.'},
        { name: 'y', type: 'coordinate', required: false, description: 'Coordenada Y (se X for coordenada).'},
        { name: 'z', type: 'coordinate', required: false, description: 'Coordenada Z (se X for coordenada).'}
      ]
    },
    {
      name: 'gamemode',
      description: 'Altera o modo de jogo de um jogador.',
      arguments: [
        { name: 'mode', type: 'gamemode', required: true, description: 'O modo de jogo (survival, creative, adventure, spectator).', options: [{value: 'survival'}, {value: 'creative'}, {value: 'adventure'}, {value: 'spectator'}] },
        { name: 'target', type: 'player', required: false, description: 'O jogador alvo (padrão: você).' }
      ]
    },
    {
      name: 'time',
      description: 'Controla o tempo no mundo.',
      arguments: [
        { name: 'action', type: 'time_action', required: true, description: 'Ação: set, add, query.', options: [{value: 'set'}, {value: 'add'}, {value: 'query'}] },
        { name: 'value', type: 'time_value_or_keyword', required: (parsedArgs) => parsedArgs.find(a => a.name === 'action')?.value !== 'query', description: 'Valor do tempo (ticks) ou palavra-chave (day, night, noon, midnight).', options: [{value: 'day'}, {value: 'night'}, {value: 'noon'}, {value: 'midnight'}] }
      ]
    },
    {
      name: 'kill',
      description: 'Mata entidades especificadas.',
      arguments: [
        { name: 'target', type: 'player', required: false, description: 'As entidades a serem mortas (padrão: você, se omitido).' }
      ]
    },
    {
      name: 'clear',
      description: 'Remove itens do inventário de jogadores.',
      arguments: [
        { name: 'target', type: 'player', required: false, description: 'Os jogadores alvo (padrão: você).' },
        { name: 'item', type: 'item', required: false, description: 'O item específico a ser removido.' },
        { name: 'amount', type: 'number', required: false, description: 'Quantidade máxima a ser removida (padrão: todos).' }
      ]
    },
    {
      name: 'weather',
      description: 'Controla o clima no mundo.',
      arguments: [
        { name: 'type', type: 'weather_type', required: true, description: 'Tipo de clima (clear, rain, thunder).', options: [{ value: 'clear', description: 'Tempo limpo' }, { value: 'rain', description: 'Chuva' }, { value: 'thunder', description: 'Tempestade' }] },
        { name: 'duration', type: 'number', required: false, description: 'Duração em segundos (padrão: aleatório).' }
      ]
    },
    {
      name: 'effect',
      description: 'Adiciona ou remove efeitos de status.',
      arguments: [
        { name: 'target', type: 'player', required: true, description: 'O jogador alvo.' },
        { name: 'effect_action_or_id', type: 'effect_action_or_id', required: true, description: '"clear" ou ID do efeito.', options: [{value: 'clear', description: 'Remove todos os efeitos.'}] },
      ],
      conditionalArgs: (currentArgs) => {
        const actionOrId = currentArgs.find(arg => arg.name === 'effect_action_or_id');
        if (actionOrId && actionOrId.value !== 'clear') {
          return [
            { name: 'duration', type: 'number', required: false, description: 'Duração em segundos (padrão: 30s).' },
            { name: 'amplifier', type: 'number', required: false, description: 'Nível do efeito, 0-255 (padrão: 0).' },
            { name: 'hide_particles', type: 'boolean', required: false, description: 'Esconder partículas (true/false, padrão: false).', options:[{value: 'true'}, {value: 'false'}] }
          ];
        }
        return [];
      }
    },
    {
      name: 'xp',
      description: 'Adiciona ou remove experiência de um jogador.',
      arguments: [
        { name: 'action', type: 'xp_action', required: true, description: 'Ação: add, set, query.', options: [{value: 'add'}, {value: 'set'}, {value: 'query'}]},
        { name: 'target', type: 'player', required: true, description: 'O jogador alvo.' },
        { name: 'amount', type: 'number', required: (parsedArgs) => ['add', 'set'].includes(parsedArgs.find(a => a.name === 'action')?.value), description: 'A quantidade de experiência.' },
        { name: 'unit', type: 'xp_unit', required: false, description: 'Unidade de experiência (levels ou points).', options: [{value: 'levels'}, {value: 'points'}] }
      ]
    },
    {
      name: 'execute',
      description: 'Executa um comando com modificadores de contexto.',
      isExecute: true, 
      arguments: [
        { 
          name: 'subcommand_or_run', 
          type: 'execute_start', 
          required: true, 
          description: 'Escolha um subcomando do execute ou "run" para continuar.',
          options: executeSubCommands.map(sc => ({value: sc.name, description: sc.description, type: sc.type === 'execute_run' ? 'execute_run_option' : 'execute_subcommand_option'})) 
        }
      ],
      subCommands: executeSubCommands 
    }
  ];
};