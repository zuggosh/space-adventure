'use strict';

function music(){
  let BGMusic = game.add.audio('bgMusic');
      BGMusic.onDecoded.add(start, this);

  function start() {
    BGMusic.fadeIn(1000);
    BGMusic.loopFull(0.8);
  }
}

function weapon (){
  rightCannon = game.add.sprite(fieldWidth - game.cache.getImage('cannon').height, fieldHeight - game.cache.getImage('cannon').height + 40, 'cannon');
  rightCannon.anchor.setTo(0.1, 0.5);
  leftCannon = game.add.sprite(0 + game.cache.getImage('cannon').height, fieldHeight - game.cache.getImage('cannon').height + 40, 'cannon');
  leftCannon.anchor.setTo(0.1, 0.5);
  game.input.onDown.add(shotEmulation, this);
  function shotEmulation (){
    let shotSound = game.add.audio('shotSound', 0.1);
    shotSound.play();
    leftCannon.loadTexture('cannonShot');
    rightCannon.loadTexture('cannonShot');
    setTimeout(function(){
      leftCannon.loadTexture('cannon');
      rightCannon.loadTexture('cannon');
    },100)
  }
}

function weaponUpdate(){
  rightCannon.rotation = game.physics.arcade.angleToPointer(rightCannon);
  leftCannon.rotation = game.physics.arcade.angleToPointer(leftCannon);
}
