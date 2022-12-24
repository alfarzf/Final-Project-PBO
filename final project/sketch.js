let bullets = []
let monsters = []
let c = 1;
let score = 0;
let runGame = 1;
let win = 0;
let lose = 0;
var heroImage;
var monsterImage;
var bulletImage;
var bulletSound;
var destroySound;
const spd=5;
let pressedKeys={};


function setup() {
  maps=new Maps(400,400)
  createCanvas(maps.getWidth(), maps.getHeight());
  level = new Level(c);
  hero = new Hero(0, 0, 200, height-50, level);
  monster = new Monster(0,0,0,0,level);
  monsterImage.resize(30, 30);
  imageMode(CENTER);
  
}

function draw() {
  
  if (runGame){
    
    background(51);
    // hero = new Hero(0, 0, 200, height-50, level);
    hero.render();
    heroImage.resize(30, 30);
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
          destroySound.play();

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
      monster = new Monster(0,0,0,0,level);
      monsterImage.resize(30, 30);
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
  bulletSound.play();
  
}

function keyPressed() {
  pressedKeys[key]=true;
}

function keyReleased(){
  delete pressedKeys[key];
}
class Maps{
  constructor(width, height){
    
    this.width = width;
    this.height = height;
    
  }
  getWidth(){
    
    return this.width;
    
  }
  getHeight(){
    
    return this.width
    
  }
  move(){
    
  }
}

class Level{
  
  constructor(lv){  
  
    this.currentLevel = lv;
    this.latestLevel = 0;
    this.maxLevel = 3;
  
  }
  
  setLevel(lv){
    this.currentLevel = lv;
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
  
  moveRight(){
    
    this.x+=1;
    
  }
  
  moveLeft(){
    
    this.x-=1;
    
  }
  
  moveUp(){
    
    this.y-=1;
  }
  
  moveDown(){
    
    this.y+=1;
  }
  
  getEntityPositionX(){
    
    return this.x;
    
  }
  
  getEntityPositionY(){
    
    return this.y;
    
  }
  
  attack(){
    
    let bullet = {
    
      x : this.x,
      y : this.y
    
    }
    
    bullets.push(bullet)
    
  }
  
}

class Hero extends Entity{
  constructor(width, height, x, y, level){
    
    super(width, height, x, y);
    this.level = level;
    
  }
  
  render(){
    let move=createVector(0,0);
    if(pressedKeys.a){
      hero.moveLeft();
      move.x-=1;
    }
    if(pressedKeys.d){
      hero.moveRight();
      move.x+=1;
    }
    if(pressedKeys.w){
      hero.moveUp();
      move.y-=1;
    }
    if(pressedKeys.s){
      hero.moveDown();
      move.y+=1;
    }
    move.setMag(spd);
    this.x+=move.x;
    this.y+=move.y;
    //render hero
    image(heroImage, this.x, this.y, this.width);
    //render bullet
    for (let bullet of bullets){
      
      image(bulletImage, bullet.x, bullet.y, 10);
      bulletImage.resize(30, 30);
      
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
        image(monsterImage, monster.x, monster.y, this.width);

    }
    
  }
  
}

function preload(){
  heroImage = loadImage('hero.png');
  monsterImage = loadImage('monster.png');
  bulletImage = loadImage('bullet.png');
  bulletSound = loadSound('Bsound.ogg');
  destroySound = loadSound('Dsound.ogg');
}
