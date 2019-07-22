import React from "react";

import { SquareBoard } from "../square-board/square-board.component";

import "./row-board.styles.scss";

interface IProps {
  values: Array<number | null>;
}

export const RowBoard: React.FunctionComponent<IProps> = props => {
  return (
    <div className="row-board">
      {props.values.map((value, index) => (
        <SquareBoard value={value} key={index} />
      ))}
    </div>
  );
};
