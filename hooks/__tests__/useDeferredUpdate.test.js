import { useEffect, useMemo } from 'react';
import { render, renderHook, waitFor } from './harness/index.js';
import useDeferredUpdate from '../useDeferredUpdate.js';

describe('useDeferredUpdate', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    test('memoizes the returned callback', async () => {
      const { rerender, result } = renderHook(() => useDeferredUpdate(), {
        strictMode,
      });

      const { current: update } = result;

      expect(result.current).toEqual(expect.any(Function));
      rerender();
      expect(result.current).toEqual(update);
    });

    test('update called during render is held until after mount', async () => {
      const spy = jest.fn();
      function Component () {
        const update = useDeferredUpdate();
        useMemo(() => {
          update();
        }, []);
        useEffect(() => {
          spy();
        });
      }

      render(<Component />, {
        strictMode,
      });

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
