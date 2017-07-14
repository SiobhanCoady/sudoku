let puzzle = [];
let count;

for (let r = 0; r < 9; r++) {
  puzzle[r] = [];
  for (let c = 0; c < 9; c++) {
    puzzle[r][c] = 0;
  }
}

let allRemainingOptions = [];

for (let r = 0; r < 9; r++) {
  allRemainingOptions[r] = [];
  for (let c = 0; c < 9; c++) {
    allRemainingOptions[r][c] = [];
  }
}
// console.log(allRemainingOptions);
// console.log(puzzle);

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

// console.log(remainingCellPossibilities(0, 1));
// console.log(remainingCellPossibilities(1, 2));

const threeByThreeNotPossibilities = function(row, cell) {
  // let possible = [];
  let notPossible = [];
  if (row >= 0 && row <= 2 && cell >= 0 && cell <= 2) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (puzzle[r][c] !== 0) {
          notPossible.push(puzzle[r][c]);
        }
      }
    }
  }
  // for (let i = 1; i <= 9; i++) {
  //   if (!notPossible.includes(i)) {
  //     possible.push(i);
  //   }
  // }
  // return possible;
  return notPossible;
}

console.log(threeByThreeNotPossibilities(0, 1));

// Find all possible numbers for all cells in the puzzle
const possibilities = function(puzzle) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      allRemainingOptions[r][c] = remainingCellPossibilities(r, c);
    }
  }
  return allRemainingOptions;
}

console.log(possibilities(puzzle));
// console.log(allRemainingOptions[0][1]);

const rowMissingOne = function(rowArray) {
  let existingNumbers = [];
  for (let number in rowArray) {
    existingNumbers.push(rowArray[number]);
  }
  existingNumbers.sort().shift();
  let missingNumber = 1;
  for (let number of existingNumbers) {
    if (number != missingNumber) {
      break;
    } else {
      missingNumber++;
    }
  }
  for (let number in rowArray) {
    if (rowArray[number] === 0) {
      rowArray[number] = missingNumber;
    }
  }
  return rowArray;
};

const columnMissingOne = function(columnArray) {
  let existingNumbers = [];
  for (let number in columnArray) {
    existingNumbers.push(columnArray[number]);
  }
  existingNumbers.sort().shift();
  let missingNumber = 1;
  for (let number of existingNumbers) {
    if (number != missingNumber) {
      break;
    } else {
      missingNumber++;
    }
  }
  for (let number in columnArray) {
    if (columnArray[number] === 0) {
      columnArray[number] = missingNumber;
    }
  }
  return columnArray;
};

// Search for any row missing one number and fill it in
for (let r = 0; r < 9; r++) {
  count = 0;
  for (let c = 0; c < 9; c++) {
    if (puzzle[r][c] === 0) {
      count++;
    }
  }
  if (count === 1) {
    puzzle[r] = rowMissingOne(puzzle[r]);
  }
}

console.log(puzzle);

// Search for any column missing one number and fill it in
for (let c = 0; c < 9; c++) {
  count = 0;
  for (let r = 0; r < 9; r++) {
    if (puzzle[r][c] === 0) {
      count++;
    }
  }
  if (count === 1) {
    let column = [];
    for (let r = 0; r < 9; r++) {
      column.push(puzzle[r][c]);
    }
    let newColumn = columnMissingOne(column);
    for (let r = 0; r < 9; r++) {
      puzzle[r][c] = newColumn[r];
    }
  }
}

console.log(puzzle);
