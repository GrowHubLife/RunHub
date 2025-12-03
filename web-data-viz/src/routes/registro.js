var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.post("/cadastrar", function (req, res) {
    registroController.cadastrar(req, res);
})

router.get("/listarKpis/:id", function (req, res) {
    registroController.listarKpis(req, res);
})

router.get("/paceTreino/:idUsuario", function (req, res) {
    registroController.paceTreino(req, res);
})

router.get("/KmSemana/:idUsuario", function (req, res) {
    registroController.KmSemana(req, res);
})

router.get("/tiposTreino/:idUsuario", function (req, res) {
    registroController.tiposTreino(req, res);
})

module.exports = router;