/*
  Store an array of amplitude values and draw them over time.

  Inspired by http://tybenz.com/visualizr.

  getLevel() from the p5.Amplitude object and map it to the ellipse position.

  Press "T" to toggle between a sound file and audio input (mic).
 */

var mic, drum1, drum2, piano1, piano2;
var amplitude;
var prevLevels = new Array(60);

function setup() {
  c = createCanvas(windowWidth, 200);

  rectMode(CENTER);
  // colorMode(HSB);
  background(0);
  noStroke(0);

  mic = new p5.AudioIn();

  // load the sound, but don't play it yet
  drum1 = loadSound('../music/drum1.wav');
  drum2 = loadSound('../music/drum2.wav');

  piano1 = loadSound('../music/melody1.wav');
  piano2 = loadSound('../music/melody2.wav');

  amplitude = new p5.Amplitude();

  amplitude.smooth(0.6);
}

function draw() {
  background(236, 227, 210);

  var level = amplitude.getLevel();

  // rectangle variables
  var spacing = 10;
  var w = width / (prevLevels.length * spacing);

  var minHeight = 2;
  var roundness = 20;

  // add new level to end of array
  prevLevels.push(level);

  // remove first item in array
  prevLevels.splice(0, 1);

  // loop through all the previous levels
  for (var i = 0; i < prevLevels.length; i++) {
    var x = map(i, prevLevels.length, 0, width / 2, width);
    var h = map(prevLevels[i], 0, 0.5, minHeight, height);

    var alphaValue = logMap(i, 0, prevLevels.length, 1, 250);

    var hueValue = map(h, minHeight, height, 200, 255);

    fill('#241E3F');

    rect(x, height / 2, w, h);
    rect(width - x, height / 2, w, h);
  }
}
