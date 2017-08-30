class AgendamentoDao {
  constructor(connection){
    this._connection = connection;
  }
  
  list(callback) {
    this._connection.query('SELECT * FROM agendamento', callback);
  }
  
  salva(agendamento, callback){
    this._connection.query('INSERT INTO agendamento SET ?', agendamento, callback);
  }
  
  findById(id, callback){
    this._connection.query('SELECT * FROM agendamento WHERE id = ?', [id], callback);
  }
  
  findByClientId(id, callback){
    this._connection.query('SELECT * FROM agendamento WHERE clinte = ?', [id], callback);
  }
}

module.exports = () => AgendamentoDao;
