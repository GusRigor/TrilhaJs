class Trilha{
    constructor(container){
        this.container_element = container;
        this.gameOver = false;
        this.jogadaComplementar = false;
        this.indexAnterior = 0;
        this.jogadas = 10;
        this.jogadores = {
            opcoes: [new Jogador("blue"), new Jogador("red")],
            jogadorAtual: 0,
            trocar: function(){
                this.jogadorAtual = (this.jogadorAtual === 0) ? 1: 0;
            }
        }
        this.tabuleiro = [];
        this.moinhos_possiveis = [];
        this.movimentos_possiveis = [];
        this.moinhos_feitos = []
    }

    jogar(){
        this.jogadas = 10;
        this.tabuleiro = [
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
        this.movimentos_possiveis = [
            /*A7:0*/ [1,9], /*D7:1*/ [0,2,4], /*G7:2*/ [1,14],
            /*B6:3*/ [4,10], /*D6:4*/ [1,3,5,7], /*F6:5*/ [4,13],
            /*C5:6*/ [7,11], /*D5:7*/ [4,6,8], /*E5:8*/ [7,12],
            /*A4:9*/ [0,10,21], /*B4:10*/ [3,9,11,18], /*C4:11*/ [6,10,15],
            /*E4:12*/ [8,13,17], /*F4:13*/ [5,12,14,20], /*G4:14*/ [2,13,23],
            /*C3:15*/ [11,16], /*D3:16*/ [15,17,19], /*E3:17*/ [12,16],
            /*B2:18*/ [10,19], /*D2:19*/ [16,18,20,22], /*F2:20*/ [13,19],
            /*A1:21*/ [9,22], /*D1:22*/ [19,21,23], /*G1:23*/ [14,22]
        ];
        this.moinhos_feitos = []
        this.desenhar()
    }

    desenhar(){
        let content = '';
        this.tabuleiro.forEach(function(homem, index){
            content += '<div class="'+ homem.posicao +'"> <div onclick="trilha.jogada(' + index +')" class="bola" style="background:'+ homem.simbolo+';">' + "" + '</div> </div>';
        })
        this.container_element.innerHTML = content;
    }

    jogada(index){

        //Jogo acabou
        if(this.gameOver){ 
            this.jogar()
            //Fazer aparecer que o jogo acabou e que ele pode reiniciar o jogo
            return false
        };


        if(this.pecas_jogador_atual() <= 0 && this.jogador_atual() ){

            //Verifica se o jogo acabou e mostra a tela
            if(this.jogadas <= 0 && this.e_primeira_jogada()){
                this.jogo_acabou();

            }else if(this.e_primeira_jogada() && this.tabuleiro[index].simbolo === this.jogador_atual().simbolo){
                this.indexAnterior = index
                this.jogadaComplementar = true
                if(this.jogadores.opcoes[0].peca_tabuleiro == 3 && this.jogadores.opcoes[0].peca_tabuleiro == 3){
                    this.jogadas--
                }
                console.log('Primeira jogada. Contador de jogadas em: ' + this.jogadas)
                
            }else if(this.e_primeira_jogada() && this.jogador_atual().remover && this.tabuleiro[index].simbolo === this.simbolo_outroJogador()){
                this.tabuleiro[index].simbolo = this.jogador_atual().fez_moinho()
                this.desenhar();
                this.verifica_removeu_moinho();
                this.jogador_atual().remover = false
                console.log("removeu uma peca")
                this.jogadores.trocar()
                this.jogador_atual().peca_tabuleiro --;
            }else if(this.jogadaComplementar){
                if(this.movimentos_possiveis[this.indexAnterior].includes(index) && this.tabuleiro[index].simbolo === ''){
                    this.tabuleiro[this.indexAnterior].simbolo = ''
                    this.tabuleiro[index].simbolo = this.jogador_atual().jogada()
                    this.desenhar();
                    if(this.verifica_moinho(this.tabuleiro[index].simbolo) == -1){
                        this.jogadaComplementar = false
                    }
                    this.jogadores.trocar();
                }
            }
        }else if(this.e_primeira_jogada()){
            if(this.jogador_atual().remover && this.tabuleiro[index].simbolo === this.simbolo_outroJogador()){
                this.tabuleiro[index].simbolo = this.jogador_atual().fez_moinho()
                this.desenhar();
                this.verifica_removeu_moinho();
                this.jogador_atual().remover = false
                this.jogadores.trocar();
                this.jogador_atual().peca_tabuleiro --;
            }else if(this.tabuleiro[index].simbolo === '' && !this.jogador_atual().remover){
                this.tabuleiro[index].simbolo = this.jogador_atual().jogada()
                this.desenhar();
                this.verifica_moinho(this.tabuleiro[index].simbolo)
                this.jogadores.trocar();
            }
        };     
        console.log('prox: ' + this.jogador_atual().simbolo +' '+ this.jogador_atual().remover +' '+this.jogador_atual().jogadas + " "+ this.jogadaComplementar)
    }

    jogo_acabou(){
        this.gameOver = true
        console.log('ACABOU')
    }

    verifica_moinho(simbolo){
        this.moinhos_possiveis.forEach(function(sequencia,i){
            if(trilha.tabuleiro[trilha.moinhos_possiveis[i][0]].simbolo == simbolo && trilha.tabuleiro[trilha.moinhos_possiveis[i][1]].simbolo == simbolo && trilha.tabuleiro[trilha.moinhos_possiveis[i][2]].simbolo == simbolo){
                trilha.moinhos_possiveis.splice(i,1)
                trilha.moinhos_feitos.push(sequencia)
                trilha.jogadores.opcoes[trilha.jogadores.jogadorAtual].fez_moinho()
                trilha.jogadores.trocar();
                console.log('moinho feito: '+ sequencia)
                return sequencia;
            }
        })
        return -1;
    }
    
    verifica_removeu_moinho(){
        let simbolo = this.simbolo_outroJogador()
        this.moinhos_feitos.forEach(function(sequencia, i){
            if(trilha.tabuleiro[trilha.moinhos_feitos[i][0]].simbolo == simbolo || trilha.tabuleiro[trilha.moinhos_feitos[i][1]].simbolo == simbolo || trilha.tabuleiro[trilha.moinhos_feitos[i][2]].simbolo == simbolo){
                console.log('moinho removido: '+ trilha.moinhos_feitos[i])
                trilha.moinhos_feitos.splice(i,1)
                trilha.moinhos_possiveis.push(sequencia)
                trilha.jogadores.opcoes[trilha.jogadores.jogadorAtual].removeu_moinho()
                console.log('removeu moinho')
                return 1;
            }
        })
        return -1;
    }

    pecas_jogador_atual(){
        return this.jogador_atual().pecas
    };

    jogador_atual(){
        return this.jogadores.opcoes[this.jogadores.jogadorAtual]
    }

    e_primeira_jogada(){
        return !this.jogadaComplementar
    }



    simbolo_outroJogador(){
        this.jogadores.trocar();
        let simb = this.jogador_atual().simbolo;
        this.jogadores.trocar();
        return simb;
    }
}
