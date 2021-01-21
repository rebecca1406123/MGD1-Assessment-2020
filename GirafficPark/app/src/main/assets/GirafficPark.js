var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

//setting up the game canvas
var canvas = document.getElementById("CanvasForGame");
var width = 1400;
var height = 700;
var ctx = canvas.getContext("2d");

//initialising Gerald, the character that the player plays as
var Gerald = {
x: width / 2,
y: 545,
width: 145,
height: 145,
velX: 0,
velY: 0
};

//initialising the first eagle that the player will need to dodge
var eagle1 =
{
 x: Math.random() * 1500,
 y: 20,
 width: 150,
 height: 150,
 VelX: 0,
 velY: Math.random() * 10
}

//initialising the second eagle that the player will need to dodge
var eagle2 =
{
 x: Math.random() * 1500,
 y: 20,
 width: 150,
 height: 150,
 VelX: 0,
 velY: Math.random() * 10
}

//initialising the third eagle that the player will need to dodge
var eagle3 =
{
 x: Math.random() * 1500,
 y: 20,
 width: 150,
 height: 150,
 VelX: 0,
 velY: Math.random() * 10
}

//initialising the fourth eagle that the player will need to dodge
var eagle4 =
{
 x: Math.random() * 1500,
 y: 20,
 width: 150,
 height: 150,
 VelX: 0,
 velY: Math.random() * 10
}
//sets up the keys array
var keys = [];

//sets friction to be used when the main character or the eagles move
var friction = 0.8;


//to be used for animating the sprites
var startTimeMS = 0.8;
var frameX = 0;
var frameXMax = 7;
var frameY = 0;
var frameYMax = 7;
var frame = 0;
var frameMax = 20;
var frameTimer = 0.05;
var frameTimeMax = 0.017;
var spriteWidth = 20;
var spriteHeight = 36;

//sets the images to be used for different things in the game
var GiraffeImg = new Image();
var giraffeStillImg = new Image();
var EagleImg = new Image();
var playImage = new Image();
var quitImage = new Image();
var controlsImage = new Image();
var objectivesImage = new Image();
var musicPauseImg = new Image();
var restartImg = new Image();
var quittingImage = new Image();

//initialising booleans to be used throughout the code
var musicBtnPressed = false;
var isKeyPressed = false;
var GeraldDrawn = false;

//initialises a score, and sets it to zero
var score = 0;


//arrays for button information. The first numbers refers to button[0], second ones to button[1], etc.
var buttonX = [600, 600, 1250, 600, 600];
var buttonY = [171, 551, -5, 171, 551];
var buttonWidth = [144, 144, 144, 144, 144];
var buttonHeight = [144, 144, 144, 144, 144];



var mouseX;
var mouseY;

//checks if a button has been pressed
var buttonClicked;
var GObuttonClicked;


//initialises music variables, and sets the files they'll be using
var bckgrnd = new Audio('bensound-epic.wav');
var sfx = new Audio ('bang.wav');

//sets the images to be used for several of the objects within the game
GiraffeImg.src = 'GERALDLICK.png';
giraffeStillImg.src = "GERALD.png";
EagleImg.src = 'Eagle.png';

//sets what should be called when the game is first called
    window.addEventListener("load", function()
    {
      init();
      showMenu();

    });


function init()
{
//the width and height of the canvas is set to the width and height of the screen, which was initialised earlier
    canvas.width = width;
    canvas.height = height;

    buttonClicked = 0;
}

