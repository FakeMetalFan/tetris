import React from 'react';

import { Header, Tetris, Footer } from 'components';

export const App = () => <>
  <Header />
  <Tetris width={10} height={20} />
  <Footer />
</>;
