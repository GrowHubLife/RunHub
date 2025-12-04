var database = require("../database/config");


function listarKPIs(idUsuario) {
  var instrucaoSql = `
  
    SELECT 
    IFNULL((
        SELECT SUM(distancia_km)
        FROM registro
        WHERE fkUsuario = ${idUsuario}
    ), 0) AS totalKM,

    IFNULL((
        SELECT MIN(pace)
        FROM registro
        WHERE fkUsuario  =  ${idUsuario}
    ), 0) AS melhorPace,

    IFNULL((
        SELECT COUNT(DISTINCT data_treino)
        FROM registro
        WHERE fkUsuario =  ${idUsuario}
    ), 0) AS diasTreinados,

    IFNULL((
        SELECT SUM(calorias)
        FROM registro
        WHERE fkUsuario =  ${idUsuario}
    ), 0) AS caloriasTotal;
  `;

  return database.executar(instrucaoSql);
}


function paceTreino(idUsuario){
   var instrucaoSql = `
    SELECT 
    id AS treino_id,
    pace
    FROM 
        registro
    WHERE 
        fkUsuario = ${idUsuario}
    ORDER BY 
        data_treino ASC
    LIMIT 5;
   `;

  return database.executar(instrucaoSql);
}



function KmSemana(idUsuario){
   var instrucaoSql = `
      SELECT 
          YEARWEEK(data_treino) AS semana,
          SUM(distancia_km) AS total_km
      FROM 
          registro
      WHERE 
          fkUsuario = ${idUsuario}
      GROUP BY 
          YEARWEEK(data_treino)
      ORDER BY 
          semana ASC
      LIMIT 6;
   `;

  return database.executar(instrucaoSql);
}

function tiposTreino(idUsuario){
   var instrucaoSql = `
    SELECT 
      tipo_treino,
      COUNT(*) AS quantidade
    FROM registro
    WHERE fkUsuario = ${idUsuario}
    GROUP BY tipo_treino
    ORDER BY quantidade DESC;
   `;

  return database.executar(instrucaoSql);
}

var database = require("../database/config");

function buscarKpis(idUsuario) {
    var instrucao = `
        SELECT 
            SUM(distancia_km) AS totalKM,
            MIN(pace) AS melhorPace,
            COUNT(*) AS diasTreinados,
            SUM(calorias) AS caloriasTotal
        FROM registro
        WHERE fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucao);
}

function listarHistorico(idUsuario) {
    return database.executar(`
        SELECT 
            data_treino,
            distancia_km,
            tipo_treino,
            batimentos_medios,
            pace,
            calorias,
            sensacao_do_dia,
            observacoes
        FROM registro
        WHERE fkUsuario = ${idUsuario}
        ORDER BY data_treino DESC;
    `, [idUsuario]);
}


function cadastrar(fkUsuario, data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes, pace) {
  var instrucaoSql = `INSERT INTO registro (fkUsuario ,data_treino, distancia_km, tipo_treino, batimentos_medios, calorias, sensacao_do_dia, observacoes, pace) VALUES (${fkUsuario},'${data_treino}', '${distancia_km}', '${tipo_treino}', '${batimentos_medios}', '${calorias}', '${sensacao_do_dia}', '${observacoes}', '${pace}')`;
  
  return database.executar(instrucaoSql);
}



module.exports = {
  cadastrar,
  listarKPIs,
  paceTreino,
  KmSemana,
  tiposTreino,
  buscarKpis,
  listarHistorico
 };
