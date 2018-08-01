import * as React from 'react';
import Link from 'gatsby-link';
import { css } from '../../node_modules/emotion';

// const myImg = require('../../public/assets/headToHead-recolored.jpg');

const imageContainer = css({
  float: 'left',
  overflow: 'hidden',
  padding: 0,
  width: '50%',
});

const imageStyle = css({
  '&:hover': {
    transform: 'scale(1.3)',
    webkitTransform: 'scale(1.3)',
  },
  '&:hover+span': {
    bottom: -36,
    opacity: 1,
  },
  "display": 'inline-block',
  "marginBottom": 0,
  "transform": 'scale(1)',
  "transition": '.3s ease-in-out',
});

const spanStyle = css({
  bottom: -20,
  color: '#444',
  display: 'block',
  fontSize: 18,
  left: 0,
  margin: 0,
  opacity: 0,
  padding: 0,
  position: 'absolute',
  textAlign: 'center',
  textDecoration: 'none',
  transition: '.3s ease-in-out',
  width: 300,
  zIndex: -1,
});

export default () => (
  <div className="row">
    <div className="imageWrapper">
      <div className={imageContainer}>
        <img
          className={imageStyle}
          src={'/assets/headToHead-recolored.jpg'}
          alt="H2H"
          onClick={() => window.location.replace('./ticTacToe-2p')}
        />
      </div>
      <span className={spanStyle}>Head2Head</span>
    </div>
    <div className="imageWrapper">
      <div className={imageContainer}>
        <img
          className={imageStyle}
          src={'/assets/computer-resized.jpg'}
          alt="Computer"
          onClick={() => window.location.replace('./ticTacToe-1p')}
        />
      </div>
      <div className={spanStyle}>Against Computer</div>
    </div>
  </div>
);
