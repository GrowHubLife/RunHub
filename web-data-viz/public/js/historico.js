function carregarHistorico() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/registro/historico/${idUsuario}`)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro ao buscar histórico");
            }
            return resposta.json();
        })
        .then(dados => {
            const lista = document.getElementById("lista_historico");
            lista.innerHTML = "";

            if (dados.length === 0) {
                lista.innerHTML = "<p>Sem treinos registrados.</p>";
                return;
            }

            dados.forEach(treino => {
                lista.innerHTML += `
                    <div class="card-historico">
                       <strong>Data:</strong> ${formatarData(treino.data_treino)}<br>
                        <strong>Distância:</strong> ${treino.distancia_km} km<br>
                        <strong>Pace:</strong> ${treino.pace} min/km<br>
                        <strong>Tipo:</strong> ${treino.tipo_treino}<br>
                        <strong>Calorias:</strong> ${treino.calorias}<br>
                        <strong>Sensação:</strong> ${treino.sensacao_do_dia}/10<br>
                        <strong>Obs:</strong> ${treino.observacoes || "Sem observações"}
                    </div>
                `;
            });
        })
        .catch(erro => {
            console.error(erro);
        });
}

function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
}

function buscarTreino() {
    var input = document.getElementById("searchHistorico");
    var filtro = input.value.toLowerCase();
    var cards = document.getElementsByClassName("card-historico");

    for (var i = 0; i < cards.length; i++) {
        var texto = cards[i].getAttribute("data-texto").toLowerCase();

        if (texto.indexOf(filtro) > -1) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}
