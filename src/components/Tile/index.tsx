import classNames from 'classnames';
import TileFill from 'constants/tile';
import React, { memo } from 'react';
import FillChecker from 'utils/fill-checker';

import styles from './tile.module.scss';

interface Props {
  fill: TileFill;
}

const Tile = ({ fill }: Props) => {
  const { isI, isJ, isL, isO, isS, isT, isZ } = new FillChecker(fill);

  return (
    <div
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
