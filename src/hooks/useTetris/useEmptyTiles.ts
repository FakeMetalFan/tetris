import Props from 'containers/Tetris/props';
import { useMemo } from 'react';
import addId from 'utils/addId';

import Tile from './tile';

export default (props: Props) =>
  useMemo(
    () =>
      Array.from(
        {
          length: props.height,
        },
        () =>
          Array.from(
            {
              length: props.width,
            },
            () => addId({} as Tile)
          )
      ),
    [props]
  );
