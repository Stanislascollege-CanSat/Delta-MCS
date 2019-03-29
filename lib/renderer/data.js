// Require modules
const fs = require('fs')
const { dialog, app } = require('electron').remote

// Data object.
const data = {
  packets: [],
  raw: '',
  console: [],
  currentIndex: -1,
  add: (name, value) => {
    data.packets[data.currentIndex][name] = value
    data.renderData(name, value, data.packets[data.currentIndex].UNIXtime)
  },
  new: () => {
    // Increment currentIndex with 1.
    data.currentIndex += 1
    // Create new save object.
    let time = new Date()
    let packet = {
      UNIXtime: time.getTime()
    }
    data.packets.push(packet)
  },
  save: (content, raw, console) => {
    // Create custom filename.
    let now = new Date()
    let location = `/Delta-telemetry-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-(${now.getHours()}.${now.getMinutes()}.${now.getSeconds()})`
    dialog.showSaveDialog(null, {
      title: `Select save location`,
      defaultPath: app.getPath('documents') + location,
      buttonLabel: `Choose folder`
    }, path => {
      if (path === undefined) {
        missionConsole.warn(`[DATA] No save location was chosen.`)
        return
      }
      // Save telemetry file.
      fs.writeFile(`${path}-json.json`, JSON.stringify(content, null, 2), err => {
        if (err) throw err
        missionConsole.log(`[DATA] Telemetry saved to: ${path}-json.json`)
      })
      // Save RAW file.
      fs.writeFile(`${path}-raw.txt`, raw, err => {
        if (err) throw err
        missionConsole.log(`[DATA] RAW telemetry saved to: ${path}-raw.txt`)
      })
      // Save console log file.
      fs.writeFile(`${path}-console.json`, JSON.stringify(console, null, 1), err => {
        if (err) throw err
        missionConsole.log(`[DATA] Console log saved to: ${path}-console.json`)
      })
    })
  },
  reset: () => {
    this.currentIndex = -1
  },
  // Data rendering.
  packetDefinitions: [
    // Datasets.
    //{ code: 'HG', name: 'Hgt', type: 'chart' },
    { code: 'AP', name: 'BMP280 Air pressure', type: 'chart' },
    { code: 'AT', name: 'BMP280 Air temperature', type: 'chart' },
    { code: 'AL', name: 'BMP280 Altitude', type: 'chart' },
    { code: 'HM', name: 'SI7021 Humidity', type: 'chart' },
    { code: 'OC', name: 'SGP30 TVOC', type: 'counter' },
    { code: 'O2', name: 'SGP30 eCO2', type: 'counter' },
    { code: 'AX', name: 'MPU9250 Accelerometer X', type: 'counter' },
    { code: 'AY', name: 'MPU9250 Accelerometer Y', type: 'counter' },
    { code: 'AZ', name: 'MPU9250 Accelerometer Z', type: 'counter' },
    { code: 'GX', name: 'MPU9250 Gyroscope X', type: 'counter' },
    { code: 'GY', name: 'MPU9250 Gyroscope Y', type: 'counter' },
    { code: 'GZ', name: 'MPU9250 Gyroscope Z', type: 'counter' },
    { code: 'CX', name: 'MPU9250 Compass X', type: 'counter' },
    { code: 'CY', name: 'MPU9250 Compass Y', type: 'counter' },
    { code: 'CZ', name: 'MPU9250 Compass Z', type: 'counter' },
    { code: 'GT', name: 'GPS Time', type: 'time' },
    { code: 'GA', name: 'GPS Latitude', type: 'counter' },
    { code: 'GO', name: 'GPS Longitude', type: 'counter' },
    { code: 'GH', name: 'GPS Height', type: 'counter' },
    { code: 'GS', name: 'GPS Speed', type: 'counter' },
    { code: 'GV', name: 'GPS Angle', type: 'counter' },
    { code: 'G3', name: 'GPS 3D Fix', type: 'counter' },
    { code: 'GN', name: 'GPS #satellites', type: 'counter' },
    { code: 'TS', name: 'Time since startup', type: 'counter' },
    { code: 'RS', name: 'RSSI', type: 'counter' },
    { code: 'BV', name: 'Battery voltage', type: 'counter' },
    // Status.
    { code: 'SBT', name: 'MotherMCU', type: 'status' },
    { code: 'SGS', name: 'Serial', type: 'status' },
    { code: 'SGR', name: 'Radio', type: 'status' },
    { code: 'SGF', name: 'Frequency', type: 'status' },
    { code: 'SGP', name: 'TXPower', type: 'status' },
    { code: 'SMR', name: 'MotherRf', type: 'status' },
    { code: 'SMF', name: 'MotherFram', type: 'status' },
    { code: 'SMB', name: 'MotherBmp', type: 'status' },
    { code: 'SMC', name: 'MotherSgp', type: 'status' },
    { code: 'SMS', name: 'MotherSi', type: 'status' },
    { code: 'SMG', name: 'MotherGps', type: 'status' },
    { code: 'SMR', name: 'MotherMpu', type: 'status' },
    { code: 'SMU', name: 'MotherFM', type: 'mode'},
    // Functions.
    { code: 'F', name: 'Function', type: 'function' }
  ],
  renderData: (name, value, time) => {
    // Check if name is present in packetDefinitions
    let indexOfdataset
    for (let i = 0; i < data.packetDefinitions.length; i++) {
      if (data.packetDefinitions[i].code === name) {
        indexOfdataset = i
        // Run right function depending on type.
        switch (data.packetDefinitions[indexOfdataset].type) {
          case 'chart':
            live.updateChart(data.packetDefinitions[indexOfdataset].code, value, time)
            break
          case 'counter':
            $(`data-${data.packetDefinitions[indexOfdataset].code}`).innerHTML = value
            break
          case 'status':
            data.changeStatus(data.packetDefinitions[indexOfdataset].name, value)
            break
          case 'mode':
            if (value === '1') {
              data.changeStatus(data.packetDefinitions[indexOfdataset].name, '2')
            } else if (value === '2') {
              data.changeStatus(data.packetDefinitions[indexOfdataset].name, '1')
            } else {
              data.changeStatus(data.packetDefinitions[indexOfdataset].name, '0')
            }
            break
          case 'log':
            missionConsole.log(`[MOTHER] ${String(value)}`)
            break
          case 'function':
            data.runFunction(value, time)
            break
          case 'time':
            $(`data-${data.packetDefinitions[indexOfdataset].code}`).innerHTML = value.slice(0,2) + ":" + value.slice(2,4) + ":" + value.slice(4,6)
            break
        }
      } else {
      // Is somewhere else in array or is not valid.
        //  missionConsole.error(`[DATA] Dataset: ${name} is not valid.`)
      }
    }
  },
  status: {
    reset: () => {
      // Select all status holders.
      let holder = document.querySelectorAll('.statusValueInner')
      for (let i = 0; i < holder.length; i++) {
        holder[i].classList.remove('statusWarn')
        holder[i].classList.remove('statusGood')
        holder[i].classList.add('statusError')
      }
    }
  },
  changeStatus: (name, status) => {
    switch (Number(status)) {
      case 0:
        $(`status${name}`).classList.add('statusError')
        $(`status${name}`).classList.remove('statusWarn')
        $(`status${name}`).classList.remove('statusGood')
        break
      case 1:
        $(`status${name}`).classList.add('statusWarn')
        $(`status${name}`).classList.remove('statusError')
        $(`status${name}`).classList.remove('statusGood')
        break
      case 2:
        $(`status${name}`).classList.add('statusGood')
        $(`status${name}`).classList.remove('statusWarn')
        $(`status${name}`).classList.remove('statusError')
        break
      default:
        missionConsole.warn(`${name} has no status value ${status}`)
    }
  },
  runFunction: (value, time) => {
    // Get function name.
    let functionName = ''
    let argumentIndex
    for (let i = 0; i < value.length; i++) {
      if (value[i] == ',') {
        argumentIndex = i + 1
        break
      }
      functionName += value[i]
    }
    // Run function.
    switch (functionName) {
      case 'LOG':
        missionConsole.log(value.slice(argumentIndex))
        break
      case 'WRN':
        missionConsole.warn(value.slice(argumentIndex))
        break
      case 'ERR':
        missionConsole.error(value.slice(argumentIndex))
        break
      case 'ASK':
        break
      case 'ST0':
        live.setT0(time)
        break
    }
  }
}

// IPC listeners
ipcRenderer.on('data-save', () => data.save(data.packets, data.raw, data.console))
