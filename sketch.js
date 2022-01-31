const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const body = Matter.Body;
const constaraint = Matter.Constraint;
const composites= Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,bomb,ground;
var bomb_con,bomb_img;
var building,building_img;
var building2,building_img2;
var crane,crane_img;

var destroy;

function preload()
{
  bomb_img = loadImage('bomb.png');
  building_img = loadImage('building.png');
  building_img2= loadImage('building2.png');
  crane_img=loadImage("crane.png"); 

  destroy = loadAnimation("building2.png");

  destroy.playing = true;
}

function setup(){
  createCanvas(500,700);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(250,height,width,20);
  
  building = createSprite(230,620,100,100);
  building.addImage(building_img)
  building.scale = 0.2;

  building.addAnimation('destroying',destroy);

  bomb = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,bomb);

  bomb_con = new Link(rope,bomb);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);

  push();
  imageMode(CENTER);
  if(bomb!=null){
    image(bomb,bomb.position.x,bomb.position.y,70,70);
  }
  pop();

  rope.show();
  

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(bomb,building)==true)
  {
    World.remove(engine.world,bomb);
    bomb = null;
    building.changeAnimation('destroying');
  }

  
}

function drop()
{
  rope.break();
  bomb_con.dettach();
  bomb_con= null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
