function inserir() {
    //para a pagina não ser recarregada
    event.preventDefault();

    let dados = {
        nome: input_nome.value,
        numero: parseInt(input_numero.value),
        cidade: input_cidade.value
    };

    fetch(API_URL+'/contatos', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
            .then(resposta => resposta.json())
            .then(resposta => atualizarLista());
        
    form_add.reset();    
}

atualizarLista()