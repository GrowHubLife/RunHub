var database = require("../database/config");


function listarKPIs(fkUsuario) {
  var instrucaoSql = `
    SELECT 
    IFNULL((
        SELECT SUM(distancia_km)
        FROM registro
        WHERE fkUsuario = ${fkUsuario}
    ), 0) AS totalKM,

    IFNULL((
        SELECT MIN(pace)
        FROM registro
        WHERE fkUsuario  =  ${fkUsuario}
    ), 0) AS melhorPace,

    IFNULL((
        SELECT COUNT(DISTINCT data_treino)
        FROM registro
        WHERE fkUsuario =  ${fkUsuario}
    ), 0) AS diasTreinados,

    IFNULL((
        SELECT SUM(calorias)
        FROM registro
        WHERE fkUsuario =  ${fkUsuario}
    ), 0) AS caloriasTotal;
  `;

  return database.executar(instrucaoSql);
}


function cadastrar(fkUsuario, data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes, pace) {
  var instrucaoSql = `INSERT INTO registro (fkUsuario ,data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes, pace) VALUES (${fkUsuario},'${data_treino}', '${distancia_km}', '${tipo_treino}', '${batimentos_medios}', '${calorias}', '${sensacao_do_dia}', '${observacoes}', '${pace}')`;

  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  listarKPIs
 };
