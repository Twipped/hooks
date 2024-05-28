import mean from '@twipped/utils/avg';
import { useEffect } from 'react';
import {
  render, checkErrors,
} from './harness/index.js';
import useIntervalUpdate from '../useIntervalUpdate.js';

describe('useIntervalUpdate', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    test('fires every set amount of time', async () => {
      jest.useFakeTimers();

      let lastTime;
      const times = [];
      const check = jest.fn();
      function Component () {
        useIntervalUpdate(500);
        check(Date.now());
        useEffect(() => {
          if (lastTime) {
            times.push(Date.now() - lastTime);
          }
          lastTime = Date.now();
        });
        return lastTime;
      }

      render(<Component />, { strictMode });

      await jest.advanceTimersByTimeAsync(5000);
      checkErrors();

      if (strictMode) {
        times.shift();
      }

      const avg = mean(times);

      // account for test environment latency
      // why doesn't Jest have a toBeBetween assertion?
      expect(times).toHaveLength(10);
      expect(avg).toEqual(500);
    });
  });
});
