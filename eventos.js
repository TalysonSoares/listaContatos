const API_URL = 'http://localhost:8000';

function editar() {
    event.preventDefault(); //impedindo a página de recarregar
    //recuperando os dados do formulario
    let dados = {
         nome: input_editar_nome.value,
         cidade: input_editar_cidade.value,
         numero: input_editar_numero.value,
    };
 
    fetch(API_URL+'/contatos/'+input_editar_id.value, {
     method: 'PATCH',
     body: JSON.stringify(dados),
     headers: {
         'Content-Type': 'application/json'
     }
 })
         .then(res => res.json())
         .then(() => atualizarLista());
 
    let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
 
    x.dispatchEvent(new Event('click'));
}

function inserir() {
    //para a pagina não ser recarregada
    event.preventDefault();

    let dados = {
        nome: input_nome.value,
        numero: parseInt(input_numero.value),
        cidade: input_cidade.value
    };

    if(dados.nome === "" || dados.numero === "" || dados.cidade === "")  {
        alert('Dados invalidos');
        return;
    }

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

async function excluir (id) {
    let resposta = confirm('Are you sure?');

    if(resposta !== true) {
        return;
    }
    
   await fetch(API_URL+'/contatos/'+id, {
        method: 'DELETE'
    })
     atualizarLista()
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