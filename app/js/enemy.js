'use strict';

function Enemy(){
  this.mx = game.width - game.cache.getImage('enemyLarge').width;
  this.my = game.height - game.cache.getImage('enemyLarge').height - 150;
  this.sprite = game.add.sprite(game.rnd.integerInRange(0, this.mx), game.rnd.integerInRange(15, this.my), 'extraSmall');
  this.life = 0;
  function destroySprite (sprite) {
    this.sprite.destroy();
    counter++;
  }
  this.update = () => {
    this.life++;
    if(this.sprite.alive){
      this.sprite.x += game.rnd.integerInRange(-2, 2);
      this.sprite.y -= game.rnd.integerInRange(-2, 2);
      if(this.sprite.x < - this.sprite.width){
        this.sprite.x = game.world.width;
      }
      if(this.sprite.x > game.world.width){
        this.sprite.x = 0;
      }
      if(this.sprite.y < -this.sprite.height){
        this.sprite.y = game.world.height;
      }
      if(this.sprite.y > game.world.height){
        this.sprite.y = 0;
      }
      if(this.life > 300 && this.life < 499){
        this.sprite.loadTexture('enemySmall');
      }
      else if(this.life > 500){
        this.sprite.loadTexture('enemy');
      }
      else if(this.life > 1000){
        this.sprite.loadTexture('enemyLarge');
      }
      this.sprite.inputEnabled = true;
      this.sprite.events.onInputDown.add(destroySprite, this);
    }
  }
  this.end = () =>{
    this.sprite.destroy();
  }
  return{
    update: this.update,
    end: this.end
  }
}

function createEnemy(){
  if(counter >= 100){
    for(let i = 0; i < enemies.length; i++){
      enemies[i].end();
    }
    speed = 15;
    return;
  }
  var enemy = new Enemy();
  enemies.push(enemy);
}

function enemyUpdate (){
  for(let i = 0; i < enemies.length; i ++){
    enemies[i].update();
  }
}
