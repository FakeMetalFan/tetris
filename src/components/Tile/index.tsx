import classNames from 'classnames';
import TileFill from 'constants/tileFill';
import { memo } from 'react';
import FillChecker from 'utils/fillChecker';

import styles from './tile.module.scss';

const Tile = ({ fill }: { fill: TileFill }) => {
  const { isI, isJ, isL, isO, isS, isT, isZ } = new FillChecker(fill);

  return (
    <button
      type="button"
      aria-label="tile"
      className={classNames(styles.tile, {
        [styles.i]: isI,
        [styles.j]: isJ,
        [styles.l]: isL,
        [styles.o]: isO,
        [styles.s]: isS,
        [styles.t]: isT,
        [styles.z]: isZ,
      })}
    />
  );
};

export default memo(Tile);
