import React from 'react';

import { RowBoard } from "../row-board/row-board.component"
import { TMatrix } from "../../game.functions/game.functions";

interface IProps {
    values: TMatrix;
}

export const Board: React.FunctionComponent<IProps> = (props) => (
    <div className="board">
        {props.values.map((row, idx) => (
          <RowBoard key={idx} values={row} />
        ))}
    </div>
)