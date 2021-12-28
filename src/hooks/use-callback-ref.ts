import {
  useLayoutEffect,
  useRef,
} from 'react';

export default <T>(callback: T) => {
  const callbackRef = useRef<T>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return callbackRef;
};
