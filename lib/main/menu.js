// Menu module.

// Require electron
const electron = require('electron')
const {app,Menu} = require('electron')

module.exports = {
  template: [
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
      label: 'Edit',
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
      label: 'Hardware',
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
  ],
  append: function() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.template))
  }
}
