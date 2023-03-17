const cells = document.querySelectorAll(".cell");
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset-button");
const undoButton = document.querySelector("#undo-button");
let currentPlayer = "X";
let gameStatus = "Game on!";
let moves = []; // track moves for undo functionality

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    if (cells[i].textContent !== "") {
      return;
    }

    cells[i].textContent = currentPlayer;

    // add move to array
    moves.push(i);

    if (checkWin()) {
      message.textContent = "Player " + currentPlayer + " wins!";
      gameStatus = "Game over!";
      return;
    }

    if (checkDraw()) {
      message.textContent = "It's a draw!";
      gameStatus = "Game over!";
      return;
    }

    if (currentPlayer === "X") {
      currentPlayer = "O";
      message.textContent = "Player " + currentPlayer + "'s turn.";
      aiTurn();
    } else {
      currentPlayer = "X";
      message.textContent = "Player " + currentPlayer + "'s turn.";
    }
  });
}

resetButton.addEventListener("click", function() {
  reset();
});

undoButton.addEventListener("click", function() {
  undo();
});

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (cells[a].textContent === "" || cells[b].textContent === "" || cells[c].textContent === "") {
      continue;
    }

    if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      return false;
    }
  }

  return true;
}

function reset() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }

  currentPlayer = "X";
  gameStatus = "Game on!";
  message.textContent = "Player " + currentPlayer + "'s turn.";

  // reset moves array
  moves = [];
}

function aiTurn() {
  const emptyCells = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      emptyCells.push(i);
    }
  }


  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];

  cells[randomCell].textContent = "O";

  if (checkWin()) {
    message.textContent = "Player O wins!";
    gameStatus = "Game over!";
    return;
  }

  if (checkDraw()) {
    message.textContent = "It's a draw!";
    gameStatus = "Game over!";
    return;
  }

  currentPlayer = "X";
  message.textContent = "Player " + currentPlayer + "'s turn.";
}
