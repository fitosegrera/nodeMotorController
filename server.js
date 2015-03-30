var udoo = require('udoo')
var app = require('http').createServer(handler)
var io = require('socket.io').listen(app)
var fs = require('fs')

// var m1a = udoo.outputPin(5)
// var m1b = udoo.outputPin(6)
// var on = false
app.listen(8080);

function handler(req, res) {
    fs.readFile(__dirname + '/public/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
}

io.sockets.on('connection', function(socket) {
    socket.emit('connected', {
        status: 'connected'
    });
    socket.on('mup', function(data) {
        console.log(data);
    });
    socket.on('mdown', function(data) {
        console.log(data);
    });
});
