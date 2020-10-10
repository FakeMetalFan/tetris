import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';

export const Header = () => <header>
  <span className='title'>Tetris</span>

  <a href='https://github.com/FakeMetalFan/tetris' target='_blank' rel='noopener noreferrer'>
    <FontAwesomeIcon icon={['fab', 'github']} />
  </a>
</header>;
