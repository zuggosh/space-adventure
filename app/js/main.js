'use strict';

var fieldWidth = document.getElementById('fieldGame').clientWidth;
var fieldHeight = document.getElementById('fieldGame').clientHeight;

var counter = 0;
var textCounter;
var enemies = [];
var speed = 4;

var stars = new Stars();
var weapon = new Weapons();

var game = new Phaser.Game(fieldWidth, fieldHeight, Phaser.AUTO, 'fieldGame', {
            preload: preload,
            create: create,
            update: update
            });

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
gameControl();
function create() {
  game.paused = true;
  let background = game.add.sprite(0, 0, 'space');
  music();
  stars.create();
  weapon.create();
  game.time.events.loop(1000, createEnemy, this);
  counterText().create();
}
function requestLock() {
  game.input.mouse.requestPointerLock();
}
function update() {
  enemyUpdate();
  counterText().update();
  stars.update();
  weapon.update();
}
