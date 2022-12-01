function preload(){
  sound = loadSound('object.mp3');
  fr = 60;
  
}

function setup(){
  let cnv = createCanvas(window.innerWidth,window.innerHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
  a = 360 / ((sound.duration()) * fr);
  b = a;
  frameRate(fr);
  
}



function draw(){
  background(0);
 

  // let spectrum = fft.analyze();
  // noStroke();
  // fill(255, 0, 255);
  // for (let i = 0; i< spectrum.length; i++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

  // noFill();
  // var spectrumA = fft.analyze();
  // var spectrumB = spectrumA.reverse();

  // push();
  // translate(width / 2, height / 2);
  // fill('#FF1111');
  // rect(0,0,40,40);
  // rotate(radians(a))
  // for(let i =0; i < spectrumB.lenght; i++){
  //   strokeWeight(0.08 * spectrumB[i]);
  //   strokeWeight(255,255,255, spectrumB[i] / 60)
  //   line(0, i/5, 0, i/5)

  // }

  // pop();

  

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);
  for (let i = 0; i < width; i++){
    let x = map(waveform[i], -1, 1, 0, width);
    let y = map(i, 0, waveform.length, 0, height); 
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