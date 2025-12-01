var database = require("../database/config");


function pegarDadosKPI (idUsuario){
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDadosKPI()");


        const instrucao = `
        SELECT  
            IFNULL((
                SELECT SUM(distancia_km)
                FROM registro
                WHERE fkUsuario = ${idUsuario}
                AND MONTH(data_treino) = MONTH(CURDATE())
                AND YEAR(data_treino) = YEAR(CURDATE())
            ), 0) AS totalKM,

            IFNULL((
                SELECT MIN(pace)
                FROM registro
                WHERE fkUsuario = ${idUsuario}
            ), 0) AS melhorPace,

            IFNULL((
                SELECT COUNT(DISTINCT data_treino)
                FROM registro
                WHERE fkUsuario = ${idUsuario}
                AND MONTH(data_treino) = MONTH(CURDATE())
                AND YEAR(data_treino) = YEAR(CURDATE())
            ), 0) AS diasTreinados,

            IFNULL((
                SELECT SUM(calorias)
                FROM registro
                WHERE fkUsuario = ${idUsuario}
                AND MONTH(data_treino) = MONTH(CURDATE())
                AND YEAR(data_treino) = YEAR(CURDATE())
            ), 0) AS caloriasTotal;
        
`;

return database.executar(instrucao);

}

function pegarDados(idUsuario){
    console.log("Executando gráficos registroModel.js");

    const instrucao =`
        SELECT 
            data_treino,
            distancia_km,
            pace,
            tipo_treino,
            calorias,
    FROM registro
    WHERE fkUsuario = ${idUsuario}
    ORDER BY data_treino ASC;
    `;

    return database.executar(instrucao);
}

module.exports = {
    pegarDados,
    pegarDadosKPI
}; 