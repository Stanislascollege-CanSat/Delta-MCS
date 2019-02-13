/*
  @author JSSRDRG
*/

// Require serialport module.
const Serial = require('serialport')

const serialcom = {
  // Run this function first to setup the serial connection.
  init (options) {

  },
  devices: undefined,
  // Update devices array with currently connected devices.
  updateDevices () {
    Serial.list( (err, list) => {
      // Throw error when serialport can't fetch the devices list.
      if (err) throw err
      serialcom.devices = list
    })
    return this.devices
  },
}

module.exports = serialcom
