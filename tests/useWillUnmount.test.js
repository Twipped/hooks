import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { useWillUnmount } from '../index';

describe('useWillUnmount', () => {
  it('should return a function that returns mount state', () => {
    const spy = jest.fn();

    const { rerender, unmount } = renderHook(() => useWillUnmount(spy));

    expect(spy).not.toHaveBeenCalled();

    rerender();

    expect(spy).not.toHaveBeenCalled();

    unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
