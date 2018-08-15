// Handles all communication with groundstation MCU.
const SerialPort = require('SerialPort')
const port = new SerialPort('/dev/cu.usbmodemFD121', {
	baudRate: 9600
})

port.on('open', onOpen)
port.on('data', onData)

	function onOpen() {
		byId('mcuLinkStatus').classList.remove('mcuLinkStatusDisconnected')
		byId('mcuLinkStatus').classList.add('mcuLinkStatusLink')
	}

<<<<<<< HEAD
function onData(data) {
	console.log(data)
	const dataView = byId('data')
	dataView.innerHTML = data
}
=======
	function onData(data) {
		console.log(data)
		const dataView = byId('data')
		dataView.innerHTML = data
	}
>>>>>>> 50d14e5e1da66486881e61b4fad3e3b50c7f7518
