module.exports = function(app){

  app.get('/servicos/find', (req, res)=>{
    console.log('buscando servicos no banco');
    var connection = app.persistencia.connectionFactory();
    var servicosDao = new app.persistencia.ServicosDao(connection);
    
    servicosDao.list((erro, resultado)=>{
      if(erro){
        console.log(erro);
        res.status(500).send(erro);
        return;
      }
      console.log(resultado);
      res.status(200).send(resultado);
    });
    connection.end();
  });

}
