import React from "react";

import { Score } from "../score/score.component";
import { Board } from "../board/board.component";
import {
  moveRight,
  moveDown,
  moveLeft,
  moveUp,
  addRandomNumber,
  areMatricesIdentical,
  calculatePoints,
  isGameOver,
  canMatrixColumnsMove,
  canMatrixRowsMove,
  isFull
} from "../../game.functions/game.functions";

import "./game.styles.scss";

interface IProps {}

interface IState {
  score: number;
  high_score: number;
  values: Array<Array<number | null>>;
  isGameOver: boolean;
}

export class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      score: 0,
      high_score: 0,
      values: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ],
      isGameOver: false
    };
  }

  keyPressed = (key: "right" | "down" | "left" | "up") => {
    const board = this.state.values;
    let matrix_moved, matrix_complete;
    switch (key) {
      case "right":
        if (canMatrixRowsMove(board)) {
          matrix_moved = moveRight(board);
          console.log("moving right");
        } else {
          matrix_moved = board;
        }
        break;
      case "down":
        if (canMatrixColumnsMove(board)) {
          matrix_moved = moveDown(board);
          console.log("moving down");
        } else {
          matrix_moved = board;
        }
        break;
      case "left":
        if (canMatrixRowsMove(board)) {
          matrix_moved = moveLeft(board);
          console.log("moving left");
        } else {
          matrix_moved = board;
        }
        break;
      case "up":
        if (canMatrixColumnsMove(board)) {
          matrix_moved = moveUp(board);
          console.log("moving up");
        } else {
          matrix_moved = board;
        }
        break;
      default:
        matrix_moved = this.state.values;
        break;
    }
    if (!isFull(board)) {
      matrix_complete = addRandomNumber(matrix_moved);
    } else {
      matrix_complete = matrix_moved;
    }
    if (!areMatricesIdentical(this.state.values, matrix_moved)) {
      console.log("Matrices are not identical");
      this.setState(
        {
          values: matrix_complete,
          score: calculatePoints(matrix_complete)
        },
        () => {
          if (this.state.score > this.state.high_score) {
            this.setState(
              {
                high_score: this.state.score
              },
              () => {
                if (isGameOver(this.state.values)) this.endGame();
              }
            );
          }
        }
      );
    }
  };

  endGame = () => {
    this.setState({
      isGameOver: true
    });
  };

  startGame = () => {
    this.setState(
      {
        score: 0,
        values: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null]
        ],
        isGameOver: false
      },
      () => this.setState({ values: addRandomNumber(this.state.values) })
    );
  };

  componentDidMount() {
    window.addEventListener("keydown", event => {
      if (event.keyCode === 37) {
        this.keyPressed("left");
      } else if (event.keyCode === 38) {
        this.keyPressed("up");
      } else if (event.keyCode === 39) {
        this.keyPressed("right");
      } else if (event.keyCode === 40) {
        this.keyPressed("down");
      }
    });
    this.setState({
      values: addRandomNumber(this.state.values)
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", event => {
      if (event.keyCode === 37) {
        this.keyPressed("left");
      } else if (event.keyCode === 38) {
        this.keyPressed("up");
      } else if (event.keyCode === 39) {
        this.keyPressed("right");
      } else if (event.keyCode === 40) {
        this.keyPressed("down");
      }
    });
  }

  render() {
    return (
      <div className="game">
        {this.state.isGameOver ? (
          <h1>GAME OVER</h1>
        ) : (
          <Board values={this.state.values} />
        )}
        <Score score={this.state.score} high_score={this.state.high_score} />
        <button onClick={this.startGame}>Reset Game</button>
      </div>
    );
  }
}
