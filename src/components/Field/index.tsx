import {
  map,
} from 'lodash-es';

import Tile from '../Tile';

import Styles from './styles';

export type Props = Pick<Tetris, 'field' | 'width' | 'height'> & {
  tileSize: number;
};

export default (props: Props) => {
  const {
    field,
  } = props;

  const mapTiles = () =>
    map(field, (row) =>
      map(row, (tile) => (
        <Tile
          {...tile}
          key={tile.id}
        />
      )),
    );

  return (
    <Styles
      {...props}
    >
      {mapTiles()}
    </Styles>
  );
};
