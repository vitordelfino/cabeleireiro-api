module.exports = function(app) {

    app.post('/horario/disponivel', function(req, res){

        var dt = req.body;
        console.log(dt.dt_agendamento.toString());
        var connection = app.persistencia.connectionFactory();
        var horarioDao = new app.persistencia.HorarioDao(connection);

        horarioDao.findDisponivel(dt, function(erro, resposta){
            if(erro){
                console.log(erro);
                res.status(500).send(erro);
            }else{
                res.status(200).send(resposta);
            }
        });

        connection.end();

    });    

}