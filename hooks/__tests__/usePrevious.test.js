import { renderHook } from './harness/index.js';
import usePrevious from '../usePrevious.js';

describe('usePrevious', () => {
  it('should return the state from the previous render', () => {
    const { result, rerender, unmount } = renderHook(({ name }) => usePrevious(name), {
      initialProps: { name: 'Alice' },
    });

    expect(result.current).toBeUndefined();

    rerender({ name: 'Bob' });

    expect(result.current).toBe('Alice');

    rerender({ name: 'Bob' });

    expect(result.current).toBe('Bob');

    unmount();
  });

  it('should use initialState', () => {
    const { result, rerender, unmount } = renderHook(({ name }) => usePrevious(name, 'Joe'), {
      initialProps: { name: 'Alice' },
    });

    expect(result.current).toBe('Joe');

    rerender({ name: 'Bob' });

    expect(result.current).toBe('Alice');

    rerender({ name: 'Bob' });

    expect(result.current).toBe('Bob');

    unmount();
  });
});
