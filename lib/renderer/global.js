// Renderer process.
const electron = require('electron')
const tippy = require('tippy.js')

// Shorthand functions.
function $(id) {
  return document.getElementById(id)
}

// Tippy tooltips.
tippy('#comIcon',{size:'small'})
tippy('#comButton',{size:'small'})
tippy('#comStatusItem',{size:'small'})
