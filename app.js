var spriteContainer = document.getElementById('spriteContainer');
var alienContainer = document.getElementById('alienContainer')
var aliens = document.querySelectorAll('.alien');
var newBullet = document.createElement("div");
var alienBullet1 = document.createElement("div");
// var alienBullet2 = document.createElement("div");
// var alienBullet3 = document.createElement("div");
// var alienBullet4 = document.createElement("div");
// var alienBullet5 = document.createElement("div");
var scoreDisplay = document.getElementById('score');
var levelCompleteMsg = document.getElementById('levelComplete');
var shields = document.querySelectorAll('.shield');
var score = 0;
var alienNum = 44;
var aliensHit = 0;
var bulletFired = false;
var alienBullet1Fired = false;
var levelComplete = false;
newBullet.id = "bullet";
alienBullet1.id = "alienBullet1"
// alienBullet2.id = "alienBullet2"
// alienBullet3.id = "alienBullet3"
// alienBullet4.id = "alienBullet4"
// alienBullet5.id = "alienBullet5"

newBullet.y = 55;
alienBullet1.bottom = aliens[0].getBoundingClientRect().bottom;


console.log(aliens[0].getBoundingClientRect().bottom)
/// store key codes and currently pressed ones
var keys = {};

keys.LEFT = 37;
keys.RIGHT = 39;
keys.SPACE = 32;

/// store reference to sprite's position and element
let sprite = {
  x: 47.5,
  // y: null,
  speedMultiplier: 1,
  element: document.getElementById("sprite")
};

var bullet = {
  x: 47.5,
  y: 55,
  speedMultiplier: 3,
  element: newBullet
};

var a1Bullet = {
  x: 47.5,
  y: 55,
  speedMultiplier: 3,
  element: alienBullet1
};

  document.addEventListener('keyup', (e) => {

    if (event.keyCode === 32 && !bulletFired && !levelComplete) {

      bulletFired = true;
      bullet.element.style.left = sprite.x + 1.85 + 'vw';
      bullet.element.style.bottom = bullet.y + 'px';

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      var kc = e.keyCode || e.which;
      keys[kc] = e.type == 'keyup';
      document.body.appendChild(newBullet);
    }
  });


const moveBullet = (dx, dy) => {

  bullet.x += (dx || 0) * bullet.speedMultiplier;
  bullet.y += (dy || 0) * bullet.speedMultiplier;
  bullet.element.style.bottom = bullet.y + 'px';

};


const detectBulletMovement = () => {
  if ((keys[keys.SPACE])) {
    if (!bulletFired && !levelComplete) {


      
bulletFire(bulletMovement);

      bulletFired = false;
      bullet.element.style.display = 'block';
      bullet.y = 55;
      bullet.element.style.left = sprite.x + 1.85 + 'vw';
    }
  }

};

moveBullet();
/// game loop
setInterval(function () {
  detectBulletMovement();
}, 10);

/// need to update to use addeventlistener
document.body.onkeyup =
  document.body.onkeydown = function (e) {

    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    var kc = e.keyCode || e.which;
    keys[kc] = e.type == 'keydown';
  };

/// sprite movement update
const moveSprite = (dx, dy) => {

  sprite.x += (dx || 0) * sprite.speedMultiplier;
  sprite.y += (dy || 0) * sprite.speedMultiplier;
  sprite.element.style.left = sprite.x + 'vw';
  sprite.element.style.top = sprite.y + 'vw';
};

/// sprite control
const detectSpriteMovement = () => {
  //restrict alien to stay on screen
  if ((keys[keys.LEFT]) && (sprite.x > 0)) {
    moveSprite(-0.5, 0);
  }
  if ((keys[keys.RIGHT]) && (sprite.x < 95)) {
    moveSprite(0.5, 0);
  }

};

/// update current position on screen
moveSprite();

/// game loop
setInterval(function () {
  detectSpriteMovement();
}, 1000/60);


// space bar = 32,
// rightKey = 39
// leftKey = 37

