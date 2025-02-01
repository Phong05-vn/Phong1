const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");
let grid = [];

// Khởi tạo bảng
function initBoard() {
  board.innerHTML = "";
  grid = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  addRandomTile();
  addRandomTile();
  renderBoard();
}

// Thêm ô mới ngẫu nhiên (2 hoặc 4)
function addRandomTile() {
  let emptyCells = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) emptyCells.push({ x: i, y: j });
    });
  });

  if (emptyCells.length > 0) {
    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

// Hiển thị bảng game
function renderBoard() {
  board.innerHTML = "";
  grid.forEach((row) => {
    row.forEach((value) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      if (value !== 0) {
        tile.textContent = value;
        tile.classList.add(`tile-${value}`);
      }
      board.appendChild(tile);
    });
  });
}

// Logic gộp ô khi di chuyển
function slide(row) {
  row = row.filter((val) => val); // Loại bỏ các ô trống (0)
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2; // Gộp 2 ô thành 1
      row[i + 1] = 0; // Đánh dấu ô đã gộp để xử lý sau
    }
  }
  return row
    .filter((val) => val)
    .concat(Array(4 - row.filter((val) => val).length).fill(0));
}

// Di chuyển trái
function moveLeft() {
  let moved = false;
  grid = grid.map((row) => {
    const newRow = slide(row);
    if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
    return newRow;
  });
  if (moved) addRandomTile();
  renderBoard();
}

// Di chuyển phải
function moveRight() {
  let moved = false;
  grid = grid.map((row) => {
    const newRow = slide(row.reverse()).reverse();
    if (JSON.stringify(row.reverse()) !== JSON.stringify(newRow)) moved = true;
    return newRow;
  });
  if (moved) addRandomTile();
  renderBoard();
}

// Di chuyển lên
function moveUp() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    let column = grid.map((row) => row[col]);
    const newCol = slide(column);
    for (let row = 0; row < 4; row++) {
      if (grid[row][col] !== newCol[row]) moved = true;
      grid[row][col] = newCol[row];
    }
  }
  if (moved) addRandomTile();
  renderBoard();
}

// Di chuyển xuống
function moveDown() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    let column = grid.map((row) => row[col]);
    const newCol = slide(column.reverse()).reverse();
    for (let row = 0; row < 4; row++) {
      if (grid[row][col] !== newCol[row]) moved = true;
      grid[row][col] = newCol[row];
    }
  }
  if (moved) addRandomTile();
  renderBoard();
}

// Kiểm tra phím bấm
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();
});

// Nút Restart
restartBtn.addEventListener("click", initBoard);

// Khởi tạo game khi load trang
initBoard();
