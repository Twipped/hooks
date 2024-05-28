import { useCallback, useRef } from 'react';
import useCommittedRef from './useCommittedRef.js';
import useEventCallback from './useEventCallback.js';
import useTimeout from './useTimeout.js';

/**
 * Produces a function that will only invoke the wrapped callback once within
 * the delay window defined, regardless of how many invocations have occurred.
 * If the component unmounts mid-debounce, the invocation will be canceled.
 * The passed callback is wrapped in useEventCallback so that it is always
 * current across re-renders.
 *
 * @function useDebounce
 * @template {Function} T
 * @param  {T} fn Function to debounce
 * @param  {number}   delay How long to wait after last invocation, in
 * milliseconds. Defaults to 100ms
 * @param  {number}   maxDelay Maximum amount of time to wait, in milliseconds.
 * @returns {T}
 * @example
 * import { useState } from 'react';
 * import useDebounce from '@zenbusiness/application-commons-hooks/useDebounce';
 * function MyComponent () {
 *   const [position, setPosition] = useState({});
 *   const onMove = useDebounce((ev) => {
 *     const { clientX: x, clientY: y } = ev;
 *     setPosition({ x, y });
 *   }, 50, 200);
 *   return <div onMouseMove={onMouseMove}>X: {position.x}, Y: {position.y}</div>;
 * }
 */
export default function useDebounce (fn, delay = 100, maxDelay = Infinity) {
  /* eslint-disable no-param-reassign */

  /** @type {ReturnType<typeof useEventCallback<T>>} */
  fn = useEventCallback(fn);
  // wrap the callback with an EC so we don't have to worry about it
  // changing between renders.

  if (!maxDelay) maxDelay = Infinity;
  /* eslint-enable no-param-reassign */

  const set = useTimeout();

  const firstCall = useCommittedRef();
  if (!firstCall.current) firstCall.current = Date.now();

  /** @type {import('react').MutableRefObject<Array<any> | undefined>} */
  const lastArgs = useRef();
  const callback = /** @type {() => void} */ (useCallback(() => {
    firstCall.current = null;
    fn(...lastArgs.current);
    lastArgs.current = [];
  }, [ fn, firstCall ]));

  // @ts-ignore
  return useEventCallback((...args) => {
    lastArgs.current = args;
    if (Date.now() - firstCall.current > maxDelay) callback();
    else set(callback, delay);
  });
}
