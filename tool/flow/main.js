var inputPort = document.querySelector('#input');
var outputPort = document.querySelector('#output');
var inputStream = Rx.Observable.fromEvent(inputPort, 'input');

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