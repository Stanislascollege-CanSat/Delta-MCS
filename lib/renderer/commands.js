$('buttonHullOpen').addEventListener('click', () => {
  com.port.write('[OPR]')
  missionConsole.log('Hull Open')
})

$('buttonHullClose').addEventListener('click', () => {
  com.port.write('[CLR]')
  missionConsole.log('Hull Close')
})

$('buttonPinsOpen').addEventListener('click', () => {
  com.port.write('[OPP]')
  missionConsole.log('Pins Open')
})

$('buttonPinsClose').addEventListener('click', () => {
  com.port.write('[CLP]')
  missionConsole.log('Pins Close')
})

$('buttonDeploy').addEventListener('click', () => {
  com.port.write('[DEP]')
  missionConsole.log('Deploy')
})

$('buttonLocate').addEventListener('click', () => {
  com.port.write('[IDE]')
  missionConsole.log('Locate')
})

$('buttonDownloadData').addEventListener('click', () => {
  com.port.write('[SAD]')
  missionConsole.log('Download Data')
})
