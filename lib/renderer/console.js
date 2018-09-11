// mission console object.
const missionConsole = {
  element: $('consoleText'),
  log: function(x) {
    let textBlock = document.createElement('h6')
    textBlock.innerHTML = x
    this.element.appendChild(textBlock)
    this._scrollBottom()
  },
  warn: function(x) {
    let textBlock = document.createElement('h6')
    textBlock.innerHTML = '[WARNING] '+x
    textBlock.classList.add('warn')
    this.element.appendChild(textBlock)
    this._scrollBottom()
  },
  error: function(x) {
    let textBlock = document.createElement('h6')
    textBlock.innerHTML = '[ERROR] '+x
    textBlock.classList.add('error')
    this.element.appendChild(textBlock)
    this._scrollBottom()
  },
  _scrollBottom: function() {
    if(this._overElement === false) {
      this.element.scrollTop = this.element.scrollHeight
    }
  },
  _overElement: false,
  trackMouse: function() {
    this.element.onmouseover = () => {
      this._overElement = true
    }
    this.element.onmouseout = () => {
      this._overElement = false
    }
  }
}

missionConsole.trackMouse()
