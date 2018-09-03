/* Local clock */

localClock()

function localClock() {
  let container = document.querySelector('#clockLocal')
  let date = new Date()
  let m = date.getMinutes()
  let s = date.getSeconds();
  m = addZero(m)
  s = addZero(s)
  let timer = setTimeout(localClock, 500);

  container.innerHTML = '<span class="bold clockSpan">Local</span> ' + date.getHours() + ':' + m + ':' + s

  function addZero(variable) {
    if (variable < 10) variable = '0' + variable
    return variable
  }
}
