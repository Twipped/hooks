import { renderHook } from '@testing-library/react';
import useUpdateEffect from '../hooks/useUpdateEffect.js';

describe('useUpdateEffect', () => {
  it('only triggers after redraw, not on mount', () => {
    const spy = jest.fn();

    const { rerender } = renderHook(({ name }) => (
      useUpdateEffect(spy, [ name ])
    ), {
      initialProps: { name: 'Alice' },
    });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Alice' });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Bob' });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('triggers the returned function when it re-invokes or unmounts', () => {
    const spy = jest.fn();

    const { rerender } = renderHook(({ name }) => (
      useUpdateEffect(() => spy, [ name ])
    ), {
      initialProps: { name: 'Alice' },
    });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Alice' });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Bob' });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Tom' });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
