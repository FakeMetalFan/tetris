import { renderHook } from '@testing-library/react-hooks';
import useDidUpdate from 'hooks/useDidUpdate';

describe('useDidUpdate', () => {
  it('should fire a callback when update occurs', () => {
    const callbackMock = jest.fn();
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
