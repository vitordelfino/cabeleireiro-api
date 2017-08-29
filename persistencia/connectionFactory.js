var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'cabeleireiro',
        dateString: true
    });
}

module.exports = function() {
    return createDBConnection;
}