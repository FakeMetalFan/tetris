import TileFill from 'constants/tileFill';

import Tile from '../Tile';
import styles from './tiles.module.scss';

interface Props {
  width: number;
  tiles: { id: string; fill?: TileFill }[][];
}

const Tiles = ({ width, tiles }: Props) => {
  const style = { gridTemplateColumns: `repeat(${width}, 1fr)` };

  return (
    <div data-testid={styles.tiles} className={styles.tiles} style={style}>
      {tiles.map((row) =>
        row.map(({ fill, id }) => <Tile fill={fill} key={id} />)
      )}
    </div>
  );
};

export default Tiles;
