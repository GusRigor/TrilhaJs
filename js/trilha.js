class Trilha{
    constructor(container){
        this.container_element = container;
        this.gameOver = false;
        this.jogadores = {
            opcoes: [new Jogador("black"), new Jogador("white")],
            jogadorAtual: 0,
            trocar: function(){
                this.jogadorAtual = (this.jogadorAtual === 0) ? 1: 0;
            }
        }
        this.tabuleiro = 
        [
            new Man("A7",''), new Man("D7",''), new Man("G7",''),
            new Man("B6",''), new Man("D6",''), new Man("F6",''),
            new Man("C5",''), new Man("D5",''), new Man("E5",''),

            new Man("A4",''), new Man("B4",''), new Man("C4",''),new Man("E4",''), new Man("F4",''), new Man("G4",''),
            
            new Man("C3",''), new Man("D3",''), new Man("E3",''),
            new Man("B2",''), new Man("D2",''), new Man("F2",''),
            new Man("A1",''), new Man("D1",''), new Man("G1",'')
        ];
    }

    draw(){
        let content = '';
        let index = 0;
        this.tabuleiro.forEach(function(homem){
            content += '<div class="'+ homem.posicao +'"> <div onclick="trilha.jogada(' + index +')" class="bola" style="background:'+ homem.simbolo+';">' + "" + '</div> </div>';
            index ++;
        })

        this.container_element.innerHTML = content;
    }
    jogada(index){
        if(this.gameOver) return false;
        if(this.tabuleiro[index].simbolo === ''){
            this.tabuleiro[index].simbolo = this.jogadores.opcoes[this.jogadores.jogadorAtual].jogada()
            this.draw();
            this.jogadores.trocar();
        }
    }
}
