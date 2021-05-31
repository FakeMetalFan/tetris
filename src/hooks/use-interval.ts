import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, interval?: number | null) => {
  const callbackRef = useRef<typeof callback>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!interval) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      callbackRef.current?.();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);
};

export default useInterval;
