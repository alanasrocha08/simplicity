//Selecionando os elemetos que serão manipulados
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoTelefone = formulario.querySelector("#telefone");
const campoEndereco = formulario.querySelector("#endereço");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Ativação da máscara para telefone e CEP*/
$(campoTelefone).mask("(00) 0000-00000");
$(campoCep).mask("00000-000"); 

/* Capturando o clique no botão buscar */
botaoBuscar.addEventListener("click", async function(){
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
    console.log(cepDigitado);
    

    /* AJAX = Asyncronous JavaScript And XML
    Técnica de comunicação (tranmissão, recebimento) de dados muito usada entre sistemas e tecnologias diferentes.*/

    //Etapa 1: preparar a url contendo o CEP a ser buscado
    let url = `https://viacep.com.br/ws/${cepDigitado}/json/`;
    console.log(url);
    
    
    //Etapa 2 : acessar a API (com a url) e aguardar o retorno dela
    const resposta = await fetch(url);
    console.log(resposta);

    //Etapa 3: extrair os dados do retorno/resposta
    const dados = await resposta.json();
    console.log(dados);
    
    //Etapa 4: lidar com os dado (em caso de erro e sucesso)
    if("erro" in dados){
        mensagemStatus.innerHTML = "CEP inexistente 😢";
        mensagemStatus.style.color = "red";
    } else {
        mensagemStatus.innerHTML = "CEP encontrado 😃";
        mensagemStatus.style.color = "blue";

        //Selecionando todos os campos com a classe
        const campos = formulario.querySelectorAll(".campos-restantes");

        /*Loop/Laço de repetição para acessar CADA campo selecionado e remover a classe fazendo com que cada campo volte a aparecer.*/
        for(const campo of campos){
            campo.classList.remove("campos-restantes");
        }

        /*Atribuindo os dados para cada campo*/

        //colocar o logradouro como valor do campo endereço
        campoEndereco.value = dados.logradouro;

        //colocar o bairro como valor do campo bairro
        campoBairro.value = dados.bairro;

        //colocar a localidade como calor da cidade 
        campoCidade.value = dados.localidade;   

        //colocar a uf como valor do campo estado
        campoEstado.value = dados.uf;

    }

}); //final do evento do botão

//código do Formspree

var form = document.getElementById("my-form");
  
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Obrigado! Mensagem enviada com sucesso.";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Ouve um erro... Fale com nosso adm"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)

