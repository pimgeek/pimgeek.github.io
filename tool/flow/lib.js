function duplicate(val) {
  return val;
}

function x2(num) {
  return num * 2;
}

function partialOrder2DotEdge(str) {
  var patt = /([^->\|\n ]+)\|->\|([^->\|\n ]+)[^\n]*/g;
  var result = patt.exec(str);
  if (result === null) {
    return '"' + str + '"';
  } else {
    return '"' + result[1] + '" -> "' + result[2] + '"';
  }
}

function dotEdge2PartialOrder(str) {
  var patt = /"([^\"]+)" -> "([^\"]+)";*/g;
  var result = patt.exec(str);
  if (result === null) {
    return str;
  } else {
    return result[1] + '|->|' + result[2];
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

function partialOrderGen(dotEdges) {
  dotEdgesArray = dotEdges.split('\n');
  var partialOrders = '';
  for (dotEdge of dotEdgesArray) {
    partialOrders += dotEdge2PartialOrder(dotEdge.trim()) + '\n';
  }
  return partialOrders;
}

function dotCodeTidy(dotCodeLines) {
  var patt = /(["%]*[0-9]+"*) ([^;]*)label=([^,]+),([^;]+);/mg;
  var nodeArray = [];
  var result = patt.exec(dotCodeLines);
  while (result != null) {
    var tmpDict = {};
    tmpDict['id'] = result[1];
    tmpDict['label'] = result[3];
    nodeArray.push(tmpDict);
    result = patt.exec(dotCodeLines);
  }
  patt = /"(%[0-9]+)"([^;]+)label=([^,]+),\n\t\t([^;]+);/m;
  result = patt.exec(dotCodeLines);
  while (result != null) {
    var tmpStr = dotCodeLines.replace(patt, 
      '"' + result[1] + 
      '" [' +
      result[4]
      );
    dotCodeLines = tmpStr;
    result = patt.exec(dotCodeLines);
  }
  for (node of nodeArray) {
    var patt = new RegExp(node['id'], 'g');
    var tmpStr = dotCodeLines.replace(patt, node['label']);
    dotCodeLines = tmpStr;
  }
  return dotCodeLines;
}

