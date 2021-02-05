import * as React from 'react';
import fancyButton from './fancy-button';

const Clear = (props: { onClickHandler: () => void }) => {
    return (
        <button className={fancyButton()} onClick={props.onClickHandler}>Clear</button>
    );
};

export default Clear;
