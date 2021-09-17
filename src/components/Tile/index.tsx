import classNames from 'classnames';
import TileFill from 'constants/tileFill';
import { memo } from 'react';

import Props from './props';
import styles from './styles.module.scss';

export default memo((props: Props) => {
  const { fill } = props;
  const className = classNames(styles.tile, {
    [styles.i]: fill === TileFill.I,
    [styles.j]: fill === TileFill.J,
    [styles.l]: fill === TileFill.L,
    [styles.o]: fill === TileFill.O,
    [styles.s]: fill === TileFill.S,
    [styles.t]: fill === TileFill.T,
    [styles.z]: fill === TileFill.Z,
  });

  return <button type="button" aria-label="tile" className={className} />;
});
