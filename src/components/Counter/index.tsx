import { memo } from 'react';

import Props from './props';

export default memo((props: Props) => {
  const { className, count } = props;

  return <div className={className}>{count}</div>;
});
