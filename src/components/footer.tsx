import * as React from 'react';
import { css } from 'emotion';

const thickStripe = css({
  backgroundColor: '#decaf1',
  position: 'fixed',
  bottom: 25,
  height: 90,
  margin: 0,
  padding: 0,
  width: '100%',
  display: 'block',
  borderTop: '1px solid #3d1661',
});

const footerStyle = css({
  height: 90,
  position: 'relative',
});

export default class Footer extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={thickStripe}>
          <div className={footerStyle}>
            <img className="charizard" src={'/assets/charizardFly.gif'} />
          </div>
        </div>
        <div
          className={css({
            backgroundColor: '#c19ee5',
            bottom: 0,
            height: 25,
            margin: 0,
            padding: 0,
            position: 'fixed',
            width: '100%',
            display: 'block',
          })}
        />
      </div>
    );
  }
}
