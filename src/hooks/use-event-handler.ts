import {
  useEffect,
} from 'react';

import useCallbackRef from './use-callback-ref';

export default <T extends Element, E>(
  eventName: string,
  callback: (event: E) => void,
  target: T | Document = document,
) => {
  const handleEvent: any = useCallbackRef(callback);

  useEffect(() => {
    target.addEventListener(eventName, handleEvent);

    return () => {
      console.log('cleared!');
      target.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, target]);
};
