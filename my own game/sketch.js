var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, ;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var bg,bgImg;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var dog,dogImg1,dogImg2,dogImg3,dogImg3,dogImg4,dogImg5,dogImg6,dogImg7,dogImg8,dogImg9,dogImg10,dogImg11,dogImg12,dogImg13;

function preload(){
  boy_running = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png");

  
  groundImage = loadImage("ground2.png");
  
  bgImg = loadImage("images/runningBackground.png")
  
  obstacle1 = loadImage("images/ob1.png");
  obstacle2 = loadImage("images/ob1.png");
  obstacle3 = loadImage("images/ob1.png");
  obstacle4 = loadImage("images/ob1.png");
 

  dogImg1 = loadImage("images/running1.png");
  dogImg2 = loadImage("images/running2.png");
  dogImg3 = loadImage("images/running3.png");
  dogImg4 = loadImage("images/running4.png");
  dogImg5 = loadImage("images/running5.png");
  dogImg6 = loadImage("images/running6.png");
  dogImg7 = loadImage("images/running7.png");
  dogImg8 = loadImage("images/running8.png");
  dogImg9 = loadImage("images/running3.png");
  dogImg10 = loadImage("images/running10.png");
  dogImg11 = loadImage("images/running11.png");
  dogImg12 = loadImage("images/running12.png");
  dogImg13 = loadImage("images/running13.png");
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  boy = createSprite(30,160,20,50);
  boy.addAnimation("running", boy_running);


  boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  boy.setCollider("rectangle",0,0,trex.width,trex.height);
  boy.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

  
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        gameState = END;
     
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
    
     
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0); 
     
       
  
 
  //stop trex from falling down
  boy.collide(invisibleGround);
  

  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  boy.changeAnimation("running",boy_running);
  
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage();
              break;
      case 2: obstacle.addImage();
              break;
      case 3: obstacle.addImage();
              break;
      case 4: obstacle.addImage();
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
}
