import { RowBoard } from "../row-board/row-board.component";

export type TMatrix = Array<Array<number | null>>;

/**
 * Function to check whether the matrix is full of numbers or has some gap available. The function
 * will also check that it has the right number of columns and content
 * @param matrix the game board defined as a matrix. Subentries in this matrix are ROWS
 * @returns boolean if the matrix is correct; null if the matrix has wrong size or content
 */
export const isFull = (matrix: TMatrix): boolean | null => {
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

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
 * @abstract Function to check if the matrix is squared (no content in rows missing, or rows missing)
 * @param matrix The matrix (board game) to be checked
 * @returns boolean
 */
export const checkMatrixSize = (matrix: TMatrix): boolean => {
  for (const row of matrix) {
    if (row.length !== matrix.length) {
      return false;
    }
  }
  return true;
};

/**
 * @abstract Function to check that the board game only contains either numbers or nulls
 * @param matrix The matrix (board game) to be checked
 * @returns boolean
 */
export const checkMatrixContent = (matrix: TMatrix): boolean => {
  for (const row of matrix) {
    for (const element of row) {
      if (typeof element !== "number" && element !== null) {
        return false;
      }
    }
  }
  return true;
};

/**
 * @abstract Function to reverse a matrix's rows. Includes a sanity check for the size and content of the matrix.
 * This is a pure function, so a hard copy of the input matrix is done as not to change it, since
 * Array.prototype.reverse is an in-place method
 * @param matrix The matrix (board game) to reverse its rows
 * @returns matrix if the original matrix is correct; null otherwise
 */
export const invertRows = (matrix: TMatrix): TMatrix | null => {
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

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
export const switchRowsColumns = (matrix: TMatrix): TMatrix | null => {
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

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
export const moveRight = (matrix: TMatrix): TMatrix | null => {
  // Sanity check
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

  // The iteration will be from beginning to end, so the rows need to be inverted
  const inverted_matrix = invertRows(matrix);
  // Do the operations for each row
  for (const row of <TMatrix>inverted_matrix) {
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
          row[index] = <number>row[index] * 2;
          row.splice(index + 1, 1);
          row.push(null);
        }
      }
    }
  }
  // Inverts back the matrix to the original position and returns it

  return invertRows(<TMatrix>inverted_matrix);
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved down. Addition is also performed.
 */
export const moveDown = (matrix: TMatrix): TMatrix | null => {
  // Sanity check
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

  const transponded_matrix = switchRowsColumns(matrix);

  const moved_matrix = moveRight(<TMatrix>transponded_matrix);

  return switchRowsColumns(<TMatrix>moved_matrix);
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved to the left. Addition is also performed.
 */
export const moveLeft = (matrix: TMatrix): TMatrix | null => {
  // Sanity check
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

  // Move to left is the same as inverted move to right
  const inverted_matrix = invertRows(matrix);

  return invertRows(<TMatrix>moveRight(<TMatrix>inverted_matrix));
};

/**
 *
 * @param matrix The board game
 * @returns the matrix with all the content moved up. Addition is also performed.
 */
export const moveUp = (matrix: TMatrix): TMatrix | null => {
  // Sanity check
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

  const transponded_matrix = <TMatrix>switchRowsColumns(matrix);
  const moved_matrix = <TMatrix>moveLeft(transponded_matrix);

  return switchRowsColumns(moved_matrix);
};

export const addRandomNumber = (matrix: TMatrix): TMatrix | null => {
  // Sanity check
  if (!checkMatrixContent(matrix)) return null;
  if (!checkMatrixSize(matrix)) return null;

  let row, column;
  while (true) {
    row = Math.floor(Math.random() * matrix.length);
    column = Math.floor(Math.random() * matrix.length);

    if (matrix[row][column] === null) break;
  }
  const number = (Math.floor(Math.random() * 2) + 1) * 2;

  const new_matrix: TMatrix = [];
  for (const row of matrix) {
    new_matrix.push(Array.from(row));
  }
  new_matrix[row][column] = number;

  return new_matrix;
};
