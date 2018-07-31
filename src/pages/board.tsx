import * as React from 'react';
import * as _ from 'lodash';
import * as life from './game-of-life';
import * as cell from './cellState';
import TimeControl from './timecontrol';
import Square from './square';

interface BoardState {
    squares: cell.state[];
    isRunning: boolean;
    timerToken: Timer;
}

export class Board extends React.Component<{}, BoardState> {
    sideLength: number;
    constructor(props: {}) {
        super(props);
        this.sideLength = 50;
        this.state = {
            isRunning: false,
            squares: Array(this.sideLength * this.sideLength).fill(cell.state.DEAD),
            timerToken: 0,
        };
    }

    render() {
        return (
            <div>
                <TimeControl onClickHandler={this.alternateAnimation.bind(this)} value={this.buttonText()} />
                <div className="separator"></div>
                {_.range(this.sideLength).map((row: number) => this.makeRowOfSquares(row))}
            </div>
        );
    }

    alternateAnimation() {
        if (!this.state.isRunning) {
            const id = setInterval(this.evolve.bind(this), 500);
            this.setState({ timerToken: id });
        } else {
            clearInterval(this.state.timerToken);
        }
        this.setState({ isRunning: !this.state.isRunning });
    }

    buttonText() {
        return (this.state.isRunning ? 'Stop' : 'Go');
    }

    evolve() {
        this.setState({ squares: life.computeNextGeneration(this.state.squares) });
    }

    makeRowOfSquares(i: number) {
        return (<div className="board-row">
            {_.range(i * this.sideLength, (i + 1) * this.sideLength).map((j: number) => this.renderSquare(j))}
        </div>
        );
    }

    renderSquare(i: number) {
        return (
            <Square
                key={i}
                styleClass={cell.style[this.state.squares[i]]}
                onClickHandler={() => this.createAliveCell(i)}
            />
        );
    }

    createAliveCell(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = cell.state.ALIVE;
        this.setState({ squares });
    }

}
