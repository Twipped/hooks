
import { useCallback, useEffect, useRef } from 'react';
import { assert } from '@twipped/utils';
import useCommittedRef from './useCommittedRef.js';
import useWillUnmount from './useWillUnmount.js';
import useEventCallback from './useEventCallback.js';
import useStableMemo from './useStableMemo.js';

/**
 * @classdesc Timeout/Defer API interface
 * @typedef TimeoutHandler
 * @param {Function} fn       Callback to evaluate when the timeout finishes
 * @param {number}   delayMs  Duration of the timeout
 * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked.
 * Default's to true.
 * @returns {void}
 */

/**
 * @function TimeoutHandler#set
 * @memberof TimeoutHandler
 * @description Starts or resets the timeout
 * @param {Function} [fn]     Callback to evaluate when the timeout finishes. If omitted,
 * will fallback to the rootFn.
 * @param {number}   [delayMs]  Duration of the timeout. Defaults to 0 (next event loop).
 * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked.
 * Default's to true.
 */

/**
 * @function TimeoutHandler#clear
 * @memberof TimeoutHandler
 * @description Clears the timeout
 */

/**
 * @property {boolean} TimeoutHandler#isActive
 * @memberof TimeoutHandler
 * @description Identifies if the timeout is currently running.
 * @readonly
 */

/**
 * Produces the wrapping interface used by useTimeout and useDefer
 *
 * @param {Function} setter
 * @param {Function} clearer
 * @param {Function} [rootFn]
 * @returns {TimeoutHandler}
 * @private
 */
function useTimeoutGenerator (setter, clearer, rootFn) {
  const mounted = useRef(true);
  useEffect(() => () => {
    mounted.current = false;
  }, []);

  const handleRef = useCommittedRef();

  useWillUnmount(() => clearer(handleRef.current));

  return useStableMemo(() => {
    /**
     * Clears the timeout
     *
     * @callback clearTimeout
     */
    function clear () {
      handleRef.current && clearer(handleRef.current);
      handleRef.current = null;
    }

    /**
     * Starts the timeout
     *
     * @callback setTimeout
     * @param {Function} [fn]     Callback to evaluate when the timeout finishes
     * @param {number}   [delayMs]  Duration of the timeout. Defaults to 0 (next event loop).
     * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked.
     * Default's to true.
     */
    function set (fn = rootFn, delayMs = 0, reset = true) {
      if (mounted.current) return;
      if (!reset && handleRef.current) return;

      /* eslint-disable no-param-reassign */
      if (typeof fn !== 'function' && typeof rootFn === 'function') {
        delayMs = fn;
        fn = rootFn;
      }
      /* eslint-enable no-param-reassign */

      assert(typeof fn === 'function', 'useTimeout/useDefer must be provided a function as its first argument');

      clear();

      handleRef.current = setter(fn, delayMs);
    }

    const isActive = () => !!handleRef.current;
    set.set = set;
    set.clear = clear;
    set.isActive = isActive;

    return set;
  }, []);
}

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 *
 * @function useTimeout
 * @param {Function} [fn] A base function for the timeout.
 * @returns {TimeoutHandler}
 * @example
 * const { set, clear } = useTimeout();
 * const [hello, showHello] = useState(false);
 *
 * //Display hello after 5 seconds
 * set(() => showHello(true), 5000);
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 */
export function useTimeout (fn) {
  const timer = useTimeoutGenerator(setTimeout, clearTimeout, fn);
  return timer;
}

const RAF = (typeof requestAnimationFrame === 'undefined') ? requestAnimationFrame : setTimeout;
const CAF = (typeof cancelAnimationFrame === 'undefined') ? cancelAnimationFrame : clearTimeout;
/**
 * Returns a controller object for performing a UI deferred task that is properly cleaned up
 * if the component unmounts before the task complete. New deferrals cancel and replace
 * existing ones.
 *
 * @function useDefer
 * @param {Function} [fn] A base function for the timeout.
 * @returns {TimeoutHandler}
 * @example
 * const { set, clear } = useDefer();
 * const [hello, showHello] = useState(false);
 * //Display hello after 5 seconds
 * set(() => showHello(true));
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 */
export function useDefer (fn) {
  const timer = useTimeoutGenerator(RAF, CAF, fn);
  return timer;
}


