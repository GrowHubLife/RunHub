const canvasTiposTreino = document.getElementById("tiposTreino");
const canvasKmSemana = document.getElementById("kmSemanal");
const cvsPaceTreino = document.getElementById("paceTreino");
const cvsHeatmap = document.getElementById("heatmapCorrida");


// Plugin → Texto no centro do donut
const centerText2 = {
  id: "centerText2",
  afterDraw(chart, args, options) {
    const { ctx, chartArea: { width, height } } = chart;

    ctx.save();
    ctx.font = "700 15px Michroma";
    ctx.fillStyle = "#00FF78"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

    ctx.fillText(`${total} treinos`, width / 2, height / .65);
  }
};

// DONUT — Tipos de Treino
new Chart(canvasTiposTreino, {
  type: "doughnut",
  plugins: [centerText2],
  data: {
    labels: ["Tiro", "Longão", "Corrida Leve", "Caminhada", "Intervalado"],

    datasets: [
      {
        label: "Tipos de Treino",
        data: [8, 4, 12, 6, 3], // ← valores de exemplo

        backgroundColor: [
          "rgba(0, 255, 120, 0.65)",   // Tiro
          "rgba(97, 218, 67, 0.65)",   // Longão
          "rgba(50, 90, 30, 0.55)",    // Corrida leve
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
        color: '#85ff63',
        text: 'Tipos de Treino',
        font: {size: 15, weight: 'bold', family: 'Arial'}
      },
      subtitle: {
        display: true,
        text: 'Distribuição dos tipos de treino registrados.',
        color: '#cccccc',
        font: { size: 12, family: 'Arial' },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed} treinos`;
          },
        },
      },
    },
  },
});



// GRÁFICO DE LINHA – Evolução semanal (KM)
new Chart(canvasKmSemana, {
  type: "line",

  data: {
    labels: [
      "Semana 1",
      "Semana 2",
      "Semana 3",
      "Semana 4",
      "Semana 5",
      "Semana 6"
    ],

    datasets: [
      {
        label: "KM Rodados",
        data: [12, 18, 22, 15, 28, 35], // ← valores exemplo

        borderWidth: 3,
        tension: 0.35,   // deixa a linha suave

        borderColor: "rgba(0, 255, 120, 1)",     // verde neon
        backgroundColor: "rgba(0, 255, 120, 0.20)", // preenchimento suave

        fill: true,
        pointRadius: 6,
        pointHoverRadius: 9,
        pointBackgroundColor: "#00FF78",
      },
    ],
  },

  options: {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "#d9d9d9",
          font: {
            family: "Michroma",
            size: 13,
          },
        },
      },
        title: {
        display: true,
        color: '#85ff63',
        text: 'KM por Semana',
        font: {size: 15, weight: 'bold', family: 'Arial'}
      },
      subtitle: {
        display: true,
        text: 'Volume total de corrida realizado ao longo das semanas..',
        color: '#cccccc',
        font: { size: 12, family: 'Arial' },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y + " km";
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#eaeaea",
          font: { family: "Michroma" }
        },
        grid: {
          color: "rgba(255,255,255,0.07)"
        }
      },

      y: {
        ticks: {
          color: "#eaeaea",
          callback: (value) => value + " km",
          font: { family: "Michroma" }
        },
        grid: {
          color: "rgba(255,255,255,0.07)"
        },
      },
    },
  },
});



new Chart(cvsPaceTreino, {
  type: "bar",

  data: {
    labels: ["Treino 1", "Treino 2", "Treino 3", "Treino 4", "Treino 5"],
    datasets: [
      {
        label: "Pace (min/km)",
        data: [6.2, 5.8, 5.5, 6.0, 5.7], // exemplo
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
        font: {size: 15, weight: 'bold', family: 'Arial'}
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




const dias = [
  0, 1, 1, 0, 2, 3, 0,
  2, 0, 4, 1, 0, 3, 2,
  1, 0, 2, 4, 2, 0, 1,
];

new Chart(cvsHeatmap, {
  type: "matrix",
  data: {
    datasets: [
      {
        label: "Dias de Corrida",
        data: dias.map((v, i) => ({
          x: i % 7,
          y: Math.floor(i / 7),
          v,
        })),

        backgroundColor(ctx) {
          const v = ctx.dataset.data[ctx.dataIndex].v;

          if (v === 0) return "rgba(255,255,255,0.1)";
          if (v === 1) return "rgba(0,255,120,0.25)";
          if (v === 2) return "rgba(0,255,120,0.45)";
          if (v === 3) return "rgba(0,255,120,0.7)";
          return "rgba(0,255,120,1)";
        },

        width: () => 30,
        height: () => 30,
      },
    ],
  },
  options: {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ctx.raw.v + " corridas",
        },
      },
    },
  },


});



