'use strict';

function enemy (){
  function create(){
    let mx = game.width - game.cache.getImage('enemyLarge').width;
    let my = game.height - game.cache.getImage('enemyLarge').height - 150;

    let sprite = game.add.sprite(game.rnd.integerInRange(0, mx), game.rnd.integerInRange(15, my), 'extraSmall');
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
    setTimeout(largeTexture, 6000);

    function destroySprite (sprite) {
      sprite.destroy();
      counter++;
      console.log(counter);
    }
  }
  function enemyUpdate (){
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
  }
  return{
    create,
    enemyUpade
  }
}
