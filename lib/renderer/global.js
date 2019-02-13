// Renderer process.
const url = require('url')
const path = require('path')
const electron = require('electron')
const { ipcRenderer } = require('electron')
const tippy = require('tippy.js')
const clock = require('./lib/renderer/clock.js')
const serialcom = require('./lib/modules/serialcom.js')

// Shorthand functions.
function $ (id) {
  return document.getElementById(id)
}

// Display clock in topbar.
clock.start()

// Tippy tooltips.
tippy('[title]', {
  appendTo: document.querySelector('.tooltips'),
  duration: 0,
  arrow: true,
  arrowType: 'round'
})
