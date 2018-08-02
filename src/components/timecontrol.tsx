import * as React from 'react';
import fancyButton from './fancy-button';

const TimeControl = (props: { onClickHandler: () => void, value: string }) => {
    return (
        <button className={fancyButton()} onClick={props.onClickHandler}>{props.value}</button>
    );
};

export default TimeControl;
