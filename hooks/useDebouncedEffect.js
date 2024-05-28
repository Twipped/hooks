import useDebounce from './useDebounce.js';
import useSmartEffect from './useSmartEffect.js';

/** @typedef {import('./types').EffectCallback} EffectCallback */
/** @typedef {import('./types').Comparison} Comparison */

/**
 * Similar to useEffect, except that the callback will only execute once within
 * the delay window defined, regardless of how many renders have occurred.
 * If the component unmounts mid-debounce, the invocation will be canceled.
 *
 * Note, this does NOT support returning a disposer function.
 *
 * @function useDebouncedEffect
 * @param  {EffectCallback} fn Function to debounce
 * @param  {number}   [delay] How long to wait after last invocation, in
 * milliseconds. Defaults to 100ms
 * @param  {number}   [maxDelay] Maximum amount of time to wait, in milliseconds.
 * @param  {any} dependencies A dependency array to pass to useEffect
 * @param  {object}   [options]
 * @param  {Comparison}  [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {void}
 * @example
 * import { useState } from 'react';
 * import useDebouncedEffect from '@zenbusiness/application-commons-hooks/useDebouncedEffect';
 * function SomeComponentThatReRendersConstantly () {
 *   useDebouncedEffect(() => {
 *     // will not fire more frequently than 200ms or less frequently than 500
 *   }, 200, 500)
 * }
 */
export default function useDebouncedEffect (
  fn,
  delay = 100,
  maxDelay = Infinity,
  dependencies = undefined,
  { comparison = false } = {}
) {
  // eslint-disable-next-line no-param-reassign
  fn = useDebounce(fn, delay, maxDelay);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useSmartEffect(() => fn(), dependencies, { comparison });
}
