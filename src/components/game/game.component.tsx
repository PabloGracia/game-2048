import React from "react";

import { Score } from "../score/score.component";
import { RowBoard } from "../row-board/row-board.component";
import {
  moveRight,
  moveDown,
  moveLeft,
  moveUp,
  addRandomNumber,
  TMatrix
} from "../game.functions/game.functions";

import "./game.styles.scss";

interface IProps {}

interface IState {
  score: number;
  high_score: number;
  values: Array<Array<number | null>>;
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
      ]
    };
    window.addEventListener("keydown", event => {
      if (event.keyCode === 37) {
        this.keyLeft();
      } else if (event.keyCode === 38) {
        this.keyUp();
      } else if (event.keyCode === 39) {
        this.keyRight();
      } else if (event.keyCode === 40) {
        this.keyDown();
      }
    });
  }

  keyRight = () => {
    const matrix_moved = moveRight(this.state.values);
    const matrix_complete = addRandomNumber(matrix_moved as TMatrix);

    this.setState({
      values: matrix_complete as TMatrix
    });
  };

  keyDown = () => {
    const matrix_moved = moveDown(this.state.values);
    const matrix_complete = addRandomNumber(matrix_moved as TMatrix);

    this.setState({
      values: matrix_complete as TMatrix
    });
  };

  keyLeft = () => {
    const matrix_moved = moveLeft(this.state.values);
    const matrix_complete = addRandomNumber(matrix_moved as TMatrix);

    this.setState({
      values: matrix_complete as TMatrix
    });
  };

  keyUp = () => {
    const matrix_moved = moveUp(this.state.values);
    const matrix_complete = addRandomNumber(matrix_moved as TMatrix);

    this.setState({
      values: matrix_complete as TMatrix
    });
  };

  componentDidMount() {
    this.setState({
      values: addRandomNumber(this.state.values) as TMatrix
    });
  }

  render() {
    return (
      <div className="game">
        {this.state.values.map((row, idx) => (
          <RowBoard key={idx} values={row} />
        ))}
        <Score score={this.state.score} high_score={this.state.high_score} />
      </div>
    );
  }
}
