const API_URL = 'http://localhost:8000';

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

function atualizarLista() {
    tabela_contatos.innerHTML = '';

    fetch(API_URL+'/contatos')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (lista) {
            lista.forEach(function (cadaContato) {
                tabela_contatos.innerHTML += `
                <tr>
                    <td>${cadaContato.nome}</td>
                    <td>${cadaContato.cidade}</td>
                    <td>${cadaContato.numero}</td>
                    <td>
                        <button onclick="buscarParaEditar(${cadaContato.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning ">
                            Editar
                        </button>

                        <button onclick="excluir(${cadaContato.id})" class="btn btn-danger btn">
                            Excluir
                        </button>
                    </td >
                </tr>
                `
            });
        })
}

atualizarLista()