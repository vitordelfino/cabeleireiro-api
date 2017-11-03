var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

http.listen(process.env.PORT || 3000, function(req, res) {
    console.log('Servidor rodando...');
});
