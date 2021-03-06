var pl, n = 0;

/*
state
0 - uninitialized, game has not begun.
1 - playing, game has begun and is active
2 - dead, game finished player dies.
*/
var state = 0;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  textSize(32);

  pl = createSprite(30, 50, 30, 30);
}

function draw() {
  background('white');
  line(0, (height/ 2) + 15, width, (height / 2) + 15);
  drawSprites();

  switch(state) {
    case 0:
        n = 0;
        text('Press space to start...', (width / 2) - 180, (height / 2) + 97)
        break;
    case 1:
        text('score: ' + n, (width / 2) - 180, (height / 2) + 97);
        n++;
        break;
    case 2:
        text('You died.\nscore: ' + n, (width / 2) - 180, (height / 2) + 97);
        return;
    default:
        throw "State Panic!"
  }

  if (state === 2) {
    // Should probably never reach here.
    // but we really dont want to continue either way
    return;
  }

  if (keyIsPressed) console.log(keyCode);

  if (keyIsDown(65)) {
    pl.position.x += -3;
  } else if (keyIsDown(68)) {
    pl.position.x += 3;
  }

  if (pl.position.y < ((height / 2) + 1)) {
    pl.velocity.y += 0.1;
  }

  if (pl.position.y > height / 2) {
    if (state === 1) {
      state = 2;
      pl.position.y = (height / 2) + 1;
      pl.velocity.y = 0;
      return;
    }

    pl.position.y = (height / 2) + 1;
    pl.velocity.y = 0;
  } else if (pl.position.y < 0) {
    pl.velocity.y = 0;
    state = 2;
    return;
  }
}

function keyPressed() {
  if (keyCode === 32 && state !== 2) {
    if (pl.position.y - 5 < 0) {
      return;
    }
    pl.velocity.y -= 5;
    state = 1;
  }
}
