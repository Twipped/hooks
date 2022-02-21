
import { useCallback, useEffect, useRef } from 'react';
import { assert } from '@twipped/utils';
import useMounted from './useMounted';
import useCommittedRef from './useCommittedRef';
import useWillUnmount from './useWillUnmount';
import useEventCallback from './useEventCallback';
import useStableMemo from './useStableMemo';

/**
 * @classdesc Timeout/Defer API interface
 * @function TimeoutHandler
 * @param {Function} fn       Callback to evaluate when the timeout finishes
 * @param {number}   delayMs  Duration of the timeout
 * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked. Default's to true.
 * @returns {void}
 */

/**
 * @function TimeoutHandler#set
 * @memberof TimeoutHandler
 * @description Starts or resets the timeout
 * @param {Function} [fn]     Callback to evaluate when the timeout finishes. If omitted, will fallback to the rootFn.
 * @param {number}   [delayMs]  Duration of the timeout. Defaults to 0 (next event loop).
 * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked. Default's to true.
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
  const isMounted = useMounted();

  const handleRef = useCommittedRef();

  useWillUnmount(() => clearer(handleRef.current));

  return useStableMemo(() => {
    /**
     * @callback clearTimeout
     */
    function clear () {
      handleRef.current && clearer(handleRef.current);
      handleRef.current = null;
    }

    /**
     * @callback setTimeout
     * @param {Function} [fn]     Callback to evaluate when the timeout finishes
     * @param {number}   [delayMs]  Duration of the timeout. Defaults to 0 (next event loop).
     * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked. Default's to true.
     */
    function set (fn = rootFn, delayMs = 0, reset = true) {
      if (!isMounted()) return;
      if (!reset && handleRef.current) return;

      if (typeof fn !== 'function' && typeof rootFn === 'function') {
        delayMs = fn;
        fn = rootFn;
      }

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
 * @name useTimeout
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

/**
 * Returns a controller object for performing a UI deferred task that is properly cleaned up
 * if the component unmounts before the task complete. New deferrals cancel and replace existing ones.
 *
 * @name useDefer
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
  if (typeof cancelAnimationFrame === 'undefined') return useTimeout();
  const timer = useTimeoutGenerator(requestAnimationFrame, cancelAnimationFrame, fn);
  return timer;
}


/**
 * @typedef IntervalHandler
 */

/**
 * @function IntervalHandler#start
 * @memberof IntervalHandler
 * @description Starts or resets the interval loop
 * @param {Function} [fn]     Callback to evaluate when the timeout finishes. If omitted, will fallback to the rootFn.
 * @param {number}   [delayMs]  Duration of the timeout. Defaults to 0 (next event loop).
 * @param {boolean}  [reset]  If a previous timeout should be reset when this is invoked. Default's to true.
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
 * @name useInterval
 * @param {Function} fn   A function run on each interval
 * @param {number}   ms   The milliseconds duration of the interval. Set to 0 to loop on animation frames.
 * @returns {IntervalHandler}
 * @example
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 */
export function useInterval (fn, ms = 0) {
  const timer = ms > 0 ? useTimeout() : useDefer();

  fn = useEventCallback(fn);

  const tick = useCallback(() => {
    fn();
    timer.set(tick);
  }, [ timer ]);

  const start = useCallback(() => {
    timer.set(tick);
  }, [ timer ]);

  return { start, stop: timer.clear, isActive: timer.isActive };
}

/**
 * Creates an interval timer that loops on the UI thread update and is properly
 * cleaned up when a component is unmounted
 *
 * @name useDeferredLoop
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
 * @name useDebounce
 * @param  {Function} fn
 * @param  {number}   delay Defaults to 100ms
 * @param  {number}   maxDelay
 * @returns {Function}
 */
export function useDebounce (fn, delay = 100, maxDelay = Infinity) {
  fn = useEventCallback(fn);
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
  }, [ callback, delay, maxDelay, firstCall ]);
}

/**
 * Similar to useEffect, except that the callback will only execute once within
 * the delay window defined, regardless of how many renders have occurred.
 * If the component unmounts mid-debounce, the invocation will be canceled.
 *
 * @name useDebouncedEffect
 * @param  {Function} fn
 * @param  {number}   delay Defaults to 100ms
 * @param  {number}   maxDelay
 * @param  {Array<*>} deps A dependency array to pass to useEffect
 * @returns {void}
 */
export function useDebouncedEffect (fn, delay = 100, maxDelay = Infinity, deps) {
  fn = useDebounce(fn, delay, maxDelay);
  useEffect(() => fn(), deps);
}
