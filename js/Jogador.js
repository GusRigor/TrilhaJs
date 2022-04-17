class Jogador{
    constructor(simbolo){
        this.jogadas = 9
        this.simbolo = simbolo
    }

    jogada(){
        if (this.jogadas != 0)
        this.jogadas -= 1
        return this.simbolo
    }
    fez_moinho(){
        return ''
    }
}