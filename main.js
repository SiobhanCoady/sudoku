let puzzle = [];
let count;

for (let r = 0; r < 9; r++) {
  puzzle[r] = [];
  for (let c = 0; c < 9; c++) {
    puzzle[r][c]=0;
  }
}

// console.log(puzzle);

puzzle[3][0] = 2;
puzzle[3][1] = 1;
puzzle[3][2] = 3;
puzzle[3][3] = 6;
puzzle[3][4] = 5;
puzzle[3][6] = 4;
puzzle[3][7] = 9;
puzzle[3][8] = 8;

puzzle[0][2] = 9;
puzzle[1][2] = 6;
puzzle[2][2] = 4;
puzzle[4][2] = 1;
puzzle[5][2] = 5;
puzzle[6][2] = 2;
puzzle[8][2] = 7;

console.log(puzzle);

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
