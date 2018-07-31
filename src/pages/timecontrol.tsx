import * as React from 'react';

const TimeControl = (props: { onClickHandler: () => void, value: string }) => {
    return (
        <button className="styledButton" onClick={props.onClickHandler}>{props.value}</button>
    );
};

export default TimeControl;
