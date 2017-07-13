function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector();
  this.acc = createVector();
  
  this.prev = this.pos.copy();
  
  this.maxVel = 2;
  
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.acc.mult(0);
    
    this.edges();
    this.prev = this.pos.copy();
  }
  
  this.show = function() {
    stroke(255, 30);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.edges = function() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}