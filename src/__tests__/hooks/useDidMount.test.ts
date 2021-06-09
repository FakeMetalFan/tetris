import { renderHook } from '@testing-library/react-hooks';
import useDidMount from 'hooks/useDidMount';

describe('useDidMount', () => {
  const callbackMock = jest.fn();

  it('should fire a callback when mount occurs', () => {
    const { rerender } = renderHook(() => useDidMount(callbackMock));

    rerender();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
