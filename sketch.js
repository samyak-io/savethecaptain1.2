var cap, capRunImg;
var ground, groundImg;
var backgr, backgroundImg;

//obstacles
var spikes, spikesImg, spikesGroup;
var fireBall, fireBallImg, fireBallGroup;

//coins
var silverCoins, silverCoinsGroup, goldCoins, goldCoinsGroup;


//game states
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var score = 0;

function preload(){
    backgroundImg = loadImage("sprites/bg3.png");
    groundImg = loadImage("sprites/groundImg.png");

    capIdleImg = loadAnimation("sprites/idle-0.png");
    capRunImg = loadAnimation("sprites/run-0.png","sprites/run-1.png","sprites/run-3.png","sprites/run-4.png","sprites/run-5.png","sprites/run-6.png","sprites/run-7.png");

    fireBallImg = loadImage("sprites/fireBall.png");
    spikesImg = loadImage("sprites/spikes.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);

    //create background
    backgr = createSprite(windowWidth/2 + 200, windowHeight/2 - 40, windowWidth, windowHeight);
    backgr.addImage(backgroundImg);
    backgr.x = backgr.width/2;
    
    //create ground
    ground = createSprite(0,backgr.y/2 + 550,windowWidth,10);
    ground.visible = false;
    ground.x = ground.width/2;
    ground.velocityX = -3;

    //create player
    cap = createSprite(windowWidth/8 - 30,ground.y);
    cap.scale = 2.2;
    cap.addAnimation("running",capRunImg);
    cap.addAnimation("idle", capIdleImg);
    
    spikesGroup = new Group();
    fireBallGroup = new Group();

    silverCoinsGroup = new Group();
    goldCoinsGroup = new Group();

}

function draw(){
    background("white");

  if(gameState === PLAY){
    if(ground.x < windowWidth/2){
      ground.x = ground.width/2;
    }

    backgr.velocityX = -5;
    if(backgr.x < 450){
      backgr.x = backgr.width/2;
    }
    // console.log(windowWidth);
    console.log(cap.y);
    spikeObstacles();
    jump();
    fireBallObstacle();
    silverCoin();
    goldCoin();

    if(spikesGroup.isTouching(cap)){
     gameState = END;
   }
  } 
  else if(gameState === END){
    ground.velocityX = 0;
    spikesGroup.setVelocityXEach(0);
    cap.velocityY = 0;
    cap.changeAnimation("idle",capIdleImg);
    backgr.velocityX = 0;
  }
    //collide captain with ground
    cap.collide(ground);

    // console.log(cap.y);
    drawSprites();

    stroke(62, 230, 241);
    fill("darkblue");
    textSize(14);
    text("Score: " + score, windowWidth - 100, windowHeight/8);
}

//press space to jump
function jump(){
  if(keyDown("space") && cap.y >= 686){
    cap.velocityY = - 10;
  }
  //add gravity to the captain
  cap.velocityY = cap.velocityY + 0.6;
}

//spawn spikes 
function spikeObstacles(){
    if(frameCount % 60 === 0){
    spikes = createSprite(windowWidth, ground.y, 20, 20);
    spikes.addImage(spikesImg);
    spikes.scale = 0.15;
    spikes.velocityX = -5;
    spikes.lifetime = 400;
    spikesGroup.add(spikes);
  }
}

function fireBallObstacle(){
  if(frameCount % 20 === 0){
    fireBall = createSprite(windowWidth, random(ground.y - 20, ground.y - 30), 20, 20);
    fireBall.addImage(fireBallImg);
    fireBall.scale = 0.3;
    fireBall.velocityX = - 15;
    fireBall.shapeColor = color("black");
    fireBall.lifetime = 200;
    fireBallGroup.add(fireBall);
  }
}

function silverCoin(){
  if(frameCount % 80 === 0){
    silverCoins = createSprite(windowWidth, random(ground.y - 10, ground.y - 55), 20, 20);
    silverCoins.shapeColor = color("grey");
    silverCoins.velocityX = -7;
    silverCoins.lifetime = 200;
    silverCoinsGroup.add(silverCoins);
  }
}

function goldCoin(){
  if(frameCount % 120 === 0){
    goldCoins = createSprite(windowWidth, random(ground.y - 10, ground.y - 55), 20, 20);
    goldCoins.shapeColor = color("yellow");
    goldCoins.velocityX = -7;
    goldCoins.lifetime = 200;
    goldCoinsGroup.add(goldCoins);
  }
}
