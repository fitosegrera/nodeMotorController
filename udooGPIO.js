var sys = require('sys')
var exec = require('child_process').exec;

var UdooGPIO = {
	puts: function(error, stdout, stderr){
		sys.puts(stdout)
	},
	pinMode: function(pin, direction){
		this.dirVal;
		this.direction = direction 
		if (this.direction == "INPUT"){
			this.dirVal = "in"
		}else if(this.direction == "OUTPUT"){
			this.dirVal = "out"
		}else{
			console.log("pinMode ERROR: function takes 2 arguments pin# and either INPUT or OUTPUT")
		}
		this.command = "echo " + this.dirVal + " > /sys/class/gpio/gpio"+pin.toString()+"/direction"
		exec(this.command, this.puts)
	},
	digitalWrite: function(pin, value){
		this.state;
		if(value == "HIGH"){
			this.state = "1"
		}else if(value == "LOW"){
			this.state = "0"
		}else{
			console.log("digitalWrite ERROR: function takes 2 arguments pin# and either HIGH or LOW")
		}
		this.command = "echo " + this.state + " > /sys/class/gpio/gpio"+pin.toString()+"/value"
		exec(this.command, this.puts)
	},
	delay: function(d, callback){
		var timer = setTimeout(function(){
			callback()
			clearTimeout(timer)
			console.log("finished delay")
		},d*1000)
		
	}
}

module.exports = UdooGPIO
