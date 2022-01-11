import {
  memo,
} from 'react';

import Styles from './styles';

export type Props = Pick<Tile, 'fill'>;

export default memo((props: Props) => (
  <Styles
    {...props}
  />
));
