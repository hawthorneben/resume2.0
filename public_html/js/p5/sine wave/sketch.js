var off = 0;
var inc = 0.03;

function setup() {
    createCanvas(1100, 700);
    background(50);
}

function draw() {
    background(50, 9);
    var s = sin(off);
    var c = cos(off);
    var top = map(c, -1, 1, 0, width);
    var side = map(c, -1, 1, 0, height);
    var x = map(s, -1, 1, width / 2 - 100, width / 2 + 100);
    var y = map(c, -1, 1, height / 2 - 100, height / 2 + 100);

    var r = map(off, 0, 40, 0, 255);
    var b = map(off, 40, 0, 0, 255);

    strokeWeight(1);
    stroke(r, 255, b);

    line(top, 0, x, y);
    line(width - top, height, x, y);
    line(width, side, x, y);
    line(0, height - side, x, y);

    off += inc;
}