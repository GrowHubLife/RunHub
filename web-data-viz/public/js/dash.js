const canvasTiposTreino = document.getElementById("tiposTreino");
const canvasKmSemana = document.getElementById("kmSemana");
const cvsPaceTreino = document.getElementById("paceTreino");

var graficoResultado = "";

  b_usuario.innerHTML = sessionStorage.NICKNAME_USUARIO;

  // Gráfico Pace por Treino
  function paceTreino() {
  var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/registro/pacetreino/${idUsuario}`, { cache: 'no-store'})
      .then(function (resposta){
        if(resposta.ok){
          resposta.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log("deu bom")

          console.log(graficoResultado)
        if (graficoResultado != null || graficoResultado != "") {
          graficoResultado = "";
        }

        // Criar array de paces usando for
        var paces = [];
        for (var i = 0; i < resposta.length; i++) {
          paces.push(resposta[i].pace);
        }
        var ctx = cvsPaceTreino;

        graficoResultado = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Treino 1", "Treino 2", "Treino 3", "Treino 4", "Treino 5"],
            datasets: [
              {
                label: "Pace (min/km)",
                data: paces, // agora vem do array criado com for
                backgroundColor: "rgba(0, 255, 120, 0.55)",
                borderColor: "rgba(0, 255, 120, 1)",
                borderWidth: 1,
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#d9d9d9",
                  font: { family: "Michroma" },
                },
              },
              tooltip: {
                callbacks: {
                  label: (ctx) => ctx.parsed.y + " min/km",
                },
              },
              title: {
                display: true,
                color: '#85ff63',
                text: 'Pace por Treino',
                font: { size: 15, weight: 'bold', family: 'Arial' }
              },
              subtitle: {
                display: true,
                text: 'Comparação do pace médio em cada treino.',
                color: '#cccccc',
                font: { size: 12, family: 'Arial' },
              },
            },
            scales: {
              x: {
                ticks: { color: "#fff", font: { family: "Michroma" } },
                grid: { display: false },
              },
              y: {
                ticks: {
                  color: "#fff",
                  callback: (v) => v + " min/km",
                  font: { family: "Michroma" },
                },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
            },
          },
        });
          })
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error){
        console.log(`Erro ao obter resposta ${error.message}`)
      })

}


// Gráfico KM por semana
var graficoKmSemana = null;

function kmSemana() {
  var idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/registro/KmSemana/${idUsuario}`, { cache: 'no-store' })
    .then(resposta => resposta.json())
    .then(resposta => {

      console.log("Dados KM:", resposta);

      if (graficoKmSemana) {
        graficoKmSemana.destroy();
      }

  
      var labels = [];
      var kms = [];

      for (var i = 0; i < resposta.length; i++) {
        labels.push(`Semana ${i + 1}`);
        kms.push(resposta[i].total_km);
      }

      var ctx = canvasKmSemana;

      graficoKmSemana = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "KM Rodados",
              data: kms,
              borderColor: "rgba(0, 255, 120, 1)",
              backgroundColor: "rgba(0, 255, 120, 0.35)",
              fill: true,
              tension: 0.4,
              pointRadius: 6,
              pointBackgroundColor: "rgba(0, 255, 120, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              color: '#85ff63',
              text: "KM por Semana",
              font: { size: 15, weight: 'bold', family: 'Arial' }
            },
            subtitle: {
              display: true,
              text: "Somatório semanal da distância percorrida.",
              color: '#cccccc',
              font: { size: 12, family: 'Arial' },
            },
            legend: {
              labels: {
                color: "white",
                font: { family: "Arial" }
              }
            }
          }
        }
      });

    })
    .catch(erro => console.error("Erro:", erro));
}


// Plugin → Texto no centro do donut
const centerText2 = {
  id: "centerText2",
  afterDraw(chart) {

    if (!chart.chartArea) return;
    const { ctx, chartArea: { width, height } } = chart;

    ctx.save();
    ctx.font = "700 23px Michroma";
    ctx.fillStyle = "#00FF78"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    ctx.fillText(`${total} treinos`, width / 2, height / 1.5);
  }
};

