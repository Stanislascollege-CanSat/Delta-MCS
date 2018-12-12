// Serial communication script.
const Serialport = require('serialport')

// Com object.
const com = {
  // List function. Get all current serial devices and place them in the menu list,
  // function should be executed on start and port list change.
  chosenDevice: undefined,
  devices: undefined,
  list: function () {
    let menu = $('comMenuItemHolder')
    // Get all serial devices.
    Serialport.list((err, list) => {
      this.devices = list

      // Create menu item.
      menu.innerHTML = ''
      for (let i = 0; i < this.devices.length; i++) {
        let menuItem = document.createElement('div')
        menuItem.id = 'comMenuItem'
        menuItem.classList.add(this.devices[i].comName)
        if (this.devices[i].manufacturer !== undefined) {
          menuItem.innerHTML = '<h6>' + this.devices[i].comName + '</h6><h6>' + this.devices[i].manufacturer + '</h6>'
          menuItem.classList.add('subtitle')
        } else {
          menuItem.innerHTML = '<h6>' + this.devices[i].comName + '</h6>'
          menuItem.classList.add('title')
        }
        menu.appendChild(menuItem)
        menuItem.addEventListener('click', () => {
          this.chosenDevice = this.devices[i]
          this._checkChosenDevice()
        })
      }
    })
  },
  // Open function. Open serialport with parsed name & baudrate.
  port: undefined,
  open: function (name, givenBaudRate) {
    if (com.port === undefined) {
      this.port = new Serialport(name, {
        baudRate: givenBaudRate
      })
      console.info('%c[COM] %cOpening port: %c' + name + ' %cwith a baudRate of %c' + givenBaudRate, 'color: #38006b', 'color: #000', 'color: #900', 'color: #000', 'color: #900')
      missionConsole.log('[COM] Opening port: ' + name + ' with a baudRate of ' + givenBaudRate)
      com.openEvent()
      com.closeEvent()
      com.dataEvent()
      return
    }
    console.error('%c[COM] %cSerialport already open.', 'color: #38006b', 'color: #000')
    missionConsole.error('[COM] Serialport already open.')
  },
  openPort: function () {
    com.open(com.chosenDevice.comName, 9600)
  },
  _checkChosenDevice: function () {
    if (this.chosenDevice === undefined) {
      $('connectButton').classList.add('blocked')
      $('connectButton').removeEventListener('click', this.openPort)
    } else {
      $('connectButton').classList.remove('blocked')
      $('connectButton').addEventListener('click', this.openPort)
    }
  },
  openEvent: function () {
    com.port.on('open', () => {
      console.info('%c[COM] %cPort %c' + com.port.path + ' %c' + 'opened succesfully!', 'color: #38006b', 'color: #000', 'color: #900', 'color: #000')
      missionConsole.log('[COM] Port ' + com.port.path + ' opened succesfully!')
      $('mcuStatusDot').classList.remove('noLink')
      $('mcuStatusDot').classList.add('link')
      $('mcuStatusTextStatus').classList.remove('noLink')
      $('mcuStatusTextStatus').classList.add('link')
      $('mcuStatusTextStatus').innerHTML = 'Verbonden'
      let deviceText = document.createElement('div')
      deviceText.id = 'mcuStatusTextDevice'
      deviceText.innerHTML = com.port.path
      $('statusText').appendChild(deviceText)
      parser.count.reset()
      data.reset()
      //data.raw = ''
    //  data.packets = []
    })
  },
  closeEvent: function () {
    com.port.on('close', () => {
      console.warn('%c[COM] %cport closed.', 'color: #38006b', 'color: #000')
      missionConsole.warn('[COM] port closed.')
      $('mcuStatusDot').classList.add('noLink')
      $('mcuStatusDot').classList.remove('link')
      $('statusText').innerHTML = '<h6 id="mcuStatusTextStatus" class="noLink">Niet verbonden</h6>'
      com.port = undefined
      com.chosenDevice = undefined
      com._checkChosenDevice()
      $('comMenu').classList.add('hidden')
    })
  },
  dataEvent: function () {
    com.port.on('data', raw => parser.pipe(String(raw), packet => parser.decode(packet)))
  }
}

// Start com on startup.
com.list()

// Open & close menu on click.
$('comButton').addEventListener('click', () => {
  if ($('comMenu').classList.contains('hidden')) {
    $('comMenu').classList.remove('hidden')
    com.list()
  } else {
    $('comMenu').classList.add('hidden')
  }
})

// close menu when connect button is clicked.
$('connectButton').addEventListener('click', () => {
  if ($('comMenu').classList.contains('hidden')) {
    $('comMenu').classList.remove('hidden')
    com.list()
  } else {
    $('comMenu').classList.add('hidden')
  }
})
