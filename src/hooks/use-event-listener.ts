import {
  useEffect,
} from 'react';

import useCallbackRef from './use-callback-ref';

export default <T extends HTMLElement, E>(
  eventName: string,
  callback: (event: E) => void,
  target: T | Document = document,
) => {
  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    const handleEvent: any = (event: E) => {
      callbackRef.current?.(event);
    };

    target.addEventListener(eventName, handleEvent);

    return () => {
      target.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, target]);
};
