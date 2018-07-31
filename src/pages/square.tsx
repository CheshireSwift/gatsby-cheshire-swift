import * as React from 'react';

interface SquareProps {
    styleClass: string;
    onClickHandler: () => void;
}

const Square = (props: SquareProps) => (
    <button className={props.styleClass} onClick={props.onClickHandler} >
    </button>
);

export default Square;
