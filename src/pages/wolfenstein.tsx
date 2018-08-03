import * as React from 'react';
import WolfensteinCanvas from '../components/wolfenstein';

import { css } from 'emotion';

const SecondPage = () => (
  <div>
    <WolfensteinCanvas
      width={320}
      height={240}
      pixelRatio={window.devicePixelRatio || 1}
      scale={2}
    />
  </div>
);

export default SecondPage;
