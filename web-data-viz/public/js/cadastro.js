
  function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" 
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

    }

    if (nomeVar.length <= 1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(O nome deve conter pelo menos 1 caracter)";

    }

    
    if (!emailVar.includes('@')) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(O email deve conter @)";

    }

        if (senhaVar.length < 6) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(A senha deve conter pelo menos 6 caracteres)";

    }


    // Enviando o valor da nova input - requisição - levando dados ao insert
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) { //validação - 200 a 300 
        console.log("resposta: ", resposta);

        if (resposta.ok) {
       //  cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "1000");

         // limparFormulario();
   
        } else {
          throw "Houve um erro ao tentar realizar o cadastro de novo!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta} porra`);
      });

    return false;
  }

