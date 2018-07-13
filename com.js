// Handles all communication with groundstation MCU.
const SerialPort = require('SerialPort')
const port = new SerialPort('COM11', {
	baudRate: 9600
})

port.on('data', onData)

function onData(data) {
	console.log(data)
}