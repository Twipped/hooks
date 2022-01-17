
import { useCallback, useEffect, useRef } from 'react';
import useMounted from './useMounted';
import useCommittedRef from './useCommittedRef';
import useWillUnmount from './useWillUnmount';
import useEventCallback from './useEventCallback';
import useStableMemo from './useStableMemo';

function useTimeoutGenerator (setter, clearer, rootFn) {
  const isMounted = useMounted();

  const handleRef = useCommittedRef();

  useWillUnmount(() => clearer(handleRef.current));

  return useStableMemo(() => {
    function clear () {
      handleRef.current && clearer(handleRef.current);
      handleRef.current = null;
    }

    function set (fn, delayMs = 0, reset = true) {
      if (!isMounted()) return;
      if (!reset && handleRef.current) return;

      clear();

      handleRef.current = setter(fn, delayMs);
    }

    const isActive = () => !!handleRef.current;
    set.set = rootFn ? set.bind(null, rootFn) : set;
    set.clear = clear;
    set.isActive = isActive;

    return set;
  }, []);
}

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 *
 *
 * ```jsx
 * const { set, clear } = useTimeout();
 * const [hello, showHello] = useState(false);
 * //Display hello after 5 seconds
 * set(() => showHello(true), 5000);
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 * ```
 */
export function useTimeout (fn) {
  const timer = useTimeoutGenerator(setTimeout, clearTimeout, fn);
  return timer;
}

/**
 * Returns a controller object for performing a UI deferred task that is properly cleaned up
 * if the component unmounts before the task complete. New deferrals cancel and replace existing ones.
 *
 *
 *
 * ```jsx
 * const { set, clear } = useDefer();
 * const [hello, showHello] = useState(false);
 * //Display hello after 5 seconds
 * set(() => showHello(true));
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 * ```
 */
export function useDefer (fn) {
  if (typeof cancelAnimationFrame === 'undefined') return useTimeout();
  const timer = useTimeoutGenerator(requestAnimationFrame, cancelAnimationFrame, fn);
  return timer;
}

/**
 * Creates an interval timer that is properly cleaned up when a component is unmounted
 *
 * ```jsx
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 * ```
 *
 * @param fn A function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused If true, the loop will halt and will not start. If false, the loop starts. Defaults to null.
 * @param runImmediately Whether to run the function immediately on mount or unpause. Defaults to false.
 * rather than waiting for the first interval to elapse
 *
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
 * @param fn A function run on each interval
 * @param [paused] If true, the loop will halt and will not start. If false, the loop start. Defaults to null.
 * @param [runImmediately] Whether to run the function immediately on mount or unpause. Defaults to false.
 * rather than waiting for the first interval to elapse
 *
 */
export function useDeferredLoop (fn) {
  return useInterval(fn, 0);
}


/**
 * Returns a function that will only invoke the wrapped callback once within
 * the delay window defined, regardless of how many invocations have occurred.
 * If the component unmounts mid-debounce, the invocation will be canceled.
 * The passed callback is wrapped in useEventCallback so that it is always
 * current across re-renders.
 * @param  {Function} fn
 * @param  {Number}   delay Defaults to 100ms
 * @param  {Number}   maxDelay
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
 * @param  {Function} fn
 * @param  {Number}   delay Defaults to 100ms
 * @param  {Number}   maxDelay
 * @param  {Array<mixed>} deps A dependency array to pass to useEffect
 */

export function useDebouncedEffect (fn, delay = 100, maxDelay = Infinity, deps) {
  fn = useDebounce(fn, delay, maxDelay);
  useEffect(() => fn(), deps);
}
