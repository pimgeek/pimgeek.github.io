var inputPort = document.querySelector('#input');
var outputPort = document.querySelector('#output');
var inputStream = Rx.Observable.fromEvent(inputPort, 'input');

var readInputStream = inputStream.startWith('start input')
    .map(function() {
        return inputPort.value;
    });
var outputStream = readInputStream;
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
