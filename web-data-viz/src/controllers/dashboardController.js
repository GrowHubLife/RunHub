var registroModel = require("../models/registroModel");

function pegarDados(req, res){
    var idUsuario = req.body.idUsuario;

    registroModel.pegarDados(idUsuario)
    .then(function (resultado) {
        res.status(200).json(resultado);
    })

    .catch(function (erro) {
        console.log("Erro ao pegar os dados:", erro.sqlMenssage);
        res.status(500).json(erro.sqlMenssage);
    });
}


function pegarDadosKPI(req, res){
    var idUsuario = req.body.idUsuario;

    registroModel.pegarDadosKPI(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })

        .catch(function (erro) {
            console.log("Erro ao pegar dados KPI:", erro.sqlMenssage);
            res.status(500).json(erro.sqlMenssage);
        });
}


module.exports = {
    pegarDados,
    pegarDadosKPI
}