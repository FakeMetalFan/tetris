import {
  StrictMode,
} from 'react';

import {
  render,
} from 'react-dom';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Tetris from 'containers/Tetris';

import setupIcons from 'setup-icons';

import GlobalStyles from 'styles';

setupIcons();

render(
  <StrictMode>
    <GlobalStyles />
    <Header />
    <main>
      <Tetris />
    </main>
    <Footer />
  </StrictMode>,
  document.getElementById('root')
);
