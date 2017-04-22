//@+leo-ver=5-thin
//@+node:pimgeek.20160826003911.1: * @file dagre_utils.js
// Input related code goes here

var inputGraph = document.querySelector("#dot_code");

function editGraph(src) {
  inputGraph.value = src;
  inputGraph.innerHTML = src;
  return 0;
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Set up zoom support
var svg = d3.select("svg"),
  inner = d3.select("svg g");
  zoom = d3.behavior.zoom().on("zoom", function() {
    inner.attr("transform", "translate(" + d3.event.translate + ")" +
      "scale(" + d3.event.scale + ")");
  });

svg.call(zoom);

// Create and configure the renderer
var render = dagreD3.render();

function tryDraw() {
  var g;
  inputGraph.setAttribute("class", "");
  try {
    g = graphlibDot.read(decodeHtml(inputGraph.value));
  } catch (e) {
    inputGraph.setAttribute("class", "error");
    throw e;
  }

  // Set margins, if not present
  if (!g.graph().hasOwnProperty("marginx") &&
    !g.graph().hasOwnProperty("marginy")) {
    g.graph().marginx = 20;
    g.graph().marginy = 20;
  }

  g.graph().transition = function(selection) {
    return selection.transition().duration(500);
  };

  // Render the graph into svg g
  d3.select("svg g")
    .call(render, g);
}
//@-leo
