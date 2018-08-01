import * as React from 'react';
import * as _ from 'lodash';
import * as life from './game-of-life';
import * as cell from './cellState';
import TimeControl from './timecontrol';
import Clear from './clear';
import Square from './square';
import { css } from 'emotion';

interface BoardState {
    squares: cell.state[];
    isRunning: boolean;
    timerToken: Timer;
    rule: string;
    generationFunction: (squares: cell.state[]) => (cell.state[]);
}

const ruleRegex = /B(\d*)\/S(\d*)/;  // Strings which look like 'B3/S23'

export class Board extends React.Component<{}, BoardState> {
    sideLength: number;
    constructor(props: {}) {
        super(props);
        this.sideLength = 50;
        this.state = {
            generationFunction: life.computeNextGeneration([3], [2, 3]),
            isRunning: false,
            rule: 'B3/S23',
            squares: Array(this.sideLength * this.sideLength).fill(cell.state.DEAD),
            timerToken: 0,
        };
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.rule} onChange={evt => this.handleRuleChange(evt)} />
                <div className={css({height: '20px'})}>{this.isValidRule() ? "" : "Not a valid rule"}</div>
                <TimeControl onClickHandler={this.alternateAnimation.bind(this)} value={this.buttonText()} />
                <Clear onClickHandler={() => this.setState({squares: this.state.squares.fill(cell.state.DEAD)})} />
                <div className={css({height: '10px'})}></div>
                {_.range(this.sideLength).map((row: number) => this.makeRowOfSquares(row)) }
            </div >
        );
    }

    isValidRule = () => ruleRegex.test(this.state.rule);

    getGenerationFunction(rule: string): (squares: cell.state[]) => (cell.state[]) | null | undefined {
        const match = ruleRegex.exec(rule);
        if (!match) {
            return;
        }
        const bornCounts = match[1].split('').map(i => parseInt(i, 10));
        const surviveCounts = match[2].split('').map(i => parseInt(i, 10));
        console.log(`New rule issued for born ${bornCounts} and survive ${surviveCounts}`);
        return life.computeNextGeneration(bornCounts, surviveCounts);
    }

    handleRuleChange(evt: any) {
        const rule: string = evt.target.value;
        const generationFunction = this.getGenerationFunction(rule);
        if (generationFunction) {
            this.setState({ rule, generationFunction });
        } else {
            this.setState({ rule });
        }
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
        this.setState({
            squares: this.state.generationFunction(this.state.squares),
        });
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
                cellState={this.state.squares[i]}
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
