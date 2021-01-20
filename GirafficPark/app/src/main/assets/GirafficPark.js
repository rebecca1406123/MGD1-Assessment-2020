var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var canvas = document.getElementById("CanvasForGame");
var width = 1400;
var height = 700;
var ctx = canvas.getContext("2d");
var fruitTouched = false;


var Gerald = {
x: width / 2,
y: 485,
width: 145,
height: 145,
velX: 0,
velY: 0
};


var keys = [];
var friction = 0.8;
var eaglesFriction = 0.8;

var EagleImg = new Image();
var eagles = [];

var startTimeMS = 0.8;
var frameX = 0;
var frameXMax = 3;
var frameY = 0;
var frameYMax = 5;
var frame = 0;
var frameMax = 20;
var frameTimer = 0.05;
var frameTimeMax = 0.017;
var spriteWidth = 40;
var spriteHeight = 36;

var eaglesCount = 0;

var GiraffeImg = new Image();
var playImage = new Image();
var quitImage = new Image();
var controlsImage = new Image();
var objectivesImage = new Image();
var musicPauseImg = new Image();


var musicBtnPressed = false;
var score = 0;

var isKeyPressed = false;

var buttonX = [600, 600, 50];
var buttonY = [171, 551, 100];
var buttonWidth = [144, 144, 144];
var buttonHeight = [144, 144, 144];


var mouseX;
var mouseY;

var buttonClicked;

var GeraldDrawn = false;

var bckgrnd = new Audio('bensound-epic.wav');
var sfx = new Audio ('bang.wav');

window.addEventListener("load", function()
{
//  canvas.document.getElementById('gameCanvas');
  //canvasContext = canvas.getContext('2d');
  init();
  showMenu();

  //startGame();
  //gameLoop();

 });

function init()
{
    canvas.width = width;
    canvas.height = height;

    buttonClicked = 0;
}

function showMenu()
{
    bckgrnd.play();

    playImage.src = "playbutton.png";
    playImage.addEventListener('load', e =>
    {
      ctx.drawImage(playImage, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
    });

    quitImage.src = "quitbutton.png";
    quitImage.addEventListener('load', e =>
    {
           ctx.drawImage(quitImage, buttonX[1], buttonY[1] - 80, buttonWidth[1], buttonHeight[1]);
    });

    musicPauseImg.src = "music.png";
            quitImage.addEventListener('load', e =>
            {
                   ctx.drawImage(musicPauseImg, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
            });

        controlsImage.src = "controls.png";
        ctx.drawImage(controlsImage, 100, height/2, 260, 119);

        objectivesImage.src = "objectives.png";
        ctx.drawImage(objectivesImage, 500, height/2, 260, 119);


        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Giraffic Park", 700, 70);




    canvas.addEventListener("mousemove", checkPos);
    canvas.addEventListener("mouseup", checkClick);
};

function checkPos(event)
{
    coords = canvas.relMouseCoords(event);
    mouseX = coords.x;
    mouseY = coords.y;
}

HTMLCanvasElement.prototype.relMouseCoords = function (event)
{
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do
    {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    canvasX = Math.round(canvasX * (this.width / this.offsetWidth));
    canvasY = Math.round(canvasY * (this.height / this.offsetHeight));

    return {x:canvasX, y:canvasY}
}

function checkClick(mouseEvent)
{
    if (mouseX > buttonX[0] && mouseX < (buttonX[0] + buttonWidth[0]))
    {
    console.log("yes");
        if (mouseY > buttonY[0] && mouseY < (buttonY[0] + buttonHeight[0]))
        {
     //   sfx.play();
        console.log("The start button has been pressed");
            buttonClicked = 1;
            startGame();
        }
    }

if (mouseX > buttonX[1] && mouseX < (buttonX[1] + buttonWidth[1]))
{
    if (mouseY > buttonY[1] && mouseY < (buttonY[1] + buttonHeight[1]))
    {
    console.log("the quit button has been pressed");
        buttonClicked = 2;
        quitGame();
    }
}

if (mouseX > buttonX[2] && mouseX < (buttonX[2] + buttonWidth[2]))
{
    if (mouseY > buttonY[2] && mouseY < (buttonY[2] + buttonHeight[2]))
    {
        if (musicBtnPressed == true)
        {
           bckgrnd.pause();
           musicBtnPressed = false;
        }
        else
        {
          bckgrnd.play();
          musicBtnPressed = true;
        }
    console.log("the quit button has been pressed");
        buttonClicked = 3;

    }
}


if (buttonClicked > 0)
{
    canvas.removeEventListener("mousemove", checkPos);
    canvas.removeEventListener("mouseup", checkClick);
}

};

function startGame()
{
  //if (canvas.getContext)
  //{
          canvasX = canvas.width/2;
          canvasY = canvas.height/2;

           GiraffeImg.src = 'GERALD.png';
           EagleImg.src = 'Eagle.png';

        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Score: ", 50, 50);
        //ctx.fillText("place: " + Gerald.x + ", " + Gerald.y, canvas.width/2, canvas.height/2 + 40);


     window.addEventListener('resize', resizeCanvas, false);

    window.addEventListener('orientationchange', resizeCanvas, false);
     window.addEventListener("touchstart", touchDown, false);
     window.addEventListener("touchmove", touchXY, true);
     window.addEventListener("touchend", touchUp, false);

     document.body.addEventListener("touchcancel", touchUp, false);

     document.body.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
            isKeyPressed = true;
        });

        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
            isKeyPressed = false;
        });

     //ctx.drawImage(GiraffeImg, Gerald.x, Gerald.y, Gerald.width, Gerald.height);

     requestAnimationFrame(gameLoop);

