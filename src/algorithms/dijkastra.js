// src/algorithms/dijkstra.js

export const dijkstra = (grid, startNode, finishNode) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const getNeighbors = (node) => {
        const { row, col } = node;
        const neighbors = [];
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
        ];
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                const neighbor = grid[newRow][newCol];
                if (!neighbor.isWall) { // Check if neighbor is not a wall
                    neighbors.push(neighbor);
                }
            }
        }
        return neighbors;
    };

    const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const previousNodes = Array.from({ length: rows }, () => Array(cols).fill(null));
    const unvisitedNodes = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const node = grid[row][col];
            unvisitedNodes.push(node);
        }
    }

    distances[startNode.row][startNode.col] = 0;

    while (unvisitedNodes.length) {
        unvisitedNodes.sort((a, b) => distances[a.row][a.col] - distances[b.row][b.col]);
        const currentNode = unvisitedNodes.shift();

        if (currentNode === finishNode) {
            // Construct shortest path
            const shortestPath = [];
            let node = finishNode;
            while (node) {
                shortestPath.push(node);
                node = previousNodes[node.row][node.col];
            }
            return shortestPath.reverse();
        }

        const neighbors = getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            const newDist = distances[currentNode.row][currentNode.col] + 1; // Assume each edge has weight 1
            if (newDist < distances[neighbor.row][neighbor.col]) {
                distances[neighbor.row][neighbor.col] = newDist;
                previousNodes[neighbor.row][neighbor.col] = currentNode;
            }
        }
    }

    return [];
};