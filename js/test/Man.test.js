const man_teste = require('../man')

test('Posição é A1', () => {
    expect(man_teste.posicao).toBe('A1')
})

test('Cor atual é azul', () => {
    expect(man_teste.simbolo).toBe('blue')
})