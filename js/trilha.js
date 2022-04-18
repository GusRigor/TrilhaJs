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
        this.moinhos_possiveis = [
            //['A1','D1','G1'], ['A1','A4','A7'],
            [21,22,23], [21,9,0],
            //['D1','D2','D3'], ['G1','G4','G7'],
            [22,19,16], [23,14,2],
            //['B2','D2','F2'], ['B2','B4','B6'],
            [18,19,20], [18,10,3],
            //['F2','F4','F6'], ['C3','D3','E3'],
            [20,13,5], [15,16,17],
            //['C3','C4','C5'], ['E3','E4','E5'],
            [15,11,6], [17,12,8],
            //['A4','B4','C4'], ['E4','F4','G4'],
            [9,10,11], [12,13,14],
            //['C5','D5','E8'], ['D5','D6','D7']
            [6,7,8], [7,4,1],
            //['B6','D6','F6'], ['A7','D7','G7']
            [3,4,5], [0,1,2]
        ];
        this.moinhos_feitos = []
    }

    draw(){
        let content = '';
        let index = 0;
        this.tabuleiro.forEach(function(homem){
            content += '<div class="'+ homem.posicao +'"> <div onclick="trilha.jogada(' + index +')" class="bola" style="background:'+ homem.simbolo+';">' + homem.posicao +'-'+ index + '</div> </div>';
            index ++;
        })

        this.container_element.innerHTML = content;
    }

    jogada(index){
        if(this.gameOver) return false;
        if(this.tabuleiro[index].simbolo === ''){
            this.tabuleiro[index].simbolo = this.jogadores.opcoes[this.jogadores.jogadorAtual].jogada()
            this.draw();
            this.verifica_moinho(this.tabuleiro[index].simbolo)
            this.jogadores.trocar();
        }
    }

    verifica_moinho(simbolo){
        this.moinhos_possiveis.forEach(function(sequencia,i){
            if(trilha.tabuleiro[trilha.moinhos_possiveis[i][0]].simbolo == simbolo && trilha.tabuleiro[trilha.moinhos_possiveis[i][1]].simbolo == simbolo && trilha.tabuleiro[trilha.moinhos_possiveis[i][2]].simbolo == simbolo){
                trilha.moinhos_feitos.push(trilha.moinhos_possiveis.pop(i))
                return sequencia;
            }
        })
        return -1;
    }
    
}
