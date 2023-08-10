var audioBlue;
var audioRed;
var audioYellow;
var fft;
var minR;
var maxR;
var particles = [];
var climaxFlag = false;
var imgBlue;
var imgRed;
var imgYellow;
var startYellow = false;
var startBlue = false;
var startRed = false
$(document).ready(function() {

    $(".getYellow").click(function() {
        getYellow();
    });

    $(".yReset").click(function() {
        resetYellow();
    });

    $(".getRed").click(function() {
        getRed();
    });

    $(".rReset").click(function() {
        resetRed();
    });


    $('#playBlue').click(function() {
        startBlue = true;
        animate();
        draw();
    });

    $('#playRed').click(function() {
        startRed = true;
        animate();
        draw();
    });

    $('#playYellow').click(function() {
        startYellow = true;
        animate();
        draw();
    });

});

function preload() {
    audioBlue = loadSound("./assets/music/allFallsDown.m4a");
    imgBlue = loadImage("./assets/img/bg-blue-blur.jpg");

    audioRed = loadSound("./assets/music/ifyouSaySo.m4a");
    imgRed = loadImage("./assets/img/bg-red-blur.png");

    audioYellow = loadSound("./assets/music/loveLetter.m4a");
    imgYellow = loadImage("./assets/img/bg-yellow-blur.jpg");
}

function setup() {

    let visualizerDiv = select('#visualizer1');
    canvas = createCanvas(visualizerDiv.width, visualizerDiv.height);
    canvas.parent(visualizerDiv);
    fft = new p5.FFT();
    angleMode(DEGREES);
    imageMode(CENTER);
    rectMode(CENTER);
    if (windowHeight > windowWidth) {
        minR = windowHeight / 10;
        maxR = windowHeight / 5;
    }
    else {
        minR = windowWidth / 12;
        maxR = windowWidth / 6;
    }

}


