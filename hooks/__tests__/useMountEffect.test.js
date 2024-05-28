import wait from 'waait';
import { renderHook, waitFor } from './harness/index.js';

import useMountEffect from '../useMountEffect.js';

describe('useMountEffect', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    it('should execute the given callback only when the component mounts', async () => {
      const effectSpy = jest.fn();

      const { rerender, unmount } = renderHook(() => useMountEffect(effectSpy), {
        strictMode,
      });

      await waitFor(() => {
        expect(effectSpy).toHaveBeenCalled();
      });
      expect(effectSpy).toHaveBeenCalledTimes(1);

      rerender();

      expect(effectSpy).toHaveBeenCalledTimes(1);

      unmount();

      expect(effectSpy).toHaveBeenCalledTimes(1);
    });

    it('should dispose when component dismounts', async () => {
      const disposerSpy = jest.fn(() => { });
      const effectSpy = jest.fn(() => disposerSpy);

      const { unmount, rerender } = renderHook(() => useMountEffect(effectSpy), {
        strictMode,
      });

      await waitFor(() => {
        expect(effectSpy).toHaveBeenCalled();
      });
      expect(effectSpy).toHaveBeenCalledTimes(1);
      expect(disposerSpy).not.toHaveBeenCalled();

      rerender();
      await wait();

      expect(effectSpy).toHaveBeenCalledTimes(1);
      expect(disposerSpy).not.toHaveBeenCalled();

      unmount();
      await wait();

      expect(disposerSpy).toHaveBeenCalledTimes(1);
      expect(effectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
