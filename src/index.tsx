import 'index.scss';

import Tetris from 'containers/Tetris';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import setupIcons from 'setupIcons';

setupIcons();

render(
  <StrictMode>
    <Tetris width={10} height={20} />
  </StrictMode>,
  document.getElementById('root')
);
