import {
  useEffect,
} from 'react';

import useCallbackRef from './use-callback-ref';

export default <T extends Element, U>(
  eventName: string,
  callback: (event: U) => void,
  target: T | null | Document = document,
) => {
  const handleEvent: any = useCallbackRef(callback);

  useEffect(() => {
    target?.addEventListener(eventName, handleEvent);

    return () => {
      target?.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, target]);
};
