/* TODO

- Paddles drehbar machen (pitch)
  => Physik einbauen (Einfallswinkel = Ausfallswinkel)

*/

var canvas      = document.getElementById("gameCanvas");
var ctx         = canvas.getContext("2d");

var timerElem   = document.getElementById("timer");
var time        = 0;

var refreshRate = 10; // miliseconds

// Ball
var posX = canvas.width/2;
var posY = canvas.height/2;
var dposX = -2;
var dposY = 1;

var ballRadius = 10;

var ballAccel = 1;

// Players
var paddleW = 15;
var paddleH = 125;

var paddleMargin = 10;

var pl1posX = paddleMargin;
var pl1posY = canvas.height/2 - paddleH/2;

var pl2posX = canvas.width - paddleW - paddleMargin;
var pl2posY = canvas.height/2 - paddleH/2;

var pl1keyUP = false;
var pl1keyDOWN = false; 

var pl2keyUP = false;
var pl2keyDOWN = false;

var plMovementSpeed = 4;



// Functions and Shit

function drawBall() {
    ctx.beginPath();
    ctx.arc(posX, posY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function drawPlayerOne() {
    ctx.beginPath();
    ctx.rect(pl1posX, pl1posY, paddleW, paddleH);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function drawPlayerTwo() {
    ctx.beginPath();
    ctx.rect(pl2posX, pl2posY, paddleW, paddleH);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    console.log(e.keyCode)

    // Player One Control  [Up - W | Down - S] / [W - 87 | S - 83]
    if(e.keyCode == 87) { pl1keyUP = true; }
    else if(e.keyCode == 83) { pl1keyDOWN = true; }

    //Player Two Control  [Up - ArrowUp | Down - ArrowDown] / [AUp - 38 | ADown - 40]
    if(e.keyCode == 38) { pl2keyUP = true; }
    else if(e.keyCode == 40) { pl2keyDOWN = true; }
}

function keyUpHandler(e) {
    console.log(e.keyCode)

    // Player One Control  [Up - W | Down - S] / [W - 87 | S - 83]
    if(e.keyCode == 87) { pl1keyUP = false; }
    else if(e.keyCode == 83) { pl1keyDOWN = false; }

    //Player Two Control  [Up - ArrowUp | Down - ArrowDown] / [AUp - 38 | ADown - 40]
    if(e.keyCode == 38) { pl2keyUP = false; }
    else if(e.keyCode == 40) { pl2keyDOWN = false; }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPlayerOne();
    drawPlayerTwo();

    // Players Move
    if(pl1keyUP) { if(pl1posY > 0) { pl1posY -= plMovementSpeed; } }
    else if(pl1keyDOWN) { if(pl1posY + paddleH < canvas.height) { pl1posY += plMovementSpeed; } }

    if(pl2keyUP) { if(pl2posY > 0) { pl2posY -= plMovementSpeed; } }
    else if(pl2keyDOWN) { if(pl2posY + paddleH < canvas.height) { pl2posY += plMovementSpeed; } }

    // Collisions
    //      Top + Bottom
    if(posY + dposY == 0 + ballRadius || posY + dposY == canvas.height - ballRadius) 
        { dposY = -dposY; }
    
    //      Players
    if((posY + dposY > pl1posY && posY + dposY < pl1posY + paddleH && posX + dposX < pl1posX + paddleW + ballRadius) || (posY + dposY > pl2posY && posY + dposY < pl2posY + paddleH && posX + dposX > pl2posX - ballRadius)) 
            { dposX = -(dposX - ballAccel); ballAccel = -ballAccel; }

    // GAME OVER
    if(posX + dposX < 0 + ballRadius) {
        alert("Player 2 won!");
        document.location.reload();
    } else if(posX + dposX > canvas.width - ballRadius) {
        alert("Player 1 won!");
        document.location.reload();
    }
    
    posX += dposX;
    posY += dposY;

    time += refreshRate/1000;
    timerElem.innerHTML = time;
}
setInterval(draw, refreshRate);

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);