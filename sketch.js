var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,300);
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.4
  spookySound.loop();
}

function spawnDoors(){
  if(frameCount % 230 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImg)
    door.velocityY = 1
    door.lifetime = 700
    door.x = Math.round(random(100, 400))
    ghost.depth = door.depth
    ghost.depth += 1
    doorsGroup.add(door);

    climber = createSprite(200, 10)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 700
    climber.x = door.x
    climberGroup.add(climber);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = 700
    invisibleBlock.x = door.x
    invisibleBlock.debug = true
    invisibleBlockGroup.add(invisibleBlock)
  }

}

function draw() {
  background(0);

  if(gameState === "play"){

    if(tower.y > 400){
        tower.y = 300
      }

    if(keyDown(UP_ARROW)){
      ghost.velocityY = -5
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x - 5 
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 5
    }

    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState = "end"
    }

    ghost.velocityY = ghost.velocityY + 0.8
    spawnDoors();
    drawSprites();
  }
  if(gameState === "end"){
    fill("red")
    textSize(35)
    text("Game Over!!!", 200, 300)
    
  }
}
