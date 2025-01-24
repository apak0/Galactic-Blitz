import React from 'react';
import { Rect } from 'react-konva';

const Enemy = ({ x, y }) => {
    return (
        <Rect
            x={x}
            y={y}
            width={40}
            height={40}
            fill="red" // Düşman rengi
        />
    );
};

export default Enemy;
