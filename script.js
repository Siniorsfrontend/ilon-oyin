var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Set up the snake
var snake = [];
snake[0] = { x: 200, y: 200 };

// Set up the food
var food = { x: 0, y: 0 };

// Set up the score
var score = 0;

// Set up the direction
var direction;

// Set up the game loop
function gameLoop() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update the snake position
    var headX = snake[0].x;
    var headY = snake[0].y;

    if (direction === "right") headX += 20;
    if (direction === "left") headX -= 20;
    if (direction === "up") headY -= 20;
    if (direction === "down") headY += 20;

    // Check for collision with the walls
    if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
        // Game over
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
    }

    // Check for collision with the food
    if (headX === food.x && headY === food.y) {
        // Increase the score
        score++;

        // Generate new food position
        food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    } else {
        // Remove the tail
        snake.pop();
    }

    // Check for collision with the snake body
    for (var i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            // Game over
            clearInterval(gameInterval);
            alert("Game Over! Your score: " + score);
            return;
        }
    }

    // Move the snake
    var newHead = { x: headX, y: headY };
    snake.unshift(newHead);

    // Draw the snake
    for (var i = 0; i < snake.length; i++) {
        context.fillStyle = "#333";
        context.fillRect(snake[i].x, snake[i].y, 20, 20);
    }

    // Draw the food
    context.fillStyle = "#f00";
    context.fillRect(food.x, food.y, 20, 20);

    // Update the score
    context.fillStyle = "#000";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
}

// Set up the keyboard controls
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && direction !== "right") direction = "left";
    if (event.keyCode === 38 && direction !== "down") direction = "up";
    if (event.keyCode === 39 && direction !== "left") direction = "right";
    if (event.keyCode === 40 && direction !== "up") direction = "down";
});

// Start the game loop
var gameInterval = setInterval(gameLoop, 100);