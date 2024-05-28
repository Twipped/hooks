import { renderHook } from './harness/index.js';
import useSmartEffect from '../useSmartEffect.js';

describe('useSmartEffect', () => {
  test('only triggers after redraw, not on mount', () => {
    const effect = jest.fn();

    const { rerender } = renderHook(({ deps }) => (
      useSmartEffect(effect, deps)
    ), {
      initialProps: { deps: { name: 'Alice', a: { b: 'b' } } },
    });

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: { name: 'Alice', a: { b: 'b' } } });

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: { name: 'Alice', a: { b: 'c' } } });

    expect(effect).toHaveBeenCalledTimes(2);
  });
});
