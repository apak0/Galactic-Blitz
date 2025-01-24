import React from 'react';
import { Rect } from 'react-konva';

const Background = () => {
    return (
        <Rect
            width={window.innerWidth}
            height={window.innerHeight}
            fill="#333399" // Daha soft bir arka plan rengi
        />
    );
};

export default Background;
