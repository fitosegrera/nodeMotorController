var app = require('http').createServer(handler)
var io = require('socket.io').listen(app)
var fs = require('fs')
var udoo = require('./udooGPIO.js')

var m1a = 18
var m1b = 41
	
function setup(){
	udoo.pinMode(m1a, "OUTPUT")
	udoo.pinMode(m1b, "OUTPUT")
	udoo.digitalWrite(m1a, "LOW")
	udoo.digitalWrite(m1b, "LOW")
}

function runMotor(a, b, direction){
	if (direction == "down"){
		udoo.digitalWrite(a, "HIGH")
		udoo.digitalWrite(b, "LOW")
	}else if (direction == "up"){
		udoo.digitalWrite(a, "LOW")
		udoo.digitalWrite(b, "HIGH")
	}
}

var stopMotor = function(){
	udoo.digitalWrite(m1a, "LOW")
	udoo.digitalWrite(m1b, "LOW")
}

setup()
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
        runMotor(m1a, m1b, "up")
        udoo.delay(data.delay, stopMotor)
        
    });
    socket.on('mdown', function(data) {
        console.log(data);
        console.log(data);
        runMotor(m1a, m1b, "down")
        udoo.delay(data.delay, stopMotor)
    });
});
