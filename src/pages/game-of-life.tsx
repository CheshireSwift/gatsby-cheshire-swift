
export function computeNextGeneration(squares: cellState[]) {
    // Figure out how many live neighbours each cell has
    const aliveNeighbourCount: number[] = [];
    squares.forEach((square: cellState, i: number) => {
        // For each grid offset of a neighbour...
        const offsets: number[][] = [[-1, -1], [0, -1], [+1, -1], [-1, 0], [+1, 0], [-1, +1], [0, +1], [+1, +1]];
        let aliveNeighbours = 0;
        offsets.forEach(pair => {
            const [dx, dy] = pair;
            const [col, row] = [i % this.sideLength, Math.floor(i / this.sideLength)];
            const neighbour = { x: row + dx, y: col + dy };
            if (neighbour.x < 0 || neighbour.x >= this.sideLength
                || neighbour.y < 0 || neighbour.y >= this.sideLength) {
                // Neighbour cell is out of bounds, ignore
                return;
            }

            if (squares[neighbour.x * this.sideLength + neighbour.y] !== cellState.DEAD) {
                aliveNeighbours += 1;
            }
        });
        aliveNeighbourCount.push(aliveNeighbours);
    });

    // Once we have the number of live neighbours we can modify the state
    const newState = _.zipWith(squares, aliveNeighbourCount,
        (square: cellState, nLiveNeighbours: number) => {
            if (square === cellState.ALIVE) {
                // Any live cell with fewer than two live neighbors dies, as if by under population.
                // Any live cell with two or three live neighbors lives on to the next generation.
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                return (nLiveNeighbours < 2 || nLiveNeighbours > 3) ? cellState.DEAD : cellState.ALIVE;
            } else {
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                return (nLiveNeighbours === 3) ? cellState.ALIVE : cellState.DEAD;
            }
        });
    return newState;
}