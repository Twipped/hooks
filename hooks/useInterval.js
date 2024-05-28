import useEventCallback from './useEventCallback.js';
import useTimeoutGenerator, { CAF, RAF } from './useTimeoutGenerator.js';
import { isWholeNumber } from './asserts.js';

/** @typedef {import('./types').IntervalHandler} IntervalHandler */

/**
 * Creates an interval timer that is properly cleaned up when a component is unmounted
 *
 * @function useInterval
 * @param {() => void} fn   A function run on each interval
 * @param {number}   interval   The milliseconds duration of the interval.
 * Pass 0 to loop on animation frames.
 * @returns {IntervalHandler}
 * @example
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 */
export default function useInterval (fn, interval) {
  var timer;

  if (!isWholeNumber(interval) && interval !== 0) {
    throw new Error('useInterval requires a delay time greater than or equal to 0.');
  }

  const tick = useEventCallback(() => {
    fn();
    timer.set(tick, interval);
  });

  const start = /** @type {() => void} */ (useEventCallback(() => {
    timer.set(tick, interval);
  }));

  timer = (useTimeoutGenerator(
    interval > 0 ? setTimeout : RAF,
    interval > 0 ? clearTimeout : CAF,
    tick
  ));

  return {
    start,
    stop: timer.clear,
    get isActive () {
      return timer.isActive;
    },
  };
}
