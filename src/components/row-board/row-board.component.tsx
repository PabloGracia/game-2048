import React from "react";

import { SquareBoard } from "../square-board/square-board.component";

import "./row-board.styles.scss";

interface IProps {
  key: number;
  values: Array<number | null>;
}

export const RowBoard: React.FunctionComponent<IProps> = props => {
  return (
    <div className="row-board" key={props.key}>
      {props.values.map(value => (
        <SquareBoard value={value} />
      ))}
    </div>
  );
};
