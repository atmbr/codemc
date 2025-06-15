const displayMessage = {
  avisos: [
    {
      title: "Manutenção Programada",
      message: "O sistema ficará indisponível para manutenção no dia 15/07 das 22h às 02h.",
      data: "2024-07-10"
    },
    {
      title: "Atualização de Política",
      message: "A política de privacidade foi atualizada. Confira as mudanças no site.",
      data: "2024-06-30"
    }
  ],
  novidades: 
    {
      content: [
        "Agora a lógica de adicionar argumentos está mais robusta.",
        "O modal de alerta pode ser aberto por um botão e só aparece uma vez por padrão.",
        "O código foi refatorado para melhor organização e performance!"
      ],
      footer: "Explore as novidades!"
    }
  ,
  dicas: {
    command: {
      info: 
        {
          title: "Comandos Comuns",
          content: [
            {
              name: "/give <jogador> <item> [quantidade]",
              description: "Dá um item a um jogador."
            },
            {
              name: "/tp <jogador> <x> <y> <z>",
              description: "Teleporta um jogador para coordenadas."
            },
            {
              name: "/gamemode <modo> [jogador]",
              description: "Altera o modo de jogo."
            },
            {
              name: "/time set <valor>",
              description: "Define o tempo do mundo (day, night, 0-24000)."
            },
            {
              name: "/weather <tipo> [duração]",
              description: "Altera o clima (clear, rain, thunder)."
            },
            {
              name: "/kill [alvo]",
              description: "Mata entidades."
            },
            {
              name: "/effect give <jogador> <efeito> [duração] [amplificador]",
              description: "Aplica um efeito de status."
            }
          ],
          on: true
        },
    extra: {
    title: "Dicas para /execute",
    info: [
      "Use `as @e[type=armor_stand]` para executar como todos os suportes de armadura.",
      "`at @s` executa o comando na sua posição atual.",
      "`if block ~ ~-1 ~ minecraft:grass_block` verifica se há um bloco de grama abaixo.",
      "`run say Olá` no final de uma cadeia execute para executar um comando simples.",
      "Combine subcomandos: `/execute as @a at @s if entity @s[distance=..5] run say Perto!`"
    ],
    description:
      "O comando `/execute` é poderoso! Ele permite modificar o contexto de execução de outros comandos. Experimente combinar <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">as</code>, <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">at</code>, <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">if/unless</code>, <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">positioned</code>, <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">rotated</code>, <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">facing</code>, <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">in</code> e finalize com <code className=\"font-mono text-xs bg-slate-700 px-1 py-0.5 rounded\">run &lt;comando&gt;</code>."
    ,
      on: true 
    }
          
    },
    gerais: [
      "Use <code className='font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300'>@p</code> para o jogador mais próximo.",
      "<code className='font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300'>@a</code> para todos os jogadores.",
      "<code className='font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300'>@s</code> para o executor do comando.",
      "<code className='font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300'>~</code> em coordenadas é relativo à posição atual.",
      "Pressione <code className='font-mono text-xs bg-slate-700 px-1 py-0.5 rounded text-purple-300'>Espaço</code> para ver sugestões de argumentos."
    ]
  }
}

export default displayMessage;
