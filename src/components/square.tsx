import * as React from 'react';
import { css } from 'emotion';
import * as cell from './cellState';

interface SquareProps {
    cellState: cell.state;
    onClickHandler: () => void;
}

const Square = (props: SquareProps) => (
    <button className={css({
        background: (props.cellState === cell.state.ALIVE) ? 'rgb(14, 151, 48)' : '#fff',
        border: '1px solid #999',
        float: 'left',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '34px',
        height: '15px',
        marginRight: '-1px',
        marginTop: '-1px',
        padding: 0,
        textAlign: 'center',
        width: '15px',
      })} onClick={props.onClickHandler} >
    </button>
);

export default Square;
