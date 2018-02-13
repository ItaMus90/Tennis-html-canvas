var canvas;
var canvasContext;

/*
window.onload this mean after the html load then the js come
*/
window.onload = function (){
	console.log('Hello Worls!');
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0,canvas.width,canvas.height);

};