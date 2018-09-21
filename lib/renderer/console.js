// mission console object.
const missionConsole = {
  element: $('consoleText'),
  addEntry: function (settings) {
    let entry = document.createElement('div')
    entry.classList.add(settings.type)
    entry.id = 'consoleEntry'
    // Check if text is undefined, then return empty string.
    if (settings.text === undefined) settings.text = ''
    entry.innerHTML = '<div class="flow">' + settings.flow + '</div><div class="text"><h6>' + settings.text + '</h6></div>'

    // let entry = '<div class="'+settings.type+'" id="consoleEntry"></div>'
    this.element.appendChild(entry)
    this._scrollBottom()
  },
  log: function (x) {
    this.addEntry({
      type: 'log',
      flow: '',
      text: x
    })
  },
  warn: function (x) {
    this.addEntry({
      type: 'warn',
      flow: '',
      text: x
    })
  },
  error: function (x) {
    this.addEntry({
      type: 'error',
      flow: '',
      text: x
    })
  },
  _scrollBottom: function () {
    if (this._overElement === false) {
      this.element.scrollTop = this.element.scrollHeight
    }
  },
  _overElement: false,
  trackMouse: function () {
    this.element.onmouseover = () => {
      this._overElement = true
    }
    this.element.onmouseout = () => {
      this._overElement = false
    }
  },
  // Console functions.
  clear() {
    this.element.innerHTML = ''
  }
}

missionConsole.trackMouse()
