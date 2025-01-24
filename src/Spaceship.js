import React from 'react';
import { Rect } from 'react-konva';

const Spaceship = ({ x, y }) => {
    return (
        <Rect
            x={x}
            y={y}
            width={50}
            height={20}
            fill="blue"
        />
    );
};

export default Spaceship;
