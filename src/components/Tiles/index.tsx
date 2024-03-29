import {
  map,
} from 'lodash-es';

import Tile from '../Tile';

import Styles from './styles';

export type Props = Pick<Tetris, 'tiles' | 'width' | 'height'> & {
  tileSize: number;
};

export default (props: Props) => (
  <Styles
    {...props}
  >
    {
      map(props.tiles, (row) =>
        map(row, ({
          fill,
          id,
        }) => (
          <Tile
            fill={fill}
            key={id}
          />
        )),
      )
    }
  </Styles>
);
