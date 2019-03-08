const commands = {
  elements: ['buttonHullOpen','buttonHullClose','buttonPinsOpen','buttonPinsClose','buttonDeploy','buttonLocate'],
  triplets: ['[OPR]','[CLR]','[OPP]','[CLP]','[DEP]','[IDE]','[SAD]'],
  send(command) {
    if (!this._active) {
      missionConsole.error(`[COMMANDS] GCS not connected! can't execute ${command}`)
      return
    }
    com.port.write(command)
  },
  _active: false,
  set active(input) {
    this._active = input
    if (input === true) {
      this.elements.forEach( item => {
        $('controls').classList.add('controlVisible')
      })
    } else if (input === false) {
      this.elements.forEach( item => {
        $('controls').classList.remove('controlVisible')
      })
    }
  }
}
commands.active = false

$('buttonHullOpen').addEventListener('click', () => {
  commands.send('[OPR]')
  missionConsole.log('Hull Open')
})

$('buttonHullClose').addEventListener('click', () => {
  commands.send('[CLR]')
  missionConsole.log('Hull Close')
})

$('buttonPinsOpen').addEventListener('click', () => {
  commands.send('[OPP]')
  missionConsole.log('Pins Open')
})

$('buttonPinsClose').addEventListener('click', () => {
  commands.send('[CLP]')
  missionConsole.log('Pins Close')
})

$('buttonDeploy').addEventListener('click', () => {
  commands.send('[DEP]')
  missionConsole.log('Deploy')
})

$('buttonLocate').addEventListener('click', () => {
  commands.send('[IDE]')
  missionConsole.log('Locate')
})

$('buttonDownloadData').addEventListener('click', () => {
  commands.send('[SAD]')
  missionConsole.log('Download Data')
})

// IPC listeners
ipcRenderer.on('rer', () => commands.send('[RER]'))
ipcRenderer.on('cpr', () => commands.send('[CPR]'))
