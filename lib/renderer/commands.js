const commands = {
  elements: ['buttonHullOpen','buttonHullClose','buttonPinsOpen','buttonPinsClose','buttonDeploy','buttonLocate'],
  triplets: ['[OPR]','[CLR]','[OPP]','[CLP]','[DEP]','[IDE]','[SAD]'],
  send(command) {
    if (!this._active) return
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
  this.send('[OPR]')
  missionConsole.log('Hull Open')
})

$('buttonHullClose').addEventListener('click', () => {
  this.send('[CLR]')
  missionConsole.log('Hull Close')
})

$('buttonPinsOpen').addEventListener('click', () => {
  this.send('[OPP]')
  missionConsole.log('Pins Open')
})

$('buttonPinsClose').addEventListener('click', () => {
  this.send('[CLP]')
  missionConsole.log('Pins Close')
})

$('buttonDeploy').addEventListener('click', () => {
  this.send('[DEP]')
  missionConsole.log('Deploy')
})

$('buttonLocate').addEventListener('click', () => {
  this.send('[IDE]')
  missionConsole.log('Locate')
})

$('buttonDownloadData').addEventListener('click', () => {
  this.send('[SAD]')
  missionConsole.log('Download Data')
})
