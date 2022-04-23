import { renderHook } from '@testing-library/react';
import { usePrevious } from '../index';

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
