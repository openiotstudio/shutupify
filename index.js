// GPIO Stuff
const inputPin = 8; 
const gpioPin = 14; 
var gpio = require('pi-gpio');

var oldVal = 'nothing';

gpio.open(inputPin, 'input', function(i, err) {
  err && console.log('error opening port', err);
  (function doRead() {
    gpio.read(inputPin, (err, val) => {
      err && console.log('got error reading', err);
      console.log(inputPin, val);
      doRead();
    });
  })();
});

/*
gpio.open(gpioPin, 'input', function(i, err) {
  err && console.log('error opening port', err);
  (function doRead() {
    gpio.read(gpioPin, (err, val) => {
      err && console.log('got error reading', err);
      console.log(gpioPin, val);
      doRead();
    });
  })();
});
*/
