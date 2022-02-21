
import {
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns';
import { useCallback } from 'react';
import useGettableState from './useGettableState';
import { useInterval } from './useTimers';


export const DAYS    = /* #__PURE__*/isSameDay;
export const HOURS   = /* #__PURE__*/isSameHour;
export const MINUTES = /* #__PURE__*/isSameMinute;
export const SECONDS = /* #__PURE__*/isSameSecond;
export const INTERVAL_SECONDS = /* #__PURE__*/makeInterval(differenceInSeconds);
export const INTERVAL_MINUTES = /* #__PURE__*/makeInterval(differenceInMinutes);
export const INTERVAL_HOURS   = /* #__PURE__*/makeInterval(differenceInHours);
export const INTERVAL_DAYS    = /* #__PURE__*/makeInterval(differenceInDays);

/**
 * Define an interval checker using a computational function
 *
 * @param  {Function} method The function to use.
 * @returns {Function} The produced checker
 * @private
 */
function makeInterval (method) {
  return (interval) => useCallback((a, b) => {
    const diff = Math.abs(method(a, b));
    const step = diff / interval;
    return step < 1;
  }, [ interval ]);
}

/**
 * Triggers a component refresh at the interval checks passed in to the arguments.
 * Interval Checks are functions which compare the last tick value against the current
 * time and returns true if they have NOT changed within the interval, false
 * if they are in different intervals. Multiple checks may be passed to trigger at
 * different intervals.
 *
 * @name useClock
 * @param  {...Function} checks Interval Check functions
 * @returns {Date} Returns the time of the last interval tick.
 * @example
 * useClock(useClock.INTERVAL_SECONDS(10)) // ticks every ten seconds
 * useClock(useClock.INTERVAL_MINUTES(30)) // ticks every 30 minutes
 * useClock(useClock.INTERVAL_HOURS(2)) // ticks every 2 hours
 * useClock(useClock.SECONDS) // ticks once per second
 * useClock(useClock.MINUTES) // ticks at the top of each minute
 * useClock(useClock.HOURS) // ticks at the top of each hour
 * useClock(useClock.DAYS) // ticks at midnight
 */
export default function useClock (...checks) {
  checks = checks.flat(Infinity).filter((c) => typeof c === 'function');
  if (!checks.length) throw new Error('You must provide tick functions to check against.');

  const [ date, setDate, getDate ] = useGettableState(new Date());

  useInterval(useCallback(() => {
    const now = new Date();

    for (const check of checks) {
      if (!check(getDate(), now)) {
        setDate(now);
        return;
      }
    }
  }, [ setDate, getDate, ...checks ]), 1000).start();

  return date;
}

useClock.DAYS    = DAYS;
useClock.HOURS   = HOURS;
useClock.MINUTES = MINUTES;
useClock.SECONDS = SECONDS;
useClock.INTERVAL_DAYS    = INTERVAL_DAYS;
useClock.INTERVAL_HOURS   = INTERVAL_HOURS;
useClock.INTERVAL_MINUTES = INTERVAL_MINUTES;
useClock.INTERVAL_SECONDS = INTERVAL_SECONDS;
