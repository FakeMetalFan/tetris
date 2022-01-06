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

import GlobalStyle from 'styles';

setupIcons();

render(
  <StrictMode>
    <GlobalStyle />
    <Header />
    <main>
      <Tetris />
    </main>
    <Footer />
  </StrictMode>,
  document.getElementById('root')
);
