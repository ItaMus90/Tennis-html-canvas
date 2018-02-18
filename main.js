var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
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
	
	// Set paddle's position value whenever mouse moves
	canvas.addEventListener('mousemove', function(evt){
		var mousePos = 	calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HIGEHT/2);

	});
};

function moveEverything(){
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX < 0){
		ballSpeedX = -ballSpeedX;
	}

	if(ballX > canvas.width){
		ballSpeedX = -ballSpeedX;
	}
	if(ballY < 0){
		ballSpeedY = -ballSpeedY;
	}

	if(ballY > canvas.height){
		ballSpeedY = -ballSpeedY;
	}
}

function drawEverything(){
	//Next line blanks out the screen with black
	colorRect(0,0,canvas.width,canvas.height, 'black');

	//This is the left player paddle
	colorRect(0,paddle1Y,10,PADDLE_HIGEHT, 'white');
	
	//Next line draw the ball
	colorCircle(ballX,ballY,10,'white')
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
