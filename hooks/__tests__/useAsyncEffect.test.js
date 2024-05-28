import { renderHook, wait, act } from './harness/index.js';
// eslint-plugin-import has a bug in resolving across symlinks, such as in a monorepo.
/* eslint-disable-next-line import/no-unresolved */

import useAsyncEffect from '../useAsyncEffect.js';

describe('useAsyncEffect', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    it('should only execute if dependencies change', () => {
      const spy = jest.fn(async () => {});

      const { rerender } = renderHook(({ name }) => useAsyncEffect(spy, [ name ]), {
        initialProps: { name: 'Alice' },
        strictMode,
      });

      expect(spy).toHaveBeenCalledTimes(1);

      rerender({ name: 'Alice' });

      expect(spy).toHaveBeenCalledTimes(1);

      rerender({ name: 'Bob' });

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should handle an async disposer', async () => {
      const disposerSpy = jest.fn(async () => {});
      const effectSpy = jest.fn(async () => disposerSpy);

      const { unmount, rerender } = renderHook(({ name }) => useAsyncEffect(effectSpy, [ name ]), {
        initialProps: { name: 'Alice' },
        strictMode,
      });

      await wait();

      expect(disposerSpy).not.toHaveBeenCalled();
      expect(effectSpy).toHaveBeenCalledTimes(1);

      rerender({ name: 'Alice' });
      await wait();

      expect(disposerSpy).not.toHaveBeenCalled();
      expect(effectSpy).toHaveBeenCalledTimes(1);

      rerender({ name: 'Bob' });
      await wait();

      expect(disposerSpy).toHaveBeenCalledTimes(1);
      expect(effectSpy).toHaveBeenCalledTimes(2);

      rerender({ name: 'Bob' });
      await wait();

      expect(disposerSpy).toHaveBeenCalledTimes(1);
      expect(effectSpy).toHaveBeenCalledTimes(2);

      unmount();
      await wait();

      expect(disposerSpy).toHaveBeenCalledTimes(2);
      expect(effectSpy).toHaveBeenCalledTimes(2);
    });

    it('should send effect rejections up the render tree', async () => {
      console.silence(); // eslint-disable-line no-console

      const throws = async () => {
        throw new Error('ERROR');
      };
      const onError = jest.fn();

      renderHook(
        () => useAsyncEffect(throws, []),
        { onError, strictMode }
      );
      await act(wait);

      expect(onError).toHaveBeenCalledTimes(1);

      const [ error ] = onError.mock.lastCall;

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('ERROR');
    });

    it('should send disposer rejections in active components up the render tree', async () => {
      console.silence(); // eslint-disable-line no-console

      const throws = async () => {
        throw new Error('ERROR');
      };
      const effect = async () => throws;

      const onError = jest.fn();

      const { rerender } = renderHook(
        ({ name }) => useAsyncEffect(effect, [ name ]),
        {
          initialProps: { name: 'Alice' },
          onError,
          strictMode,
        }
      );

      await act(wait);

      expect(onError).not.toHaveBeenCalled();

      rerender({ name: 'Bob' });

      await act(wait);

      expect(onError).toHaveBeenCalledTimes(1);

      const [ error ] = onError.mock.lastCall;

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('ERROR');
    });

    it('should send disposer rejections at unmount to the console', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const throws = async () => {
        throw new Error('ERROR');
      };
      const effect = async () => throws;

      const onError = jest.fn();

      const { unmount } = renderHook(
        () => useAsyncEffect(effect, []),
        { onError, strictMode }
      );
      await act(wait);

      expect(onError).not.toHaveBeenCalled();
      expect(consoleSpy).not.toHaveBeenCalled();

      unmount();

      await act(wait);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(onError).not.toHaveBeenCalled();

      const [ error ] = consoleSpy.mock.lastCall;

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('ERROR');
    });

    it('should return nothing', () => {
      const effect = async () => 'Foo';
      const onError = jest.fn();

      const { result: { current: hookOutput } } = renderHook(
        () => useAsyncEffect(effect, []),
        { onError, strictMode }
      );

      expect(hookOutput).toBeUndefined();
      expect(onError).not.toHaveBeenCalled();
    });
  });
});
