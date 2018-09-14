// Renderer process.
const electron = require('electron')
const tippy = require('tippy.js')

// Shorthand functions.
function $(id) {
  return document.getElementById(id)
}

// Tippy tooltips.
tippy('[title]', {
  appendTo: document.querySelector('.tooltips'),
  duration: 0,
  arrow: true,
  arrowType: 'round'
})
