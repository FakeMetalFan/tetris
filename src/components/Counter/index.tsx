import {
  createElement,
  Fragment,
  memo,
} from 'react';

type Props = {
  count: number;
  tagName?: string;
  className?: string;
};

export default memo(({
  count,
  tagName,
  className,
}: Props) =>
  createElement(
    tagName ?? Fragment,
    tagName
      ? {
          className,
        }
      : {},
    count,
  ),
);
