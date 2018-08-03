import * as React from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';

// const myImg = require('../../public/assets/headToHead-recolored.jpg');

const imageContainer = css({
  float: 'left',
  overflow: 'hidden',
  padding: 0,
  width: '50%',

  '& .imageStyle': {
    display: 'inline-block',
    marginBottom: 0,
    opacity: 1,
    transform: 'scale(1)',
    transition: '.3s ease-in-out',
  },

  '& .middleText': {
    transition: '.5s ease',
    opacity: 0,
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: 16,
    padding: '16px 32px',
  },

  '&:hover .imageStyle': {
    overflow: 'hidden',
    opacity: 0.3,
    transform: 'scale(1.3)',
    webkitTransform: 'scale(1.3)',
  },

  '&:hover .middleText': {
    overflow: 'hidden',
    opacity: 1,
    transform: 'scale(1.3)',
    transition: '.3s ease-in-out',
    webkitTransform: 'scale(1.3)',
  },
});

const middleText = css({
  transition: '.5s ease',
  opacity: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

export default () => (
  <div className="row">
    <div className="imageWrapper">
      <div className={imageContainer}>
        <img
          className="imageStyle"
          src={'/assets/headToHead-recolored.jpg'}
          alt="H2H"
          onClick={() => window.location.replace('./ticTacToe-2p')}
        />
        <div className="middleText">
          <div className="text">Two player</div>
        </div>
      </div>
    </div>
    <div className="imageWrapper">
      <div className={imageContainer}>
        <img
          className="imageStyle"
          src={'/assets/computer-resized.jpg'}
          alt="Computer"
          onClick={() => window.location.replace('./ticTacToe-1p')}
        />
        <div className="middleText">
          <div className="text">Against Computer</div>
        </div>
      </div>
    </div>
  </div>
);
