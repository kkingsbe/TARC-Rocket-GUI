var {ipcRenderer} = require("electron")

function graphWifiStrength()
{
  let startTime = (new Date()) / 1000
  let xAxisRange = 60
  let tickInterval = 1
  var data = []

  function getNewData()
  {
    /*
    for(var i = 0; i < data.length - xAxisRange; i++)
    {
      data.splice(i, 1)
    }
    */
    data.push({
      x: Math.floor((new Date() / 1000) - startTime),
      y: signalStrength
    })
    console.log(signalStrength)
  }

  getNewData()
  console.log(data)

  let options = {
    chart: {
      height: "500px",
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000
        },
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent']
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    series: [{
      name: "Signal Strength",
      data: data
    }],
    markers: {
      size: 0
    },
    xaxis: {
      range: xAxisRange,
      tickAmount: 10,
      title: {
        text: "Elapsed Time (seconds)",
        style: {
          fontSize: '17px',
          fontFamily: "Roboto, sans-serif"
        }
      }
    },
    yaxis: {
      max: -30,
      min: -90,
      title: {
        text: "Strength (dBm)",
        style: {
          fontSize: '17px',
          fontFamily: "Roboto, sans-serif"
        }
      }
    },
    legend: {
      show: true
    },
  } 

  var chart = new ApexCharts(
    document.querySelector("#signalStrengthGraph"),
    options
  );

  chart.render()

  console.log(chart)

  window.setInterval(function() {
    getNewData()
    chart.updateSeries([{
      data: data
    }])
  }, 1000)
}

async function graphAltitude(content)
{
  let data = []

  for(row of content)
  {
    let y = Number(row.split(" ")[0])
    let x = Number(row.split(" ")[1])
    data.push({
      x: x,
      y: y
    })
  }

  let options = {
    height: "100%",
    chart: {
      type: "area",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "Altitude",
      data: data
    }],
    xaxis: {
      interval: 1
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#altitudeGraph"),
    options
  )

  chart.render()
}

async function graphVelocity(content)
{
  let data = []

  for(row of content)
  {
    let y = Number(row.split(" ")[0])
    let x = Number(row.split(" ")[1])
    data.push({
      x: x,
      y: y
    })
  }

  let options = {
    height: "100%",
    chart: {
      type: "area",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "Velocity",
      data: data
    }],
    xaxis: {
      interval: 1
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#velocityGraph"),
    options
  )

  chart.render()
}

async function graphAcceleration(content)
{
  let data = []

  for(row of content)
  {
    let y = Number(row.split(" ")[0])
    let x = Number(row.split(" ")[1])
    data.push({
      x: x,
      y: y
    })
  }

  let options = {
    height: "100%",
    chart: {
      type: "area",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "Acceleration",
      data: data
    }],
    xaxis: {
      interval: 1,
      title: {
        text: "Acceleration (m/s^2)"
      },
      labels: {
        hideOverlappingLabels: true,
        trim: true
      }
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#accelerationGraph"),
    options
  )

  chart.render()
}
async function graphDrag(content)
{
  let data = []

  for(row of content)
  {
    let y = Number(row.split(" ")[0])
    let x = Number(row.split(" ")[1])
    data.push({
      x: x,
      y: y
    })
  }

  let options = {
    height: "100%",
    chart: {
      type: "area",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "Drag",
      data: data
    }],
    xaxis: {
      interval: 1,
      title: {
        text: "Force (Newtons)"
      },
      labels: {
        hideOverlappingLabels: true,
        trim: true
      }
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#dragGraph"),
    options
  )

  chart.render()
}