function showMenu()
{
     //plays background music
    bckgrnd.play();

     //loads the play button and draws it to the sizes and location it has been set to have
    playImage.src = "playbutton.png";
    playImage.addEventListener('load', e =>
    {
      ctx.drawImage(playImage, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
    });

    //loads the quit buttons and draws it to the sizes and location it has been set to have
    quitImage.src = "quitbutton.png";
    quitImage.addEventListener('load', e =>
    {
           ctx.drawImage(quitImage, buttonX[1], buttonY[1] - 80, buttonWidth[1], buttonHeight[1]);
    });

    //loads the pause music button and draws it to the sizes and location it has been set to have
    musicPauseImg.src = "music.png";
            musicPauseImg.addEventListener('load', e =>
            {
                   ctx.drawImage(musicPauseImg, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
            });

    //initialises the data needed for the text to be shown for the title, and then says what the text should be, and what the coordinates need to be
        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Giraffic Park", 700, 70);

    //initialises the data needed for the text to be shown for the games instructions, and then says what each part of the text should be, and what coordinates they should be at
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Instructions: ", 260, 171);
        ctx.fillText("- Move the giraffe left and right", 260, 221);
        ctx.fillText("- Avoid the eagles", 260, 251);
        ctx.fillText("- Avoiding eagles gets you points!", 260, 281);
        ctx.fillText("- Touching an eagle means game over!", 260, 311);

//initialises the data needed for the text to be shown for the games controls, and then says what each part of the text should be, and what coordintaes they should be
        ctx.fillText("Controls: ", 1100, 451);
        ctx.fillText("- Left arrow: moves giraffe left ", 1100, 501);
        ctx.fillText("- Right arrow: moves giraffe right ", 1100, 531);

//adds an event listener to check whether or not the above buttons have been pressed. If they have, then call the correct function
    canvas.addEventListener("mousemove", checkIntroPos);
    canvas.addEventListener("mouseup", checkIntroClick);


};

function checkIntroPos(event)
{
//the first line gets the mouses co-ordinates from when it registered a click. The other 2 lines sets mouseX and mouseY to the x and y of the mouses co-ordinates at the time of the click
    coords = canvas.relMouseCoords(event);
    mouseX = coords.x;
    mouseY = coords.y;
}

//attaches the relMouseCoords function to the canvas
HTMLCanvasElement.prototype.relMouseCoords = function (event)
{
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do
    {
    //the x and y offset are calculated against the offset of the current element
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while (currentElement = currentElement.offsetParent)

//cooridinates are calculated using the position of the mouse on the page, and the offset that was calculated above
    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

//the position is refined and calculated against the canvas size
    canvasX = Math.round(canvasX * (this.width / this.offsetWidth));
    canvasY = Math.round(canvasY * (this.height / this.offsetHeight));

    return {x:canvasX, y:canvasY}
}

//When a key is picked up as being pressed down, the key is read in and set to true, and then keyPressed is set to true
     document.body.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
            isKeyPressed = true;
        });

//when a key is picked up as being let go, the key is read in and set as no longer being pressed, and then keyPressed is set to false
        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
            isKeyPressed = false;
        });


function checkIntroClick(mouseEvent)
{
//checks if the X and Y coordinates of the mouse are the same as the X and Y coordinates of the play button
    if (mouseX > buttonX[0] && mouseX < (buttonX[0] + buttonWidth[0]))
    {
        if (mouseY > buttonY[0] && mouseY < (buttonY[0] + buttonHeight[0]))
        {
        //if the mouse click has the same coordinates, then play a sound effect, set buttonClicked as 1, and the call the startGame() function
        sfx.play();
        console.log("The start button has been pressed");
            buttonClicked = 1;
            startGame();
        }
    }

//checks whether the mouse coordinates are the same as the coordinate for the quit button
if (mouseX > buttonX[1] && mouseX < (buttonX[1] + buttonWidth[1]))
{
    if (mouseY > buttonY[1] && mouseY < (buttonY[1] + buttonHeight[1]))
    {
    //if the coordinates are the same, then set buttonClicked to 2 and call the quit function
    console.log("the quit button has been pressed");
        buttonClicked = 2;
        quitGame();
    }
}

//checks whether or not the coordinates of the mouse click and the music button are the same
if (mouseX > buttonX[2] && mouseX < (buttonX[2] + buttonWidth[2]))
{
    if (mouseY > buttonY[2] && mouseY < (buttonY[2] + buttonHeight[2]))
    {
    //this if statement allows the button to be used for both pausing and restarting the music
        if (musicBtnPressed == true)
        {
        //if the button has been pressed, pause the music and set the music button pressed boolean to true so that the music is restarted the next time the button is pressed
           bckgrnd.pause();
           musicBtnPressed = false;
        }
        else
        {
        //if the button has been pressed, play the music and set the music button pressed boolean to false so that the music is restarted the next time the button is pressed
          bckgrnd.play();
          musicBtnPressed = true;
        }
    //console.log("the quit button has been pressed");
        //setting the buttonClicked to 0 means that other buttons can still be pressed after
        buttonClicked = 0;

    }
}

//if the play or quit buttons are pressed, then the event listeners are removed to ensure that the buttons can't be pressed after the screen has moved on.
if (buttonClicked > 0)
{
    canvas.removeEventListener("mousemove", checkIntroPos);
    canvas.removeEventListener("mouseup", checkIntroClick);
}

};



function startGame()
{
          canvasX = canvas.width/2;
          canvasY = canvas.height/2;

//sets the text information to be used for displaying the score
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + score, 50, 50);

       //adds an event listener to check whether or not the screen window has been resized
     window.addEventListener('resize', resizeCanvas, false);

//adds a listener to check whether or not the device screen has changed orientation
    window.addEventListener('orientationchange', resizeCanvas, false);

     window.addEventListener("touchstart", touchDown, false);
     window.addEventListener("touchmove", touchXY, true);
     window.addEventListener("touchend", touchUp, false);

     document.body.addEventListener("touchcancel", touchUp, false);

   //resize the canvas to fit the size needed
     resizeCanvas();

//the update and gameLoop functions are called
    update();
   gameLoop();

//the EagleDraw function is called and each of the eagles are passed in
   EagleDraw(eagle1);
   EagleDraw(eagle2);
   EagleDraw(eagle3);
   EagleDraw(eagle4);

  return;
}

function quitGame()
{
    //closes the game window if the function is called
    window.close();
}

function restartGame()
{
//sets the score back to 0 then calls the start game function again
  score = 0;
  startGame();
}

