function drawGraph() {
  FusionCharts.ready(function() {
    var d = new Date();
    var startTime = d/1000

    let chart = new FusionCharts({
      type: "realtimeline",
      id: "signalStrengthChart",
      renderAt: "signalStrengthGraph",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
          chart: {
            caption: "Wifi Signal Strength",
            refreshinterval: 5,
            numdisplaysets: "10",
            showRealTimeValue: "0",
            theme: "fusion",
            plotToolText: "$label<br>Strength: <b>$signalStrength</b>",
            setAdaptiveYMin: "1"
          },
          categories: [
            {
                category: [
                  {
                      label:
                        d.getHours() +
                        ":" +
                        d.getMinutes() +
                        ":" +
                        (d.getSeconds() - 2)
                  },
                  {
                      label:
                        d.getHours() +
                        ":" +
                        d.getMinutes() +
                        ":" +
                        (d.getSeconds() - 1)
                  },
                  {
                      label:
                        d.getHours() +
                        ":" +
                        d.getMinutes() +
                        ":" +
                        d.getSeconds()
                  }
                ]
            }
          ],
          dataset: [
            {
                data: []
            }
          ]
      },
      events: {
          initialized: function(evt, arg) {
            var chartRef = FusionCharts("signalStrengthChart");
            function updateData() {
              chartRef = FusionCharts("signalStrengthChart");
              var elapsedTime = (new Date / 1000) - startTime,
                val = signalStrength,
                strData = "&label=" + elapsedTime + "&value=" + val;

              // Feed it to chart.
              console.log(chartRef)
              console.log(elapsedTime)
              chartRef.feedData(strData);
            }

            chartRef.intervalUpdateId = setInterval(updateData, 1000);
          },

          disposed: function(evt, args) {
            clearInterval(evt.sender.intervalUpdateId);
          }
      }
    })

    chart.render()
  });
}