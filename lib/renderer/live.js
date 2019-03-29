const Chart = require('chart.js')
//const moment = require('moment')
//const Stream = require('chartjs-plugin-streaming')

const live = {
  setT0: (timestamp) => {
    live.T0 = timestamp
    live.display = true
    missionConsole.log('[LIVE] Set T0')
  },
  T0: undefined,
  display: false,
  updateChart: (chart, value, time) => {
    // Add data if live.display is true.
    if (!live.display) return
    // Add new data to chart.
    live[`chart_${chart}`].data.datasets[0].data.push({
      x: (time - live.T0)/1000,
      y: value
    })

    // update chart datasets keeping the current animation
    live[`chart_${chart}`].update({
      preservation: true
    })
  },
  reset: () => {
    live.T0 = undefined
    live.display = false
  },
  chart_AP: new Chart($('chart-AP'), {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontSize: 14
          },
          gridLines: {
            color: 'rgba(50,50,50,0.1)'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Pressure (Pa)',
            fontSize: 14
          },
          gridLines: {
            color: 'rgba(50,50,50,0.1)'
          }
        }]
      },
      legend: {
        display: false
      },
      animation: {
        duration: 0
      }
    }
  }),
  chart_AT: new Chart($('chart-AT'), {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontSize: 14
          },
          grindLines: {
            color: 'rgba(50,50,50,0.5)'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Air temperature (ºC)',
            fontSize: 14
          },
          gridLines: {
            color: 'rgba(50,50,50,0.1)'
          }
        }]
      },
      legend: {
        display: false,
        labels: {
          defaultFontFamily: 'Lato'
        }
      },
      plugins: {
        streaming: {
          frameRate: 30
        }
      },
      animation: {
        duration: 0
      }
    }
  }),
  chart_AL: new Chart($('chart-AL'), {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontSize: 14
          },
          grindLines: {
            color: 'rgba(50,50,50,0.5)'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Height (m)',
            fontSize: 14,
            ticks: {
              stepSize: 0.1
            }
          },
          gridLines: {
            color: 'rgba(50,50,50,0.1)'
          }
        }]
      },
      legend: {
        display: false,
        labels: {
          defaultFontFamily: 'Lato'
        }
      },
      plugins: {
        streaming: {
          frameRate: 30
        }
      },
      animation: {
        duration: 0
      }
    }
  }),
  chart_HM: new Chart($('chart-HM'), {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontSize: 14
          },
          grindLines: {
            color: 'rgba(50,50,50,0.5)'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Relative humidity (%)',
            fontSize: 14,
            type: 'linear',
            ticks: {
              stepSize: 0.1,
              suggestedMax: 100,
              min: 0,
            }
          },
          gridLines: {
            color: 'rgba(50,50,50,0.1)'
          }
        }]
      },
      legend: {
        display: false,
        labels: {
          defaultFontFamily: 'Lato'
        }
      },
      plugins: {
        streaming: {
          frameRate: 30
        }
      },
      animation: {
        duration: 0
      }
    }
  })
}

ipcRenderer.on('st0', () => live.setT0(Date.now()))
