import classNames from 'classnames';

import {
  memo,
} from 'react';

import TILE_FILL from 'constants/tile-fill';

import styles from './tile.module.scss';

export default memo(
  ({
     fill,
   }: Tile) => {
    const className = classNames(styles.tile, {
      [styles.i]: fill === TILE_FILL.I,
      [styles.j]: fill === TILE_FILL.J,
      [styles.l]: fill === TILE_FILL.L,
      [styles.o]: fill === TILE_FILL.O,
      [styles.s]: fill === TILE_FILL.S,
      [styles.t]: fill === TILE_FILL.T,
      [styles.z]: fill === TILE_FILL.Z,
    });

    return (
      <div
        className={className}
      />
    );
  },
  (prev, next) => prev.fill === next.fill,
);
