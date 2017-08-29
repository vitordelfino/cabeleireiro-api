var app = require('./config/express')();

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log('Servidor rodando...');
});