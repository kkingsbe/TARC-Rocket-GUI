var {ipcRenderer} = require("electron")
var networks, selectedNetwork, signalStrength

//getNetworks()
//graphWifiStrength()

$(".connect-btn").click(() => {
  $(".modal").css("display", "flex")
  getNetworks()
})

$(".network-select").click((e) => {
  selectedNetwork = $(e.target)[0].innerHTML
  $("#connectivityLabel").html(selectedNetwork)
  $(".modal").css("display", "none")
  connectToNetwork()
})

function getNetworks()
{
  ipcRenderer.send("asynchronous-message", {
    command: "getNetworks"
  })
}

function populateNetworks()
{
  $(".network-select").empty()
  for(i in networks)
  {
    let network = networks[i]
    networks.push(network)
    let row = `<div class='network-select-row'>${network.ssid}</div>`
    $(".network-select").append(row)
  }
}

function connectToNetwork()
{
  ipcRenderer.send("asynchronous-message", {
    command: "connectToNetwork",
    ssid: selectedNetwork
  })
}

function updateStrengthDisplay(strength)
{
  signalStrength = strength
  if(strength >= -60) {
    console.log("Strong")
    $(".bar1").css("border-top", "5px solid #1de71d")
    $(".bar2").css("border-top", "5px solid #1de71d")
    $(".bar3").css("background", "#1de71d")
  } else if(strength <= -60 && strength > -70) {
    console.log("Fair")
    $(".bar1").css("border-top", "none")
    $(".bar2").css("border-top", "5px solid #1de71d")
    $(".bar3").css("background", "#1de71d")
  } else if(strength <= -70) {
    console.log("Weak")
    $(".bar1").css("border-top", "none")
    $(".bar2").css("border-top", "none")
    $(".bar3").css("background", "#1de71d")
  }
}

ipcRenderer.on("asynchronous-message", (event, arg) => {
  switch(arg.title)
  {
    case "getNetworks-Response":
      networks = arg.networks
      populateNetworks()
      break
    case "connectToNetwork-Success":
      break
    case "signalStrength":
      if(arg.connected) updateStrengthDisplay(arg.strength)
      else 
      {
        $(".bar1").css("border-top", "5px solid #ff0000")
        $(".bar2").css("border-top", "5px solid #ff0000")
        $(".bar3").css("background", "#ff0000")
      }
      break
    case "fileData":
      if(arg.url == "Sample Data/altitude.csv")
      {
        graphAltitude(arg.data)
      }
      else if(arg.url == "Sample Data/velocity.csv")
      {
        graphVelocity(arg.data)
      }
      else if(arg.url == "Sample Data/acceleration.csv")
      {
        graphAcceleration(arg.data)
      }
  }
});

ipcRenderer.send("asynchronous-message", {
  command: "readFile",
  url: "Sample Data/altitude.csv"
})
ipcRenderer.send("asynchronous-message", {
  command: "readFile",
  url: "Sample Data/velocity.csv"
})
ipcRenderer.send("asynchronous-message", {
  command: "readFile",
  url: "Sample Data/acceleration.csv"
})