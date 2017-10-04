module.exports = function(app){

  app.get('/servicos/find', (req, res)=>{

      const mencached = app.servicos.memcachedClient();
      mencached.get('servicos', (erro, retorno, key) => {
      
      if(erro || !retorno || retorno.length < 1){

          console.log('MISS - chave não encontrada');

          const connection = app.persistencia.connectionFactory();
          const servicosDao = new app.persistencia.ServicosDao(connection);

          servicosDao.list((erro, resultado)=>{
              if(erro){
                  console.log(erro);
                  res.status(500).send(erro);
                  return;
              }
              mencached.set('servicos', JSON.stringify(resultado), {expires:60000}, (erro,val) => {
                 if(!erro)
                     console.log('chave adiocionada: servicos');
              });
              res.status(200).send(resultado);
          });
          connection.end();

      }else{
          console.log('HIT - chave encontrada');
          res.status(200).send(JSON.parse(retorno));
      }

    });
  });
}
