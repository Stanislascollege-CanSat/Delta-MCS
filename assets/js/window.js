// Handles window events

// WindowCaption button events.
	// Close window
	ById('windowClose').addEventListener('click', () => { 
		mainWindow.close()
	})
	// Minimize window
	ById('windowMinimize').addEventListener('click', () => {
		mainWindow.minimize()
	})
	// Maximize window
	ById('windowMaximize').addEventListener('click', () => {
		if (!mainWindow.isMaximized()) {
			mainWindow.maximize()
		} else {
			mainWindow.unmaximize()
		}
	})