/* Local clock */

localClock()

function localClock () {
  let container = document.querySelector('#clockLocal')
  let date = new Date()
  let m = date.getMinutes()
  let s = date.getSeconds()
  m = addZero(m)
  s = addZero(s)
  setTimeout(localClock, 500)

  container.innerHTML = '<span class="bold clockSpan">Local</span> ' + date.getHours() + ':' + m + ':' + s

  function addZero (i) {
    if (i < 10) i = '0' + i
    return i
  }
}
