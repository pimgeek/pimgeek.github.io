var inputPort = document.querySelector('#input');
var outputPort = document.querySelector('#output');
var inputStream = Rx.Observable.fromEvent(inputPort, 'input');

function partialOrder2DotEdge(str) {
  var patt = /([^->\|\n ]+)\|->\|([^->\|\n ]+)[^\n]*/g;
  var result = patt.exec(str);
  if (result === null) {
    return '"' + str + '"';
  } else {
    return '"' + result[1] + '" -> "' + result[2] + '"';
  }
}

function dotGraphGen(partialOrders) {
  partialOrdersArray = partialOrders.split('\n');
  var dotEdges = '';
  for (partialOrder of partialOrdersArray) {
    dotEdges += '  ' + partialOrder2DotEdge(partialOrder.trim()) + '\n';
  }
  return '' +
    'digraph {\n' +
    '  graph [fontname="simhei" splines="polyline"]\n' +
    '  edge  [fontname="simhei"]\n' +
    '  node  [fontname="simhei" shape="box" width="1.68" height="0.1"]\n' +
    '  // 以下为节点和有向边定义\n' +
    dotEdges +
    '}\n';
}

function duplicate(val) {
  return val;
}

function x2(num) {
  return num * 2;
}

function loadProcessor(processor) {
  var readInputStream = inputStream.startWith('1')
    .map(function() {
      return inputPort.value;
    });
  var outputStream = readInputStream
    .map(processor);
  var subscription = outputStream.subscribe(
    function(val) {
      outputPort.value = val;
    },
    function(err) {
      console.log('出错啦: ' + err);
    },
    function() {
      console.log('完成啦。');
    });
}