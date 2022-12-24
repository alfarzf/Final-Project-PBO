let bullets = []
let monsters = []
let c = 1;
let score = 0;
let runGame = 1;
let win = 0;
let lose = 0;
function setup() {
  
  createCanvas(400, 400);
  level = new Level(c);
  monster = new Monster(25,25,0,0,level);
  
}

function draw() {
  
  if (runGame){
    
    background(51);
    hero = new Hero(25, 25, mouseX, height-50, level);
    hero.render();
    monster.render();
    
    let textscore = 'score = '+score;
    let textlv = 'lv.' + c;
    textSize(12);
    fill('white')
    text(textscore, 10, 20);
    text(textlv, 10, 30);

    //collisions + score
    for (let monster of monsters){

      for (let bullet of bullets){

        if (dist(monster.x, monster.y, bullet.x, bullet.y) < 25){

          monsters.splice(monsters.indexOf(monster),1);
          bullets.splice(bullets.indexOf(bullet), 1);

          //increase score
          // ...
          score += 1;
          console.log("killed!")

        }
        
        if (bullet.y < 0){
          
          bullets.splice(bullets.indexOf(bullet), 1);
          
        }

      }
  
      //game over
      if (monster.y > 375){

        console.log("game over!");
        monsters = []
        // createCanvas(400, 400);
        // background(51);
        runGame = 0;
        lose = 1;

      }

    }

    //kalo hero ngalahin 1 monster +1 score (done)
    //kalo score mencukupi level up (c += 1 & instance new level + new Monster)
    if (monsters.length == 0 && c < level.getMaxLevel()){

      //... c +=1; instance level; instance monster
      c += 1;
      level = new Level(c);
      bullets = []
      monster = new Monster(25,25,0,0,level);
      // console.log(score);

    }
    
    if (score == 60){
      
      //win game
      runGame = 0;
      win = 1;
      
    }
    
  }
  
  if (lose){
    
    background('red');
    textSize(32);
    text('GAME OVER!', 100, 200);
    
    
  }
  
  if (win){
    
    background('green');
    textSize(32);
    text('YOU WIN!', 110, 200);
    
  }
  
  
}

function mousePressed(){
  
  // console.log('clicked!');
  // console.log(hero.getEntityPositionX());
  hero.attack();
  
}

class Level{
  
  constructor(lv){  
  
    this.currentLevel = lv;
    this.latestLevel = 0;
    this.maxLevel = 3;
  
  }
  
  getCurrentLevel(){
    
    return this.currentLevel;
    
  }
  
  getMaxLevel(){
    
    return this.maxLevel;
  }
  
}

class Entity{
  
  constructor(width, height, x, y){
    
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    
  }
  getEntityPositionX(){
    
    return this.x;
    
  }
  
  getEntityPositionY(){
    
    return this.y;
    
  }
  
}

class Hero extends Entity{
  
  constructor(width, height, x, y, level){
    
    super(width, height, x, y);
    this.level = level;
    
  }
  
  render(){
    
    //render hero
    circle(this.x, this.y, this.width);
    
    //render bullet
    for (let bullet of bullets){
      
      circle(bullet.x, bullet.y, 10);
      
      if (this.level.getCurrentLevel() == 1){
        
        bullet.y -= 2;
        
      }
      else if (this.level.getCurrentLevel() == 2){
        
        bullet.y -= 4;
        
      }else{
        
        bullet.y -= 6;
        
      }
      
    }
    
  }
  
  attack(){
    
    let bullet = {
    
      x : this.x,
      y : this.y
    
    }
    
    bullets.push(bullet)
    
  }
  
} 


class Monster extends Entity{
  
  constructor(width, height, x, y, level){
    
    super(width, height, x, y);
    
    if (level.getCurrentLevel() == 1){
        
      this.speed = 1;
        
    }else{
        
      this.speed = 2;
        
    }
    
    for (let i = 0; i < level.getCurrentLevel()*10; i++){

      let monster = {
        
        x: random(0, 375),
        y: random(-800, 0)

      }

      monsters.push(monster)
      
    }
      
    
  }
  
  
  render(){
    
    for (let monster of monsters){
        
        monster.y +=this.speed;
        rect(monster.x, monster.y, this.width);

    }
    
  }
  

}

