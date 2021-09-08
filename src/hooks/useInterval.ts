import { useEffect, useRef } from 'react';

const useInterval = (
  callback: () => void,
  interval?: number | null | false
) => {
  const callbackRef = useRef<typeof callback>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (interval) {
      const intervalId = setInterval(() => {
        callbackRef.current?.();
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [interval]);
};

export default useInterval;
