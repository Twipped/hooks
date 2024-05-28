import { useCallback, useEffect } from 'react';
import useGettableState from './useGettableState.js';
import useInterval from './useInterval.js';

/**
 * Triggers a component refresh at each "tick" of the clock, determined by the interval checks
 * passed in to the arguments.
 *
 * Interval Checks are functions which receive two dates (the last tick value and the current
 * time) and returns true if they are the same interval, false if they are in different intervals.
 *
 * Multiple checks may be passed to tick at multiple intervals.
 *
 * @function useClock
 * @param  {...Function} ticks Interval Check functions
 * @returns {Date} Returns the time of the last interval tick.
 * @example
 * import useClock from '@zenbusiness/application-commons-hooks/useClock';
 * import { isSameSecond, isSameMinute, isSameHour } from 'date-fns';
 * useClock(isSameMinute) // ticks at the top of each minute
 * useClock(isSameHour) // ticks at the top of each hour
 * useClock(useClock.interval(differenceInSeconds, 30)) // ticks every 30 seconds
 */
export default function useClock (...ticks) {
  ticks = ticks.flat(Infinity).filter((c) => typeof c === 'function');
  if (!ticks.length) throw new Error('You must provide tick functions to check against.');

  const [ date, setDate, getDate ] = useGettableState(new Date());

  const interval = useInterval(() => {
    const now = new Date();

    for (const tickCheck of ticks) {
      if (!tickCheck(getDate(), now)) {
        setDate(now);
        return;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 1000);

  useEffect(() => {
    interval.start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return date;
}

/**
 * Define an interval checker callback using a computational function
 *
 * @param {Function} method The function to use.
 * @param {number} interval The number of iterations of that function to expect
 * @returns {Function} The produced checker
 * @private
 */
function useTick (method, interval = 1) {
  return useCallback((a, b) => {
    const diff = Math.abs(method(a, b));
    const step = diff / interval;
    return step < 1;
  }, [ method, interval ]);
}

useClock.interval = useTick;
