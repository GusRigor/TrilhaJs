const trilha_teste = require('../trilha')

test('Trilha é a primeira jogada', () => {
    expect(trilha_teste.e_primeira_jogada()).toBe(true)
})
