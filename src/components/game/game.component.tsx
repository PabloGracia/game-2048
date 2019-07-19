import React from "react";

import { Score } from "../score/score.component";

import "./game.styles.scss";

interface IProps {}

interface IState {
  score: number;
  high_score: number;
}

export class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      score: 0,
      high_score: 0
    };
  }

  render() {
    return (
      <div className="game">
        <h1>Board</h1>
        <Score score={this.state.score} high_score={this.state.high_score} />
      </div>
    );
  }
}
