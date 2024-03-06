const drawBoard = document.querySelector("#draw-board");
const draw = drawBoard.getContext("2d");

const margin = 20;
const minDimension = Math.floor(Math.min(window.innerHeight, window.innerWidth));
drawBoard.width = drawBoard.height = minDimension - margin;
drawBoard.style.backgroundColor = "#222";

const size = Math.floor(drawBoard.width / 30);

const snake = [
    { x: size, y: 0 },
    { x: size, y: 0 },
];

const foods = [
    { x: 0, y: 0 }
];

function createFood() {
    const iterator = {
        x: Math.floor(Math.random() * (drawBoard.width / size)),
        y: Math.floor(Math.random() * (drawBoard.width / size))
    }
    foods.push({ x: iterator.x, y: iterator.y });
    foods.shift();
}

createFood()

function moveSnake() {
    draw.clearRect(0, 0, drawBoard.width, drawBoard.height);

    const head = snake.map((coord, ind) => {
        draw.fillStyle = ind === snake.length - 1 ? "pink" : "blue";
        draw.fillRect(coord.x, coord.y, size, size);

        return coord;
    });

    const food = foods.map((food) => {
        draw.fillStyle = "red";
        draw.fillRect(size * food.x, size * food.y, size, size);

        return food;
    });
};

function checkCollision() {
    const head = snake[snake.length - 1];
    const food = foods[0];

    if (head.x >= food.x * size && head.y <= food.y * size && head.x <= food.x * size && head.y >= food.y * size) {
        snake.unshift({ x: snake[0].x, y: snake[0].y });
        createFood();
    }
}

let moveDirection = 'right';
let vel = size;

setInterval(() => {
    moveSnake();
    checkCollision();
    if (moveDirection === 'right') {
        snake.push({ x: snake[snake.length - 1].x + vel, y: snake[snake.length - 1].y });
        snake.shift();
        if (snake[snake.length - 1].x >= drawBoard.width) {
            snake[snake.length - 1].x = 0;
        }
    } else if (moveDirection === 'down') {
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + vel });
        snake.shift();
        if (snake[snake.length - 1].y >= drawBoard.height) {
            snake[snake.length - 1].y = 0;
        }
    } else if (moveDirection === 'top') {
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - vel });
        snake.shift();
        if (snake[snake.length - 1].y < 0) {
            snake[snake.length - 1].y = drawBoard.height - size;
        }
    } else if (moveDirection === 'left') {
        snake.push({ x: snake[snake.length - 1].x - vel, y: snake[snake.length - 1].y });
        snake.shift();
        if (snake[snake.length - 1].x < 0) {
            snake[snake.length - 1].x = drawBoard.width - size;
        }
    }
}, 200);

document.querySelector("#bottom").addEventListener("click", () => {
    if (moveDirection !== 'top') moveDirection = 'down';
});
document.querySelector("#top").addEventListener("click", () => {
    if (moveDirection !== 'down') moveDirection = 'top';
});
document.querySelector("#right").addEventListener("click", () => {
    if (moveDirection !== 'left') moveDirection = 'right';
});
document.querySelector("#left").addEventListener("click", () => {
    if (moveDirection !== 'right') moveDirection = 'left';
});
