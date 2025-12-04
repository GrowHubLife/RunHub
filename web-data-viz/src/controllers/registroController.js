var registroModel = require("../models/registroModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var data_treino = req.body.dataTreinoServer;
    var distancia_km = req.body.distanciaKMServer;
    var  tipo_treino = req.body.tipoTreinoServer;
    var batimentos_medios = req.body.batimentosMedioTServer;
    var calorias = req.body.caloriasTServer;
    var sensacao_do_dia = req.body.sensacaoDiaServer;
    var  observacoes = req.body.observacoesTServer;
     var pace = req.body.pace;

console.log(data_treino)
console.log(distancia_km)
console.log(tipo_treino)
console.log(batimentos_medios)
console.log(calorias)
console.log(sensacao_do_dia)
console.log(observacoes)
//     // Faça as validações dos valores
   if (tipo_treino == undefined) {
        res.status(400).send("Seu tipo de treino está undefined!");
    } else if (batimentos_medios == undefined) {
        res.status(400).send("Seus batimentos está undefined!");
    } else if (calorias == undefined) {
        res.status(400).send("Suas calorias está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        registroModel.cadastrar(fkUsuario, data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes, pace)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function listarKpis(req, res) {
    var idUsuario = req.params.id


        registroModel.listarKPIs(idUsuario)
            .then(function (resultado) {

                    if (resultado.length > 0) {
                            res.status(200).json(resultado);

                    } else {
                        res.status(403).send("nenhum resultado encontrado");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o listar KPIs! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

function buscarKpis(req, res) {
    var idUsuario = req.params.idUsuario;

    registroModel.buscarKpis(idUsuario)
        .then(function (resultado) {

            let resposta = {
                totalKM: {
                    valor: resultado[0].totalKM,
                    descricao: "Total de quilômetros percorridos neste mês."
                },
                melhorPace: {
                    valor: resultado[0].melhorPace,
                    descricao: "Seu melhor pace registrado no período."
                },
                diasTreinados: {
                    valor: resultado[0].diasTreinados,
                    descricao: "Número total de dias com treino registrado."
                },
                caloriasTotal: {
                    valor: resultado[0].caloriasTotal,
                    descricao: "Somatória de calorias queimadas nos treinos."
                }
            };

            res.json(resposta);
        })
        .catch(function (erro) {
            console.log("Erro:", erro);
            res.status(500).json(erro);
        });
}


        function paceTreino(req, res){
            var idUsuario = req.params.idUsuario
            
               registroModel.paceTreino(idUsuario)
            .then(function (resultado) {

                    if (resultado.length > 0) {
                            res.status(200).json(resultado);

                    } else {
                        res.status(403).send("nenhum resultado encontrado");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao adicionar os valores nos gráficos! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );

        }


        
        function KmSemana(req, res){
            var idUsuario = req.params.idUsuario
            
               registroModel.KmSemana(idUsuario)
            .then(function (resultado) {

                    if (resultado.length > 0) {
                            res.status(200).json(resultado);

                    } else {
                        res.status(403).send("nenhum resultado encontrado");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao adicionar os valores nos gráficos! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );

        }



         function tiposTreino(req, res){
            var idUsuario = req.params.idUsuario
            
               registroModel.tiposTreino(idUsuario)
            .then(function (resultado) {

                    if (resultado.length > 0) {
                            res.status(200).json(resultado);

                    } else {
                        res.status(403).send("nenhum resultado encontrado");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao adicionar os valores nos gráficos! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );

        }

        function listarHistorico(req, res) {
    const idUsuario = req.params.idUsuario;

    registroModel.listarHistorico(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(204).send("Nenhum treino encontrado");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar histórico:", erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    cadastrar,
    listarKpis,
    paceTreino,
    KmSemana,
    tiposTreino,
    buscarKpis,
    listarHistorico
}