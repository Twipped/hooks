import { useEffect, useRef } from 'react';
import useStableMemo from './useStableMemo.js';
import useEventCallback from './useEventCallback.js';

/** @typedef {import('./types').TimeoutHandler} TimeoutHandler */
/**
 * Produces the wrapping interface used by useTimeout and useDefer
 *
 * @param {Function} setter setFunction
 * @param {Function} clearer clearFunction
 * @param {Function} [rootFn] Function to invoke
 * @returns {TimeoutHandler}
 * @private
 */
export default function useTimeoutGenerator (setter, clearer, rootFn) {
  // eslint-disable-next-line no-param-reassign
  rootFn = useEventCallback(rootFn);
  const mounted = useRef(true);
  const handleRef = useRef();

  const timer = /** @type {TimeoutHandler} */ (useStableMemo(() => {
    /**
     * Clears the timeout
     *
     * @callback clearTimeout
     */
    function clear () {
      if (handleRef.current) clearer(handleRef.current);
      handleRef.current = null;
    }

    /**
     * Starts the timeout
     *
     * @type {import('./types').TimeoutHandlerSet}
     */
    function set (fn = rootFn, delayMs = 0, reset = true) {
      if (!mounted.current) return;
      if (!reset && handleRef.current) return;
      /* eslint-disable no-param-reassign */
      if (typeof fn !== 'function' && typeof rootFn === 'function') {
        delayMs = fn;
        fn = rootFn;
      }
      /* eslint-enable no-param-reassign */

      if (typeof fn !== 'function') throw new Error('useTimeout/useDefer must be provided a function to execute');
      if (typeof delayMs !== 'number') throw new Error('The set() function must be given a delay time as a whole number.');

      clear();

      handleRef.current = setter(fn, delayMs);
    }

    const th = function th (...args) { set(...args); };
    th.set = set;
    th.clear = clear;
    Object.defineProperty(th, 'isActive', {
      get: () => !!handleRef.current,
    });

    return /** @type {TimeoutHandler} */(th);
  }, [ setter, clearer ]));

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      timer.clear();
    };
  }, [ timer ]);

  return timer;
}

/** @type {import('./types').RAF} */
export const RAF = (typeof requestAnimationFrame !== 'undefined') ? requestAnimationFrame : setTimeout;

/** @type {import('./types').CAF} */
export const CAF = (typeof cancelAnimationFrame !== 'undefined') ? cancelAnimationFrame : clearTimeout;
