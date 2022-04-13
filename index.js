var player = require('play-sound')(opts = {})
var tone = require('tonegenerator');
var header = require('waveheader');
var fs = require('fs');

var file = fs.createWriteStream('foo.wav')
var samples = tone({ freq: 000, lengthInSecs: 2, volume: tone.MAX_16 })

file.write(header(samples.length * 2, {
  bitDepth: 16
}))

var data = Int16Array.from(samples)

var size = data.length * 2 // 2 bytes per sample
if (Buffer.allocUnsafe) { // Node 5+
  buffer = Buffer.allocUnsafe(size)
} else {
  buffer = new Buffer(size)
}

data.forEach(function (value, index) {
  buffer.writeInt16LE(value, index * 2)
})

file.write(buffer)
file.end()

// $ mplayer foo.mp3 
player.play('foo.wav', function(err){
  if (err) throw err
})