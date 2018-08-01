import * as React from 'react';
import Link from 'gatsby-link';

const TicTacToe = require('../components/tic-tac-toe');

const SecondPage = () => <TicTacToe.Game againstComputer={true} />;

export default SecondPage;
