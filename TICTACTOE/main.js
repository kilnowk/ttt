const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const currentPlayerDisplay = document.getElementById("current-player");

let currentPlayer = "X"; // Текущий игрок
let gameState = ["", "", "", "", "", "", "", "", ""]; // Состояние поля
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
  [0, 4, 8], [2, 4, 6] // Диагонали
];

// Обработка клика по ячейке
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  // Если ячейка уже занята или игра окончена, ничего не делаем
  if (gameState[index] !== "" || checkWinner()) return;

  // Заполняем ячейку и обновляем состояние игры
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Проверяем, есть ли победитель
  if (checkWinner()) {
    alert(`Игрок ${currentPlayer} победил!`);
    return;
  }

  // Проверяем на ничью
  if (!gameState.includes("")) {
    alert("Ничья!");
    return;
  }

  // Меняем игрока
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerDisplay.textContent = currentPlayer;
}

// Проверка на победу
function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

// Сброс игры
function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  currentPlayerDisplay.textContent = currentPlayer;
  cells.forEach(cell => cell.textContent = "");
}

// Добавляем обработчики событий
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);