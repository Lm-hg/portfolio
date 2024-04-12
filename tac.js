const cells = document.querySelectorAll('.cell');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('reset');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');


let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

let playerScore = 0;
let computerScore = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id.split('-')[1]);
    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('player');
      if (checkWin()) {
        resultElement.textContent = `${currentPlayer} a gagné !`;
        if (currentPlayer === 'X') {
            playerScore++;
            playerScoreElement.textContent = playerScore;
          } else {
            computerScore++;
            computerScoreElement.textContent = computerScore;
          }
        gameActive = false;
      } else if (checkDraw()) {
        resultElement.textContent = "Match nul !";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
          makeMove();
        }
      }
    }
  });
});

resetButton.addEventListener('click', () => {
  resetGame();
});

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return board.every(cell => {
    return cell !== '';
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  resultElement.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = "#eee";
  });
}

function makeMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = currentPlayer;
      const score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = currentPlayer;
  cells[move].textContent = currentPlayer;
  cells[move].classList.add('computer');
  if (checkWin()) {
    resultElement.textContent = `${currentPlayer} a gagné !`;
    if (currentPlayer === 'X') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
      } else {
        computerScore++;
        computerScoreElement.textContent = computerScore;
      }
    gameActive = false;
  } else if (checkDraw()) {
    resultElement.textContent = "Match nul !";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function minimax(board, depth, isMaximizing) {
  if (checkWin()) {
    return isMaximizing ? -10 + depth : 10 - depth;
  } else if (checkDraw()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
