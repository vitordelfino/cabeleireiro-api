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
  
  app.get('agendamento/find/id/:id', (req, res) => {
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
  
  app.get('agendamento/find/clientid/:id', (req, res) => {
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
  
  app.post('agendamento/salva', (req, res) => {
    
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
}