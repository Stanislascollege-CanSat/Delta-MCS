/* clock */
const clock = {
  start () {
    // Get Date class to get time from.
    let date = new Date()
    let now = {
      h: date.getHours(),
      m: addZero(date.getHours()),
      s: addZero(date.getSeconds())
    }

    // Place time in element.
    document.getElementById('clockLocalInner').innerHTML = `${now.h}:${now.m}:${now.s}`

    // Run function every second.
    setTimeout(clock.start, 1000)

  }
}

function addZero (i) {
  if (i < 10) i = '0' + i
  return i
}

module.exports = clock;
