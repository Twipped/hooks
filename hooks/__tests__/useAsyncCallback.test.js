import wait from 'waait';
import { renderHook, act } from './harness/index.js';
import useAsyncCallback from '../useAsyncCallback.js';

describe('useAsyncCallback', () => {
  it('should only produce a new function of the dependencies change', async () => {
    const spy = jest.fn();

    const { result, rerender } = renderHook(({ name }) => useAsyncCallback(spy, [ name ]), {
      initialProps: { name: 'Alice' },
    });

    const callback = result.current;

    expect(spy).not.toHaveBeenCalled();
    expect(typeof callback).toBe('function');

    await act(callback);
    await act(wait);

    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ name: 'Alice' });

    expect(result.current).toBe(callback);

    rerender({ name: 'Bob' });

    expect(result.current).not.toBe(callback);

    result.current();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should throw errors up the render chain', async () => {
    console.silence(); // eslint-disable-line no-console

    const mockFunction = async () => {
      throw new Error('ERROR');
    };
    const onError = jest.fn();

    const { result: { current: callback } } = renderHook(
      () => useAsyncCallback(mockFunction, []),
      { onError }
    );

    expect(onError).not.toHaveBeenCalled();

    await act(callback);
    await wait(); // let the event loop cycle again

    expect(onError).toHaveBeenCalledTimes(1);

    const [ error ] = onError.mock.lastCall;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('ERROR');
  });

  it('should return nothing', async () => {
    const mockFunction = async () => 'Foo';
    const onError = jest.fn();

    const { result: { current: callback } } = renderHook(
      () => useAsyncCallback(mockFunction, []),
      { onError }
    );

    const result = await act(callback);

    expect(result).toBeUndefined();
    expect(onError).not.toHaveBeenCalled();
  });
});
