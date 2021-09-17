import { useEffect, useRef } from 'react';

export default (callback: () => void, ms: number) => {
  const callbackRef = useRef<typeof callback>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!ms) {
      return;
    }

    const id = setInterval(() => {
      callbackRef.current?.();
    }, ms);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(id);
    };
  }, [ms]);
};
