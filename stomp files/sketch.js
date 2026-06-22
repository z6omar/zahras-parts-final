// ============================================================
// Penguin Stop Animation
// Press SPACE to play the animation once
// ============================================================

const SPRITE = {
  frameWidth: 360,      // 2048 / 6
  frameHeight: 600,     // image height
  numFrames: 6,
  animSpeed: 10,
  scale: 0.40,

  offsetX: 10,
  offsetY: 0,
};

let penguin;

let currentFrame = 0;
let frameTimer = 0;
let playing = false;

function preload() {
  penguin = loadImage("assets/images/penguin_stomp_animation.png");
}

function setup() {
  createCanvas(800, 450);
  imageMode(CENTER);
}

function draw() {
  background(30);

  if (playing) {
    frameTimer++;

    if (frameTimer >= SPRITE.animSpeed) {
      frameTimer = 0;
      currentFrame++;

      // Stop after the final frame
      if (currentFrame >= SPRITE.numFrames) {
        currentFrame = 0;
        playing = false;
      }
    }
  }

  drawPenguin();
}

function drawPenguin() {

  let sx = currentFrame * SPRITE.frameWidth + SPRITE.offsetX;
  let sy = SPRITE.offsetY;

  image(
    penguin,
    width / 2,
    height / 2,
    SPRITE.frameWidth * SPRITE.scale,
    SPRITE.frameHeight * SPRITE.scale,
    sx,
    sy,
    SPRITE.frameWidth,
    SPRITE.frameHeight
  );
}

// Press SPACE to play animation
function keyPressed() {
  if (key === ' ') {
    currentFrame = 0;
    frameTimer = 0;
    playing = true;
  }
}