/*


        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + score, 100, 20);
*/

    eagles.push({
      x: Math.random() * 1500,
      y: 20,
      width: 150,
      height: 150,
      VelX: 0,
      velY: Math.random() * 10
    });

        eagles.push({
          x: Math.random() * 1500,
          y: 20,
          width: 150,
          height: 150,
          VelX: 0,
          velY: Math.random() * 10
        });

            eagles.push({
              x: Math.random() * 1500,
              y: 20,
              width: 150,
              height: 150,
              VelX: 0,
              velY: Math.random() * 10
            });

                eagles.push({
                  x: Math.random() * 1500,
                  y: 20,
                  width: 150,
                  height: 150,
                  VelX: 0,
                  velY: Math.random() * 10
                });


     resizeCanvas();
  //}
//      ctx.drawImage(GiraffeImg, Gerald.x, Gerald.y, Gerald.width, Gerald.height);

    update();
    gameLoop();

  return;
}

function quitGame()
{
    //System.exit();
    window.close();
}

function restartGame()
{
  score = 0;
  startGame();
}

function update(delta)
{

}

function gameLoop()
{
   console.log("gameLoop");

   var elapsed = (Date.now() - startTimeMS)/1000;
   update(elapsed);

       startTimeMS = Date.now();
       //requestAnimationFrame(gameLoop);
       //render();


   if (keys[39] && Gerald.x < (canvas.width - Gerald.width + 70)) {
   Gerald.velX = Gerald.velX + 0.5;

   }


   if (keys[37] && Gerald.x > Gerald.width) {
   Gerald.velX = Gerald.velX - 0.5;
   }

/*
   if (keys[39] && Gerald.x < (canvas.width - Gerald.width + 70)) {
   Gerald.velX = Gerald.velX + 0.5;

   }


   if (keys[37] && Gerald.x > Gerald.width) {
   Gerald.velX = Gerald.velX - 0.5;
   }

     ctx.drawImage(GiraffeImg, Gerald.x, Gerald.y, Gerald.width, Gerald.height);
*/


  score = score + 1;

 // gameTimer += 1;


/*
if (gameTimer == 100)
{
gameTimer == 0;
*/

    //for (var i = 0; i <= 6; i++)

   /*  if (eaglesCount < 5)
    {
    eaglesCount += 1;
*/       //show eagles on canvas



//ctx.drawImage(EagleImg, eagles[i].x, eagles[i].y, eagles[i].width, eagles[i].height);

       //check if collide with Gerald



  //}

}


