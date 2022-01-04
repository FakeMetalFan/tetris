import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export default <T extends Element, E>(
  eventName: string,
  callback: (event: E) => void,
  target: T | Document = document,
) => {
  const callbackRef = useRef<typeof callback>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

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
