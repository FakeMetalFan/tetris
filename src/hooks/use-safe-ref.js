import { useCallback, useRef } from 'react';

export const useSafeRef = initialValue => {
  const ref = useRef(initialValue);
  const setRef = useCallback(next => {
    ref.current = next;
  }, []);

  return [ref.current, setRef];
};
