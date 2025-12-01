var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.post("/cadastrar", function (req, res) {
    registroController.cadastrar(req, res);
})

router.get("/listarKpis/:id", function (req, res) {
    registroController.listarKpis(req, res);
})



module.exports = router;