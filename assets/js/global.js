// Handles global JS functions and requires global modules.
const remote = require('electron').remote
const mainWindow = remote.getCurrentWindow()

// Shorthand getElementById function.
const byId = function(id) {
	return document.getElementById(id)
}
// Shorthand add click event function.
// const Click = function(callback) {
// 	return addEventListener('click', callback)
// }