import Square from './square';
import * as React from 'react';
import * as _ from 'lodash';
import * as cell from './cellState';
import { css } from '../../node_modules/emotion';

interface GridProps {
    squares: cell.state[];
    sideLength: number;
    onClickHandler: (i: number) => void;
}

export class Grid extends React.PureComponent<GridProps> {

    makeRowOfSquares = (i: number) => {
        return (
        <div key={i} className={css(
            {':after': {
            clear: 'both',
            display: 'table',
          }})}>
            {_.range(i * this.props.sideLength, (i + 1) * this.props.sideLength)
                .map((j: number) => this.renderSquare(j))}
        </div>
        );
    }

    renderSquare = (i: number) => {
        return (
            <Square
                key={i}
                cellState={this.props.squares[i]}
                onClickHandler={() => this.props.onClickHandler(i)}
            />
        );
    }

    render() {
        return (<div>
            {_.range(this.props.sideLength).map((row: number) => this.makeRowOfSquares(row)) }
        </div>);
    }

    shouldComponentUpdate(newProps: GridProps) {
        return _.zip(this.props.squares, newProps.squares)
        .some(([oldSquare, newSquare]) => oldSquare !== newSquare);
    }
}

export default Grid;
