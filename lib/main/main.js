// Main process.

// Require modules
const electron = require('electron')
  const {app,BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

// Keep global reference of mainWindow object.
let mainWindow

// Create window when electron is ready.
app.on('ready', () => {
  createWindow()
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
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#fff'
  })

  // Load main.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../../main.html'),
    protocol: 'file',
    slashes: true
  }))

}
