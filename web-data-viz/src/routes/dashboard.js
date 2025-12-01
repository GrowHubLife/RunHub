var express = require("express");
var router = express.Router();

var campanhaController = require('../controllers/graficocontroller');


var campanhaController = require('../controllers/graficocontroller');

// KPIS

router.post('/pegarDados', campanhaController.pegarDados);
router.post('/pegarDadosKPI', campanhaController.pegarDadosKPI);

// Gráficos

router.post("/tiposTreino", campanhaController.pegarTiposTreino);
router.post("/kmSemanal", campanhaController.pegarKmSemanal);
router.post("/paceTreinos", campanhaController.pegarPaceTreinos);
router.post("/heatmap", campanhaController.pegarHeatmap);

module.exports = router;

