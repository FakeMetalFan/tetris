import { renderHook } from '@testing-library/react-hooks';
import useDidMount from 'hooks/useDidMount';

describe('useDidMount', () => {
  it('should fire a callback when mount occurs', () => {
    const callbackMock = jest.fn();
    const { rerender } = renderHook(() => useDidMount(callbackMock));

    rerender();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
