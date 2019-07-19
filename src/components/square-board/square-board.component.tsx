import React from "react";

import "./square-board.styles.scss";

interface IProps {
  value: number | null;
}

export const SquareBoard: React.FunctionComponent<IProps> = ({ value }) => (
  <div className="square-recipient">
    <div className="square-content">{value}</div>
  </div>
);
