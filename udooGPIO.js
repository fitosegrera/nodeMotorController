var sys = require('sys')
var exec = require('child_process').exec;

var UdooGPIO = {
	puts: function(error, stdout, stderr){
		sys.puts(stdout)
	},
	pinMode: function(pin, direction){
		var this.dirVal;
		var this.direction = direction 
		if (this.direction == "INPUT"){
			this.dirVal = "in"
		}else if(this.direction == "OUTPUT"){
			this.dirVal = "out"
		}else{
			console.log("pinMode ERROR: function takes 2 arguments pin# and either INPUT or OUTPUT")
		}
		this.command = "echo " + this.dirVal + " > /sys/class/gpio/gpio"+pin.toString()+"/direction"
		exec(command, puts)
	}
}

module.exports = UdooGPIO