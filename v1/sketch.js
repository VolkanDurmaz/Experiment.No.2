var fft;
var sound;

function preload(){
  sound = loadSound('object.mp3');
  
}

function setup(){
  let cnv = createCanvas(window.innerWidth,window.innerHeight);
  angleMode(DEGREES)
  rectMode(CENTER)
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
}


function draw(){
  background(0);

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);
  for (let i = 0; i < width; i++){
    let x = map(waveform[i], -1, 1, 0, width);
    let y = map(i, 0, waveform.length, 0, height+100);
    point(x,y);
  }
  
  endShape();

  // text('tap to play', windowWidth / 2 , 20);
}


function togglePlay() {
  if (sound.isPlaying()) {
    document.getElementById('audio').innerText = "Play";
    sound.pause();
  } else {
    document.getElementById('audio').innerText = "Pause";
    sound.loop();
  }
}

function toggleStop(){
  if(sound.isPlaying()){
    document.getElementById('audiostop').innerText = "Stop";
    document.getElementById('audio').innerText = "Play";
    sound.stop();
  }
}