import { renderHook } from '@testing-library/react';
import { useEventCallback } from '../index';

describe('useEventCallback', () => {
  it('always returns the most recently rendered callback', () => {
    const { result, rerender } = renderHook(({ name }) => (
      useEventCallback(() => name)
    ), {
      initialProps: { name: 'Alice' },
    });

    expect(result.current()).toBe('Alice');

    rerender({ name: 'Tom' });
    rerender({ name: 'Bob' });

    expect(result.current()).toBe('Bob');
  });
});
