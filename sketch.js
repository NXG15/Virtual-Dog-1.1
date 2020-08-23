var Dog, happyDog;
var foodS, foodStock;
var database;

function preload()
{
  DogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  //Database
  database = firebase.database();
  console.log(database);

  //Food from Firebase
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  //Dog
  Dog = createSprite(250,440,30,70);
  Dog.addImage(DogImg);
  Dog.scale = 0.2;

  
}


function draw() {  
  background(46,139,87);

  //Feed Dog
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Dog.addImage(happyDogImg);
  }

  drawSprites();

  //Text
  textSize(16);
  textFont('Georgia');
  fill("white");
  stroke(46,139,87);
  text("Press up arrow key to feed the dog milk",120,40);

}

//Check food stock
function readStock(data){
  foodS = data.val();
}

//Display food stock
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  });

}

