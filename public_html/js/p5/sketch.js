var inc = 0.03;
var scl = 27;
var rows, cols;

var values = [];
var zoff = 0.00;

var particles = [];

function setup() {
  canvas = createCanvas(windowWidth, 1000);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(0);
  
  rows = floor(height/scl);
  cols = floor(width/scl);
  for (var i = 0; i < 700; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  values = [];
  
  var xoff = 0;
  for (var j = 0; j < cols; j++) {
    var yoff = 0;
    for (var i = 0; i < rows; i++) {
       yoff += inc;
       var angle = noise(xoff, yoff, zoff) * TWO_PI;
       var vector = createVector(sin(angle), cos(angle));
       vector.normalize();
       vector.mult(8);
       values.push(vector);
       
       yoff += inc;
    }
    xoff += inc;
  }
  
  /*for (var j = 0; j < cols; j++) {
    for (var i = 0; i < rows; i++) {
      var vector = values[index(i, j)];
      //console.log(index(i, j));
      stroke(0);
      line(j * scl, i * scl, j * scl + vector.x, i * scl + vector.y);
    }
  }*/
  
  for (var i = 0; i < particles.length; i++) {
    var x = floor(particles[i].pos.x / cols);
    var y = floor(particles[i].pos.y / rows);
    var force = values[index(y, x)];
    particles[i].applyForce(force);
    particles[i].update();
    particles[i].show();
  }
  
  zoff += 0.0005;
}

function index(i, j) {
  return j + i * rows; 
}