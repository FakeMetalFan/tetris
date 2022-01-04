import {
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';

export default <T extends (...args: any[]) => any>(callback: T) => {
  const callbackRef = useRef<T>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: any[]) => {
    callbackRef.current?.(...args);
  }, []) as T;
};
