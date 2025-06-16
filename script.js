const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const winnerMessage = document.getElementById("winnerMessage");

let currentPlayer = "X";
let board = Array(9).fill("");
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const index = [].indexOf.call(cells, event.target);
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    winnerMessage.textContent = `${
      winner === "X" ? "X" : "O"
    } ha vinto, clicca su RESET per iniziare una nuova partita!`;
    gameActive = false;
  } else if (!board.includes("")) {
    winnerMessage.textContent = "Pareggio!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  for (let [a, b, c] of winConditions) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return board[a];
    }
  }
  return null;
}

function resetGame() {
  board.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  winnerMessage.textContent = "";
  currentPlayer = "X";
  gameActive = true;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
