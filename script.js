let currentPlayer = 'X'; // Player X always starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board
let gameActive = true;
let score = 1;

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

const cells = document.querySelectorAll('.box');

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});

function updateUI() {
  for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameBoard[i];
  }
}

function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'It\'s a draw!';
}
function playerTurn() {
    const messageElement = document.getElementById('player');
    messageElement.innerText = currentPlayer;
  }
  function scoreBoard() {
    const messageElement = document.getElementById('score');;
    messageElement.innerText = "The current score is: " + score;
  }
  


const winCons = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Left-to-right diagonal
  [2, 4, 6]  // Right-to-left diagonal
];

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winCons.length; i++) {
      const [a, b, c] = winCons[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          roundWon = true;
          break;
      }
  }

  if (roundWon) {
      announceWinner(currentPlayer);
      scoreBoard();
      gameActive = false;
      score =  score + 1;
      return;
  }

  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
      announceDraw();
      gameActive = false;
      return;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
      cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);