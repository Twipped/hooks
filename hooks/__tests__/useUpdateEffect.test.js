import { checkErrors, renderHook } from './harness/index.js';
import useUpdateEffect from '../useUpdateEffect.js';

describe('useUpdateEffect', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    it('only triggers after redraw, not on mount', () => {
      const spy = jest.fn();

      const { rerender } = renderHook(({ name }) => (
        useUpdateEffect(spy, [ name ])
      ), {
        initialProps: { name: 'Alice' },
        strictMode,
      });

      expect(spy).toHaveBeenCalledTimes(0);

      rerender({ name: 'Alice' });

      expect(spy).toHaveBeenCalledTimes(0);

      rerender({ name: 'Bob' });

      expect(spy).toHaveBeenCalledTimes(1);

      checkErrors();
    });

    it('triggers the returned function when it re-invokes or unmounts', () => {
      const spy = jest.fn();

      const { rerender } = renderHook(({ name }) => (
        useUpdateEffect(() => spy, [ name ])
      ), {
        initialProps: { name: 'Alice' },
        strictMode,
      });

      expect(spy).not.toHaveBeenCalled();

      rerender({ name: 'Alice' });

      expect(spy).not.toHaveBeenCalled();

      rerender({ name: 'Bob' });

      expect(spy).not.toHaveBeenCalled();

      rerender({ name: 'Tom' });

      expect(spy).toHaveBeenCalledTimes(1);

      checkErrors();
    });
  });
});
