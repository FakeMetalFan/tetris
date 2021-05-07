import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';

import styles from './header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <span className={styles.title}>Tetris</span>
    <a
      className={styles.link}
      href="https://github.com/FakeMetalFan/tetris"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={['fab', 'github']} />
    </a>
  </header>
);

export default memo(Header);
