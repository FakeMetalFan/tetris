import {
  createElement,
  Fragment,
  memo,
} from 'react';

import {
  StyledComponent,
} from 'styled-components';

type Props = {
  count: number;
  Styles?: StyledComponent<any, any>;
};

export default memo(({
  count,
  Styles,
}: Props) =>
  createElement(
    Styles ?? Fragment,
    null,
    count,
  ),
);
