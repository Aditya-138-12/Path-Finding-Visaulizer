import React, { useState, useEffect } from "react";
import Nodes from "../nodes/nodes"; // Ensure correct path to Nodes component
import "../nodes/nodesM.css";
import { dijkstra } from "../algorithms/dijkastra";

const PathFinder = () => {
    const numRows = 20;
    const numCols = 50;

    const createGrid = () => {
        const grid = [];
        for (let row = 0; row < numRows; row++) {
            const currentRow = [];
            for (let col = 0; col < numCols; col++) {
                currentRow.push({
                    row,
                    col,
                    isStart: row === 19 && col === 0,
                    isFinish: row === 8 && col === 20,
                    isWall: false,
                });
            }
            grid.push(currentRow);
        }
        console.log("This is grid array: ", grid);
        return grid;
    };
    const [grid, setGrid] = useState(createGrid());
    const [isRunning, setIsRunning] = useState(false);
    const [shortestPath, setShortestPath] = useState([]);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [animatedPath, setAnimatedPath] = useState([]);



    // Handle mouse down event
    const handleMouseDown = (row, col) => {
        if (isRunning) return;
        setIsMousePressed(true);
        toggleWall(row, col);
    };

    // Handle mouse move event
    const handleMouseMove = (row, col) => {
        if (isMousePressed) {
            toggleWall(row, col);
        }
    };

    // Handle mouse up event
    const handleMouseUp = () => {
        setIsMousePressed(false);
    };

    const toggleWall = (row, col) => {
        const newGrid = grid.map((r) =>
            r.map((node) => {
                if (node.row === row && node.col === col) {
                    return { ...node, isWall: !node.isWall };
                }
                return node;
            })
        );
        setGrid(newGrid);
    };

    const handleRunAlgorithm = () => {
        setIsRunning(true);
        setAnimatedPath([]); // Clear previous animated path
        setShortestPath([]);
        const startNode = grid.flat().find((node) => node.isStart);
        const finishNode = grid.flat().find((node) => node.isFinish);

        if (!startNode || !finishNode) return;

        const path = dijkstra(grid, startNode, finishNode);
        setShortestPath(path);
        setIsRunning(false);
    };
    useEffect(() => {
        if (shortestPath.length > 0) {
            animateShortestPath(shortestPath);
        }
    }, [shortestPath]);

    const animateShortestPath = (path) => {
        path.forEach((node, index) => {
            setTimeout(() => {
                setAnimatedPath((prev) => [...prev, node]);
            }, 25 * index); // Adjust the interval for animation speed
        });
    };

    return (
        <div>
            <button onClick={handleRunAlgorithm} disabled={isRunning}>
                Run Dijkstra's Algorithm
            </button>
            <div className="grid-container" onMouseUp={handleMouseUp}>
                {grid.flat().map((node, index) => (
                    <Nodes
                        key={index}
                        row={node.row}
                        col={node.col}
                        isStart={node.isStart}
                        isFinish={node.isFinish}
                        isPath={shortestPath.includes(node)}
                        isAnimatedPath={animatedPath.includes(node)}
                        isWall={node.isWall}
                        onMouseDown={() => handleMouseDown(node.row, node.col)}
                        onMouseEnter={() => handleMouseMove(node.row, node.col)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PathFinder;
