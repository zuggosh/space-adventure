'use strict';

function gameControl() {
  let startGame = document.getElementById('play');
  let pauseGame = document.getElementById('pause');
  let replGame = document.getElementById('replay');
  startGame.onclick = function(){
    game.paused = false;
  }
  pauseGame.onclick = function(){
    game.paused = true;
  }
  replGame.onclick = function(){
    game.state.restart();
  }
}

function music(){
  let BGMusic = game.add.audio('bgMusic');
      BGMusic.play();
      BGMusic.loopFull();
}

function counterText(){
  function create(){
    textCounter = game.add.bitmapText(game.world.centerX, fieldHeight - 50, 'fontCosmic', 'Score: ' + counter, 64);
    textCounter.anchor.set(0.5);
  }
  function update(){
    textCounter.text = 'Score: ' + counter;
  }
  return{
    create,
    update
  }
}
