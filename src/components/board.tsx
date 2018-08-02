import * as React from 'react';
import * as life from './game-of-life';
import * as cell from './cellState';
import TimeControl from './timecontrol';
import Clear from './clear';
import Grid from './grid';
import { css } from 'emotion';

interface BoardState {
    squares: cell.state[];
    isRunning: boolean;
    timerToken: number;
    generationFunction: (squares: cell.state[]) => (cell.state[]);
}

const ruleRegex = /^B(\d*)\/S(\d*)$/;  // Strings which look like 'B3/S23'

const startingRule = 'B1/S12';
const [bornCounts, surviveCounts] = startingRule.split('/')
                .map(fragment => fragment.split('').map(i => parseInt(i, 10)).filter((i: number) => !isNaN(i)));

export class Board extends React.Component<{}, BoardState> {
    sideLength: number;
    input: HTMLInputElement;
    constructor(props: {}) {
        super(props);
        this.sideLength = 50;
        this.state = {
            generationFunction: life.computeNextGeneration(bornCounts, surviveCounts),
            isRunning: false,
            squares: Array(this.sideLength * this.sideLength).fill(cell.state.DEAD),
            timerToken: 0,
        };
    }

    render() {
        const inputField = (
            <input ref={c => {this.input = c; }} type="text" onChange={evt => this.handleRuleChange(evt)} />
        );

        const statusMessage = (
            <div className={css({height: 20})}>
                {this.input ? this.statusMessage(this.input.value) : null}
            </div>
        );

        const spacer = (
            <div className={css({height: 10})}></div>
        );

        return (
            <div>
                {inputField}
                {statusMessage}
                <TimeControl onClickHandler={this.alternateAnimation.bind(this)} value={this.buttonText()} />
                <Clear onClickHandler={this.clearBoard} />
                {spacer}
                <Grid squares={this.state.squares} sideLength={this.sideLength}
                onClickHandler={this.toggleCellState.bind(this)}/>
            </div>
        );
    }

    componentDidMount() {
        this.input.value = startingRule;
    }

    isValidRule = (rule: string) => ruleRegex.test(rule);

    statusMessage = (rule: string) => this.isValidRule(rule) ? "" : "Not a valid rule";

    clearBoard = () => this.setState({squares: [...this.state.squares].fill(cell.state.DEAD)});

    setGenerationFunction(rule: string) {
        const match = ruleRegex.exec(rule);
        if (!match) {
            this.setState({});
            // Were this not here, the component (ie. status message) isn't rerendered when a rule is invalid
            // meaning the invalid message isn't displayed
            return;
        }
        const bornCounts = match[1].split('').map(i => parseInt(i, 10));
        const surviveCounts = match[2].split('').map(i => parseInt(i, 10));
        console.log(`New rule issued for born ${bornCounts} and survive ${surviveCounts}`);
        const generationFunction = life.computeNextGeneration(bornCounts, surviveCounts);
        this.setState({ generationFunction });
    }

    handleRuleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const rule: string = evt.target.value;
        this.setGenerationFunction(rule);
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

    toggleCellState(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = (squares[i] === cell.state.ALIVE) ? cell.state.DEAD : cell.state.ALIVE;
        this.setState({ squares });
    }

}
