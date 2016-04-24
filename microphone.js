var threshold = 6000;

var Microphone = require('mic');

function getMicrophone() {
  return Microphone({
    'rate': '16000',
    'channels': '1',
    //'debug': true,
    'exitOnSilence': 6
  });
}

var mic = getMicrophone();
var stream = mic.getAudioStream();

stream.on('data', function (data) {
  var max = 0;
  for (var i=0; i<data.length; i += 2) {
    var cur = data.readInt16LE(i);
    if (cur > max) {
      max = cur;
    }
  }
  
  if (max > threshold) {
    console.log('beeeeeeep');
  }
});
stream.on('error', function(e) {
  console.log('error: ' + e);
});

console.log('starting mic');
mic.start();
