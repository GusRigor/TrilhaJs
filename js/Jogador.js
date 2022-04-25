class Jogador{
    constructor(simbolo){
        this.jogadas = 9
        this.simbolo = simbolo
        this.remover = false
    }

    jogada(){
        if (this.jogadas != 0)
        this.jogadas -= 1
        return this.simbolo
    }
    fez_moinho(){
        this.remover = true
        return ''
    }
    removeu_moinho(){
        this.remover = false
        return ''
    }
}