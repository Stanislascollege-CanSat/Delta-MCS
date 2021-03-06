// Menu module.

// Require electron
const { app, Menu } = require('electron')

module.exports = {
  template: [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { label: 'Version ' + app.getVersion(), enabled: false },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'Hardware',
      submenu: [
        { label: 'Reset Deploy', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('cpr') } },
        { type: 'separator' },
        //{ label: 'Remove Hull', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('rer') } },
        //{ label: 'Stop Hull', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('str') } },
        { label: 'Serial settings go here', enabled: false },
        { type: 'separator' },
        { role: 'toggleDevTools' },
        { role: 'reload' }
      ]
    },
    {
      label: 'Console',
      submenu: [
        { label: 'Clear', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('console-clear') } }
      ]
    },
    {
      label: 'Telemetry',
      submenu: [
        { label: 'Download Data [DON\'T PRESS]', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('sad') } },
        { type: 'separator' },
        { label: 'Save As...', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('data-save') } },
        { type: 'separator' },
        { label: 'Set T0', click () { require('electron').BrowserWindow.getFocusedWindow().webContents.send('st0') } },
      ]
    }
  ],
  append: function () {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.template))
  }
}
