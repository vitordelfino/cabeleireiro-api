class ServicosDao {
  constructor(connection){
    this._connection = connection;
  }

  list(callback){
    this._connection.query('SELECT * FROM servico', callback);
  }
}

module.exports = () => ServicosDao;
