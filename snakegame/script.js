var blockSize = 25;
var total_row = 15;
var total_col = 15;
var board;
var context;

var snakeX = blockSize * 3;
var snakeY = blockSize * 3;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeFood();
	document.addEventListener("keydown", changeDirection);
	setInterval(update, 100);

	document.getElementById("start-button").addEventListener("click", startGame);
}

function startGame() {
	snakeX = blockSize * 3;
	snakeY = blockSize * 3;
	speedX = 0;
	speedY = 0;
	snakeBody = [];
	gameOver = false;
	placeFood();
}

function update() {
	if (gameOver) {
		return;
	}

	context.fillStyle = "orchid";
	context.fillRect(0, 0, board.width, board.height);

	context.fillStyle = "yellow";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "darkgreen";
	snakeX += speedX * blockSize;
	snakeY += speedY * blockSize;
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
		gameOver = true;
		alert("Game Over. Press Start to play again.");
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			gameOver = true;
			alert("Game Over. Press Start to play again.");
		}
	}
}

function changeDirection(e) {
	if (e.key == "ArrowUp" && speedY != 1) {
		speedX = 0;
		speedY = -1;
	}
	else if (e.key == "ArrowDown" && speedY != -1) {
		speedX = 0;
		speedY = 1;
	}
	else if (e.key == "ArrowLeft" && speedX != 1) {
		speedX = -1;
		speedY = 0;
	}
	else if (e.key == "ArrowRight" && speedX != -1) {
		speedX = 1;
		speedY = 0;
	}
}

function placeFood() {
	foodX = Math.floor(Math.random() * total_col) * blockSize;
	foodY = Math.floor(Math.random() * total_row) * blockSize;
}
