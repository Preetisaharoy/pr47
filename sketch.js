var bg;
var player,playerbullet,playerImg,playerbulletImg, playerbulletGrp;
var enemy, enemyImg, enemyGrp;
var fuel, fuelImg, fuelGrp;
var life = 4;
var score = 0;

function preload() {
  bg = loadImage("background.png");
  playerImg = loadImage("player.png");
  enemyImg = loadImage("enemy.png");
  fuelImg = loadImage("fuel.png");
  playerbulletImg = loadImage("playerbullet.png");
}

 

function setup() {
  //createCanvas(400,800);
  createCanvas(windowWidth,windowHeight);
  //createSprite(400, 200, 50, 50);
   player = createSprite(displayWidth-750, displayHeight-250, 50, 50);
   player.addImage(playerImg)
   player.scale = 0.3;
   player.debug = false;
   player.setCollider("rectangle",0,0,200,400);

   enemyGrp = new Group();
   fuelGrp = new Group();
   playerbulletGrp = new Group();
   
}

function draw() {
  background(0);  
  background(bg);

  /*if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }*/
  if(keyDown("space")){
    spawnBullets();
  }

  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-30
  }
  if(keyDown("RIGHT_ARROW")||touches.length>0){
   player.x = player.x+30
  }
  //life
  textSize(35);
  fill("white");
  text("life="+life,50,50);
  
  //score
  textSize(35);
  fill("white");
  text("score="+score,1250,50);

  enemyAttack();
  fuelTank();
  //handleGameover();
  if(enemyGrp.isTouching(playerbulletGrp)){
    console.log("hi");
    //tint(255,50);
    enemyGrp.destroyEach();  
    playerbulletGrp.destroyEach();

    if (life > 0) {
      score=score+1;
   }
    //score = score +1;
  }
  if(fuelGrp.isTouching(player)){
    life = life +1;
    fuelGrp.destroyEach();
  }
  

  drawSprites();

  
}

function enemyAttack(){
  if(World.frameCount % 50 === 0){
    enemy = createSprite(random(50,1400),windowHeight-850, 50,50);
    enemy.addImage(enemyImg);
    enemy.scale = 0.15;
    enemy.velocityY = 2; 
    enemyGrp.add(enemy); 
    //player.debug=true;
    //player.setCollider("rectangle",0,0,400,1000);
 
 }
}

function fuelTank(){
  if(World.frameCount % 150 === 0){
    fuel = createSprite(random(50,1400),windowHeight-850, 50,50);
    fuel.addImage(fuelImg);
    fuel.scale = 0.04;
    fuel.velocityY =2;
    fuelGrp.add(fuel); 
    //fuel.debug=true;
    //fuel.setCollider("rectangle",0,0,400,1000);
  }

}

function spawnBullets(){
  playerbullet = createSprite(player.x,player.y,10,10);
  playerbullet.addImage(playerbulletImg);
  playerbullet.scale = 0.3;
  playerbullet.velocityY = -3;
  playerbulletGrp.add(playerbullet);
}

/*function handleGameover(){
  
  life=life-1;
  enemyGrp.destroyEach();
}*/