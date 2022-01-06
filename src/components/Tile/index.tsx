import {
  memo,
} from 'react';

import Styles from './styles';

export default memo(
  (props: Tile) => (
    <Styles
      {...props}
    />
  ),
  (prev, next) => prev.fill === next.fill,
);
