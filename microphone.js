var threshold = 11000;

var fs = require('fs');
var process = require('child_process');
var Microphone = require('mic');
// var Player = require('player');
var player = require('play-sound')();

function getMicrophone() {
  return Microphone({
    'rate': '16000',
    'channels': '1',
    // 'debug': true,
    // 'exitOnSilence': 6
  });
}

function runColor(file, cb) {
  process.exec('sudo python ./rpi_ws281x/python/shutup/' + file, cb);
}

var mic = getMicrophone();
var stream = mic.getAudioStream();
// var sound = new Player('./example.mp3');
var sound = fs.readFileSync('./example.mp3');

var pause = false;
runColor('white.py', function() {

stream.on('data', function (data) {
  if (pause) {
    return;
  }
  var max = 0;
  for (var i=0; i<data.length; i += 2) {
    var cur = data.readInt16LE(i);
    if (cur > max) {
      max = cur;
    }
  }
  
  if (max > threshold && max !== 32000) {
    console.log('beeeeeeep', max);
    pause = true;
    runColor('red.py');
    player.play('./example.mp3', function() {
      console.log('beep end');
      runColor('white.py');
      pause = false;
    });
  }
});
stream.on('error', function(e) {
  console.log('error: ' + e);
});

console.log('starting mic');
mic.start();

});
