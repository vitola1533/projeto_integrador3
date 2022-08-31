function carregar(){
    alert("Avalie a aula de 1 a 5")
}


function enviar(){
    for(var i = 5; i > 0; i--){
        if ($("#star_" +i).is(":checked")){
            var json = {
                avaliacao: i,
                comentario: document.getElementById("comentario1").value
            }
        
            $.post( "https://x8ki-letl-twmt.n7.xano.io/api:Nh6K0Yb9/avaliacao", json, function( data ) {
            console.log(data)
        
            },"json");
            alert("Obrigado por avaliar a aula")
            return;
        }

    }
    alert("Por favor avalie a aula de 1 a 5")

    
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

$.get( "https://x8ki-letl-twmt.n7.xano.io/api:Nh6K0Yb9/avaliacao", function( data ) {
    console.log(data)
    $('#grid').not(':first').not(':last').remove();
    var html = '';
    for(var i = 0; i < data.length; i++)
                html += '<tr><td>' + data[i].avaliacao + 
                        '</td><td>' + data[i].comentario + '</td></tr>';
                        $('#grid').first().after(html);
}, "json" );


