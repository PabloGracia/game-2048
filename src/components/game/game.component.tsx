import React from "react";

import { Score } from "../score/score.component";
import { RowBoard } from "../row-board/row-board.component";

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
