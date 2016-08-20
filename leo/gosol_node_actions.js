//@+leo-ver=5-thin
//@+node:pimgeek.20160818021927.1: * @file gosol_node_actions.js
function doDisplay(e) {
  var obj = document.getElementById(e);
  obj.style.opacity = 1;
  obj.style.zIndex = 99;
  return 0;
}

function undoDisplay(e) {
  var obj = document.getElementById(e);
  obj.style.opacity = 0;
  obj.style.zIndex = -99;
  return 0;
}

function getDisplayStatus(e) {
  var obj = document.getElementById(e);
  if (obj.style.opacity != 1) {
    return false
  } else {
    return true
  }
}

function switchDisplay(e) {
  var obj = document.getElementById(e);
  var res = getDisplayStatus(e);
  if (res) {
    undoDisplay(e);
  } else {
    doDisplay(e);
  }
  return 0;
}

var gvParser = new DOMParser();
var worker;
var gvResult;

function updateGraph() {
  if (worker) {
    worker.terminate();
  }

  document.querySelector("#output").classList.add("working");
  document.querySelector("#output").classList.remove("debugInfo");

  worker = new Worker("worker.js");

  worker.onmessage = function(e) {
    document.querySelector("#output").classList.remove("working");
    document.querySelector("#output").classList.remove("debugInfo");

    gvResult = e.data;

    updateOutput();
  }

  worker.onerror = function(e) {
    document.querySelector("#output").classList.remove("working");
    document.querySelector("#output").classList.add("debugInfo");

    var message = e.message === undefined ? "在生成思维引导图的过程中发生了错误。" : e.message;

    var debugInfo = document.querySelector("#debugInfo");
    while (debugInfo.firstChild) {
      debugInfo.removeChild(debugInfo.firstChild);
    }

    document.querySelector("#debugInfo").appendChild(document.createTextNode(message));

    console.error(e);
    e.preventDefault();
  }

  var params = {
    src: document.getElementById("dot_code").innerHTML,
    options: {
      engine: "dot",
      format: "svg"
    }
  };

  // Instead of asking for png-image-element directly, which we can't do in a worker,
  // ask for SVG and convert when updating the output.

  if (params.options.format == "png-image-element") {
    params.options.format = "svg";
  }

  worker.postMessage(params);
}

function updateOutput() {
  var graph = document.querySelector("#output");

  var svg = graph.querySelector("svg");

  if (svg) {
    graph.removeChild(svg);
  }

  if (!gvResult) {
    return;
  }

  var svg = gvParser.parseFromString(gvResult, "image/svg+xml");
  graph.appendChild(svg.documentElement);
}
//@-leo
