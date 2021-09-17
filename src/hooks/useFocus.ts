import { useLayoutEffect, useRef } from 'react';

export default <T extends HTMLElement>() => {
  const elemRef = useRef<T>(null);

  useLayoutEffect(() => {
    elemRef.current?.focus();
  }, []);

  return elemRef;
};
