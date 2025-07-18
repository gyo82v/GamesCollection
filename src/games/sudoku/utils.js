// 1) Generate a board of random "colors" (represented by numbers 1–9)
export function generateRandomColorBoard() {
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => Math.floor(Math.random() * 9) + 1)
  );
}

// 2) Generate a fully valid Sudoku solution via backtracking
export function generateSudoku() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// 3) From a solution, remove `count` cells to create a puzzle
export function generatePuzzle(emptyCount = 40) {
  const solution = generateSudoku();
  const puzzle = solution.map(row => row.slice());
  let removed = 0;
  // Randomly remove cells until `emptyCount` reached
  while (removed < emptyCount) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  return { puzzle, solution };
}

function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffle([...Array(9)].map((_, i) => i + 1));
        for (let num of nums) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isSafe(board, row, col, num) {
  // Row & column check
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  // 3×3 subgrid check
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

// Fisher–Yates shuffle
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
