const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.getElementById('resetBtn');
const playAgainstComputerBtn = document.getElementById('playAgainstComputer');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;
let playAgainstComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (!isGameActive || board[cellIndex] !== null) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell !== null)) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;

        if (playAgainstComputer && currentPlayer === 'O') {
            computerMove();
        }
    }
}

function computerMove() {
    let emptyCells = board.map((value, index) => (value === null ? index : null)).filter(value => value !== null);

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell !== null)) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
    } else {
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameActive = true;
    statusText.textContent = "Player X's turn";
}

function toggleComputerMode() {
    playAgainstComputer = !playAgainstComputer;
    resetGame();
    playAgainstComputerBtn.textContent = playAgainstComputer ? 'Play Against Human' : 'Play Against Computer';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
playAgainstComputerBtn.addEventListener('click', toggleComputerMode);
