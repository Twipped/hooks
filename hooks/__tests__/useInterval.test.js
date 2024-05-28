import { useEffect } from 'react';
import {
  render, checkErrors,
} from './harness/index.js';
import useInterval from '../useInterval.js';

describe('useInterval', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    test('fires every set amount of time', async () => {
      jest.useFakeTimers();

      const check = jest.fn();
      function Component () {
        const { start } = useInterval(() => {
          check();
        }, 1000);
        useEffect(() => {
          start();
        }, []);
      }

      render(<Component />, { strictMode });

      await jest.advanceTimersByTimeAsync(10000);
      checkErrors();

      expect(check).toHaveBeenCalledTimes(10);
    });
  });
});
