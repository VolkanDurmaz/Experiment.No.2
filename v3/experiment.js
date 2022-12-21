var song
var fft
var particles = []
var particles2 = []
var particles3 = []

function preload() {
    song = loadSound("./object.mp3")  
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES)
    rectMode(CENTER)
    fft = new p5.FFT(0.8, 512)
    noLoop()
    colorx = random(0,100)
    colory = random(0,100)
    colorz = random(255)
    colorx1 = random(255)
    colory1 = random(255)
    colorz1 = random(255)
    background(colorx, colory, colorz);
}



function draw() {
    translate(width/2, height/2)
    fft.analyze()
    amp = fft.getEnergy(1, 1000)

    var alpha = map(amp, 0, 255, 0, 150)
    fill(colorx, colory, colorz, alpha)
    noStroke()
    rect(0, 0, width, height)

    stroke(random(255), random(255), random(255))
    strokeWeight(random(0,30))
    noFill()

    var wave = fft.waveform()

    for(var t = -1; t <= 1; t += 2) {
        beginShape()
        for(var i = 0; i <= 180; i += 1) {
            var index = floor(map(i,0,180,0,wave.length-1))
            var r = map(wave[index], -1, 1, 90, window.innerWidth/4)
            var x = r * sin(i) * t
            var y = r * cos(i)
            vertex(x,y)
        }
        endShape()
    }
    for(var t = -1; t <= 1; t += 2) {
        beginShape()
        for(var i = 0; i <= 180; i += 2) {
            var index = floor(map(10,-10,180,0,wave.length-1))
            var r = map(wave[index], -1, 1, 5, window.innerWidth/30)
            var x = r * sin(i) * t
            var y = r * cos(i)
            vertex(x,y)
        }
        endShape()
    }

    for(var t = -1; t <= 1; t += 2) {
        beginShape()
        for(var i = 0; i <= 180; i += 1) {
            var index = floor(map(i,0,180,0,wave.length-1))
            var r = map(wave[index], -1, 1, 90, window.innerWidth/2)
            var x = r * sin(i) * t
            var y = r * cos(i)
            vertex(x,y)
        }
        endShape()
    }
    

    var p = new Particle3()
    particles3.push(p)

    for(var i = particles3.length - 1; i >= 0; i--) {
        if(!particles3[i].edges()) {
            particles3[i].update(amp > 1000)
            particles3[i].show()
        } else {
            particles3.splice(1, i)
        }
        
    }

    var p = new Particle()
    particles.push(p)

    for(var i = particles.length - 1; i >= 0; i--) {
        if(!particles[i].edges()) {
            particles[i].update(amp > 1000)
            particles[i].show()
        } else {
            particles.splice(1, i)
        }
        
    }

    var p2 = new Particle2()
    particles2.push(p2)

    for(var i = particles2.length - 1; i >= 0; i--) {
        if(!particles2[i].edges()) {
            particles2[i].update(amp > 1000)
            particles2[i].show()
        } else {
            particles2.splice(i, 1)
        }
        
    }

}

function mouseClicked() {
    if(song.isPlaying()) {
        song.pause()
        noLoop()
    } else {
        song.play()
        loop()
    }
}

class Particle3{
    constructor() {
        this.pos = p5.Vector.random2D().mult(100)
        this.vel = createVector(random(0),random(0))
        this.acc = this.pos.copy().mult(random(0.001, 0.00001))

        this.w = random(1, 15)
        this.color = [colorx1, colory1, colorz1]
    }
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    edges() {
        if(this.pos.x < -width/2 || this.pos.x > width/2 || this.pos.y < -height/2 || this.pos.y > height/2) {
            return true
        } else {
            return false
        }
    }
    show() {
        noStroke()
        fill(this.color)
        square(this.pos.x, this.pos.y, this.w)
    }
}

class Particle{
    constructor() {
        this.pos = p5.Vector.random2D().mult(50)
        this.vel = createVector(random(0),random(0))
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(1, 15)
        this.color = [random(0,255), random(0,255), random(150,150)]
    }
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    edges() {
        if(this.pos.x < -width/2 || this.pos.x > width/2 || this.pos.y < -height/2 || this.pos.y > height/2) {
            return true
        } else {
            return false
        }
    }
    show() {
        noStroke()
        fill(this.color)
        square(this.pos.x, this.pos.y, this.w)
    }
}

class Particle2{
    constructor() {
        this.pos = p5.Vector.random2D().mult(300)
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.01, 0.00001))

        this.w = random(1, 10)
        this.color = [random(0,255), random(0,255), random(0,255)]
    }
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    edges() {
        if(this.pos.x < -width/2 || this.pos.x > width || this.pos.y < -height/2 || this.pos.y > height/2) {
            return true
        } else {
            return false
        }
    }
    show() {
        noStroke()
        fill(this.color)
        circle(this.pos.x, this.pos.y, this.w)
    }
}