import Tile from '../Tile';

import styles from './field.module.scss';

type Props = Pick<Tetris, 'field' | 'width' | 'height'> & {
  tileSize: number;
};

export default ({
  field,
  width,
  height,
  tileSize,
}: Props) => {
  const style = {
    gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
    gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
  };

  const mapTiles = () =>
    field.map((row) =>
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
      className={styles.field}
    >
      {mapTiles()}
    </div>
  );
};
