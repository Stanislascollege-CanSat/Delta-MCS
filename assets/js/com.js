// Handles all communication with groundstation MCU.
const SerialPort = require('SerialPort')
const port = new SerialPort('COM11', {
	baudRate: 9600
})

port.on('open', onOpen)
port.on('data', onData)

function onOpen() {
	byId('mcuLinkStatus').classList.remove('mcuLinkStatusDisconnected')
	byId('mcuLinkStatus').classList.add('mcuLinkStatusLink')
}

function onData(data) {
	console.log(data)
	const dataView = byId('data')
	dataView.innerHTML = data
}