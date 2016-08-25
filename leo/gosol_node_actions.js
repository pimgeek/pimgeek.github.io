//@+leo-ver=5-thin
//@+node:pimgeek.20160818021927.1: * @file gosol_node_actions.js
// common functions

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
//@-leo
