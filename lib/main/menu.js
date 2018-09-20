// Menu module.

// Require electron
const electron = require('electron')
const {app,Menu} = require('electron')

module.exports = {
  template: [
    {
      label: app.getName(),
      subMenu: [
        {role: 'about'},
        {label: 'Version '+app.getVersion(),enabled: false},
        {type: 'separator'},
        {role: 'quit'}
      ]
    },
    {
      label: 'Hardware',
      subMenu: [
        {label: 'Serial settings go here.', enabled: false}
      ]
    }
  ],
  append: function() {
    const template = [
      {
        label: app.getName(),
        subMenu: [
          {role: 'about'},
          {label: 'Version '+app.getVersion(),enabled: false},
          {type: 'separator'},
          {role: 'quit'}
        ]
      },
      {
        label: 'Hardware',
        subMenu: [
          {label: 'Serial settings go here.', enabled: false}
        ]
      }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
}
