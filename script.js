const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let score = 0;
let level = 0;
let gameActive = false;  // To ensure the game doesn't start multiple times

document.addEventListener('DOMContentLoaded', () => {  // Ensure the DOM is fully loaded
  const startButton = document.getElementById('start');
  const colorButtons = document.querySelectorAll('.color-button');

  startButton.addEventListener('click', startGame);
  colorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      if (gameActive) {
        handlePlayerInput(event);
      }
    });
  });
});

function startGame() {
  if (gameActive) {
    return;
  }
  gameActive = true;
  gameSequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  updateScore(0);  // Reset and update the score display
  nextLevel();
}

function nextLevel() {
  level++;
  playerSequence = [];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  playSequence();
}

function playSequence() {
  let delay = 0;
  gameSequence.forEach((color) => {
    setTimeout(() => {
      activateButton(color);
    }, delay);
    delay += 700;
  });
}

function activateButton(color) {
  const button = document.querySelector(`[data-color='${color}']`);
  button.classList.add('active');
  setTimeout(() => button.classList.remove('active'), 500);
}

function handlePlayerInput(event) {
  const clickedColor = event.target.getAttribute('data-color');
  playerSequence.push(clickedColor);

  const currentLevel = playerSequence.length - 1;
  if (playerSequence[currentLevel] !== gameSequence[currentLevel]) {
    alert('Game Over! Try again.');
    gameActive = false;  // Reset game activity
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    updateScore(playerSequence.length);  // Add points equivalent to the sequence length
    setTimeout(nextLevel, 1000);
  }
}

function updateScore(points) {
  score += points;
  document.getElementById('score').textContent = score;
}
