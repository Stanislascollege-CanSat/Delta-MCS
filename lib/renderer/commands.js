const commands = {
  elements: ['buttonHullOpen','buttonHullClose','buttonPinsOpen','buttonPinsClose','buttonDeploy','buttonLocate'],
  triplets: ['[OPR]','[CLR]','[OPP]','[CLP]','[DEP]','[IDE]','[SAD]'],
  send (command) {
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
  },
  mode: {
    set (bool) {
      // send command to MotherCan
      if (bool) commands.send('[MOF]')
      else commands.send('[MOT]')
    },
    //reset () {
    //  $('switchMode').checked = false
    //}
  }
}
commands.active = false

// Control buttons
$('buttonFlightMode').addEventListener('click', () => {
  commands.send('[FLIGHT_MODE]')
})
$('buttonHullOpen').addEventListener('click', () => {
  commands.send('[OPR]')
})

$('buttonHullClose').addEventListener('click', () => {
  commands.send('[CLR]')
})

$('buttonPinsOpen').addEventListener('click', () => {
  commands.send('[OPP]')
})

$('buttonPinsClose').addEventListener('click', () => {
  commands.send('[CLP]')
})

$('buttonDeploy').addEventListener('click', () => {
  commands.send('[DEP]')
})

$('buttonDownloadData').addEventListener('click', () => {
  commands.send('[SAD]')
})

// Mode select switch
//$('switchMode').addEventListener('click', () => {
//  if ($('switchMode').checked === true) commands.mode.set(true)
//  else commands.mode.set(false)
//})

// IPC listeners
ipcRenderer.on('rer', () => commands.send('[RER]'))
ipcRenderer.on('cpr', () => commands.send('[CPR]'))
ipcRenderer.on('str', () => commands.send('[STR]'))
