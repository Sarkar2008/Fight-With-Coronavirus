var scene, sceneImg;
var bg, bgImg;
var txt, txtImg;
var player, playerImg;
var GreenVImg, GreenV2Img, redVImg;
var mask, maskImg;
var cover, coverImg;
var restart, restartImg;
var gameover, gameoverImg;
var obstaclesGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mask_collect;
var over_sound;
var bg_music;

function preload(){
sceneImg = loadImage("bg.png");
GreenVImg = loadImage("virus green.png");
GreenV2Img = loadImage("green virus.png");
redVImg = loadImage("red virus.png");
coverImg = loadImage("cover.png");
restartImg = loadImage("restart.png");
gameoverImg = loadImage("end.png");
maskImg = loadImage("mask.png");
playerImg = loadImage("mainPlayer.png");
bgImg = loadImage("background.png");
txtImg = loadImage("txt.png");
mask_collect = loadSound("mask_sound.mp3");
over_sound = loadSound("gameover_sound.mp3");
}

function setup() {
createCanvas(900,575);

scene = createSprite(300,180,400,20);
scene.addImage(sceneImg);
scene.x = scene.width/2;
scene.velocityX = -(6 + score/3);

bg = createSprite(450,300,400,20);
bg.addImage(bgImg);
bg.scale = 6;

cover = createSprite(450,300,400,20);
cover.addImage(coverImg);
cover.scale = 1;

txt = createSprite(455,110);
txt.addImage(txtImg);
txt.scale = 0.5;

restart = createSprite(450,250);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

gameover = createSprite(450,200);
gameover.addImage(gameoverImg);
gameover.scale = 0.5;
gameover.visible = false;

player = createSprite(70,400);
player.addImage(playerImg);
player.scale = 0.8;
//player.debug = true
player.setCollider("rectangle",0,15,135,50);

maskGroup = new Group();
obstaclesGroup = new Group();
}

function draw() {
background(225);

if  (gameState === PLAY){
    if(keyDown("space"))
    {
        cover.visible = false;
        bg.visible = false;
        txt.visible = false;
        cover.destroy();
        bg.destroy();
        txt.destroy();
    }

    if (scene.x < 0)
    {
        scene.x = scene.width/2;
    }

player.y = World.mouseY;


    if(obstaclesGroup.isTouching(player))
    {
        gameState = END;
        obstaclesGroup.destroyEach();
        over_sound.play();
    }

    if(maskGroup.isTouching(player))
    {
        maskGroup.destroyEach();
        score = score + 3;
        mask_collect.play();
    }
}
else if (gameState === END)
 {
    gameover.visible = true;
    restart.visible = true;

    maskGroup.destroyEach();
    obstaclesGroup.destroyEach();
    //set velcity of each game object to 0
    scene.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    maskGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)) 
    {
        reset();
    }
      
}
spawnObstacles();
spawnmasks();
 
 drawSprites();
 textSize(20) ;
 text("Score: "+ score, 50,50);
 text("Avoid corona and grab all the masks!",50,70);
 text("Made by Evelina Sarkar", 600, 550);
}




function spawnObstacles() {
    if(frameCount % 40 === 0) 
    {
      var obstacle = createSprite(930,Math.round(random(20,570),40, 10, 10));
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/3);
      
      //generate random obstacles
      var rand = Math.round(random(1,5));
      switch(rand) {
        case 1: obstacle.addImage(GreenVImg);
                break;
        case 2: obstacle.addImage(GreenV2Img);
                break;
        case 3: obstacle.addImage(redVImg);
                break;
        case 4: obstacle.addImage(GreenVImg);
                break;
        case 5: obstacle.addImage(GreenV2Img);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      obstacle.scale = 0.5;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
      cover.depth = obstacle.depth;
      cover.depth = cover.depth +2;
      bg.depth = obstacle.depth;
      bg.depth = bg.depth +2;
      txt.depth = obstacle.depth;
      txt.depth = txt.depth +2;
    }
  }


  function spawnmasks() {
    //write code here to spawn the clouds
    if (frameCount % 50 === 0) {
      var mask = createSprite(930,120,40,10);
      mask.y = Math.round(random(20,550));
      mask.addImage(maskImg);
      mask.scale = 0.5;
      mask.velocityX = -(6 + 3*score/6);
      
       //assign lifetime to the variable
       mask.lifetime = 200;
      
      
      //add each cloud to the group
      maskGroup.add(mask);

      cover.depth = mask.depth;
      cover.depth = cover.depth +2;
      bg.depth = mask.depth;
      bg.depth = bg.depth +2;
      txt.depth = mask.depth;
      txt.depth = txt.depth +2;
    }
    
  }

  function reset()
  {
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    maskGroup.destroyEach();
    score = 0;
    scene.velocityX = -(6 + score/2);
  }