const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");
const position = 8;
let snake = [{ x: 64, y: 64 }];
let food = [{ x: 0, y: 0 }];
let positionExists = false;
let direction = "RIGHT";

;(() => {
    function gameLoop() {
        let idFrame = window.requestAnimationFrame(gameLoop);
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        let newHead = { x: snakeX, y: snakeY };

        if (inContact()) positionExists = false;
        else snake.pop();

        snake.unshift(newHead);

        makeSnake();
        moveSnake();
        makeFood();
        checkGameOver(idFrame);
    }
    gameLoop();
})();

function inContact() {
    const bothXPow = Math.pow(snake[0].x - food[0].x, 2);
    const bothYPow = Math.pow(snake[0].y - food[0].y, 2);
    const bothRadius = 32;

    const distance = Math.sqrt(bothXPow + bothYPow);

    if (distance - bothRadius <= 0) return true;
}

function makeSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeSprite("darkgreen", snake);
}

function moveSnake() {
    document.addEventListener("keydown", (event) => {
        if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
        if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
        if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
        if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
    });

    switch (direction) {
        case "LEFT":
            if (snake[0].x < 0) snake[0].x = canvas.width;
            else snake[0].x -= position;
            break;
        case "UP":
            if (snake[0].y < 0) snake[0].y = canvas.height;
            else snake[0].y -= position;
            break;
        case "RIGHT":
            if (snake[0].x > canvas.width) snake[0].x = 0;
            else snake[0].x += position;
            break;
        case "DOWN":
            if (snake[0].y > canvas.height) snake[0].y = 0;
            else snake[0].y += position;
            break;
    }
}

function makeFood() {
    let randomNumber = () => Math.floor(Math.random() * 480 + 32);

    if (positionExists) makeSprite("tomato", food);
    else {
        food[0].x = randomNumber();
        food[0].y = randomNumber();

        positionExists = true;
    }
}

function makeSprite(color, object) {
    for (i = 0; i < object.length; i++) {
        ctx.beginPath();
        ctx.arc(object[i].x, object[i].y, 16, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

function checkGameOver(id) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            alert("Game Over :(");
            window.cancelAnimationFrame(id);
        }
    }
}
