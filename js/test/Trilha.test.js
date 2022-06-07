/**
 * @jest-environment jsdom
 */

const trilha_teste = require('../trilha')

// Testes do construtor
test('O game ainda não acabou', () => {
    expect(trilha_teste.gameOver).toBe(false)
})

test('Sem jogada complementar', () => {
    expect(trilha_teste.jogadaComplementar).toBe(false)
})

test('O index da jogada anterior é zero', () => {
    expect(trilha_teste.indexAnterior).toBe(0)
})

test('Temos dois jogadores nesse tabuleiro', () => {
    expect(trilha_teste.jogadores.opcoes.length).toBe(2)
})

test('O jogador atual é o da primeira posição', () => {
    expect(trilha_teste.jogadores.jogadorAtual).toBe(0)
})



test('O tabuleiro começou com 24 posições', () => {
    const game = document.createElement("p");
    game.innerText = "game";
    trilha_teste.container_element = game
    trilha_teste.jogar()
    expect(trilha_teste.tabuleiro.length).toBe(24)
})

test('Definidos os 8 moinhos possíveis', () => {
    expect(trilha_teste.moinhos_possiveis.length).toBe(16)
})

//Criando uma jogada fake em A7
test('Verificando a primeira jogada na posição A7', () => {
    trilha_teste.tabuleiro[0].simbolo = "blue"
    trilha_teste.jogadores.trocar()
    expect(trilha_teste.tabuleiro[0].simbolo).toBe("blue")
})

test('Tentando jogar novamente na posição A7', () => {
    trilha_teste.jogada(0)
    expect(trilha_teste.tabuleiro[0].simbolo).toBe("blue")
})

test('Fazendo um moinho, e verificando se foi adicionado ao moinhos feitos', () => {
    trilha_teste.jogada(3) //jogador 2
    trilha_teste.jogada(1)
    trilha_teste.jogada(4) //jogador 2
    trilha_teste.jogada(2)
    expect(trilha_teste.moinhos_feitos.length).toBe(1)
})

test('Verifica se o moinho foi adicionado corretamente', () => {
    expect(trilha_teste.moinhos_feitos[0][0]).toBe(0)
    expect(trilha_teste.moinhos_feitos[0][1]).toBe(1)
    expect(trilha_teste.moinhos_feitos[0][2]).toBe(2)
})

test('Verifica se removeu a peça corretamente', () => {
    expect(trilha_teste.tabuleiro[4].simbolo).toBe("red")
    expect(trilha_teste.jogador_atual().simbolo).toBe("blue")
    trilha_teste.jogada(4)
    expect(trilha_teste.tabuleiro[4].simbolo).toBe('')
})

test('Verifica se agora é vez do jogador vermelho', () => {
    expect(trilha_teste.e_primeira_jogada()).toBe(true)
    expect(trilha_teste.jogador_atual().simbolo).toBe("red")
})