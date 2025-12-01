
  function cadastrar() {
  var dataTreino = data.value;
  var distanciaKM = distancia.value;
  var tipoTreino = tipo.value;
  var batimentosMedios = batimentos.value;
  var caloriasT = calorias.value;
  var sensacaoDia = sensacao.value;
  var observacoesT = obs.value;
  var paceM = pace.value

  var idusuario = sessionStorage.ID_USUARIO;

  // ===== VALIDAÇÕES =====
  if (!idusuario) {
    alert("Usuário não identificado. Faça login novamente.");
    return false;
  }

  if (
    dataTreino === "" ||
    distanciaKM === "" ||
    tipoTreino === "" ||
    batimentosMedios === "" ||
    caloriasT === "" ||
    sensacaoDia === "" ||
    paceM === ""
  ) {
    alert("Preencha todos os campos obrigatórios.");
    return false;
  }

  if (distanciaKM <= 0) {
    alert("A distância deve ser maior que 0.");
    return false;
  }

  if (batimentosMedios <= 0) {
    alert("Batimentos médios inválidos.");
    return false;
  }

  if (caloriasT <= 0) {
    alert("Calorias inválidas.");
    return false;
  }

  if (sensacaoDia < 0 || sensacaoDia > 10) {
    alert("A sensação do dia deve estar entre 0 e 10.");
    return false;
  }

  // ===== FETCH =====
  fetch("/registro/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkUsuarioServer: idusuario,
      dataTreinoServer: dataTreino,
      distanciaKMServer: distanciaKM,
      tipoTreinoServer: tipoTreino,
      batimentosMedioTServer: batimentosMedios,
      caloriasTServer: caloriasT,
      sensacaoDiaServer: sensacaoDia,
      observacoesTServer: observacoesT,
      pace: paceM
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        alert(" Treino registrado com sucesso!");
        // opcional: limpar formulário
        document.querySelector(".anotacao-container").querySelectorAll("input, textarea").forEach(el => el.value = "");
      } else {
        throw "Erro ao cadastrar treino";
      }
    })
    .catch(function (erro) {
      console.error(erro);
      alert(" Erro ao registrar o treino.");
    });

  return false;
}

  
  
  /*function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var dataTreino = data.value;
    var distanciaKM = distancia.value;
    var tipoTreino = tipo.value;
    var batimentosMedios = batimentos.value;
    var caloriasT = calorias.value;
    var sensacaoDia = sensacao.value;
    var observacoesT = obs.value;

    var idusuario = sessionStorage.ID_USUARIO

    // Verificando se há algum campo em branco
   


    // Enviando o valor da nova input - requisição - levando dados ao insert
    fetch("/registro/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        fkUsuarioServer : idusuario,
        dataTreinoServer : dataTreino,
        distanciaKMServer : distanciaKM,
        tipoTreinoServer : tipoTreino,
        batimentosMedioTServer : batimentosMedios,
        caloriasTServer : caloriasT,
        sensacaoDiaServer : sensacaoDia,
        observacoesTServer : observacoesT,

      }),
    })
      .then(function (resposta) { //validação - 200 a 300 
        console.log("resposta: ", resposta);

        if (resposta.ok) {
       //  cardErro.style.display = "block";

         // mensagem_erro.innerHTML =
           // "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

         // limparFormulario();
   
        } else {
          throw "Houve um erro ao tentar realizar o cadastro de novo!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta} `);
      });

    return false;
  }

*/