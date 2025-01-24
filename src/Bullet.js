import React from 'react';
import { Rect } from 'react-konva';

const Bullet = ({ x, y }) => {
    return (
        <Rect
            x={x}
            y={y}
            width={5}
            height={10}
            fill="red"
        />
    );
};

export default Bullet;
