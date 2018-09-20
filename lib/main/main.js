// Main process.

// Require modules
const electron = require('electron')
const {app,BrowserWindow,Menu} = require('electron')
const url = require('url')
const path = require('path')

// Require internal modules
//const menu = require('./menu.js')

// Keep global reference of mainWindow object.
let mainWindow

// Chrome by default black lists certain GPUs because of bugs.
// if your are not able to view webgl try enabling --ignore-gpu-blacklist option
// But, this will make electron/chromium less stable.
app.commandLine.appendSwitch('--ignore-gpu-blacklist');

// Create window when electron is ready.
app.on('ready', () => {
  createMenu()

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
    width: 1000,
    minWidth: 730,
    height: 800,
    minHeight: 250,
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#fafafa',
    icon: path.join(__dirname,'../icons/png/64x64.png'),
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

// Menu function.
function createMenu() {
    const template = [
      {
        label: app.getName(),
        submenu: [
          {role: 'about'},
          {label: 'Version '+app.getVersion(),enabled: false},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'}
        ]
      },
      {
        label: "Edit",
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteAndMatchStyle'},
          {role: 'delete'},
          {role: 'selectAll'}
        ]
      },
      {
        label: "Hardware",
        submenu: [
          {label: 'Serial settings go here',enabled: false},
          {role: 'toggleDevTools'}
        ]
      },
      {
        label: 'Console',
        submenu: [
          {label: 'Clear'}
        ]
      }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
