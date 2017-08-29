module.exports = function(app) {

    app.post('/login/logar', function(req, res) {

        var login =  req.body;

        var connection = app.persistencia.connectionFactory();
        var loginDao = new app.persistencia.LoginDao(connection);
        var cliente = new app.persistencia.ClienteDao(connection);

        loginDao.find(login, function(erro, resultado){
            if(erro){
                console.log('Não foi possível fazer login ' + erro);
                res.status(500).send(erro);
                return;
            }
            console.log('login realizado');
            connection.end();

            var connection = app.persistencia.connectionFactory();
            var cliente = new app.persistencia.ClienteDao(connection);
            if(resultado.length == 1){
                cliente.buscaPorId(login.usuario, function(erro, resultado){
                    if(erro){
                        console.log('Não foi possível fazer login ' + erro);
                        res.status(500).send(erro);
                        return;
                    }

                        res.status(200).send({login: login, cliente: resultado[0]});

                });
            }else{
                res.status(404).send({mensagem: "Usuário ou senha inválidos"});
            }


        });

        connection.end();

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
