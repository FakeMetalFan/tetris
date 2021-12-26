import { useLayoutEffect, useRef } from 'react';

export default <T>(cb: T) => {
  const cbRef = useRef<T>();

  useLayoutEffect(() => {
    cbRef.current = cb;
  });

  return cbRef;
};