function draw() {
    if(startBlue) {
        fft.analyze();
        amp = fft.getEnergy(20,200);
        background(0);
    
        translate(width/2, height/2);
        
        push()
        if(climaxFlag) {
            rotate(random(-0.9,0.9))
        }
        image(imgBlue, 0, 0, width, height);
        pop()
    
        var alpha = map(amp, 200, 255, 250, 64);
        fill(0, alpha);
        noStroke();
        rect(0,0,width,height);
    
        if (amp > 200) {  //205
            climaxFlag = true;
            stroke("#9fc5e8");
            // stroke("#55a4eb");
            strokeWeight(2.2);
        }
        else {
            climaxFlag = false;
            stroke(255);
            strokeWeight(1.1);
        }
        noFill();
    
        var wave = fft.waveform();
    
        
        for(var l = -1; l <= 1; l+=2) {
            beginShape()
                for (var i = 0; i <= 180; i+=0.05) {
                    var index = floor(map(i,0, 180, 0, wave.length - 1));
                    
                    var r = map(wave[index], -1, 1, minR, maxR);
                    var x = r * sin(i) * l;
                    var y = r * cos(i);
                    vertex(x,y);
                }
            endShape()
        }
    
        if(climaxFlag) {
            for(var l = -1; l <= 1; l+=2) {
                beginShape()
                    for (var i = 0; i <= 180; i+=0.05) {
                        var index = floor(map(i,0, 180, 0, wave.length - 1));
                        
                        var r = map(wave[index], -1, 1, minR/2.2, maxR/2.2);
                        var x = r * sin(i) * l;
                        var y = r * cos(i);
                        vertex(x,y);
                    }
                endShape()
            }
        }
        
        if (audioBlue.isPlaying()) {
            if(climaxFlag) {
                for (var i = 1; i <= 5; i++) {
                    var p = new Particle(true, "blue");
                    particles.push(p);
                }
            }
            var p = new Particle(false, "blue");
            particles.push(p);
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].void()) {
                particles[i].update(amp);
                particles[i].show(climaxFlag);
            }
            else {
                particles.splice(i,1);
            }
            
        }
    }
    else if (startRed) {
        fft.analyze();
        amp = fft.getEnergy(20,200);
        background(0);
    
        translate(width/2, height/2);
        
        push()
        if(climaxFlag) {
            rotate(random(-0.9,0.9))
        }
        image(imgRed, 0, 0, width, height);
        pop()
    
        var alpha = map(amp, 200, 255, 250, 64);
        fill(0, alpha);
        noStroke();
        rect(0,0,width,height);
    
        if (amp > 215) {  //205
            climaxFlag = true;
            stroke("#e8a09f");
            // stroke("#55a4eb");
            strokeWeight(2.2);
        }
        else {
            climaxFlag = false;
            stroke(255);
            strokeWeight(1.1);
        }
        noFill();
    
        var wave = fft.waveform();
    
        
        for(var l = -1; l <= 1; l+=2) {
            beginShape()
                for (var i = 0; i <= 180; i+=0.05) {
                    var index = floor(map(i,0, 180, 0, wave.length - 1));
                    
                    var r = map(wave[index], -1, 1, minR, maxR);
                    var x = r * sin(i) * l;
                    var y = r * cos(i);
                    vertex(x,y);
                }
            endShape()
        }
    
        if(climaxFlag) {
            for(var l = -1; l <= 1; l+=2) {
                beginShape()
                    for (var i = 0; i <= 180; i+=0.05) {
                        var index = floor(map(i,0, 180, 0, wave.length - 1));
                        
                        var r = map(wave[index], -1, 1, minR/2.2, maxR/2.2);
                        var x = r * sin(i) * l;
                        var y = r * cos(i);
                        vertex(x,y);
                    }
                endShape()
            }
        }
        
        if (audioRed.isPlaying()) {
            if(climaxFlag) {
                for (var i = 1; i <= 5; i++) {
                    var p = new Particle(true, "red");
                    particles.push(p);
                }
            }
            var p = new Particle(false, "red");
            particles.push(p);
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].void()) {
                particles[i].update(amp);
                particles[i].show(climaxFlag);
            }
            else {
                particles.splice(i,1);
            }
            
        }
    }
    else if (startYellow) {
        fft.analyze();
        amp = fft.getEnergy(20,200);
        background(0);
    
        translate(width/2, height/2);
        
        push()
        if(climaxFlag) {
            rotate(random(-0.9,0.9))
        }
        image(imgYellow, 0, 0, width, height);
        pop()
    
        var alpha = map(amp, 200, 255, 250, 64);
        fill(0, alpha);
        noStroke();
        rect(0,0,width,height);
    
        if (amp > 205) {  //205
            climaxFlag = true;
            stroke("#fae199");
            // stroke("#55a4eb");
            strokeWeight(2.2);
        }
        else {
            climaxFlag = false;
            stroke(255);
            strokeWeight(1.1);
        }
        noFill();
    
        var wave = fft.waveform();
    
        
        for(var l = -1; l <= 1; l+=2) {
            beginShape()
                for (var i = 0; i <= 180; i+=0.05) {
                    var index = floor(map(i,0, 180, 0, wave.length - 1));
                    
                    var r = map(wave[index], -1, 1, minR, maxR);
                    var x = r * sin(i) * l;
                    var y = r * cos(i);
                    vertex(x,y);
                }
            endShape()
        }
    
        if(climaxFlag) {
            for(var l = -1; l <= 1; l+=2) {
                beginShape()
                    for (var i = 0; i <= 180; i+=0.05) {
                        var index = floor(map(i,0, 180, 0, wave.length - 1));
                        
                        var r = map(wave[index], -1, 1, minR/2.2, maxR/2.2);
                        var x = r * sin(i) * l;
                        var y = r * cos(i);
                        vertex(x,y);
                    }
                endShape()
            }
        }
        
        if (audioYellow.isPlaying()) {
            if(climaxFlag) {
                for (var i = 1; i <= 5; i++) {
                    var p = new Particle(true);
                    particles.push(p);
                }
            }
            var p = new Particle(false);
            particles.push(p);
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].void()) {
                particles[i].update(amp);
                particles[i].show(climaxFlag);
            }
            else {
                particles.splice(i,1);
            }
            
        }
    }


}

function mouseClicked() {
    if(startBlue) {
        if (audioBlue.isPlaying()) {
            audioBlue.pause();
            noLoop();
        }
        else {
            audioBlue.play();
            loop();
        }
    }
    else if (startRed) {
        if (audioRed.isPlaying()) {
            audioRed.pause();
            noLoop();
        }
        else {
            audioRed.play();
            loop();
        }
    }
    else if (startYellow) {
        if (audioYellow.isPlaying()) {
            audioYellow.pause();
            noLoop();
        }
        else {
            audioYellow.play();
            loop();
        }
    }
    
}

