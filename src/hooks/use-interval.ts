import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export default (callback: () => void, ms: number) => {
  const callbackRef = useRef<typeof callback>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (ms) {
      const id = setInterval(() => {
        callbackRef.current?.();
      }, ms);

      return () => {
        clearInterval(id);
      };
    }
  }, [ms]);
};
