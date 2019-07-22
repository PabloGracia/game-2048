import React from "react";

import { Score } from "../score/score.component";
import { Board } from "../board/board.component";
import {
  moveRight,
  moveDown,
  moveLeft,
  moveUp,
  addRandomNumber,
  TMatrix,
  areMatricesIdentical,
  calculatePoints,
  isGameOver
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

  // keyRight = () => {
  //   const matrix_moved = moveRight(this.state.values);
  //   const matrix_complete = addRandomNumber(matrix_moved as TMatrix);

  //   if (!areMatricesIdentical(this.state.values, matrix_moved as TMatrix)) {
  //     this.setState(
  //       {
  //         values: matrix_complete as TMatrix,
  //         score: calculatePoints(matrix_complete as TMatrix)
  //       },
  //       () => {
  //         if (this.state.score > this.state.high_score) {
  //           this.setState({
  //             high_score: this.state.score
  //           });
  //         }
  //       }
  //     );
  //   }
  // };

  keyPressed = (key: "right" | "down" | "left" | "up") => {
    let matrix_moved;
    switch (key) {
      case "right":
        matrix_moved = moveRight(this.state.values);
        console.log("moving right");
        break;
      case "down":
        matrix_moved = moveDown(this.state.values);
        console.log("moving down");
        break;
      case "left":
        matrix_moved = moveLeft(this.state.values);
        console.log("moving left");
        break;
      case "up":
        matrix_moved = moveUp(this.state.values);
        console.log("moving up");
        break;
    }
    const matrix_complete = addRandomNumber(matrix_moved as TMatrix);
    if (!areMatricesIdentical(this.state.values, matrix_moved as TMatrix)) {
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
