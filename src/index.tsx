import 'index.scss';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Tetris from 'containers/Tetris';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import setupIcons from 'setupIcons';

setupIcons();

render(
  <StrictMode>
    <Header />
    <Tetris width={10} height={20} />
    <Footer />
  </StrictMode>,
  document.getElementById('root')
);
