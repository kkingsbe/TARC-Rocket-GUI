function graphWifiStrength()
{
  let startTime = (new Date()) / 1000
  let xAxisRange = 60
  let tickInterval = 1
  var data = []

  function getNewData()
  {
    /*
    for(var i = 0; i < data.length - 10; i++)
    {
      data[i].x = ((new Date()) / 1000) - xAxisRange - tickInterval
      data[i].y = 0
    }
    */
    data.push({
      x: new Date() / 1000,
      y: Math.floor(Math.random() * 100)
    })
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
      name: "test",
      data: data
    }],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      range: xAxisRange //Possibly modify this
    },
    yaxis: {
      max: 100 //Change this for sure
    },
    legend: {
      show: false
    },
  } 

  var chart = new ApexCharts(
    document.querySelector("#signalStrengthGraph"),
    options
  );

  chart.render()

  window.setInterval(function() {
    getNewData()
    chart.updateSeries([{
      data: data
    }])
  }, 1000)
}