function update()
{
  // ctx.clearRect(0, 20, width, height);


//ctx.drawImage(GiraffeImg, Gerald.x, Gerald.y, Gerald.width, Gerald.height);


for (var i = 0; i < eagles.length; i++)
  {

     ctx.rect(eagles[i].x, eagles[i].y, eagles[i].width, eagles[i].height, eagles[i].velY);

    eagles[i].velY *= eaglesFriction;
    eagles[i].y += eagles[i].velY;

     animationFrame();
     ctx.drawImage(EagleImg, spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, eagles[i].x, eagles[i].y, eagles[i].width, eagles[i].height);

      requestAnimationFrame(gameLoop);

       var dir = colCheck(Gerald, eagles[i]);

       if (dir === "l" || dir === "r")
       {
         Gerald.velX = 0;
         gameOver();
       }

           else if (dir === "t" || dir === "b")
           {
              Gerald.velY = 0;
              gameOver();
           }

       if (eagles[i].y <= 480)
       {
       eagles[i].y = 20;
       }

    }

/*
for (var i = 0; i < eagles.length; i++)
  {
        sfx.play();


     ctx.rect(eagles[i].x, eagles[i].y, eagles[i].width, eagles[i].height, eagles[i].velY);

    eagles[i].velY *= eaglesFriction;
    eagles[i].y += eagles[i].velY;

     //animationFrame();
     ctx.drawImage(EagleImg, spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, eagles[i].x, eagles[i].y, eagles[i].width, eagles[i].height);

//      requestAnimationFrame(eagles[i]);

       var dir = colCheck(Gerald, eagles[i]);

       if (dir === "l" || dir === "r")
       {
         Gerald.velX = 0;
         gameOver();
       }

       else if (dir === "t" || dir === "b")
       {
         Gerald.velY = 0;
         gameOver();
       }

       if (eagles[i].y <= 480)
       {
       eagles[i].y = 20;
       }

    }
*/

  // Gerald.velX *= friction;
  // Gerald.velY *= friction;
//   Gerald.x += Gerald.velX;
   //Gerald.y += Gerald.velY;

//     ctx.drawImage(GiraffeImg, Gerald.x, Gerald.y, Gerald.width, Gerald.height);

    //requestAnimationFrame();
    requestAnimationFrame(update);
}

function gameOver()
{

}

function colCheck(shapeA, shapeB)
{
//get vectors to check against
var vX = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
hWidths = (shapeA.width / 2) + (shapeB.width - 2),
hHeights = (shapeA.height / 2) + (shapeB.height / 2),
colDir = null;

//if the x and y vector are less than the half width or half height then we myst be inside the object, causing a collision
if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights)
{
  //figures out which side is colliding
  var oX = hWidths - Math.abs(vX),
  oY = hHeights - Math.abs(vY);

  if (oX >= oY)
  {
    if (vY > 0)
    {
      colDir = "t";
      shapeA.y += oY;
    }
    else
    {
      colDir = "b";
      shapeA.y -= oY;
    }
  }
  else
  {
     if (vX > 0)
     {
       colDir = "l";
       shapeA.x += oX;
     }
     else
     {
       colDir = "r";
       shapeA.x -= oX;
     }
  }
}
 return colDir;
}

function styleText(txtColour, txtFont, txtAlign, txtBaseline)
{
    ctx.fillStyle = txtColour;
    ctx.font = txtFont;
    ctx.textAlign = txtAlign;
    ctx.textBaseline = txtBaseline;
}

function animationFrame()
{
  var elapsed = (Date.now() - startTimeMS) / 1000;
  startTimeMS = Date.now();

    frameTimer = frameTimer - elapsed;

    if (frameTimer <= 0)
    {
      frameTimer = frameTimeMax;
      frameX++;
          if (frameX > frameXMax)
          {
            frameX = 0;
            frameY++;
            //end of row, move down to next row in sheet
              if (frameY > frameYMax)
              {
                frameY = 0;
              }
          }
      frame++;
//reset frames to 0 in event that there are empty spaces on sprite sheet
      if (frame > frameMax)
      {
          frame = 0;
          frameX = 0;
          frameY = 0;
      }
  }
      ctx.rect(0, 20, width, height);
   //   ctx.drawImage(EagleImg, spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, eagles.x, eagles.y, eagles.width, eagles.height);
}

function resizeCanvas()
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function touchUp(evt)
{
  evt.preventDefault();

  var touchX = evt.touches[0].pageX - canvas.offsetLeft;
  var touchY = evt.touches[0].pageY - canvas.offsetTop;

  lastPt = null;
}

function touchDown(evt)
{
   evt.preventDefault();

   touchXY(evt);
}

function touchXY(evt)
{
  evt.preventDefault();

  if (lastPt!=null)
  {
    var touchX = evt.touches[0].pageX - canvas.offsetLeft;
    var touchY = evt.touches[0].pageY - canvas.offsetTop;

    Gerald.x = touchX - (Gerald.x/2);
  }
  lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY}
}