var bulletMovement = setInterval(bulletFire, 5);

function bulletFire(bulletMovement) {
  if (aliensHit < alienNum ) {
    if (bullet.y < 750) {
      sprite.element.style.top = sprite.y + 'vw';
      shieldHit();
      alienHit();
      if(bulletFired){
      moveBullet(0, 0.5);

      }
      
    } else {
      clearInterval(bulletMovement);
      document.body.removeChild(newBullet);
      bulletFired = false;
      bullet.y = 55;
    }
  } 
else {
    levelComplete = true;
    levelCompleteMsg.style.display = 'block';
  }
}

function alienHit (bulletMovement){
  for (var i = 0; i < aliens.length; i++) {
    let alienStyle = window.getComputedStyle(aliens[i]);

    if (alienStyle.getPropertyValue('background-image') !== 'none') {
      if (bullet.element.getBoundingClientRect().bottom < aliens[i].getBoundingClientRect().bottom && bullet.element.getBoundingClientRect().top > aliens[i].getBoundingClientRect().top && bullet.element.getBoundingClientRect().left > aliens[i].getBoundingClientRect().left && bullet.element.getBoundingClientRect().right < aliens[i].getBoundingClientRect().right) {
        clearInterval(bulletMovement);
        bullet.y = 55;
        bullet.element.style.display = 'none';        
        document.body.removeChild(newBullet);
        aliens[i].classList.add('alienHit');
        bulletFired = false;
        score += 10;
        scoreDisplay.textContent = score;
        aliensHit++;
      }
    }
  }
}

function shieldHit(bulletMovement){
  for(var i = 0; i < shields.length; i++){
    if (bullet.element.getBoundingClientRect().bottom < shields[i].getBoundingClientRect().bottom && bullet.element.getBoundingClientRect().top > shields[i].getBoundingClientRect().top && bullet.element.getBoundingClientRect().left > shields[i].getBoundingClientRect().left && bullet.element.getBoundingClientRect().right < shields[i].getBoundingClientRect().right) {
      clearInterval(bulletMovement);
      bulletFired = false;
      bullet.y = 55;
      document.body.removeChild(newBullet);
      bullet.element.style.display = 'none';
    }
  }
}


// document.addEventListener('keyup', (e) => {

//   if (event.keyCode === 13 && !levelComplete) {

//     alienBullet1Fired = true;
//     a1Bullet.element.style.left = aliens[0].x + 1.85 + 'vw';
//     a1Bullet.element.style.bottom = a1Bullet.y + 'px';

//     if (e.preventDefault) {
//       e.preventDefault();
//     } else {
//       e.returnValue = false;
//     }
//     var kc = e.keyCode || e.which;
//     keys[kc] = e.type == 'keyup';
//     document.body.appendChild(alienBullet1);
//   }
// });


// const moveA1Bullet = (dx, dy) => {

// a1Bullet.x += (dx || 0) * a1Bullet.speedMultiplier;
// a1Bullet.y += (dy || 0) * a1Bullet.speedMultiplier;
// a1Bullet.element.style.bottom = a1Bullet.y + 'px';

// };


// const detectA1BulletMovement = () => {
// if ((keys[keys.ENTER])) {
//   if (!a1BulletFired && !levelComplete) {


    
// a1BulletFire(a1BulletMovement);

//     alienBullet1Fired = false;
//     a1Bullet.element.style.display = 'block';
//     a1Bullet.y = aliens[0].y;
//     a1Bullet.element.style.left = aliens[0].x + 1.85 + 'vw';
//   }
// }

// };

// moveA1Bullet();
// /// game loop
// setInterval(function () {
// detectA1BulletMovement();
// }, 10);

// var a1BulletMovement = setInterval(a1BulletFire, 5);

// function a1BulletFire(a1BulletMovement) {

//       if(alienBullet1Fired){
//       moveA1Bullet(0, -0.5);
//       } else {
//       clearInterval(a1BulletMovement);
//       a1Bullet.y = aliens[0];
//     }
//   }