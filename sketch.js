 
var monkey_running,monkey;
var banana_img;
var  stone_img;
var  jungle_img,hider,gameOver;
var score = 0;
var distance;
function preload(){
  monkey_running= loadAnimation("Monkey_01.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  stone_img = loadImage("stone.png");
  jungle_img = loadImage("jungle.jpg");
 }

function setup() {
  createCanvas(displayWidth, displayHeight);

  jungle = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  jungle.addImage("jungle",jungle_img);
  jungle.scale = 2;

  score = score+Math.round(getFrameRate ()/60);
  text("SCORE: " + score,500,50);
  
  monkey = createSprite(150,950,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.3;

 
  invisibleGround = createSprite(displayWidth/2,1000,displayWidth,10);
  invisibleGround.visible = false;
  
  bananaGroup =  new Group();
  stoneGroup =  new Group();

  hider = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  hider.visible = false;
  hider.shapeColor = "black"

  distance = 0;
}

function draw() {
  background(220);
  
   camera.position.x = monkey.x;
   camera.position.y = monkey.y;

  if(keyDown("space") && monkey.y >= 280){
      monkey.velocityY = -16 ;
  }
  monkey.velocityY = monkey.velocityY + 0.6;
  monkey.x = monkey.x+5


      if(distance > invisibleGround.width/2){
        invisibleGround.x= displayWidth/2;
        jungle.x = displayWidth/2;
        monkey.x = 150;
        distance = 0;
     }
  
  if(stoneGroup.isTouching(monkey)){
      monkey.destroy();
      //hider.visible = true;
    }
  
  if(bananaGroup.isTouching(monkey)){
      score = score+2;
      bananaGroup.destroyEach();
  }
  
  
  monkey.collide(invisibleGround);
  stoneGroup.collide(invisibleGround);
  spawnBanana();
  spawnStone();
  drawSprites();  
  fill("white");
  textSize (60);
  text("SCORE: " + score,800,150);
}


 function spawnBanana(){
    if(frameCount % 80 ===0){
     var banana = createSprite(900,(random(660,750)));
       banana.addImage("banana",banana_img);
       banana.scale = 0.1;
       banana.velocityX = -8;
       banana.lifetime = 120;
       bananaGroup.add(banana);
       //banana.depth = hider.depth;
       //hider.depth = hider.depth + 1;
    }
  }
  
function spawnStone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite((random(1100,1900)),950,10,40);
     stone.velocityX = -10;
     stone.setCollider("circle",0,0,150);
     stone.addImage("stone",stone_img);
     stone.scale = 0.255;
     stone.lifetime = 180;
     stoneGroup.add(stone);
    // stone.depth = hider.depth;
     //hider.depth = hider.depth + 1;
  }
}
  







