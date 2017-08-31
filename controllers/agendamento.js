module.exports = function(app){
  
   app.get('agendamento/list', (req, res) => {
     
     const connection = app.persistensia.connectionFactory();
     const agendamentoDao = new app.persistensia.AgendamentoDao(connection);
     
     agendamentoDao.list((erro, resultado) => {
       if(erro){
         console.log(erro);
         res.status(500).send(erro);
         return;
       }
       
       res.status(200).send(resultado);       
     });
     connection.end();
   });
  
  app.get('agendamento/id/:id', (req, res) => {
    const id = req.params.id;
    const connection = app.persistensia.connectionFactory();
    const agendamentoDao = new app.persistensia.AgendamentoDao(connection);
    
    agendamentoDao.findById(id, (erro, resposta) => {
      if(erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }     
      res.status(200).send(resposta);     
    });
    connection.end();
  });
  
  app.get('agendamento/clientid/:id', (req, res) => {
    const id = req.params.id;
    const connection = app.persistensia.connectionFactory();
    const agendamentoDao = new app.persistensia.AgendamentoDao(connection);
    
    agendamentoDao.findByClientId(id, (erro, resposta) => {
      if(erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }     
      res.status(200).send(resposta);     
    });
    connection.end();
  });
  
  app.post('agendamento', (req, res) => {
    
    req.assert("cpf", "cpf não pode ser nulo e deve conter 11 dígitos").notEmpty().len(11,11);
    req.assert("data_agendamento", "data do agendamento não pode ser nulo").notEmpty();
    req.assert("servico", "servico não pode ser nulo").notEmpty();
    req.assert("horario", "horario não pode ser nulo").notEmpty();
    
    req.getValidationResult().then(result => {
      const erros = result.useFirstErrorOnly().array();
      if(erros){
        console.log('erros no body da requisicao  ' + erros);
        res.status(400).send(erros);
        return;
      }
    })
    
    const agendamento = req.body;    
    const connection = app.persistensia.connectionFactory();
    const agendamentoDao = new app.persistensia.AgendamentoDao(connection);
    
    agendamentoDao.salva(agendamento, (erro, resposta) => {
      if(erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }     
      res.status(200).send(resposta);     
    });
    connection.end();
  });
  
  app.delete('agendamento/:id', (req, res) => {
    
    const id = req.params.id;
    
    const connection = app.persistensia.connectionFactory();
    const agendamentoDao = new app.persistensia.AgendamentoDao(connection);
    
    agendamentoDao.delete(id, (erro, resultado) => {
      if(erro){
        console.log('Erro ao deletar agendamento' + erro);
        res.status(500).send(erro);
        return
      }
      res.status(200).send(resposta);
    });
    connection.end();
  })
  
  
}