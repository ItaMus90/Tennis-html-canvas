var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HIGEHT = 100;

/**
 * Find the mouse position relative 
 * to game canvas
 */
function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	};
}

/*
window.onload this mean after the html load then the js come
*/
window.onload = function (){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	
	canvas.addEventListener('mousedown',handleMouseClick);

	// Set paddle's position value whenever mouse moves
	canvas.addEventListener('mousemove', function(evt){
		var mousePos = 	calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HIGEHT/2);

	});
};

//Mouse click after the game over
function handleMouseClick(evt){
	if(showingWinScreen){
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;

	}
}

// Function handle reset the ball
function ballReset(){
	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
		showingWinScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

//Get right paddle chasing the balls vertical position
function computerMovment(){
	var paddle2YCenter = paddle2Y + (PADDLE_HIGEHT/2);
	if(paddle2YCenter < ballY - 35){
		paddle2Y += 6;
	}else if(paddle2YCenter > ballY + 35){
		paddle2Y -= 6;
	}
}

function moveEverything(){
	if(!showingWinScreen){
		computerMovment();
	
		ballX += ballSpeedX;
		ballY += ballSpeedY;
	
		//Bounce the ball if it gets blockedby the left paddle
		if(ballX < 0){
			if (ballY > paddle1Y &&
				ballY < paddle1Y + PADDLE_HIGEHT) {
				ballSpeedX = -ballSpeedX;
				
				//How change the ball position after it bounch in paddle 
				var deltaY = ballY - (paddle1Y+PADDLE_HIGEHT/2);
				ballSpeedY = deltaY * 0.35;
			} else {
				player2Score ++; //Must be BEFORE ballReset()
				ballReset();
			}
		}
	
		if(ballX > canvas.width){
			if (ballY > paddle2Y &&
				ballY < paddle2Y + PADDLE_HIGEHT) {
				ballSpeedX = -ballSpeedX;
	
				//How change the ball position after it bounch in paddle 
				var deltaY = ballY - (paddle2Y+PADDLE_HIGEHT/2);
				ballSpeedY = deltaY * 0.35;
			} else {
				player1Score ++; //Must be BEFORE ballReset()
				ballReset();
			}
		}
		if(ballY < 0){
			ballSpeedY = -ballSpeedY;
		}
	
		if(ballY > canvas.height){
			ballSpeedY = -ballSpeedY;
		}
	}
}

function drawNet(){
	for(var i = 0; i < canvas.height; i+=40){
		colorRect(canvas.width / 2 - 1 , i, 2, 20, 'white');
	}
}

function drawEverything(){
	//Next line blanks out the screen with black
	colorRect(0,0,canvas.width,canvas.height, 'black');

	//Draw the net
	drawNet();

	//This is the right computer paddle
	colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HIGEHT, 'white');

	//This is the left player paddle
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HIGEHT, 'white');
	
	//Next line draw the ball
	colorCircle(ballX,ballY,10,'white');

	if(showingWinScreen){
		if(player1Score >= WINNING_SCORE){
			canvasContext.fillText("Left player WON", 350,200);
		}else if (player2Score >= WINNING_SCORE){
			canvasContext.fillText("Right player WON", 350,200);
		}
		canvasContext.fillStyle =  'white';
		canvasContext.fillText("Click to contiue", 100,100);
		return;
	}

	canvasContext.fillText(player1Score, 100,100);
	canvasContext.fillText(player2Score, canvas.width - 100,100); 
}

function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle =  drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
}
