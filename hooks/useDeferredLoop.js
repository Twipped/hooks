import useInterval from './useInterval.js';

/**
 * Creates a defer timer that loops on the UI thread update and is properly
 * cleaned up when a component is unmounted
 *
 * @function useDeferredLoop
 * @param {() => void} fn A function run on each interval
 * @param {boolean} [pause] Pass true to halt the loop
 * @returns {import('./types').IntervalHandler}
 */
export default function useDeferredLoop (fn, pause) {
  const timer = useInterval(fn, 0);
  if (timer.isActive !== pause) {
    if (pause) timer.stop();
    else timer.start();
  }
  return timer;
}
