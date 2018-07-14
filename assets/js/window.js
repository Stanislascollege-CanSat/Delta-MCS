// Handles window events

// WindowCaption button events.
	// Close window
	byId('windowClose').addEventListener('click', () => { 
		mainWindow.close()
	})
	// Minimize window
	byId('windowMinimize').addEventListener('click', () => {
		mainWindow.minimize()
	})
	// Maximize window
	byId('windowMaximize').addEventListener('click', () => {
		if (!mainWindow.isMaximized()) {
			mainWindow.maximize()
		} else {
			mainWindow.unmaximize()
		}
	})