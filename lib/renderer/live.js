const Chart = require('chart.js')
const moment = require('moment')

const live = {
  setT0: (timestamp) => {
    live.T0 = timestamp
    live.display = true
    missionConsole.log('[LIVE] Set T0')
  },
  T0: undefined,
  display: false,
  updateChart: (name, value, time) => {
    if (!live.display)  return
    //let newEntry = {
    //  x: Number(time - live.T0),
    //  y:  Number(value)
    //}
    let newEntry = [Number(value), time - live.T0]
    live[`chart_${name}`].data.datasets.push(newEntry)
  },
  reset: () => {
    live.T0 = undefined
    live.display = false
  },
  chart_Hgt: new Chart($('chart-Hgt'), {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        label: 'Height - Time',
        xAxisID: 'Time (s)',
        YAxisID: 'Height (m)',
      }]
    },
    // options: options
  })
}
let chart_pressure = new Chart($('chart-pressure'), {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
})
