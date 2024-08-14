const car = document.getElementById('car');
const pothole = document.getElementById('pothole');
const healthBar = document.getElementById('health');
const gameOverText = document.getElementById('game-over');

let carPosition = 180;
let potholePosition = -40;
let health = 100;
let potholeHitCount = 0;
const maxHits = 10;
const carSpeed = 5;

let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    }
});

document.addEventListener('touchstart', (e) => {
    const touchX = e.touches[0].clientX;
    if (touchX < window.innerWidth / 2) {
        leftPressed = true;
    } else {
        rightPressed = true;
    }
});

document.addEventListener('touchend', (e) => {
    leftPressed = false;
    rightPressed = false;
});

function moveCar() {
    if (leftPressed && carPosition > 0) {
        carPosition -= carSpeed;
        car.style.left = `${carPosition}px`;
    }
    if (rightPressed && carPosition < 360) {
        carPosition += carSpeed;
        car.style.left = `${carPosition}px`;
    }
    requestAnimationFrame(moveCar);
}

function movePothole() {
    potholePosition += 10;
    pothole.style.top = `${potholePosition}px`;

    if (potholePosition > 560) {
        potholePosition = -40;
        pothole.style.left = `${Math.floor(Math.random() * 360)}px`;
    }

    checkCollision();
}

function checkCollision() {
    const potholeRect = pothole.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();

    if (
        potholeRect.top < carRect.bottom &&
        potholeRect.bottom > carRect.top &&
        potholeRect.left < carRect.right &&
        potholeRect.right > carRect.left
    ) {
        potholePosition = -40;
        pothole.style.left = `${Math.floor(Math.random() * 360)}px`;
        potholeHitCount++;
        updateHealth();
    }
}

function updateHealth() {
    health -= 10;
    healthBar.style.width = `${health}%`;

    if (potholeHitCount >= maxHits) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(potholeInterval);
    gameOverText.style.display = 'block';
}

const potholeInterval = setInterval(movePothole, 100);
requestAnimationFrame(moveCar);
