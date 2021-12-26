import { useEffect } from 'react';

import useCallbackRef from './use-callback-ref';

export default (cb: () => void, ms: number) => {
  const cbRef = useCallbackRef(cb);

  useEffect(() => {
    if (!ms) {
      return;
    }

    const id = setInterval(() => {
      cbRef.current?.();
    }, ms);

    return () => {
      clearInterval(id);
    };
  }, [ms]);
};
