import { memo } from 'react';

interface Props {
  className?: string;
  count: number;
}

const Counter = ({ className, count }: Props) => (
  <div className={className}>{count}</div>
);

export default memo(Counter);