function update(delta)
{

}


function gameLoop()
{
   console.log("gameLoop");

//check how much time has passed since the game started running
   var elapsed = (Date.now() - startTimeMS)/1000;
   update(elapsed);
//sets the start time to the time that the game running at
       startTimeMS = Date.now();

//if the left key is pressed and character is still within the screen
   if (keys[39] && Gerald.x < (canvas.width - Gerald.width + 70))
   {
   //draw the giraffe image as an animation, and add 5 to the characters X velocity
     ctx.drawImage(GiraffeImg,spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, Gerald.x, Gerald.y, Gerald.width, Gerald.height);
   Gerald.velX = Gerald.velX + 5;
   }

 //if the right key is pressed and the character is within the screen
   if (keys[37] && Gerald.x > Gerald.width)
   {
   //draw the giraffe spritesheet as an animation, and subtract 5 from the characters x velocity
     ctx.drawImage(GiraffeImg,spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, Gerald.x, Gerald.y, Gerald.width, Gerald.height);
     Gerald.velX = Gerald.velX - 5;
     }

}


function update()
{
  //draw the character on the screen as a normal image
ctx.drawImage(giraffeStillImg, Gerald.x, Gerald.y, Gerald.width, Gerald.height);

}

function EagleDraw(eagles)
{
     ctx.rect(eagles.x, eagles.y, eagles.width, eagles.height, eagles.velY);

             //sets the image to be used for the Eagles
           EagleImg.src = 'Eagle.png';

  //adds the velocity to the y co-ordinate of the eagles
    eagles.y += eagles.velY;

     //draws the eagle to the screen
     ctx.drawImage(EagleImg,eagles.x, eagles.y, eagles.width, eagles.height);

          //Passes Gerald and the eagle into the colCheck function, and sets the outputted data to dir
       var dir = colCheck(Gerald, eagles);

//if the left or right of the character and the eagles is picked up as colliding
       if (dir === "l" || dir === "r")
       {
       //stop the character from moving, and call the gameOver function
         Gerald.velX = 0;
         gameOver();
       }
             //if the top or bottom of the character and the eagles is picked up as colliding
           else if (dir === "t" || dir === "b")
           {
           //stop the main character from being able to move, and call the gameOver function
              Gerald.velx = 0;
              gameOver();
           }

//if the eagle leaves the screen, then move the eagle back up to the top of the screen and add 1 to score
       if (eagles.y <= 480)
       {
       eagles.y = 20;
        score += 1;
       }

    }




function gameOver()
{
//set the image to be used for the restart button, and draw it to screen based on the coordinates and size that was initialised for it
  restartImg.src = "playbutton.png";
      restartImg.addEventListener('load', e =>
      {
        ctx.drawImage(restartImg, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
      });

//set the image to be used for the quit button, and draw it to screen based on the coordinates and size that were initialised for it
      quittingImage.src = "quitbutton.png";
      quitImage.addEventListener('load', e =>
      {
             ctx.drawImage(quitting, buttonX[4], buttonY[4] - 80, buttonWidth[4], buttonHeight[4]);
      });

        //display the score
          ctx.font = "80px Comic Sans MS";
          ctx.fillStyle = "red";
          ctx.textAlign = "center";
          ctx.fillText("Score: " + score, 700, 70);

      //check for the screen being pressed, and call the appropriate function at the appropriate time
      canvas.addEventListener("mousemove", checkIntroPos);
      canvas.addEventListener("mouseup", checkGOClick);
}


function checkGOClick(mouseEvent)
{
     //if the x and Y coordinates of the restart button match the coordinates of the mouse click
    if (mouseX > buttonX[3] && mouseX < (buttonX[3] + buttonWidth[3]))
    {
    console.log("yes");
        if (mouseY > buttonY[3] && mouseY < (buttonY[3] + buttonHeight[3]))
        {
           //set the game over button clicked as 1, and then call the restart function
        console.log("The start button has been pressed");
            GObuttonClicked = 1;
            restartGame();
        }
    }

//if the x and y coordinates of the quit button match the coordinates of the mouse click
if (mouseX > buttonX[4] && mouseX < (buttonX[4] + buttonWidth[4]))
{
    if (mouseY > buttonY[4] && mouseY < (buttonY[4] + buttonHeight[4]))
    {
    //set game over button clicked as 2, and call the quitGame function
    console.log("the quit button has been pressed");
        GObuttonClicked = 2;
        quitGame();
    }
}



//if a button has been pressed then remove the listeners to prevent the buttons fom still being clickable
if (GObuttonClicked > 0)
{
    canvas.removeEventListener("mousemove", checkIntroPos);
    canvas.removeEventListener("mouseup", checkGOClick);
}

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

function animationFrame()
{
//get the current running time of the game
  var elapsed = (Date.now() - startTimeMS) / 1000;
  startTimeMS = Date.now();

//set the frame timer as frame timer minus the time that has already passed
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
//if the canvas is resized, the new size of the window is collected and set to the canvas width and height
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