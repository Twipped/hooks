import { useEffect } from 'react';
import useGettableState from './useGettableState.js';
import { isWholeNumber } from './asserts.js';
import useTimeoutGenerator, { CAF, RAF } from './useTimeoutGenerator.js';

/**
 * Hook which triggers a component update after `interval` milliseconds have elapsed
 * since the last render.
 *
 * @param {number} interval
 * @param {boolean} [pause]
 * @returns {Date}
 */
export default function useIntervalUpdate (interval, pause = false) {
  if (!isWholeNumber(interval) && interval !== 0) {
    throw new Error('useInterval requires a delay time greater than or equal to 0.');
  }

  const [ state, setState ] = useGettableState(new Date());
  const timer = useTimeoutGenerator(
    interval > 0 ? setTimeout : RAF,
    interval > 0 ? clearTimeout : CAF,
    () => {
      setState(new Date());
    }
  );
  useEffect(() => {
    if (!pause) timer.set(interval);
    return () => { timer.clear(); };
  });

  return state;
}
