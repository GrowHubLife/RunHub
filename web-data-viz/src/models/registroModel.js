var database = require("../database/config");



function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}


function cadastrar(data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes) {
  var instrucaoSql = `INSERT INTO registro (data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes) VALUES ('${data_treino}', '${distancia_km}', '${tipo_treino}', '${batimentos_medios}', '${calorias}', '${sensacao_do_dia}', '${tipo_treino}', '${observacoes}')`;

  return database.executar(instrucaoSql);
}

module.exports = {cadastrar, listar };
