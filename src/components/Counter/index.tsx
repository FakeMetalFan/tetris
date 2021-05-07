import React, { memo } from 'react';

const Counter = ({ count }: { count: number }) => <>{count}</>;

export default memo(Counter);
