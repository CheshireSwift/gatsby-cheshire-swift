import * as cell from './cellState';
import * as _ from 'lodash';

const offsets: number[][] = [[-1, -1], [0, -1], [+1, -1], [-1, 0], [+1, 0], [-1, +1], [0, +1], [+1, +1]];

export const computeNextGeneration = (bornNeighbourCount: number[], surviveNeighbourCount: number[]) => (
    (squares: cell.state[]) => {
        // Figure out how many live neighbours each cell has
        const sideLength = Math.sqrt(squares.length);
        const aliveNeighbourCount: number[] = [];
        squares.forEach((square: cell.state, i: number) => {
            // For each grid offset of a neighbour...
            let aliveNeighbours = 0;
            offsets.forEach(pair => {
                const [dx, dy] = pair;
                const [col, row] = [i % sideLength, Math.floor(i / sideLength)];
                const neighbour = { x: row + dx, y: col + dy };
                if (neighbour.x < 0 || neighbour.x >= sideLength
                    || neighbour.y < 0 || neighbour.y >= sideLength) {
                    // Neighbour cell is out of bounds, ignore
                    return;
                }

                if (squares[neighbour.x * sideLength + neighbour.y] !== cell.state.DEAD) {
                    aliveNeighbours += 1;
                }
            });
            aliveNeighbourCount.push(aliveNeighbours);
        });

        // Once we have the number of live neighbours we can modify the state
        const newState = _.zipWith(squares, aliveNeighbourCount,
            (square: cell.state, nLiveNeighbours: number) => {
                if (square === cell.state.ALIVE) {
                    return surviveNeighbourCount.includes(nLiveNeighbours) ? cell.state.ALIVE : cell.state.DEAD;
                } else {
                    return bornNeighbourCount.includes(nLiveNeighbours) ? cell.state.ALIVE : cell.state.DEAD;
                }
            });
        return newState;
    }
);
