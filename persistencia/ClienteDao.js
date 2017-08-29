function ClienteDao(connection) {
    this._connection = connection;
}

ClienteDao.prototype.salva = function(cliente, callback) {
    this._connection.query('INSERT INTO cliente SET ?', cliente, callback);
}

ClienteDao.prototype.criaLogin = (login, callback) => this._connection.query('INSERT INTO login SET ?', login, callback);

ClienteDao.prototype.atualiza = function(pagamento, callback) {
    this._connection.query('UPDATE pagamentos SET status = ? where id = ?', [pagamento.status, pagamento.id], callback);
}

ClienteDao.prototype.lista = function(callback) {
    this._connection.query('select * from pagamentos', callback);
}

ClienteDao.prototype.buscaPorId = function(cpf, callback) {
    this._connection.query('select * from cliente where cpf = ?', [cpf], callback);
}

module.exports = function() {
    return ClienteDao;
}