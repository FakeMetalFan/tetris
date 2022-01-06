import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export default (callback: () => void, ms?: number | null) => {
  const callbackRef = useRef<typeof callback>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (ms) {
      const handleInterval = () => {
        callbackRef.current?.();
      };

      const id = setInterval(handleInterval, ms);

      return () => {
        clearInterval(id);
      };
    }
  }, [ms]);
};
