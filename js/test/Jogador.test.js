const jogador_teste = require('../jogador')

test('O simbolo do jogador é azul', () => {
    expect(jogador_teste.simbolo).toBe('blue')
})

test('O Jogador fez uma jogada', () => {
    jogador_teste.jogada()
    expect(jogador_teste.peca_tabuleiro).toBe(1)
})

test('O Jogador fez uma jogada e retornou seu  simbolo', () => {
    expect(jogador_teste.jogada()).toBe('blue')
})

test('O jogador está com 7 peças', () => {
    expect(jogador_teste.pecas).toBe(7)
})

test('O jogador fez um moinho', () => {
    jogador_teste.fez_moinho()
    expect(jogador_teste.remover).toBe(true)
})