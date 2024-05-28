import mean from '@twipped/utils/avg';
import { isSameSecond } from 'date-fns/isSameSecond';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';
import { useEffect } from 'react';
import {
  render, checkErrors,
} from './harness/index.js';
import useClock from '../useClock.js';

describe('useClock', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    test('fires once every second', async () => {
      jest.useFakeTimers();

      let lastTime;
      const times = [];
      function Component () {
        useClock(isSameSecond);
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

      expect(times).toHaveLength(5);
      expect(avg).toEqual(1000);
    });

    test('fires once every two seconds', async () => {
      jest.useFakeTimers();
      let lastTime;
      const times = [];
      function Component () {
        useClock(useClock.interval(differenceInSeconds, 2));
        useEffect(() => {
          if (lastTime) {
            times.push(Date.now() - lastTime);
          }
          lastTime = Date.now();
        });
        return lastTime;
      }

      render(<Component />, { strictMode });

      await jest.advanceTimersByTimeAsync(10000);
      checkErrors();

      if (strictMode) {
        times.shift();
      }

      const avg = mean(times);

      expect(times).toHaveLength(5);
      expect(avg).toEqual(2000);
    });
  });
});
