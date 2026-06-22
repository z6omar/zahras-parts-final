// ============================================================
// Penguin Sprite Sheet Animation
// Controls: W, A, D only
// ============================================================

const SPRITE = {
  frameWidth: 159,
  frameHeight: 160,
  numFrames: 4,
  animSpeed: 9,
  scale: 0.8,

  rows: {
    up: 0,
    left: 1,
    right: 2,
  },

  offsets: {
    up:    { x: 5, y: 0 },
    left:  { x: 5, y: 10 },
    right: { x: 5, y: 30 },
  },
};

let player = {
  x: 400,
  y: 225,
  speed: 3,

  currentFrame: 0,
  frameTimer: 0,
  direction: "up",
  isMoving: false,
};

let characterSheet;

function preload() {
  characterSheet = loadImage("assets/images/penguin.png");
}

function setup() {
  createCanvas(800, 450);
  imageMode(CENTER);
}

function draw() {
  background(30);

  handleInput();
  animateSprite();
  drawCharacter();
}

function handleInput() {
  player.isMoving = false;

  if (keyIsDown(87)) { // W — up
    player.y -= player.speed;
    player.direction = "up";
    player.isMoving = true;
  }

  if (keyIsDown(65)) { // A — left
    player.x -= player.speed;
    player.direction = "left";
    player.isMoving = true;
  }

  if (keyIsDown(68)) { // D — right
    player.x += player.speed;
    player.direction = "right";
    player.isMoving = true;
  }

  let hw = (SPRITE.frameWidth * SPRITE.scale) / 2;
  let hh = (SPRITE.frameHeight * SPRITE.scale) / 2;

  player.x = constrain(player.x, hw, width - hw);
  player.y = constrain(player.y, hh, height - hh);
}

function animateSprite() {
  if (player.isMoving) {
    player.frameTimer++;

    if (player.frameTimer >= SPRITE.animSpeed) {
      player.frameTimer = 0;
      player.currentFrame = (player.currentFrame + 1) % SPRITE.numFrames;
    }
  } else {
    player.currentFrame = 0;
    player.frameTimer = 0;
  }
}

function drawCharacter() {
  let row = SPRITE.rows[player.direction];
  let offset = SPRITE.offsets[player.direction];

  let sx = player.currentFrame * SPRITE.frameWidth + offset.x;
  let sy = row * SPRITE.frameHeight + offset.y;

  let dw = SPRITE.frameWidth * SPRITE.scale;
  let dh = SPRITE.frameHeight * SPRITE.scale;

  image(
    characterSheet,
    player.x,
    player.y,
    dw,
    dh,
    sx,
    sy,
    SPRITE.frameWidth,
    SPRITE.frameHeight
  );
}