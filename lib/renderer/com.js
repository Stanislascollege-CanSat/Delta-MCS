// Serial communication script.
const serialport = require('serialport')

// Com object.
const com = {
  // List function. Get all current serial devices and place them in the menu list,
  // function should be executed on start and port list change.
  chosenDevice: undefined,
  devices: undefined,
  list: function() {
    let menu = $('comMenuItemHolder')
    // Get all serial devices.
    serialport.list( (err, list) => {
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
  open: function(name,givenBaudRate) {
    if (com.port === undefined) {
      this.port = new serialport(name, {
        baudRate: givenBaudRate
      })
      console.log('%c[COM] %cOpening port: %c' +name+' %cwith a baudRate of %c'+givenBaudRate,'color: #38006b','color: #000','color: #900','color: #000','color: #900')
      com.openEvent()
      com.closeEvent()
      com.dataEvent()
      return
    }
    console.warn('%c[COM] %cSerialport already open.','color: #38006b','color: #000')
  },
  openPort: function() {
    com.open(com.chosenDevice.comName,9600)
  },
  _checkChosenDevice: function() {
    if (this.chosenDevice === undefined) {
      $('connectButton').classList.add('blocked')
      $('connectButton').removeEventListener('click',this.openPort)
    } else {
      $('connectButton').classList.remove('blocked')
      $('connectButton').addEventListener('click',this.openPort)
    }
  },
  openEvent: function() {
    com.port.on('open', () => {
      console.log('%c[COM] %cPort %c' +com.port.path+' %c'+'opened succesfully!','color: #38006b','color: #000','color: #900','color: #000')
      $('mcuStatusDot').classList.remove('noLink')
      $('mcuStatusDot').classList.add('link')
      $('mcuStatusTextStatus').classList.remove('noLink')
      $('mcuStatusTextStatus').classList.add('link')
      $('mcuStatusTextStatus').innerHTML = 'Verbonden'
      $('mcuStatusTextDevice').innerHTML = com.port.path
    })
  },
  closeEvent: function() {
    com.port.on('close', () => {
      console.log('%c[COM] %cport closed.','color: #38006b','color: #000')
      $('mcuStatusDot').classList.add('noLink')
      $('mcuStatusDot').classList.remove('link')
      $('mcuStatusTextStatus').classList.add('noLink')
      $('mcuStatusTextStatus').classList.remove('link')
      $('mcuStatusTextStatus').innerHTML = 'Niet verbonden'
      $('mcuStatusTextDevice').innerHTML = 'n.v.t.'
      com.port = undefined
      com.chosenDevice = undefined
      com._checkChosenDevice()
      $('comMenu').classList.add('hidden')
    })
  },
  dataEvent: function() {
    com.port.on('data', (raw) => {
      console.log(String(raw))
      parser.pipe(String(raw),data)
      // if(dataReceived){
      //   console.log('%c[COM] %cRecieved data from %c'+com.port.path+'%c: '+dataReceived,'color: #38006b','color: #000','color: #900','color: #000')
      //   missionConsole.log(dataReceived)
      // }
      //for(let i = 0; i < dataReceived.length; ++i){
      //  console.log('%c[COM] %cRecieved data from %c'+com.port.path+'%c: '+dataReceived[i],'color: #38006b','color: #000','color: #900','color: #000')
      //  missionConsole.log(dataReceived[i])
      //}
    })
  }
}

// Start com on startup.
com.list()

// Open & close menu on click.
$('comButton').addEventListener('click', () => {
  if($('comMenu').classList.contains('hidden')) {
    $('comMenu').classList.remove('hidden')
    com.list()
  } else {
    $('comMenu').classList.add('hidden')
  }
})

// close menu when connect button is clicked.
$('connectButton').addEventListener('click', () => {
  if($('comMenu').classList.contains('hidden')) {
    $('comMenu').classList.remove('hidden')
    com.list()
  } else {
    $('comMenu').classList.add('hidden')
  }
})
