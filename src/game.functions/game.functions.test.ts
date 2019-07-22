// Unit tests for the functions that will make up the core of the game

import { isFull } from "./game.functions";
import { generateMatrix } from "./game.functions";
import { invertRows } from "./game.functions";
import { switchRowsColumns } from "./game.functions";
import { moveRight } from "./game.functions";
import { moveDown } from "./game.functions";
import { moveLeft } from "./game.functions";
import { moveUp } from "./game.functions";
import { areMatricesIdentical } from "./game.functions";
import { calculatePoints } from "./game.functions";
import { isGameOver } from "./game.functions";
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

test("switch_rows_and_columns_1", () => {
  expect(
    switchRowsColumns([[2, 2, 2, 2], [4, 4, 4, 4], [2, 2, 2, 2], [4, 4, 4, 4]])
  ).toStrictEqual([[2, 4, 2, 4], [2, 4, 2, 4], [2, 4, 2, 4], [2, 4, 2, 4]]);
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

test("move_down_1", () => {
  expect(
    moveDown([
      [null, 2, 4, null],
      [null, 2, null, null],
      [16, 2, 8, 8],
      [2, 2, 4, 4]
    ])
  ).toStrictEqual([
    [null, null, null, null],
    [null, null, 4, null],
    [16, 4, 8, 8],
    [2, 4, 4, 4]
  ]);
});

test("move_left_1", () => {
  expect(
    moveLeft([
      [null, 2, 4, null],
      [null, 2, null, null],
      [16, 2, 8, 8],
      [2, 2, 4, 4]
    ])
  ).toStrictEqual([
    [2, 4, null, null],
    [2, null, null, null],
    [16, 2, 16, null],
    [4, 8, null, null]
  ]);
});

test("move_up_1", () => {
  expect(
    moveUp([
      [null, 2, 4, null],
      [null, 2, null, null],
      [16, 2, 8, 8],
      [2, 2, 4, 4]
    ])
  ).toStrictEqual([
    [16, 4, 4, 8],
    [2, 4, 8, 4],
    [null, null, 4, null],
    [null, null, null, null]
  ]);
});

test("are_matrices_identical_1", () => {
  expect(
    areMatricesIdentical(
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    )
  ).toBe(true);
});

test("are_matrices_identical_2", () => {
  expect(
    areMatricesIdentical(
      [[-1, 2, 3], [4, 5, 6], [7, 8, 9]],
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    )
  ).toBe(false);
});

test("calculate_points", () => {
  expect(
    calculatePoints([
      [null, null, 2, 4],
      [2, 2, 2, 2],
      [null, null, null, null],
      [4, 4, null, null]
    ])
  ).toBe(22);
});

test("is_game_over_1", () => {
  expect(
    isGameOver([[2, 4, 2, 4], [4, 2, 4, 2], [2, 4, 2, 4], [4, 2, 4, 2]])
  ).toBe(true);
});

test("is_game_over_2", () => {
  expect(
    isGameOver([[2, 4, 2, 4], [4, 4, 4, 2], [2, 4, 2, 4], [4, 2, 4, 2]])
  ).toBe(false);
});
