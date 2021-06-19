import classNames from 'classnames';
import TileFill from 'constants/tileFill';
import { memo } from 'react';

import styles from './tile.module.scss';

const Tile = ({ fill }: { fill?: TileFill }) => (
  <button
    type="button"
    aria-label="tile"
    className={classNames(styles.tile, {
      [styles.i]: fill === TileFill.I,
      [styles.j]: fill === TileFill.J,
      [styles.l]: fill === TileFill.L,
      [styles.o]: fill === TileFill.O,
      [styles.s]: fill === TileFill.S,
      [styles.t]: fill === TileFill.T,
      [styles.z]: fill === TileFill.Z,
    })}
  />
);

export default memo(Tile);
