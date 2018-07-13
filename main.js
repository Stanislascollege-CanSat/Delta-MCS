// Require modules
	// Require Electron
	const electron = require('electron')
	const {app, BrowserWindow} = electron

	const path = require('path')
	const url = require('url')

// Keep global reference of window object.
let mainWindow

function createWindow () {
    // Create the window.
    mainWindow = new BrowserWindow({
    	width: 800,
    	height: 600,
    	center: true,
        frame: false,
    	resizeable: true,
    	movable: true,
    	icon: path.join(__dirname + ''),
    	show: false
    })

    // load window html file.
    mainWindow.loadURL(url.format({
    	pathname: path.join(__dirname, 'main.html'),
    	protocol: 'file',
    	slashes: true
    }))

    // Show window when ready.
    mainWindow.once('ready-to-show', () => {
    	mainWindow.show()

    	// Log important application information
    	console.log('Delta ' + app.getVersion() + ' initialized!')
    	console.log('- Node: ' + process.versions.node)
    	console.log('- Electron: ' + process.versions.electron)
    	console.log('- Chromium: ' + process.versions.chrome)
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      mainWindow = null
    })
}

// Create window when electron is ready.
app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

// Create window when no windows are present an program is activated with the dock.
app.on('activate', () => {
	if (mainWindow === null) {
      createWindow()
    }
})