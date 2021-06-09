import { renderHook } from '@testing-library/react-hooks';
import useDidUpdate from 'hooks/useDidUpdate';

describe('useDidUpdate', () => {
  const callbackMock = jest.fn();

  it('should fire a callback when update occurs', () => {
    const { rerender } = renderHook(
      ({ dep }) => useDidUpdate(callbackMock, dep),
      {
        initialProps: { dep: 0 },
      }
    );

    expect(callbackMock).not.toHaveBeenCalled();

    rerender({ dep: 1 });

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
