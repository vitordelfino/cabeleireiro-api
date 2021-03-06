module.exports = function(app){

    app.post('/cliente/salvar', function(req, res) {
        
        console.log(req.body);

        req.assert(
            "cpf",
            "CPF é obrigatório").notEmpty();
        
        req.assert(
            "nome",
            "Nome é obrigatório").notEmpty();
        
        req.getValidationResult().then(function(result){
            var erros = result.useFirstErrorOnly().array();
            if(erros.length !== 0){
                console.log('erro de validação encontrado ' + erros);
                res.status(400).send(erros);
                return
            }
            var cliente = req.body;
            var connection = app.persistencia.connectionFactory();
            var clienteDao = new app.persistencia.ClienteDao(connection);

            clienteDao.salva(cliente, function(erro, resultado){
                if(erro){
                    console.log('erro ao salvar cliente no banco +' + erro);
                    res.status(500).send(erro);
                }else{
                    console.log('cliente cadastrado');
                    res.location('/cliente/salvar/' + resultado.insertId);
                    res.status(201).json(cliente);
                }
            });
            connection.end();

        });

    });
}