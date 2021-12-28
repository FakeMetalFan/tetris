import {
  useLayoutEffect,
  useRef,
} from 'react';

export default <T>(callback: T) => {
  const cbRef = useRef<T>();

  useLayoutEffect(() => {
    cbRef.current = callback;
  });

  return cbRef;
};
