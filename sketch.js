var allewayImage, bg,count,obstacle,fenceImage;
var cat_sound,dog_sound;
var cat,dog;
var ObstaclesGroup;
var happyDog,happydogImage;
var winningImage, losingImage; 
var ground;
var PLAY = 2;
var END = 1;
var WIN = 0;
var gameState = 2;
function preload(){
  alleywayImage = loadImage("./assets/alleway(merged).jpg")
  catImage = loadImage("./assets/cat-removebg-preview.png")
  dogImage = loadImage("./assets/dog-removebg-preview.png")
  fenceImage = loadImage("./assets/fence-removebg-preview.png")
  cat_sound = loadSound("./assets/mixkit-cartoon-little-cat-meow-91.wav")
  dog_sound = loadSound("./assets/mixkit-dog-barking-twice-1.wav")
  happydogImage = loadImage("./assets/happydog.png")
  winningImage = loadImage("./assets/winbg.jpg")
  losingImage = loadImage("./assets/losebg.jpg")
}

function setup() {
  createCanvas(1900,950);
   ObstaclesGroup = new Group();
 bg = createSprite(950,450)
 bg.scale = 1.80
 bg.addImage(alleywayImage)
 bg.velocityX = -7
 count = count + Math.round(World.frameRate/60);
  dog = createSprite(50,800,50,50)
 dog.addImage(dogImage)
 dog.scale = 0.55
cat = createSprite(920,820,50,50)
 cat.addImage(catImage)
ground = createSprite(width/2,height,width,10);

}
function draw() {
  if(gameState===PLAY){
    background("green");
    if (bg.x < 0){
      bg.x = bg.width/2;
    } 
    spawnObstacles();
    catAutoJump();
    dogJump();
    dogRun();
    finish();
    win();
    drawSprites();
    cat.velocityY = cat.velocityY + 1;
    dog.velocityY = dog.velocityY + 1;
    text(mouseX+","+mouseY,mouseX,mouseY)
    cat.collide(ground);
    dog.collide(ground);
    console.log(dog.velocityX)
    cat.debug=true;
  }
  else if(gameState === END){
    background(losingImage)
    ObstaclesGroup.destroyEach()
    dog.destroy()
    cat.destroy()
    
  }
  else if(gameState === WIN){
   background(winningImage)
    ObstaclesGroup.destroyEach()
    dog.destroy()
    cat.destroy()
    happyDog = createSprite(200,200)
    happyDog.scale=2
    happyDog.addImage(happydogImage)
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0) {
    obstacle = createSprite(1300,850,10,40);
    obstacle.velocityX = -6 
    obstacle.addImage(fenceImage)
    ObstaclesGroup.add(obstacle)    
    dog_sound.play()
    cat_sound.play()
  }
}



function catAutoJump(){
  if(cat.isTouching(ObstaclesGroup)){
    cat.velocityY = -30
    }
}
function dogJump(){
  if(keyDown("SPACE") && dog.y >= 780){
    dog.velocityY = -43
  }
}
function dogRun(){
  if(frameCount% 400 === 0){
    dog.velocityX = dog.velocityX+0.5
  
  }
}
function finish(){
  if(dog.isTouching(ObstaclesGroup) ){
    gameState = END
  }

}
function win(){
  if(dog.isTouching(cat)){
    gameState = WIN
  }
}