module.exports = function(app){

   app.get('/agendamento/list', (req, res) => {

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

  app.get('/agendamento/id/:id', (req, res) => {
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

  app.get('/agendamento/clientidhoje/:id', (req, res) => {
    const id = req.params.id;
    const connection = app.persistencia.connectionFactory();
    const agendamentoDao = new app.persistencia.AgendamentoDao(connection);

    agendamentoDao.findByClientIdHoje(id, (erro, resposta) => {
      if(erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send(resposta);
    });
    connection.end();
  });

  app.get('/agendamento/clientidproximos/:id', (req, res) => {
    const id = req.params.id;
    const connection = app.persistencia.connectionFactory();
    const agendamentoDao = new app.persistencia.AgendamentoDao(connection);

    agendamentoDao.findByClientIdProximos(id, (erro, resposta) => {
        if(erro) {
          console.log(erro);
          res.status(500).send(erro);
          return;
        }
        res.status(200).send(resposta);
    });
    connection.end();
  });

  app.get('/agendamento/clientidantigos/:id', (req, res) => {
    const id = req.params.id;
    const connection = app.persistencia.connectionFactory();
    const agendamentoDao = new app.persistencia.AgendamentoDao(connection);

  agendamentoDao.findByClientIdAntigos(id, (erro, resposta) => {
      if(erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send(resposta);
      });
    connection.end();
  });

  app.post('/agendamento', (req, res) => {

    var agendamento = req.body;
    const connection = app.persistencia.connectionFactory();
    const agendamentoDao = new app.persistencia.AgendamentoDao(connection);

    agendamento.status = 1;

    agendamentoDao.salva(agendamento, (erro, resposta) => {
      if(erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }
      const memcachedClient = app.servicos.memcachedClient();
      memcachedClient.delete(agendamento.dt_agendamento, erro =>{
        if(!erro)
          console.log('DELETE - chave deletada');
      });
      res.location('/pagamentos/' + resposta.insertId);
      res.status(200).send(resposta);
    });
    connection.end();
  });

  app.put('/agendamento/:id', (req, res) => {

    const id = req.params.id;
    const connection = app.persistensia.connectionFactory();
    const agendamentoDao = new app.persistensia.AgendamentoDao(connection);

    let agendamento = {};
    agendamento.id = id;
    agendamento.status = 'Finalizado';


    agendamentoDao.finaliza(id, (erro) => {
      if(erro){
        console.log(`Erro ao atualizar agendamento: ${erro}`);
        res.status(500).send(erro);
        return;
      }
      console.log(`agendament finalizado: ${agendamento}`);
      res.send(agendamento);
    });


  });

  app.delete('/agendamento/:id', (req, res) => {

    const id = req.params.id;
    const connection = app.persistencia.connectionFactory();
    const agendamentoDao = new app.persistencia.AgendamentoDao(connection);

    agendamentoDao.delete(id, (erro) => {
      if(erro){
        console.log('Erro ao deletar agendamento' + erro);
        res.status(500).send(erro);
        return;
      }
      console.log('Cancelado');
      res.status(204).send('Cancelado');
    });
    connection.end();
  })


}