/**
 * @typedef IntervalHandler
 */

/**
 * @function IntervalHandler#start
 * @memberof IntervalHandler
 * @description Starts or resets the interval loop
 * @param {Function} [fn]     Callback to evaluate when the timeout finishes. If omitted,
 * will fallback to the rootFn.
 * @param {number}   [delayMs]  Duration of the timeout. Defaults to 0 (next event loop).
 * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked.
 * Default's to true.
 */

/**
 * @function IntervalHandler#stop
 * @memberof IntervalHandler
 * @description Aborts the interval loop
 */

/**
 * @property {boolean} IntervalHandler#isActive
 * @memberof IntervalHandler
 * @readonly
 * @description Identifies if the interval is currently running.
 */


/**
 * Creates an interval timer that is properly cleaned up when a component is unmounted
 *
 * @function useInterval
 * @param {Function} fn   A function run on each interval
 * @param {number}   ms   The milliseconds duration of the interval.
 * Pass 0 to loop on animation frames.
 * @returns {IntervalHandler}
 * @example
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 */
export function useInterval (fn, ms = 0) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const timer = ms > 0 ? useTimeout() : useDefer();
  // Both useTimeout and useDefer invoke useTimeoutGenerator, so the hook
  // order will not change if we switch functions.

  fn = useEventCallback(fn);
  // wrap the callback with an EC so we don't have to worry about it
  // changing between renders.

  const tick = useCallback(() => {
    fn();
    timer.set(tick);
  }, [ fn, timer ]);

  const start = useCallback(() => {
    timer.set(tick);
  }, [ tick, timer ]);

  return { start, stop: timer.clear, isActive: timer.isActive };
}

/**
 * Creates an interval timer that loops on the UI thread update and is properly
 * cleaned up when a component is unmounted
 *
 * @function useDeferredLoop
 * @param {Function} fn A function run on each interval
 * @returns {IntervalHandler}
 */
export function useDeferredLoop (fn) {
  return useInterval(fn, 0);
}


/**
 * Produces a function that will only invoke the wrapped callback once within
 * the delay window defined, regardless of how many invocations have occurred.
 * If the component unmounts mid-debounce, the invocation will be canceled.
 * The passed callback is wrapped in useEventCallback so that it is always
 * current across re-renders.
 *
 * @function useDebounce
 * @param  {Function} fn Function to debounce
 * @param  {number}   delay How long to wait after last invocation, in
 * milliseconds. Defaults to 100ms
 * @param  {number}   maxDelay Maximum amount of time to wait, in milliseconds.
 * @returns {Function}
 */
export function useDebounce (fn, delay = 100, maxDelay = Infinity) {
  fn = useEventCallback(fn);
  // wrap the callback with an EC so we don't have to worry about it
  // changing between renders.

  if (!maxDelay) maxDelay = Infinity;

  const { set } = useTimeout();

  const firstCall = useCommittedRef();
  if (!firstCall.current) firstCall.current = Date.now();

  const lastArgs = useRef();
  const callback = useCallback(() => {
    firstCall.current = null;
    fn(...lastArgs.current);
    lastArgs.current = [];
  }, [ fn, firstCall ]);


  return useCallback((...args) => {
    lastArgs.current = args;
    if (Date.now() - firstCall.current > maxDelay) callback();
    else set(callback, delay);
  }, [ callback, delay, maxDelay, firstCall, set ]);
}

/**
 * Similar to useEffect, except that the callback will only execute once within
 * the delay window defined, regardless of how many renders have occurred.
 * If the component unmounts mid-debounce, the invocation will be canceled.
 *
 * @function useDebouncedEffect
 * @param  {Function} fn Function to debounce
 * @param  {number}   [delay] How long to wait after last invocation, in
 * milliseconds. Defaults to 100ms
 * @param  {number}   [maxDelay] Maximum amount of time to wait, in milliseconds.
 * @param  {Array} dependencies A dependency array to pass to useEffect
 * @returns {void}
 */
export function useDebouncedEffect (fn, delay = 100, maxDelay = Infinity, dependencies = undefined) {
  fn = useDebounce(fn, delay, maxDelay);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn(), dependencies);
}
