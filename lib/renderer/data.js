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
    //data.liveUpdate(name, value, data.packets[data.currentIndex].UNIXtime)
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
    {code: 'HG', name: 'Hgt', type: 'chart'},
    {code: 'RS', name: 'RSSI', type: 'counter'},
    {code: 'AP', name: 'Apr', type: 'chart'},
    {code: 'LOG', name: 'log', type: 'log'},
    {code: 'ST', name: 'status', type: 'status'}
  ],
  renderData: (name, value, time) => {
    // Check if name is present in packetDefinitions
    let indexOfdataset
    for (let i = 0; i < data.packetDefinitions.length; i++) {
      if (data.packetDefinitions[i]['code'] === name) {
        indexOfdataset = i
        // Run right function depending on type.
        switch (data.packetDefinitions[indexOfdataset]['type']) {
          case 'chart':
            live.updateChart(data.packetDefinitions[indexOfdataset].name, value, time)
            break
          case 'counter':
           console.log(`data-${data.packetDefinitions[indexOfdataset].name}`)
            $(`data-${data.packetDefinitions[indexOfdataset].name}`).innerHTML = value
            break
          case 'status':
            missionConsole.log(`[${value.slice(0,2)}] ${value.slice(2)}`)
            break
          case 'log':
            missionConsole.log(`[MOTHER] ${String(value)}`)
            break
          case 'function':
            data.runFunction(data.packetDefinitions[indexOfdataset].name, value, time)
            break
        }
      } else {
      // Is somewhere else in array or is not valid.
        //  missionConsole.error(`[DATA] Dataset: ${name} is not valid.`)
      }
    }
  },
  runFunction: (name, value, time) => {
    if (value === 'sett0') {
      live.setT0(time)
    }
  }
}

// IPC listeners
ipcRenderer.on('data-save', () => data.save(data.packets, data.raw, data.console))
