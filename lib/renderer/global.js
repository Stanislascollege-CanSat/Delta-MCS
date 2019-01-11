// Renderer process.
const electron = require('electron')
const { ipcRenderer } = require('electron')
const tippy = require('tippy.js')
const clock = require('./lib/Renderer/clock.js')

// Shorthand functions.
function $ (id) {
  return document.getElementById(id)
}

// Display clock in topbar.
clock.add('clockLocal')

// Tippy tooltips.
tippy('[title]', {
  appendTo: document.querySelector('.tooltips'),
  duration: 0,
  arrow: true,
  arrowType: 'round'
})
