// Require modules
const fs = require('fs')

// Data object.
const data = {
  packets: [],
  raw: '',
  currentIndex: -1,
  add: (name, value) => {
    data.packets[data.currentIndex][name] = value
    data.liveUpdate(name, value, data.packets[data.currentIndex].UNIXtime)
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
  save: (content, raw) => {
    // Create custom filename.
    let now = new Date()
    let location = `logs/Delta-telemetry-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}].json`
    let locationRaw = `logs/Delta-raw-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}].txt`
    // write telemetry file.
    fs.writeFile(location, JSON.stringify(content, null, 2), (err) => {
      if (err) throw err
      missionConsole.log('[DATA] Telemetry saved!')
    })
    // write raw file.
    fs.writeFile(locationRaw, raw, (err) => {
      if (err) throw err
      missionConsole.log('[DATA] Raw Telemetry saved!')
    })
  },
  reset: () => {
    this.currentIndex = -1
  },
  liveUpdate: (name, value, time) => {
    if (name === 'FNC') {
      data.runFunction(name, value, time)
    } else if (name === 'Hgt') {
      live.updateChart(name, value, time)
    } else {
      if (!$(`data-${name}`)) {
        missionConsole.warn(`[DATA] Dataset: ${name} has no live visuals.`)
        return
      }
      $(`data-${name}`).innerHTML = value
    }
  },
  runFunction: (name, value, time) => {
    if (value === 'sett0') {
      live.setT0(time)
    }
  }
}

// IPC listeners
ipcRenderer.on('data-save', () => data.save(data.packets, data.raw))
