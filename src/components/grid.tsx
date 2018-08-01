import Square from './square';
import * as React from 'react';
import * as _ from 'lodash';
import * as cell from './cellState';

export class Grid extends React.PureComponent<{ squares: cell.state[], sideLength: number,
                     onClickHandler: (i: number) => void }> {

    makeRowOfSquares = (i: number) => {
        return (
        <div className="board-row">
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
}

export default Grid;
