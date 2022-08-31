function carregar(){
    alert("Avalie a aula de 1 a 5")
}

$(document).ready(function() {
    grid();
});

function enviar(){
    for(var i = 5; i > 0; i--){
        if ($("#star_" +i).is(":checked")){
            let aval = {
                avaliacao1: i,
                comentario: document.getElementById("comentario1").value
            }
        
            $.ajax({
                type: 'POST',
                url: 'https://localhost:5001/Avaliacao/Enviar',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(aval),
                success: function() {
                    alert("Avaliação enviada com sucesso!");
                    limpar();
                    location.reload(true);
                },
                error: function() {
                    alert("Erro ao enviar a avaliação!");
                }
            });
        }
    }
    alert("Por favor avalie a aula de 1 a 5")

    
}

function excluir(id) {
    console.log(id)
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Avaliacao/Excluir/' + id,
        contentType: "application/json; charset=utf-8",
        success: function(resposta) { 
            alert("Avaliação removida com sucesso!");
            location.reload(true);
        },
        error: function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a remoção!");
        }
    });
}


function esconderacesso() {
    var usuario = document.getElementById("usuario").value
    var senha = document.getElementById("senha").value
    if(usuario == "Chewbacca" && senha == "215"){
        var acesso1 = document.getElementById("acesso1")
        var acesso2 = document.getElementById("acesso2")
        acesso1.style.display = 'none'
        acesso2.style.display = 'none'

        var tabela = document.getElementById("tabela")
        tabela.classList.remove("esconder")
        tabela.classList.add("mostrar")
    }
    else{
        alert("Usuário ou senha incorretos")
    }
}

function visualizar(id){
    $.get('https://localhost:5001/Avaliacao/Visualizar/' + id)
    .done(function(resposta){
        let ID = resposta.id
        let avali = resposta.avaliacao1
        let coment = resposta.comentario

        alert("O comentario de ID numero: " + ID + "\nDeu uma nota de " + avali + " estrelas" + "\nCom o comentario: \n " + coment)
    })
    
}

function grid() {
    $.get('https://localhost:5001/Avaliacao/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
            
                linha.append($('<td></td>').html(resposta[i].avaliacao1));
                linha.append($('<td></td>').html(resposta[i].comentario));
                
                let botaoExcluir = $('<button class="btn btn-danger"></button>').attr('type', 'button').html('Excluir').attr('onclick', 'excluir(' + resposta[i].id + ')');
                let botaoVisualizar = $('<button class="btn btn-danger"></button>').attr('type', 'button').html('Visualizar').attr('onclick', 'visualizar(' + resposta[i].id + ')')

                let acoes = $('<td></td>');
                acoes.append(botaoExcluir);
                acoes.append(botaoVisualizar);

                linha.append(acoes);
                
                $('#grid').append(linha);
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}


