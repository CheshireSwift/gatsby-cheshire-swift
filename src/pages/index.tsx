import * as React from 'react';
import Link from 'gatsby-link';
import { css } from '../../node_modules/emotion';

// const myImg = require('../../public/assets/headToHead-recolored.jpg');

const imageContainer = css({
  '&:hover': {
    transform: 'scale(1.3)',
    webkitTransform: 'scale(1.3)',
  },
  "display": 'inline-block',
  "float": 'left',
  "overflow": 'hidden',
  "padding": 0,
  "transform": 'scale(1)',
  "transition": '.3s ease-in-out',
  "width": '50%',
});

export default () => (
  <div className="row">
    <div className={imageContainer}>
      <img src={'/assets/headToHead-recolored.jpg'} alt="H2H" />
    </div>
    <div className={imageContainer}>
      <img src={'/assets/computer-resized.jpg'} alt="Computer" />
    </div>
  </div>
);
