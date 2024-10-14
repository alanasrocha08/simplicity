//Selecionando os elemetos que serão manipulados
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereço");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Capturando o clique no botão buscar */
botaoBuscar.addEventListener("click", function(){
    //Verificando se o cep NÃO TEM 9 DIGITOS
    if(campoCep.value.length !== 9){
        //Informar o usuário sobre o erro
        mensagemStatus.textContent = "Digite um cep válido";
        mensagemStatus.style.color = "purple";

        //Para completamente a execução do script
        return;
        
    }

    /* Guardando o valor do cep digitado */
    let cepDigitado = campoCep.value;

    /* AJAX = Asyncronous JavaScript And XML
    Técnica de comunicação (tranmissão, recebimento) de dados muito usada entre sistemas e tecnologias diferentes.*/
}); //final do evento do botão