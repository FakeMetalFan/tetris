import { renderHook } from '@testing-library/react-hooks';
import useInterval from 'hooks/useInterval';

describe('useInterval', () => {
  const callbackMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should run interval', () => {
    renderHook(() => useInterval(callbackMock, 500));

    jest.advanceTimersByTime(2e3);

    expect(callbackMock).toHaveBeenCalledTimes(4);
  });

  it('should stop interval if "interval" argument is "falsy"', () => {
    const { rerender } = renderHook(
      ({ interval }) => useInterval(callbackMock, interval),
      {
        initialProps: { interval: 1e3 },
      }
    );

    jest.advanceTimersByTime(1e3);

    rerender({ interval: 0 });

    jest.advanceTimersByTime(1e3);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
