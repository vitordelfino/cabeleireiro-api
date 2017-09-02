module.exports = function(app) {

    app.post('/login/logar', function(req, res) {

        const login =  req.body;

        const memcached = app.servicos.memcachedClient();
        memcached.get(`${login.usuario}-${login.senha}`, (erro, retorno, key) => {

            if(erro || !retorno){
                console.log('MISS - chave não encontrada');

                const connection = app.persistencia.connectionFactory();
                const loginDao = new app.persistencia.LoginDao(connection);

                loginDao.find2(login, function(erro, resultado){
                    if(erro){
                        console.log('Não foi possível fazer login ' + erro);
                        res.status(500).send(erro);
                        connection.end();
                        return;
                    }

                    if(resultado.length > 0){
                        console.log(resultado);
                        user = {
                            "login": {
                                "usuario": resultado[0].usuario,
                                "senha": resultado[0].senha
                            },
                            "cliente": {
                                "cpf": resultado[0].cpf,
                                "nome": resultado[0].nome
                            }
                        }

                        memcached.set(`${login.usuario}-${login.senha}`, JSON.stringify(user), {expires:60000}, (erro,val) => {
                           if(erro){
                               console.log(erro);
                           }else{
                               console.log(`chave adicionada: ${login.usuario}-${login.senha}`);
                           }
                        });
                        res.status(200).send(user);
                        connection.end();
                    }else{
                        res.status(404).send({mensagem: "Usuário ou senha inválidos"});
                        connection.end();
                    }


                });

            }else{
                console.log('HIT - chave encontrada: ' + JSON.stringify(retorno));
                res.status(200).send(JSON.parse(retorno));
            }
        });
    });

    app.put('/login/update', function(req, res) {

        var novoLogin = req.body;


        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro) {
            if (erro) {
                console.log();
                res.status(500).send(erro);
                return;
            }
            console.log('pagamento confirmado ' + pagamento);
            res.send(pagamento);
        });

        connection.end();
    });
}
