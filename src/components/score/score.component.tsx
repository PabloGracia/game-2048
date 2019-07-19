import React from "react";

import "./score.styles.scss";

interface IProps {
  score: number;
  high_score: number;
}

export const Score: React.FunctionComponent<IProps> = ({
  score,
  high_score
}) => (
  <div className="scores">
    <div className="current-score">Score: {score}</div>
    <div className="high-score">Highest Score: {high_score}</div>
  </div>
);
