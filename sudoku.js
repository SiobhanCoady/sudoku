let puzzle = [];

for (let r = 0; r < 9; r++) {
  puzzle[r] = [];
  for (let c = 0; c < 9; c++) {
    puzzle[r][c] = 0;
  }
}


puzzle[0][0] = 5;
puzzle[0][2] = 4;
puzzle[0][3] = 3;
puzzle[0][6] = 1;
puzzle[0][8] = 8;

puzzle[1][0] = 8;
puzzle[1][1] = 1;
puzzle[1][2] = 7;
puzzle[1][3] = 4;
puzzle[1][4] = 5;
puzzle[1][6] = 6;
puzzle[1][7] = 2;

puzzle[2][4] = 8;
puzzle[2][7] = 7;

puzzle[3][4] = 6;
puzzle[3][8] = 5;

puzzle[4][1] = 2;
puzzle[4][3] = 5;
puzzle[4][5] = 7;
puzzle[4][7] = 8;

puzzle[5][0] = 7;
puzzle[5][4] = 9;

puzzle[6][1] = 4;
puzzle[6][4] = 3;

puzzle[7][1] = 8;
puzzle[7][2] = 9;
puzzle[7][4] = 1;
puzzle[7][5] = 5;
puzzle[7][6] = 3;
puzzle[7][7] = 4;
puzzle[7][8] = 7;

puzzle[8][0] = 1;
puzzle[8][2] = 3;
puzzle[8][5] = 4;
puzzle[8][6] = 8;
puzzle[8][8] = 6;

console.log(puzzle);

// Find all possible numbers for one cell
const remainingCellPossibilities = function(row, col) {
  let possible = [];
  let notPossible = [];
  let threeByThreeCantBe = [];
  if (puzzle[row][col] === 0) {
    for (let c = 0; c < 9; c++) {
      if (puzzle[row][c] !== 0) {
        notPossible.push(puzzle[row][c]);
      }
    }
    for (let r = 0; r < 9; r++) {
      if (puzzle[r][col] !== 0 && notPossible.indexOf(puzzle[r][col]) === -1) {
        notPossible.push(puzzle[r][col]);
      }
    }
    threeByThreeCantBe = threeByThreeNotPossibilities(row, col);
    let arrLength = threeByThreeCantBe.length;
    for (let j = 0; j < arrLength; j++) {
      if (notPossible.indexOf(threeByThreeCantBe[j] === -1)) {
        notPossible.push(threeByThreeCantBe[j]);
      }
    }
    for (let i = 1; i <= 9; i++) {
      if (!notPossible.includes(i)) {
        possible.push(i);
      }
    }
  } else {
    possible = puzzle[row][col];
  }
  return possible;
}


const threeByThreeNotPossibilities = function(row, col) {
  let notPossible = [];
  let rowmin;
  let rowmax;
  let colmin;
  let colmax;

  if (row <= 2) {
    rowmin = 0;
    rowmax = 2;
  } else if (row <= 5) {
    rowmin = 3;
    rowmax = 5;
  } else {
    rowmin = 6;
    rowmax = 8;
  }

  if (col <= 2) {
    colmin = 0;
    colmax = 2;
  } else if (col <= 5) {
    colmin = 3;
    colmax = 5;
  } else {
    colmin = 6;
    colmax = 8;
  }

  for (let r = rowmin; r <= rowmax; r++) {
    for (let c = colmin; c <= colmax; c++) {
      if (puzzle[r][c] !== 0) {
        notPossible.push(puzzle[r][c]);
      }
    }
  }

  return notPossible;
}


// Find all possible numbers for all cells in the puzzle
const possibilities = function(puzzle) {
  let allRemainingOptions = [];

  for (let r = 0; r < 9; r++) {
    allRemainingOptions[r] = [];
    for (let c = 0; c < 9; c++) {
      allRemainingOptions[r][c] = [];
    }
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      allRemainingOptions[r][c] = remainingCellPossibilities(r, c);
    }
  }
  return allRemainingOptions;
}


const arraysOfOne = function(currentPuzzle) {
  let updatedPuzzle = currentPuzzle;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(currentPuzzle[r][c]) && currentPuzzle[r][c].length === 1) {
        updatedPuzzle[r][c] = currentPuzzle[r][c][0];
        puzzle[r][c] = currentPuzzle[r][c];
      }
    }
  }
  return possibilities(updatedPuzzle);
}


let counter = 1;
for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    if (puzzle[r][c] === 0) {
      console.log(`COUNTER >>>>>>>>>>>> PASS ${counter}`);
      console.log(arraysOfOne(possibilities(puzzle)));
      // console.log(puzzle);
      counter++;
    }
  }
}
