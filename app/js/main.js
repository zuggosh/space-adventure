var fieldWidth = 800;
var fieldHeight = 600;
var enemies = [];
var counter = 0;

var distance = 200;
var speed = 4;
var stars;


var max = 200;
var xx = [];
var yy = [];
var zz = [];
var BGMusic;
var rightCannon;
var leftCannon;

var game = new Phaser.Game(fieldWidth, fieldHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload (){
  game.load.image('space', 'img/space.jpg');
  game.load.image('star', 'img/dust.png');
  game.load.image('aim', 'img/aim.png');
  game.load.image('enemy', 'img/enemy.png');
  game.load.image('extraSmall', 'img/enemyExtrasmall.png');
  game.load.image('enemySmall', 'img/enemySmall.png');
  game.load.image('enemyLarge', 'img/enemyLarge.png');
  game.load.image('cannon', 'img/cannon.png');
  game.load.image('cannonShot', 'img/cannonShot.png');
  game.load.image('laser', 'img/laser.png');

  game.load.audio('bgMusic', 'audio/bgTreck.mp3');
}

function create() {
  BGMusic = game.add.audio('bgMusic', "0.2", true);
  BGMusic.onDecoded.add(start, this);

  let background = game.add.sprite(0, 0, 'space');

  /*STARS*/
  if (game.renderType === Phaser.WEBGL)
      {
          max = 2000;
      }
      var addStart = game.add.spriteBatch();
      stars = [];
      for (var i = 0; i < max; i++)
      {
          xx[i] = Math.floor(Math.random() * 800) - 400;
          yy[i] = Math.floor(Math.random() * 600) - 300;
          zz[i] = Math.floor(Math.random() * 1700) - 100;
          var star = game.make.sprite(0, 0, 'star');
          star.anchor.set(0.5);
          addStart.addChild(star);
          stars.push(star);
      }

  weapon();

  game.time.events.loop(1000, enemy, this);
  game.time.events.loop(5000, clearDeadEnemies, this);
}

function weapon (){
  rightCannon = game.add.sprite(fieldWidth - game.cache.getImage('cannon').height, fieldHeight - game.cache.getImage('cannon').height + 40, 'cannon');
  rightCannon.anchor.setTo(0.1, 0.5);
  leftCannon = game.add.sprite(0 + game.cache.getImage('cannon').height, fieldHeight - game.cache.getImage('cannon').height + 40, 'cannon');
  leftCannon.anchor.setTo(0.1, 0.5);
  game.input.onDown.add(changeTexture, this);
  function changeTexture (){
    if (rightCannon.key === 'cannon'){
      rightCannon.loadTexture('cannonShot', 0, false);
      leftCannon.loadTexture('cannonShot', 0, false);
    }
   else{
     rightCannon.loadTexture('cannon', 0, false);
     leftCannon.loadTexture('cannon', 0, false);
   }
  }
}

function enemy (){
  let mx = game.width - game.cache.getImage('enemyLarge').width;
  let my = game.height - game.cache.getImage('enemyLarge').height - 150;

  let sprite = game.add.sprite(game.rnd.integerInRange(0, mx), game.rnd.integerInRange(0, my), 'extraSmall');
  enemies.push(sprite);
  function smallTex(){
    sprite.loadTexture('enemySmall');
  }
  function mediumTex(){
    sprite.loadTexture('enemy');
  }
  function largeTexture(){
    sprite.loadTexture('enemyLarge');
  }
  sprite.inputEnabled = true;
  sprite.events.onInputDown.add(destroySprite, this);
  setTimeout(smallTex, 1000);
  setTimeout(mediumTex, 3000);
  setTimeout(largeTexture, 5000);
}

function requestLock() {
  game.input.mouse.requestPointerLock();
}

function update() {

  rightCannon.rotation = game.physics.arcade.angleToPointer(rightCannon);
  leftCannon.rotation = game.physics.arcade.angleToPointer(leftCannon);

  for(let i = 0; i < enemies.length; i ++){
    if(enemies[i].alive){
      enemies[i].x += game.rnd.integerInRange(-2, 2);
      enemies[i].y -= game.rnd.integerInRange(-2, 2);
      if(enemies[i].x < -enemies[i].width){
        enemies[i].x = game.world.width;
      }
      if(enemies[i].x > game.world.width){
        enemies[i].x = 0;
      }
      if(enemies[i].y < -enemies[i].height){
        enemies[i].y = game.world.height;
      }
      if(enemies[i].y > game.world.height){
        enemies[i].y = 0;
      }
    }
  }

  for (var i = 0; i < max; i++)
    {
        stars[i].perspective = distance / (distance - zz[i]);
        stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
        stars[i].y = game.world.centerY + yy[i] * stars[i].perspective;
        zz[i] += speed;
        if (zz[i] > 290)
        {
            zz[i] -= 600;
        }
        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
        stars[i].scale.set(stars[i].perspective / 2);
        stars[i].rotation += 0.1;
    }


}

function destroySprite (sprite) {
  sprite.destroy();
  counter++;
  console.log(counter);
}

function clearDeadEnemies(){
  enemies = enemies.filter(sprite => sprite.alive);
}

function start() {
  BGMusic.fadeIn(1000);
}

function moveEmulation(numX, numY){
  if(numX === 1){
    enemies[i].x -=2;
  }
  if(numX === 2){
    enemies[i].x +=2;
  }
  if (numY === 1) {
    enemies[i].y -=2;
  }
  if (numY === 2) {
    enemies[i].y +=2;
  }
}
