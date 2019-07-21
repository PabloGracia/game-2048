// Unit tests for the functions that will make up the core of the game

import { isFull } from "./game.functions";
import { generateMatrix } from "./game.functions";
import { checkMatrixSize } from "./game.functions";
import { checkMatrixContent } from "./game.functions";
import { invertRows } from "./game.functions";
import { switchRowsColumns } from "./game.functions";
import { moveRight } from "./game.functions";

/*
test("function_name", () => {
    expect(function(args)).toBe(result);
});
*/

test("is_matrix_full_1", () => {
  expect(
    isFull([
      [2, 4, 2, null],
      [null, null, null, null],
      [2, 2, 2, 2],
      [4, 2, null, 2]
    ])
  ).toBe(false);
});

test("is_matrix_full_2", () => {
  expect(
    isFull([
      [2, 4, null],
      [null, null, null, null],
      [2, 2, 2, 2],
      [4, 2, null, 2]
    ])
  ).toBe(null);
});

test("is_matrix_full_3", () => {
  expect(
    isFull([[2, 4, 2, null], [null, null, null, null], [2, 2, 2, 2]])
  ).toBe(null);
});

test("is_matrix_full_4", () => {
  expect(
    isFull([
      [2, 4, 2, "null"],
      [null, null, null, null],
      [2, 2, 2, 2],
      [4, 2, null, 2]
    ])
  ).toBe(null);
});

test("is_matrix_full_5", () => {
  expect(isFull([[2, 4, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [4, 2, 4, 2]])).toBe(
    true
  );
});

test("generate_matrix_1", () => {
  expect(generateMatrix(null, 4)).toStrictEqual([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ]);
});

test("check_matrix_size_1", () => {
  expect(checkMatrixSize([[2, 2, 2, 2], [4, null, 2, null]])).toBe(false);
});

test("check_matrix_size_2", () => {
  expect(
    checkMatrixSize([
      [2, 2, 2, 2],
      [4, null, 2, null],
      [2, 2, 2, 2],
      [4, null, 2, null]
    ])
  ).toBe(true);
});

test("check_matrix_size_3", () => {
  expect(
    checkMatrixSize([
      [2, 2, 2],
      [4, null, 2, null],
      [2, 2, 2, 2],
      [4, null, 2, null]
    ])
  ).toBe(false);
});

test("check_matrix_content_1", () => {
  expect(checkMatrixContent([[2, 2, 4], [4, 2, null], [2, 8, 2]])).toBe(true);
});

test("check_matrix_content_2", () => {
  expect(checkMatrixContent([[2, "2", 4], [4, 2, null], [2, 8, 2]])).toBe(
    false
  );
});

test("switch_rows_and_columns_1", () => {
  expect(
    switchRowsColumns([[2, 2, 2, 2], [4, 4, 4, 4], [2, 2, 2, 2], [4, 4, 4, 4]])
  ).toStrictEqual([[2, 4, 2, 4], [2, 4, 2, 4], [2, 4, 2, 4], [2, 4, 2, 4]]);
});

test("switch_rows_and_columns_2", () => {
  expect(
    switchRowsColumns([[2, 2, 2], [4, 4, 4, 4], [2, 2, 2, 2], [4, 4, 4, 4]])
  ).toBe(null);
});

test("invert_row_1", () => {
  expect(
    invertRows([[1, 2, 3, 4], [2, 4, 6, 8], [-1, -2, -3, -4], [-2, -4, -6, -8]])
  ).toStrictEqual([
    [4, 3, 2, 1],
    [8, 6, 4, 2],
    [-4, -3, -2, -1],
    [-8, -6, -4, -2]
  ]);
});

test("invert_row_2", () => {
  expect(
    invertRows([[1, 3, 4], [2, 4, 6, 8], [-1, -2, -3, -4], [-2, -4, -6, -8]])
  ).toBe(null);
});

test("move_right_1", () => {
  expect(
    moveRight([
      [null, 2, 4, null],
      [null, 2, null, null],
      [16, 2, 8, 8],
      [2, 2, 4, 4]
    ])
  ).toStrictEqual([
    [null, null, 2, 4],
    [null, null, null, 2],
    [null, 16, 2, 16],
    [null, null, 4, 8]
  ]);
});
