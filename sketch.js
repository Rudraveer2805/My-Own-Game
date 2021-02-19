const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, Villain1,Villain2;
var backgroundImg,platform;
var grenade, slingshot;

var gameState = "onSling";
var bg = "backGround.png";
var score = 0;

function preload() {
    backgroundImg=loadImage("bg.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,100);
    box2 = new Box(920,320,70,100);
    Villain1 = new Villain(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,100);
    box4 = new Box(920,240,70,100);
    Villain2 = new Villain(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,100);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    grenade = new Grenade(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(grenade.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    Villain1.display();
    Villain1.score();
    log1.display();

    box3.display();
    box4.display();
    Villain2.display();
    Villain2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    grenade.display();
    platform.display();
    //log6.display();
    slingshot.display();
    
    if (score === 400) {
        fill("lime")
        textSize(65)
        text("You Win",500,200);
        
      }
    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(grenade.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       slingshot.attach(grenade.body);
       Matter.Body.setPosition(grenade.body,{x:200,y:50})
       grenade.trajectory = []
    }
}

