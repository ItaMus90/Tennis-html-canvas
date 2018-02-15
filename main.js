var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;

/*
window.onload this mean after the html load then the js come
*/
window.onload = function (){
	console.log('Hello Worls!');
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
};

function moveEverything(){
	ballX += ballSpeedX;

	if(ballX < 0){
		ballSpeedX = -ballSpeedX;
	}

	if(ballX > canvas.width){
		ballSpeedX = -ballSpeedX;
	}
}

function drawEverything(){
	//Next line blanks out the screen with black
	colorRect(0,0,canvas.width,canvas.height, 'black');

	//This is the left player paddle
	colorRect(0,210,10,100, 'white');
	
	//Next line draw the ball
	colorRect(ballX,100,10,10, 'red');
}

function colorRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
}