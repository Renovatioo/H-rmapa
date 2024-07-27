const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let clickScore = 0;
let sequenceScore = 0;
let level = 0;
let gameActive = false;

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');
  const colorButtons = document.querySelectorAll('.color-button');

  startButton.addEventListener('click', startGame);
  colorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      if (gameActive) {
        handlePlayerInput(event);
        highlightButton(event.target);
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
  clickScore = 0;
  sequenceScore = 0;
  updateScore(0, 0); // Reset and update both scores
  nextLevel();
}

function nextLevel() {
  level++;
  playerSequence = [];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  showMessage("Watch the sequence...");
  setTimeout(playSequence, 2500); // Delay sequence start by 2.5 seconds
}

function playSequence() {
  let delay = 0;
  gameSequence.forEach((color) => {
    setTimeout(() => {
      activateButton(color);
    }, delay);
    delay += 700;
  });
  setTimeout(() => {
    showMessage("Your turn!");
    gameActive = true; // Enable clicking only after the sequence is done
  }, delay);
}

function activateButton(color) {
  const button = document.querySelector(`[data-color='${color}']`);
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 500);
}

function handlePlayerInput(event) {
  const clickedColor = event.target.getAttribute('data-color');
  playerSequence.push(clickedColor);
  updateScore(1, 0);

  const currentLevel = playerSequence.length - 1;
  if (playerSequence[currentLevel] !== gameSequence[currentLevel]) {
    showMessage("Game Over! Try again.");
    gameActive = false;
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    updateScore(0, 1);
    setTimeout(nextLevel, 1000);
  }
}

function showMessage(message) {
  const messagePanel = document.getElementById('message-panel');
  messagePanel.textContent = message;
  messagePanel.style.visibility = 'visible';
  setTimeout(() => {
    messagePanel.style.visibility = 'hidden';
  }, 2000); // Hide the message after 2 seconds
}

function highlightButton(button) {
  button.classList.add('highlight');
  setTimeout(() => {
    button.classList.remove('highlight');
  }, 500);
}

function updateScore(clickPoints, sequencePoints) {
  clickScore += clickPoints;
  sequenceScore += sequencePoints;
  document.getElementById('score').textContent = clickScore;
  document.getElementById('sequence-score').textContent = sequenceScore;
}
