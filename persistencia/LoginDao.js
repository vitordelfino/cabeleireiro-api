function LoginDao(connection) {
    this._connection = connection;
}

LoginDao.prototype.find = function(login, callback){
    this._connection.query('SELECT * FROM login where usuario = ? AND senha = ?', [login.usuario, login.senha], callback);
}

module.exports = function() {
    return LoginDao;
}