// mission console object.
const missionConsole = {
  element: $('consoleText'),
  log: function(x) {
    let textBlock = document.createElement('h6')
    textBlock.innerHTML = x
    this.element.appendChild(textBlock)
  },
  warn: undefined,
  error: undefined,
}