class Particle {
    constructor(climax, color) {
        if(!climax) {
            this.pos = p5.Vector.random2D().mult(floor((minR+maxR)/2));
            this.velocity = createVector(0,0);
            this.acceleration = this.pos.copy().mult(random(0.00001, 0.0001));
            if(color == "red") {
                this.color = ["#cc2929", "#c63d3d", "#8a1313", "#facbcb", "#ff8302", "#f35353", "#ff0000"][Math.floor(Math.random() * 7)];
            }
            else if (color =="blue") {
                this.color = ["#2986cc", "#3d85c6", "#073763", "#cfe2f3", "#0b5394", "#53daf3", "#02d7ff"][Math.floor(Math.random() * 7)];
            }
            else {
                this.color = ["#f8eac0", "#f7d619", "#ffda7c", "#fff4d3", "#876706", "#ff8a00", "#ffd900"][Math.floor(Math.random() * 7)];
            }
            this.width = random(1,4);
        }
        else {
            this.pos = p5.Vector.random2D().mult(floor((minR+maxR)/5));
            this.velocity = createVector(0,0);
            this.acceleration = this.pos.copy().mult(random(0.0001, 0.001));
            if(color == "red") {
                this.color = ["#cc2929", "#c63d3d", "#8a1313", "#facbcb", "#ff8302", "#f35353", "#ff0000"][Math.floor(Math.random() * 7)];
            }
            else if (color =="blue") {
                this.color = ["#2986cc", "#3d85c6", "#073763", "#cfe2f3", "#0b5394", "#53daf3", "#02d7ff"][Math.floor(Math.random() * 7)];
            }
            else {
                this.color = ["#f8eac0", "#f7d619", "#ffda7c", "#fff4d3", "#876706", "#ff8a00", "#ffd900"][Math.floor(Math.random() * 7)];
            }
            this.width = random(3,8);
        }

    }

    update(cond) {
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        if(cond > 150) {
            this.pos.add(this.velocity);
            this.pos.add(this.velocity);
            this.pos.add(this.velocity);
        }

    }

    show(cond){
        noStroke();
        if (cond) {
            fill(this.color);
        }
        else {
            fill(255);
        }
        ellipse(this.pos.x, this.pos.y, 4, this.width);
    }
    void() {
        if(this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height/2 || this.pos.y > height/2) {
            return true;
        }
        return false;
    }
}

//

function animate() {
    const scrollTimeline = gsap.timeline();
    scrollTimeline.to(".button", {duration: 1, opacity: 0, y: -500, scale: 10});
    scrollTimeline.to(".author, .songName", {duration:0.3, opacity:0, scale: 2  , delay:-1});
    scrollTimeline.to(".combo", {duration: 2, y:"-100vh", delay: -1});
}

function getRed() {
    const scrollTimeline = gsap.timeline();
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 0, stagger:0.05})
    scrollTimeline.to(".displayRed", {duration: 0.1,  xPercent: -100, zIndex:1});
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 1})
}

function resetRed() {
    const scrollTimeline = gsap.timeline();
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 0, stagger:0.05})
    scrollTimeline.to(".displayRed", {duration: 0.1,  xPercent: 0, zIndex:0});
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 1});
}

function getYellow() {
    const scrollTimeline = gsap.timeline();
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 0, stagger:0.05})
    scrollTimeline.to(".displayYellow", {duration: 0.1,  xPercent: 100, zIndex:2});
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 1});
}

function resetYellow() {
    const scrollTimeline = gsap.timeline();
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 0, stagger:0.05})
    scrollTimeline.to(".displayYellow", {duration: 0.1,  xPercent: 0, zIndex:0});
    scrollTimeline.to(".button, .author, .songName", {duration: 0.2, opacity: 1});
}





//["#cc2929", "#c63d3d", "#8a1313", "#facbcb", "#ff3000", "#f35353", "#ff0000"]
//["#cc0000", "#ff0000", "#e06666", "#ed0c4f", "#ff8302", "#f84848", "#d20404"]