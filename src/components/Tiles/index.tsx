import Tile from '../Tile';
import Props from './props';
import styles from './styles.module.scss';

export default (props: Props) => {
  const { width, tiles } = props;
  const style = {
    gridTemplateColumns: `repeat(${width}, 1fr)`,
  };

  return (
    <div data-testid={styles.tiles} className={styles.tiles} style={style}>
      {tiles.map((row) =>
        row.map(({ fill, id }) => <Tile fill={fill} key={id} />)
      )}
    </div>
  );
};
