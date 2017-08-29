var app = require('./config/express')();

app.listen(3000, function(req, res) {
    console.log('Servidor rodando...');
});