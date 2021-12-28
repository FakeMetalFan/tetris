import {
  useEffect,
} from 'react';

import useCallbackRef from './use-callback-ref';

export default (callback: () => void, ms: number) => {
  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    if (ms === 0) {
      return;
    }

    const id = setInterval(() => {
      callbackRef.current?.();
    }, ms);

    return () => {
      clearInterval(id);
    };
  }, [ms]);
};
