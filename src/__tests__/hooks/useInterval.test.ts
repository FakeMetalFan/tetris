import { renderHook } from '@testing-library/react-hooks';
import useInterval from 'hooks/useInterval';

describe('useInterval', () => {
  const callbackMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should run interval', () => {
    const ms = 500;
    const callsCount = 2;

    renderHook(() => useInterval(callbackMock, ms));

    jest.advanceTimersByTime(ms * callsCount);

    expect(callbackMock).toHaveBeenCalledTimes(callsCount);
  });

  it('should stop interval if "interval" argument is "falsy"', () => {
    const ms = 1e3;

    const { rerender } = renderHook(
      ({ interval }) => useInterval(callbackMock, interval),
      {
        initialProps: { interval: ms },
      }
    );

    jest.advanceTimersByTime(ms);

    rerender({ interval: 0 });

    jest.advanceTimersByTime(ms);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
