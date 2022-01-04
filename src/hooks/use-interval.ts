import {
  useEffect,
} from 'react';

import useCallbackRef from './use-callback-ref';

export default (callback: () => void, ms: number) => {
  const handleInterval = useCallbackRef(callback);

  useEffect(() => {
    if (ms) {
      const id = setInterval(handleInterval, ms);

      return () => {
        clearInterval(id);
      };
    }
  }, [ms]);
};
