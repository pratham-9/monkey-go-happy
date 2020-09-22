var monkey , monkey_running
var ground, ground_running;
var banana ,bananaImage, obstacle, obstacleImage,bananagroup;
var FoodGroup, obstacleGroup;
var score = 0;
var play = 1;
var end  = 0;
var gamestate = play;
var survivaltime = 0;
function preload(){  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground_running = loadImage("ground2.png");
}
function setup() {
  createCanvas(500,500)
  monkey = createSprite(100,350,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  ground = createSprite(200,350,400,10);
  ground.addImage(ground_running);  
  bananagroup=new Group();
  obstacleGroup = new Group();
}
function draw() {
  background('white');
monkey.collide(ground);
  if(gamestate == play)
  {
  if(keyDown("space"))
{
  monkey.velocityY = -15 ;
}
  if(monkey.isTouching(bananagroup))
  {
    bananagroup.destroyEach();
    score = score+1;
 }
    if(monkey.isTouching(obstacleGroup))
    {
      gamestate = end;
    }
  }
  else if(gamestate == end)
  {
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityEach(0);
    bananagroup.setVelocityEach(0); 
    surviavaltime= 0;  
    bananagroup.destroyEach();
    monkey.visible = false;
    score=0; 
    textSize(25);
    text ("GAME OVER",200,200);
  }
  spawnbananas();
  spawnobstacles();
  survival();
    monkey.velocityY = monkey.velocityY + 0.8
  textSize(20);
  text("score "+score,200 ,50);
  textSize(20);
  text("survivaltime:"+survivaltime,200,100);
drawSprites();  
} 
function spawnbananas()
{
if(frameCount % 80 == 0)
{
  banana = createSprite(400,200,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -10;
  bananagroup.add(banana);
}
}
function spawnobstacles()
{
  if(frameCount % 80 == 0 )
  {
    obstacle = createSprite(400,320 ,100,200);
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX=-10; 
   obstacle.lifetime=150;  
    obstacleGroup.add(obstacle);
}
}
function survival()
{
  survivaltime = Math.ceil(frameCount/frameRate());
}