'use strict';

function Stars(){
  let distance = 200;
  let stars;
  let max = 200;
  let xx = [];
  let yy = [];
  let zz = [];
  function create(){
    if (game.renderType === Phaser.WEBGL){
      max = 2000;
    }
    let addStart = game.add.spriteBatch();
    stars = [];
    for (let i = 0; i < max; i++)
    {
      xx[i] = Math.floor(Math.random() * 800) - 400;
      yy[i] = Math.floor(Math.random() * 600) - 300;
      zz[i] = Math.floor(Math.random() * 1700) - 100;
      let star = game.make.sprite(0, 0, 'star');
      star.anchor.set(0.5);
      addStart.addChild(star);
      stars.push(star);
    }
  }
  function update(){
    for (let i = 0; i < max; i++)
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
  return{
    create,
    update
  }
}
