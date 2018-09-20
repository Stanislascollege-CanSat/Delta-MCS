// Menu module.

// Require electron
const electron = require('electron')
const {app,Menu} = require('electron')

module.exports = {
  append: function() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.template))
  },
  template: [
    {
      label: 'CanSat Delta',
      subMenu: [
        {role: 'about'},
        {label: 'Version '+app.getVersion(),enabled: false},
        {type: 'separator'},
        {role: 'quit'}
      ]
    }
  ]
}
