export type TMatrix = Array<Array<number | null>>;

/**
 * Function to check whether the matrix is full of numbers or has some gap available. The function
 * will also check that it has the right number of columns and content
 * @param matrix the game board defined as a matrix. Subentries in this matrix are ROWS
 * @returns boolean if the matrix is correct; null if the matrix has wrong size or content
 */
export const isFull = (matrix: TMatrix): boolean => {
  for (const row of matrix) {
    for (const element of row) {
      if (element === null) return false;
    }
  }

  return true;
};

/**
 * @abstract Creates a square matrix
 * @param value the content that will be spread through the matrix. Either number or null
 * @param range The range of the SQUARE matrix
 * @returns A square matrix of the provided range filled with the provided value as content
 */
export const generateMatrix = (
  value: number | null,
  range: number
): TMatrix => {
  const matrix: TMatrix = [];
  for (let index = 0; index < range; index++) {
    matrix.push([]);
    for (let jndex = 0; jndex < range; jndex++) {
      matrix[index].push(value);
    }
  }
  return matrix;
};

/**
 * @abstract Function to reverse a matrix's rows. Includes a sanity check for the size and content of the matrix.
 * This is a pure function, so a hard copy of the input matrix is done as not to change it, since
 * Array.prototype.reverse is an in-place method
 * @param matrix The matrix (board game) to reverse its rows
 * @returns matrix if the original matrix is correct; null otherwise
 */
export const invertRows = (matrix: TMatrix): TMatrix => {
  const hard_copy_matrix: TMatrix = [];

  for (const row of matrix) {
    hard_copy_matrix.push(Array.from(row));
  }

  for (const row of hard_copy_matrix) {
    row.reverse();
  }

  return hard_copy_matrix;
};

/**
 * Function to transpond a matrix
 * @param matrix The matrix to be transponded
 * @returns The transponded matrix if the original one is correct; null otherwise
 */
export const switchRowsColumns = (matrix: TMatrix): TMatrix => {
  const transponded_matrix: TMatrix = [];
  for (let index = 0; index < matrix[0].length; index++) {
    transponded_matrix.push([]);
    for (const row of matrix) {
      transponded_matrix[index].push(row[index]);
    }
  }
  return transponded_matrix;
};

/**
 *
 * @param row row of a matrix to be checked
 */
export const isRowEmpty = (row: Array<number | null>): boolean => {
  for (const element of row) {
    if (element !== null) return false;
  }
  return true;
};

/**
 *
 * @param row row of a matrix to be checked
 */
export const isRowFull = (row: Array<number | null>): boolean => {
  for (const element of row) {
    if (element === null) return false;
  }
  return true;
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved to the right. Addition is also performed.
 */
export const moveRight = (matrix: TMatrix): TMatrix => {
  // The iteration will be from beginning to end, so the rows need to be inverted
  const inverted_matrix = invertRows(matrix);
  // Do the operations for each row
  for (const row of inverted_matrix) {
    // Displaces the non-null content of the row to the left
    if (!isRowEmpty(row)) {
      // The double loop is needed in case there are two null togethers,
      // otherwise the splice would jump one of them
      for (let _ = 0; _ < row.length; _++) {
        for (let index = 0; index < row.length; index++) {
          if (row[index] === null) {
            row.splice(index, 1);
            row.push(null);
          }
        }
      }
    }
    // Performs the sumation of the equal numbers
    for (let index = 0; index < row.length - 1; index++) {
      if (row[index] !== null) {
        if (row[index] === row[index + 1]) {
          row[index] = (row[index] as number) * 2;
          row.splice(index + 1, 1);
          row.push(null);
        }
      }
    }
  }
  // Inverts back the matrix to the original position and returns it

  return invertRows(inverted_matrix);
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved down. Addition is also performed.
 */
export const moveDown = (matrix: TMatrix): TMatrix => {
  const transponded_matrix = switchRowsColumns(matrix);

  const moved_matrix = moveRight(transponded_matrix);

  return switchRowsColumns(moved_matrix);
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved to the left. Addition is also performed.
 */
export const moveLeft = (matrix: TMatrix): TMatrix => {
  // Move to left is the same as inverted move to right
  const inverted_matrix = invertRows(matrix);

  return invertRows(moveRight(inverted_matrix));
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved up. Addition is also performed.
 */
export const moveUp = (matrix: TMatrix): TMatrix => {
  const transponded_matrix = switchRowsColumns(matrix);
  const moved_matrix = moveLeft(transponded_matrix);

  return switchRowsColumns(moved_matrix);
};

/**
 * Function to add a random number (2 or 4) to a random free location in the board game
 * @param matrix The matrix to add the number to
 * @returns the matrix provided with the added number
 */
export const addRandomNumber = (matrix: TMatrix): TMatrix => {
  const empty_locations: Array<Array<number>> = [];
  for (let index = 0; index < matrix.length; index++) {
    for (let jndex = 0; jndex < matrix[0].length; jndex++) {
      if (matrix[index][jndex] === null) {
        empty_locations.push([index, jndex]);
      }
    }
  }

  const new_matrix: TMatrix = [];
  for (const row of matrix) {
    new_matrix.push(Array.from(row));
  }

  if (empty_locations.length > 0) {
    const number = (Math.floor(Math.random() * 2) + 1) * 2;
    const [coor_x, coor_y] = empty_locations[
      Math.floor(Math.random() * empty_locations.length)
    ];

    new_matrix[coor_x][coor_y] = number;
  }

  return new_matrix;
};

/**
 *
 * @param matrix1 first matrix to compare
 * @param matrix2 second matrix to compare
 */
export const areMatricesIdentical = (
  matrix1: TMatrix,
  matrix2: TMatrix
): boolean => {
  for (let index = 0; index < matrix1.length; index++) {
    for (let jndex = 0; jndex < matrix1[0].length; jndex++) {
      if (matrix1[index][jndex] !== matrix2[index][jndex]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Function to calculate the points in the board
 * @param matrix board game
 * @returns the sum of values within the board
 */
export const calculatePoints = (matrix: TMatrix): number => {
  let sum = 0;
  for (const row of matrix) {
    for (const element of row) {
      sum = element ? sum + element : sum;
    }
  }
  return sum;
};

/**
 *
 * @param matrix board game
 * @returns boolean stating if the game is over or not
 */
export const isGameOver = (matrix: TMatrix): boolean => {
  if (canMatrixRowsMove(matrix)) return false;
  if (canMatrixColumnsMove(matrix)) return false;

  return true;
};

/**
 * Function that checks if moving along a row is possible (two equal numbers together or null in the row)
 * @param row row of a board game to analyze
 * @returns boolean: true if movement is possible, false if not
 */
export const canRowMove = (row: Array<number | null>): boolean => {
  for (let index = 0; index < row.length - 1; index++) {
    if (row[index] === null) return true;
    if (row[index] === row[index + 1]) return true;
  }
  if (row[row.length - 1] === null) return true;
  return false;
};

export const canMatrixRowsMove = (matrix: TMatrix): boolean => {
  if (!isFull(matrix)) return true;
  for (const row of matrix) {
    if (canRowMove(row)) return true;
  }
  return false;
};

export const canMatrixColumnsMove = (matrix: TMatrix): boolean => {
  const transponded_matrix = switchRowsColumns(matrix);
  return canMatrixRowsMove(transponded_matrix);
};
