// Main process.

// Require modules
const url = require('url')
const path = require('path')
const electron = require('electron')
const { app, BrowserWindow } = require('electron')

// Require internal modules
const menu = require('./menu.js')

// Keep global reference of mainWindow object.
let mainWindow

// Chrome by default black lists certain GPUs because of bugs.
// if your are not able to view webgl try enabling --ignore-gpu-blacklist option
// But, this will make electron/chromium less stable.
app.commandLine.appendSwitch('--ignore-gpu-blacklist')

// Create window when electron is ready.
app.on('ready', () => {
  createWindow()

  menu.append()

  console.log(' DDDDDDDDDDDDDDD       EEEEEEEEEEEEEEEEEE  LLLLLL          TTTTTTTTTTTTTTTTTT    AAAAAAA         ')
  console.log(' DDDDDDDDDDDDDDDDD     EEEEEEEEEEEEEEEEEE  LLLLLL          TTTTTTTTTTTTTTTTTT    AAAAAAAA        ')
  console.log(' DDDDDDDDDDDDDDDDDD    EEEEEEEEEEEEEEEEEE  LLLLLL          TTTTTTTTTTTTTTTTTT   AAAAAAAAA        ')
  console.log(' DDDDDDDDDDDDDDDDDD    EEEEEEEEEEEEEEEEEE  LLLLLL          TTTTTTTTTTTTTTTTTT   AAAAAAAAA        ')
  console.log(' DDDDDD    DDDDDDDDD   EEEEEE              LLLLLL                TTTTTT        AAAAAAAAAAA       ')
  console.log(' DDDDDD      DDDDDDD   EEEEEE              LLLLLL                TTTTTT        AAAAAAAAAAA       ')
  console.log(' DDDDDD       DDDDDDD  EEEEEE              LLLLLL                TTTTTT        AAAAAAAAAAAA      ')
  console.log(' DDDDDD        DDDDDD  EEEEEE              LLLLLL                TTTTTT       AAAAAA AAAAAA      ')
  console.log(' DDDDDD        DDDDDD  EEEEEE              LLLLLL                TTTTTT       AAAAAA AAAAAA      ')
  console.log(' DDDDDD        DDDDDD  EEEEEEEEEEEEEEEEE   LLLLLL                TTTTTT       AAAAA   AAAAAA     ')
  console.log(' DDDDDD        DDDDDD  EEEEEEEEEEEEEEEEE   LLLLLL                TTTTTT      AAAAAA   AAAAAA     ')
  console.log(' DDDDDD        DDDDDD  EEEEEEEEEEEEEEEEE   LLLLLL                TTTTTT      AAAAAA   AAAAAA     ')
  console.log(' DDDDDD        DDDDDD  EEEEEEEEEEEEEEEEE   LLLLLL                TTTTTT     AAAAAA     AAAAAA    ')
  console.log(' DDDDDD        DDDDDD  EEEEEE              LLLLLL                TTTTTT     AAAAAAAAAAAAAAAAA    ')
  console.log(' DDDDDD        DDDDDD  EEEEEE              LLLLLL                TTTTTT     AAAAAAAAAAAAAAAAA    ')
  console.log(' DDDDDD       DDDDDDD  EEEEEE              LLLLLL                TTTTTT    AAAAAAAAAAAAAAAAAAA   ')
  console.log(' DDDDDD      DDDDDDD   EEEEEE              LLLLLL                TTTTTT    AAAAAAAAAAAAAAAAAAA   ')
  console.log(' DDDDDD    DDDDDDDDD   EEEEEE              LLLLLL                TTTTTT    AAAAAA       AAAAAAA  ')
  console.log(' DDDDDDDDDDDDDDDDDD    EEEEEEEEEEEEEEEEEE  LLLLLLLLLLLLLLLLL     TTTTTT   AAAAAA         AAAAAA  ')
  console.log(' DDDDDDDDDDDDDDDDDD    EEEEEEEEEEEEEEEEEE  LLLLLLLLLLLLLLLLL     TTTTTT   AAAAAA         AAAAAA  ')
  console.log(' DDDDDDDDDDDDDDDDD     EEEEEEEEEEEEEEEEEE  LLLLLLLLLLLLLLLLL     TTTTTT  AAAAAAA         AAAAAA  ')
  console.log(' DDDDDDDDDDDDDDD       EEEEEEEEEEEEEEEEEE  LLLLLLLLLLLLLLLLL     TTTTTT  AAAAAA           AAAAA  ')
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Create window function.
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    minWidth: 730,
    height: 800,
    minHeight: 250,
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#fafafa',
    icon: path.join(__dirname, '../icons/png/64x64.png'),
    show: false
  })

  // Load main.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../../main.html'),
    protocol: 'file',
    slashes: true
  }))

  // Show window when ready.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Auto-open the DevTools (for debugging.)
  //  mainWindow.webContents.openDevTools()
}
