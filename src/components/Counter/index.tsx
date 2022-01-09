import {
  createElement,
  Fragment,
  memo,
} from 'react';

import {
  StyledComponent,
} from 'styled-components';

export default memo(({
  count,
  Styles,
}: {
  count: number;
  Styles?: StyledComponent<any, any>;
}) =>
  createElement(
    Styles ?? Fragment,
    null,
    count,
  ),
);