// Gráfico Tipos de Treino

function carregarTiposTreino() {
  var idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/registro/tiposTreino/${idUsuario}`, { cache: "no-store" })
    .then(res => res.json())
    .then(dados => {

      let labels = [];
      let valores = [];

      dados.forEach(item => {
        labels.push(item.tipo_treino);
        valores.push(item.quantidade);
      });

      // Criar gráfico
      new Chart(canvasTiposTreino, {
        type: "doughnut",
        plugins: [centerText2],
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tipos de Treino",
              data: valores,

              backgroundColor: [
                "rgba(0, 255, 120, 0.65)",   // Tiro
                "rgba(97, 218, 67, 0.65)",   // Longão
                "rgba(50, 90, 30, 0.55)",    // Leve
                "rgba(255, 255, 255, 0.6)",  // Caminhada
                "rgba(0, 150, 90, 0.65)",    // Intervalado
              ],

              borderColor: [
                "rgba(0, 255, 120, 1)",
                "rgba(97, 218, 67, 1)",
                "rgba(50, 90, 30, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(0, 150, 90, 1)",
              ],

              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },

        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: "60%",

          plugins: {
            legend: {
              display: true,
              labels: {
                color: "#d9d9d9",
                font: {
                  size: 12,
                  weight: "400",
                  family: "Michroma",
                },
              },
            },
            title: {
              display: true,
              color: "#85ff63",
              text: "Tipos de Treino",
              font: { size: 15, weight: "bold", family: "Arial" },
            },
            subtitle: {
              display: true,
              text: "Distribuição dos tipos de treino registrados.",
              color: "#cccccc",
              font: { size: 12, family: "Arial" },
            },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return `${ctx.label}: ${ctx.parsed} treinos`;
                },
              },
            },
          },
        },
      });

    })
    .catch(err => console.error("Erro ao carregar tipos de treino:", err));
}


 // KPIS


  var idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/registro/listarKpis/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {

    if (resposta.ok) {

      if (resposta.status == 204) {
        console.log('Nenhum dado encontrado');
        throw 'Nenhum resultado encontrado';
      }

      resposta.json().then(function (resposta) {

        var resposta = resposta[0];
        console.log("Dados KPI:", resposta);

        // Preenchendo os KPIs no HTML
        document.getElementById("kpi_total_km").innerHTML = resposta.totalKM;
        document.getElementById("kpi_melhor_pace").innerHTML = resposta.melhorPace;
        document.getElementById("kpi_dias_treinados").innerHTML = resposta.diasTreinados;
        document.getElementById("kpi_calorias_total").innerHTML = resposta.caloriasTotal;

        // Nome do usuário
      
      });

    } else {
      throw ('Houve um erro na API!');
    }

  }).catch(function (erro) {
    console.error("ERRO: ", erro);
  });

  console.log(idUsuario)


function carregarKpis() {
    fetch(`/registro/kpis/${idUsuario}`)
        .then(res => res.json())
        .then(data => {

            // Valores
            document.getElementById("kpi_total_km").innerHTML = data.totalKM.valor;
            document.getElementById("kpi_melhor_pace").innerHTML = data.melhorPace.valor;
            document.getElementById("kpi_dias_treinados").innerHTML = data.diasTreinados.valor;
            document.getElementById("kpi_calorias_total").innerHTML = data.caloriasTotal.valor;

            // Descrições
            document.getElementById("desc_total_km").innerHTML += data.totalKM.descricao;
            document.getElementById("desc_melhor_pace").innerHTML += data.melhorPace.descricao;
            document.getElementById("desc_dias_treinados").innerHTML += data.diasTreinados.descricao;
            document.getElementById("desc_calorias_total").innerHTML += data.caloriasTotal.descricao;
        });
}

carregarKpis();


paceTreino();
kmSemana();
carregarTiposTreino();

