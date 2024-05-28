import { useEffect, useRef } from 'react';
import DEFAULT from '@twipped/utils/default';
import useStableMemo from './useStableMemo.js';

/** @typedef {import('./types').EffectCallback} EffectCallback */
/** @typedef {import('./types').Comparison} Comparison */

/**
 * A synchronous pseudo-effect that evaluates immediately, and after that only when
 * its dependency array changes. This is helpful for reacting to prop changes.
 * Note that state updates within this function will trigger an error from react.
 *
 * @function useImmediateEffect
 * @param {EffectCallback} effect Effect callback
 * @param {any} dependencies Dependencies
 * @param {object} [options] Options
 * @param {boolean} [options.skipMount] Pass true to skip execution on component mount
 * @param {Comparison}  [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @example js
 * function Example({ value }) {
 *   const [intermediaryValue, setValue] = useState(value);
 *
 *   useImmediateUpdateEffect(() => {
 *     setTimeout(() => setValue(value));
 *   }, [value])
 */
export default function useImmediateEffect (
  effect,
  dependencies = [],
  { skipMount, comparison = false } = {}
) {
  /** @type {import('react').MutableRefObject<void|Function>} */
  const tearDown = useRef();

  /** @type {import('react').MutableRefObject<DEFAULT|any>} */
  const dependencyCache = useRef(DEFAULT);

  useEffect(() => () => {
    if (tearDown.current) tearDown.current();
  }, []);

  useStableMemo(() => {
    if (tearDown.current) {
      tearDown.current();
    }
    if (dependencyCache.current === DEFAULT) {
      // first invocation, on component mount
      if (!skipMount) {
        tearDown.current = effect();
      }
    } else {
      tearDown.current = effect();
    }
    dependencyCache.current = dependencies;
  }, dependencies, { comparison });
}
