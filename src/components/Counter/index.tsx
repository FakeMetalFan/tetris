import { memo } from 'react';

const Counter = ({ count }: { count: number }) => <div>{count}</div>;

export default memo(Counter);
