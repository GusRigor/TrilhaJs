const trilha ={
    tabuleiro: [
        '','','',
        '','','',
        '','','',
        '','','', '','','',
        '','','',
        '','','',
        '','','',
    ],
    simbolos: ['p','b'],
    container_element: null,

    init: function(container){
        this.container_element = container;
    },

    draw: function(){
        let content = '';

        for (i in this.tabuleiro){
            content += '<div> <div class="bola">' + i + '</div> </div>';
        }
        this.container_element.innerHTML = content;
    },
};