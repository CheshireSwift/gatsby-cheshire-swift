import * as React from 'react';
import * as Constants from '../game-of-life/game-constants';

export const HelpScreen = (props: { isHelpHidden: boolean }) => {
  return (
    <div
      style={{
        width: Constants.fieldWidth,
        height: props.isHelpHidden ? 0 : Constants.fieldHeight,
        background: 'white',
        opacity: 0.5,
        overflow: 'hidden',
        position: 'absolute',
        transition: '1s ease',
      }}
    >
      <table>
        <thead>
          <tr>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player</td>
            <td>Turn Clockwise</td>
            <td>Turn Counter-clockwise</td>
            <td>Fire Bullet</td>
          </tr>
          <tr>
            <td>Yellow</td>
            <td>A</td>
            <td>D</td>
            <td>F</td>
          </tr>
          <tr>
            <td>Cyan</td>
            <td>Left arrow</td>
            <td>Right arrow</td>
            <td>M</td>
          </tr>
          <tr>
            <td>Magenta</td>
            <td>H</td>
            <td>K</td>
            <td>L</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
