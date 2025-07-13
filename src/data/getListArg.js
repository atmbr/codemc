// src/data/getListArg.js
export const getListArg = () => ({
  playerSelector: [
    { value: '@p', description: 'Jogador mais próximo', type: 'player', insertText: '@p' },
    { value: '@a', description: 'Todos os jogadores', type: 'player', insertText: '@a' },
    { value: '@r', description: 'Jogador aleatório', type: 'player', insertText: '@r' },
    { value: '@s', description: 'Você mesmo (executor)', type: 'player', insertText: '@s' },
    { value: '@e', description: 'Todas as entidades', type: 'player', insertText: '@e' },
    { value: '@e[]', description: 'Todas as entidades com filtros', type: 'player', insertText: '@e[]', noSpaceAfterInsert: true },
    { value: '@p[]', description: 'Jogador mais próximo com filtros', type: 'player', insertText: '@p[]', noSpaceAfterInsert: true },
    { value: '@a[]', description: 'Todos os jogadores com filtros', type: 'player', insertText: '@a[]', noSpaceAfterInsert: true },
    { value: '@r[]', description: 'Jogador aleatório com filtros', type: 'player', insertText: '@r[]', noSpaceAfterInsert: true },
    { value: '@s[]', description: 'Executor com filtros', type: 'player', insertText: '@s[]', noSpaceAfterInsert: true }
  ],
  item: [
    { value: 'minecraft:diamond_sword', description: 'Espada de Diamante', type: 'item' },
    { value: 'minecraft:stone', description: 'Pedra', type: 'item' },
    { value: 'minecraft:apple', description: 'Maçã', type: 'item' },
    { value: 'minecraft:dirt', description: 'Terra', type: 'item' },
    { value: 'minecraft:air', description: 'Ar', type: 'item' }
  ],
  number: [
    { value: '1', description: 'Um', type: 'number' },
    { value: '10', description: 'Dez', type: 'number' },
    { value: '64', description: 'Pack', type: 'number' }
  ],
  coordinate: [
    { value: '~', description: 'Relativo à posição atual', type: 'coordinate' },
    { value: '0', description: 'Coordenada zero', type: 'coordinate' }
  ],
  axe: [
    { value: 'x', description: 'Eixo X', type: 'axes_string' },
    { value: 'y', description: 'Eixo Y', type: 'axes_string' },
    { value: 'z', description: 'Eixo Z', type: 'axes_string' },
    { value: 'xy', description: 'Eixos X e Y', type: 'axes_string' },
    { value: 'xz', description: 'Eixos X e Z', type: 'axes_string' },
    { value: 'yz', description: 'Eixos Y e Z', type: 'axes_string' },
    { value: 'xyz', description: 'Eixos X, Y e Z', type: 'axes_string' }
  ],
  playerOrCoord: [
    { value: '@p', description: 'Jogador mais próximo', type: 'player' },
    { value: '~', description: 'Coordenada relativa X', type: 'coordinate' }
  ],
  timeValue: [
    { value: '0', description: 'Início do dia (ticks)', type: 'number' },
    { value: 'day', description: 'Define para 1000 ticks', type: 'keyword' },
    { value: 'noon', description: 'Define para 6000 ticks', type: 'keyword' },
    { value: 'night', description: 'Define para 13000 ticks', type: 'keyword' },
    { value: 'midnight', description: 'Define para 18000 ticks', type: 'keyword' }
  ],
  effectAction: [
    { value: 'clear', description: 'Remove todos os efeitos', type: 'keyword' },
    { value: 'minecraft:speed', description: 'Efeito de Velocidade', type: 'item' },
    { value: 'minecraft:strength', description: 'Efeito de Força', type: 'item' }
  ],
  objective: [
    { value: 'health', description: 'Objetivo de Vida', type: 'objective' },
    { value: 'kills', description: 'Objetivo de Abates', type: 'objective' }
  ],
  range: [
    { value: '1..5', description: 'De 1 a 5', type: 'range' },
    { value: '10', description: 'Exatamente 10', type: 'range' },
    { value: '..7', description: 'Até 7 (inclusive)', type: 'range' },
    { value: '0..', description: 'De 0 em diante', type: 'range' }
  ],
  mob:[
    { value: 'zombie', description: 'Zumbi', type: 'entity_type' },
      { value: 'creeper', description: 'Creeper', type: 'entity_type' },
      { value: 'player', description: 'Jogador', type: 'entity_type' }
  ],
  filterDistance: [
    { value: '..10', description: 'Até 10 blocos', type: 'range' },
    { value: '5..15', description: 'Entre 5 e 15 blocos', type: 'range' }
  ],
  filterShort: [
    { value: 'nearest', description: 'Mais próximo', type: 'keyword' },
    { value: 'random', description: 'Aleatório', type: 'keyword' }
  ]
});
