module.exports = function(app) {

    app.post('/horario/disponivel', function(req, res){

        const dt = req.body;
        console.log(dt.dt_agendamento.toString());

        const memcachedClient = app.servicos.memcachedClient();
        memcachedClient.get(dt.dt_agendamento.toString(), (erro, retorno, key) => {
            if(erro || !retorno){
                console.log('MISS - chave não encontrada');

                const connection = app.persistencia.connectionFactory();
                const horarioDao = new app.persistencia.HorarioDao(connection);

                horarioDao.findDisponivel(dt, function(erro, resposta, key){
                    if(erro){
                        console.log(erro);
                        res.status(500).send(erro);
                    }else{

                        memcachedClient.set(dt.dt_agendamento.toString(), JSON.stringify(resposta), {expires:60000}, (erro,val) => {
                            if(erro){
                                console.log('set: '+ erro);
                            }else{
                                console.log('nova chave adicionada ao cache: ' + dt.dt_agendamento.toString())
                            }
                        });

                        res.status(200).send(resposta);
                    }
                });

                connection.end();


            }else{
                console.log('HIT - chave encontrada ');
                res.status(200).send(JSON.parse(retorno));
            }
        });





    });    

}