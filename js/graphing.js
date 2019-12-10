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
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000
        },
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
      labels: {
        show: false
      }
    },
    theme: {
      mode: "dark",
      palette: "palette1"
    },
    yaxis: {
      max: -30,
      min: -90,
      style: {
        color: "#ffffff"
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