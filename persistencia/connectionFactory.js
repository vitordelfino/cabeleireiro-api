var mysql = require('mysql');

function createDBConnection() {

    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'cabeleireiro',
            dateString: true
        });
       
    }

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'cabeleireiro',
            dateString: true
        });
    }
    
    if(process.env.NODE_ENV == 'production'){
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            dateString: true
        });
    }

}

module.exports = function() {
    return createDBConnection;
}