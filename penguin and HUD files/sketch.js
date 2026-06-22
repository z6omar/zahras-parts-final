// ============================================================
// Penguin + Animated Blizzard + Timer + Stomp Animation
// Canvas: 800 x 450
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
    up: { x: 5, y: 0 },
    left: { x: 5, y: 10 },
    right: { x: 5, y: 30 },
  },
};

const BLIZZARD = {
  frameWidth: 341,
  frameHeight: 682,
  numFrames: 6,
  animSpeed: 6,
  alpha: 90,

  offsetX: 0,
  offsetY: -160,

  drawWidth: 800,
  drawHeight: 600,
};

const STOMP = {
  frameWidth: 360,
  frameHeight: 600,
  numFrames: 6,
  animSpeed: 10,
  scale: 0.4,

  offsetX: 10,
  offsetY: 0,
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
let blizzardSheet;
let endingSadImg;
let stompSheet;

let blizzardFrame = 0;
let blizzardTimer = 0;

let stompFrame = 0;
let stompTimer = 0;
let stomping = false;

let clearRadius = 95;

// TIMER
let totalTime = 180;
let startTime;
let gameEnded = false;

function preload() {
  characterSheet = loadImage("assets/images/penguin.png");
  blizzardSheet = loadImage("assets/images/blizzardd.png");
  endingSadImg = loadImage("assets/images/ending_sad_reference.png");
  stompSheet = loadImage("assets/images/penguin_stomp_animation.png");
}

function setup() {
  createCanvas(800, 450);
  imageMode(CENTER);
  startTime = millis();
}

function draw() {
  background(30);

  if (gameEnded) {
    drawSadEnding();
    return;
  }

  handleInput();
  animateSprite();
  animateBlizzard();

  if (stomping) {
    drawStomp();
  } else {
    drawCharacter();
  }

  drawBlizzardOverlay();
  drawTimer();
}

function drawTimer() {
  let elapsed = floor((millis() - startTime) / 1000);
  let timeLeft = totalTime - elapsed;

  if (timeLeft <= 0) {
    timeLeft = 0;
    gameEnded = true;
  }

  let minutes = floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  let timerText = minutes + ":" + nf(seconds, 2);

  noStroke();

  if (timeLeft <= 10) {
    fill(255, 0, 0);
  } else {
    fill(255);
  }

  textAlign(CENTER);
  textSize(32);
  textFont("monospace");
  text(timerText, width / 2, 40);
}

function drawSadEnding() {
  imageMode(CORNER);
  image(endingSadImg, 0, 0, width, height);
  imageMode(CENTER);
}

function handleInput() {
  player.isMoving = false;

  // Do not move while stomping
  if (stomping) {
    return;
  }

  if (keyIsDown(87)) {
    player.y -= player.speed;
    player.direction = "up";
    player.isMoving = true;
  }

  if (keyIsDown(65)) {
    player.x -= player.speed;
    player.direction = "left";
    player.isMoving = true;
  }

  if (keyIsDown(68)) {
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
  if (player.isMoving && !stomping) {
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

function animateBlizzard() {
  blizzardTimer++;

  if (blizzardTimer >= BLIZZARD.animSpeed) {
    blizzardTimer = 0;
    blizzardFrame = (blizzardFrame + 1) % BLIZZARD.numFrames;
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

function drawStomp() {
  let sx = stompFrame * STOMP.frameWidth + STOMP.offsetX;
  let sy = STOMP.offsetY;

  image(
    stompSheet,
    player.x,
    player.y,
    STOMP.frameWidth * STOMP.scale,
    STOMP.frameHeight * STOMP.scale,
    sx,
    sy,
    STOMP.frameWidth,
    STOMP.frameHeight
  );

  stompTimer++;

  if (stompTimer >= STOMP.animSpeed) {
    stompTimer = 0;
    stompFrame++;

    if (stompFrame >= STOMP.numFrames) {
      stompFrame = 0;
      stompTimer = 0;
      stomping = false;
    }
  }
}

function drawBlizzardOverlay() {
  let stormLayer = createGraphics(width, height);

  stormLayer.imageMode(CORNER);
  stormLayer.tint(255, BLIZZARD.alpha);

  let sx = blizzardFrame * BLIZZARD.frameWidth;
  let sy = 0;

  stormLayer.image(
    blizzardSheet,
    BLIZZARD.offsetX,
    BLIZZARD.offsetY,
    BLIZZARD.drawWidth,
    BLIZZARD.drawHeight,
    sx,
    sy,
    BLIZZARD.frameWidth,
    BLIZZARD.frameHeight
  );

  stormLayer.drawingContext.globalCompositeOperation = "destination-out";
  stormLayer.noStroke();
  stormLayer.fill(255);
  stormLayer.ellipse(player.x, player.y, clearRadius * 2, clearRadius * 2);

  imageMode(CORNER);
  image(stormLayer, 0, 0);
  imageMode(CENTER);
}

function keyPressed() {
  if (key === " " && !stomping && !gameEnded) {
    stomping = true;
    stompFrame = 0;
    stompTimer = 0;
  }
}