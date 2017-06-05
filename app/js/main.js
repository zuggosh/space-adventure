'use strict';

var fieldWidth = document.getElementById('fieldGame').clientWidth;
var fieldHeight = document.getElementById('fieldGame').clientHeight;
var enemies = [];
var counter = 0;
var textCounter;

/*stars*/
var distance = 200;
var speed = 4;
var stars;
var max = 200;
var xx = [];
var yy = [];
var zz = [];

var rightCannon;
var leftCannon;

var game = new Phaser.Game(fieldWidth, fieldHeight, Phaser.AUTO, 'fieldGame', { preload: preload, create: create, update: update });

function preload (){
  /*image*/
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

  /*audio*/
  game.load.audio('bgMusic', 'audio/bgTreck.mp3');
  game.load.audio('shotSound', 'audio/shot.mp3');

  /*fonts*/
  game.load.bitmapFont('fontCosmic', 'fonts/Merkur.png', 'fonts/Merkur.fnt');
}

function create() {
  let background = game.add.sprite(0, 0, 'space');
  music();
  stars();
  weapon();
  game.time.events.loop(1000, enemy.create(), this);
  game.time.events.loop(5000, clearDeadEnemies, this);

  textCounter = game.add.bitmapText(game.world.centerX, fieldHeight - 50, 'fontCosmic', 'Score: ' + counter, 64);
  textCounter.anchor.set(0.5);
}

function requestLock() {
  game.input.mouse.requestPointerLock();
}

function update() {
  enemy.enemyUpdate();
  spaceUpdate();
  weaponUpdate();
  textCounter.text = 'Score: ' + counter
}

function clearDeadEnemies(){
  enemies = enemies.filter(sprite => sprite.alive);
}
