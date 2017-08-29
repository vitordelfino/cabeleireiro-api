var mysql = require('mysql');

function createDBConnection() {

    if(!process.env.NODE_ENV){
        /* return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'cabeleireiro',
            dateString: true
        }); */
        return mysql.createConnection({
            host: 'us-cdbr-iron-east-05.cleardb.net',
            user: 'b2d6f36bb81d89',
            password: '39bf5014',
            database: 'heroku_c4f53a955d2ee27',
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