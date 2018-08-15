// Serial communication script.
const serialport = require('serialport')

// Keep global reference of port object & avaible serialports object.
let port
let portList


// Get all serial connections.
listPorts()

// Open selecte port when connect is pressed.
$('connect').addEventListener('click', () => {
  openPort()
})

// communication functions.
function listPorts(targetId) {
  serialport.list( (err,list) => {
    // save list in global portList.
    portList = list
    // Log amount of serial devices to console.
    console.log('[COM] Found',portList.length,'serial devices.')
    // Create option element for each port.
    const dropdown = $('ports')
    for (let i = 0; i < portList.length; i++) {
      const option = document.createElement('option')
      option.innerHTML = portList[i].comName.slice(9)
      option.value = i
      dropdown.appendChild(option)
    }
  })
}

// open serialport.
function openPort() {
  // Get selected port number.
  let portNumber = $('ports').options[$('ports').selectedIndex].value
  // open port.
  console.log('[COM] trying to open port:',portList[portNumber].comName)
  port = new serialport(portList[portNumber].comName,{
    baudRate: 9600
  })
}

// Setup serial connection.
// const port = new serialport('/dev/cu.usbmodemFD121', {
//   baudRate: 9600
// })
