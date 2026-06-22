// ============================================================
// Penguin Hurt Flash
// Press SPACE to make penguin flash for 3 seconds
// Uses only the first frame of penguin.png
// ============================================================

const SPRITE = {
frameWidth: 159,
  frameHeight: 160,
  scale: 0.8,

  offsetX: 0,
  offsetY: 0
};

let penguin;

let hurt = false;
let hurtStartTime = 0;
let hurtDuration = 3000; // 3 seconds

function preload() {
  penguin = loadImage("assets/images/penguin.png");
}

function setup() {
  createCanvas(800, 450);
  imageMode(CENTER);
}

function draw() {
  background(30);

  if (hurt && millis() - hurtStartTime >= hurtDuration) {
    hurt = false;
  }

  drawPenguin();
}

function drawPenguin() {
  let sx = SPRITE.offsetX;
  let sy = SPRITE.offsetY;

  // Flash while hurt
  if (hurt) {
    if (frameCount % 10 < 5) {
      tint(255, 80, 80); // red flash
    } else {
      noTint();
    }
  } else {
    noTint();
  }

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

  noTint();
}

// Press SPACE to show hurt flash
function keyPressed() {
  if (key === ' ') {
    hurt = true;
    hurtStartTime = millis();
  }
}