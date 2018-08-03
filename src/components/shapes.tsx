import * as React from 'react';

export const Nought = () => (
  <svg version="1.1" baseProfile="full" width="100%" height="100%">
    <circle
      cx="50%"
      cy="50%"
      r="30%"
      stroke="black"
      strokeWidth="10%"
      fill="transparent"
    />
  </svg>
);

export const Cross = () => (
  <svg version="1.1" baseProfile="full" width="100%" height="100%">
    <line
      x1="20%"
      y1="20%"
      x2="80%"
      y2="80%"
      stroke="black"
      strokeWidth="10%"
    />
    <line
      x1="20%"
      y1="80%"
      x2="80%"
      y2="20%"
      stroke="black"
      strokeWidth="10%"
    />
  </svg>
);
