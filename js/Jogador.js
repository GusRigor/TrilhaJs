class Jogador{
    constructor(cor){
        this.jogadas = 9
        this.cor = cor
    }

    jogada(){
        if (this.jogadas != 0)
        this.jogadas -= 1
        return this.cor
    }
    fez_moinho(){
        return ''
    }
}