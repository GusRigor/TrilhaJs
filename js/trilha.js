const trilha ={
    //TODO: Criar um objeto para os espaço da trilha
    tabuleiro: [
        {"p":"A7"},{"p":"D7"},{"p":"G7"},
        {"p":"B6"},{"p":"D6"},{"p":"F6"},
        {"p":"C5"},{"p":"D5"},{"p":"E5"},
        {"p":"A4"},{"p":"B4"},{"p":"C4"}, {"p":"E4"},{"p":"F4"},{"p":"G4"},
        {"p":"C3"},{"p":"D3"},{"p":"E3"},
        {"p":"B2"},{"p":"D2"},{"p":"F2"},
        {"p":"A1"},{"p":"D1"},{"p":"G1"}
    ],
    simbolos: ['preto','branco', 'vazio'],
    container_element: null,

    init: function(container){
        this.container_element = container;
    },

    draw: function(){
        let content = '';

        this.tabuleiro.forEach(function(homem){
            content += '<div class="'+ homem.p +'"> <div class="bola">' + " " + '</div> </div>';
        })

        this.container_element.innerHTML = content;
    },
};