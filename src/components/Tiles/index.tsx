import Tile from '../Tile';

import styles from './tiles.module.scss';

type Props = Pick<Tetris, 'tiles' | 'width' | 'height'> & {
  tileSize: number;
};

export default ({
  tiles,
  width,
  height,
  tileSize,
}: Props) => {
  const style = {
    gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
    gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
  };

  const mapTiles = () =>
    tiles.map((row) =>
      row.map((tile) => (
        <Tile
          {...tile}
          key={tile.id}
        />
      )),
    );

  return (
    <div
      style={style}
      className={styles.tiles}
    >
      {mapTiles()}
    </div>
  );
};
