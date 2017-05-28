var fieldWidth = 800;
var fieldHeight = 600;
var enemies = [];
var game = new Phaser.Game(fieldWidth, fieldHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload (){
  game.load.image('bgImg', 'img/Priroda.jpg');
  game.load.image('aim', 'img/aim.png');
  game.load.image('duck', 'img/duck.jpg')
}


function create() {
  let background = game.add.sprite(0, 0, 'bgImg');
  game.time.events.loop(1000, enemy, this);
  game.time.events.loop(5000, clearDeadEnemies, this);
}

function enemy (){
  let sprite = game.add.sprite(game.rnd.integerInRange(0, fieldWidth), game.rnd.integerInRange(0, fieldHeight), 'duck');
  enemies.push(sprite);
  sprite.inputEnabled = true;
  sprite.events.onInputDown.add(destroySprite, this);
  //bot.animations.add('run');
}

function requestLock() {
  game.input.mouse.requestPointerLock();
}

function update() {

  // for(let i = 0; i < enemies.length; i ++){
  //   if(enemies[i].alive){
  //   } else{
  //   }
  // }

}

function destroySprite (sprite) {
  sprite.destroy();
}

function clearDeadEnemies(){
  enemies = enemies.filter(sprite => sprite.alive);
  console.log(enemies);
}
