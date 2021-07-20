import TileFill from 'constants/tileFill';
import { memo } from 'react';

import Tile from '../Tile';
import styles from './tiles.module.scss';

interface Props {
  width: number;
  tiles: { id: string; fill?: TileFill }[][];
}

const Tiles = ({ width, tiles }: Props) => (
  <div
    data-testid={styles.tiles}
    className={styles.tiles}
    style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
  >
    {tiles.map((row) =>
      row.map(({ fill, id }) => <Tile fill={fill} key={id} />)
    )}
  </div>
);

export default memo(Tiles);
