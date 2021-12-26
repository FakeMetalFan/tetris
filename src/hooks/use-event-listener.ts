import { useEffect } from 'react';

import useCallbackRef from './use-callback-ref';

export default <T extends HTMLElement, E>(
  eventName: string,
  cb: (event: E) => void,
  target: T | Document = document,
) => {
  const cbRef = useCallbackRef(cb);

  useEffect(() => {
    const handleEvent: any = (event: E) => {
      cbRef.current?.(event);
    };

    target.addEventListener(eventName, handleEvent);

    return () => {
      target.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, target]);
};
