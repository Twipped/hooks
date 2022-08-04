import { renderHook } from '@testing-library/react';

import useAsyncCallback from '../hooks/useAsyncCallback.js';

describe('useAsyncCallback', () => {
  it('should only produce a new function of the dependencies change', () => {
    const spy = jest.fn();

    const { result, rerender } = renderHook(({ name }) => useAsyncCallback(spy, [ name ]), {
      initialProps: { name: 'Alice' },
    });

    const callback = result.current;

    expect(spy).not.toHaveBeenCalled();
    expect(typeof callback).toBe('function');

    callback();

    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ name: 'Alice' });

    expect(result.current).toBe(callback);

    rerender({ name: 'Bob' });

    expect(result.current).not.toBe(callback);

    result.current();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should send rejections to the console', async () => {
    const mockFunction = async () => {
      throw new Error('ERROR');
    };
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result: { current: callback } } = renderHook(() => useAsyncCallback(mockFunction, []));

    expect(consoleSpy).not.toHaveBeenCalled();

    await callback();

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const [ error ] = consoleSpy.mock.lastCall;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('ERROR');
  });

  it('should return nothing', () => {
    const mockFunction = async () => 'Foo';
    const consoleSpy = jest.spyOn(console, 'error');

    const { result: { current: callback } } = renderHook(() => useAsyncCallback(mockFunction, []));

    expect(callback()).toBeUndefined();
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
