import { useEffect, useRef } from 'react';

type Callback = () => void;

const useInterval = (callback: Callback, interval?: number | null) => {
  const callbackRef = useRef<Callback>();

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
