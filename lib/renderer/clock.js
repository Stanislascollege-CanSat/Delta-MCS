/* Local clock */
function clock (element) {
  let container = element
  // Get Date class to get time from.
  let date = new Date()
  let now = {
    h: date.getHours(),
    m: addZero(date.getHours()),
    s: addZero(date.getSeconds())
  }
  // Run function every 1 second.
  setTimeout(container => {
    console.log(container)
    clock(container)
  }, 1000)
  // Place time in element.
  document.getElementById(element).innerHTML = `${now.h}:${now.m}:${now.s}`
}

function addZero (i) {
  if (i < 10) i = '0' + i
  return i
}

module.exports = clock;
