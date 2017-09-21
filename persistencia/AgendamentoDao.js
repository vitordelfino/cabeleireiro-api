class AgendamentoDao {
  constructor(connection){
    this._connection = connection;
  }
  
  list(callback) {
    this._connection.query('SELECT * FROM agendamento ', callback);
  }
  
  salva(agendamento, callback){
    this._connection.query('INSERT INTO agendamento SET ?', agendamento, callback);
  }
  
  findById(id, callback){
    this._connection.query('SELECT * FROM agendamento WHERE id = ?', [id], callback);
  }
  
  findByClientId(id, callback){
    this._connection.query(
        `select a.id, a.dt_agendamento, s.descricao as servico, h.horario, c.nome, date_format(a.dt_agendamento, '%d-%m-%Y') as str_data from agendamento a, servico s, horarios h, cliente c 
          where c.cpf = a.cliente and s.id = a.servico and h.id = a.hr_agendamento and a.cliente = ? order by a.id desc`, [id], callback);
  }
  
  delete(id, callback){
    this._connection.query('DELETE FROM agendamento WHERE id = ?', [id], callback);
  }
}

module.exports = () => AgendamentoDao;
