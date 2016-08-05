var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var canvas = document.getElementById('canvas');
canvas.width = windowWidth;
canvas.height = windowHeight;
// World is black;
canvas.getContext('2d')
    .fillStyle = 'rgba(0, 0, 0)';
canvas.getContext('2d')
    .fillRect(0, 0, windowWidth, windowHeight);

var squareSize = 20;

var world = {
    width: Math.round(windowWidth / squareSize),
    height: Math.round(windowHeight / squareSize),
    squareSize: squareSize,
    ticks: 0
}

var squares = new Array(world.width);
for (var i = 0; i < world.width; i++) {
    squares[i] = new Array(world.height);
}
world.squares = squares;

var Ant = function (x, y, dir, world) {
    var self = this;
    var squares = world.squares;
    this.x = x
    this.y = y;
    this.dir = dir;
    this.green = 255;
    this.red = 0;

    this.checkBounderies = function() {
      if (this.x >= world.width) {
        this.x = 0;
      }

      if (this.x < 0) {
        this.x = world.width - 1;
      }

      if (this.y >= world.height) {
        this.y = 0;
      }

      if (this.y < 0) {
        this.y = world.height - 1;
      }
    }

    this.nextTurn = function () {
        if (squares[this.x][self.y]) {
            squares[self.x][self.y] = 0
            self.turnLeft();
        } else {
            squares[self.x][self.y] = 1;
            self.turnRight();
        }
        self.move();
    }

    this.move = function () {
        if (!(this.dir % 2)) {
            this.y -= this.dir - 1;
        } else {
            this.x += this.dir - 2;
        }
        this.checkBounderies();
    };

    this.turnLeft = function () {
        this.dir = (this.dir + 3) % 4;
        this.green++;
        this.red--;
    };

    this.turnRight = function () {
        this.dir = (this.dir + 5) % 4;
        this.green--;
        this.red++;
    };
};

var ant1 = new Ant(Math.round(world.width / 10 * 4), Math.round(world.height / 10 * 4), 1, world);
var ant2 = new Ant(Math.round(world.width / 10 * 4), Math.round(world.height / 10 * 4), 2, world);
var ant3 = new Ant(Math.round(world.width / 10 * 4) + 1, Math.round(world.height / 10 * 4), 1, world);
var ant4 = new Ant(Math.round(world.width / 10 * 4) + 1, Math.round(world.height / 10 * 4), 2, world);

var ants = [ant1, ant2, ant3, ant4];

function draw(ant) {
    // Redraw screen in black with alpha channel for fading
    canvas.getContext('2d')
        .fillStyle = 'rgba(0, 0, 0, 0.01)';
    canvas.getContext('2d')
        .fillRect(0, 0, windowWidth, windowHeight);

    var squareSize = world.squareSize;
    var antColor = 'rgb(' + ant.red + ', ' + ant.green + ', 0)';
    canvas.getContext('2d')
        .fillStyle = antColor;
    canvas.getContext('2d')
        .fillRect(ant.x * squareSize, ant.y * squareSize, squareSize - 1, squareSize - 1);
}

var tick = function () {
    // Create kids
    ants.forEach(function (ant) {
        ant.nextTurn();
        draw(ant);
    });
    world.ticks++;
};

// Call function draw with an interval of ..
setInterval(tick, 0.03);
