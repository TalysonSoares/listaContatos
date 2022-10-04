function filtrar() {
    //valor que o usuario digitou
    let expressao = input_busca.value.toLowerCase(); 

    //pegando todas as linhas da tabela
    let linhas = tabela_contatos.getElementsByTagName('tr'); 

    for (let posicao in linhas) {
        if (isNaN(posicao) ) {
            continue;
        }
        
        let coluna1 = linhas[posicao].children[1].innerText.toLowerCase();

       // let linha = linhas[posicao].innerText.toLowerCase();

        if( coluna1.includes(expressao) ) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }
    }
}