function HorarioDao(connection){
    this._connection = connection;
}

HorarioDao.prototype.findDisponivel = function(dt, callback){
    this._connection.query("select * from horarios where id not in(select hr_agendamento from agendamento where dt_agendamento = ?)",[dt.dt_agendamento], callback);
}

module.exports = function(){
    return HorarioDao;
}