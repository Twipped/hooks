
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


export const DAYS = isSameDay;
export const HOURS = isSameHour;
export const MINUTES = isSameMinute;
export const SECONDS = isSameSecond;
export const INTERVAL_SECONDS = makeInterval(differenceInSeconds);
export const INTERVAL_MINUTES = makeInterval(differenceInMinutes);
export const INTERVAL_HOURS = makeInterval(differenceInHours);
export const INTERVAL_DAYS = makeInterval(differenceInDays);

function makeInterval (method) {
  return (interval) => useCallback((a, b) => {
    const diff = Math.abs(method(a, b));
    const step = diff / interval;
    return step < 1;
  }, [ interval ]);
}

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
