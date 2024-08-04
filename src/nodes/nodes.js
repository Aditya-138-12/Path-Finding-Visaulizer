import React from 'react';
import './nodesM.css';

const Nodes = ({ row, col, isStart, isFinish, isPath, isAnimatedPath, isWall, onMouseDown, onMouseEnter }) => {
    let className = 'node';

    if (isStart) {
        className += ' node-start';
    } else if (isFinish) {
        className += ' node-finish';
    } else if (isAnimatedPath) {
        className += ' animated-path-node';
    } else if (isWall) {
        className += ' wall-node';
    }

    return (
        <div
            className={className}
            onMouseDown={onMouseDown} // Handle mouse down event
            onMouseEnter={onMouseEnter} // Handle mouse enter event
            title={`Row: ${row}, Col: ${col}`}
        ></div>
    );
};

export default Nodes;
