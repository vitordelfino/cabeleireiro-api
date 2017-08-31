function LoginDao(connection) {
    this._connection = connection;
}

LoginDao.prototype.find = function(login, callback){
    this._connection.query('SELECT * FROM login where usuario = ? AND senha = ?', [login.usuario, login.senha], callback);
}

LoginDao.prototype.find2 = function(login, callback){
    this._connection.query('SELECT * FROM login l, cliente c where usuario = ? AND senha = ? and l.usuario = cliente.cpf', [login.usuario, login.senha], callback);
}

module.exports = function() {
    return LoginDao;
}