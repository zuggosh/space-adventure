var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload (){
  game.load.image('bgImg', 'img/Priroda.jpg');
  game.load.image('aim', 'img/aim.png');
}

function create() {
  var s = game.add.sprite(0, 0, 'bgImg');
}
