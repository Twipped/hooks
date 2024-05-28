import { useEffect, useRef } from 'react';
import useSmartEffect from './useSmartEffect.js';

/** @typedef {import('./types').EffectCallback} EffectCallback */
/** @typedef {import('./types').Comparison} Comparison */

/**
 * Runs an effect *only* when the dependencies have changed, skipping the
 * initial "on mount" run. Caution, if the dependency list never changes,
 * the effect is **never run**
 *
 * @function useUpdateEffect
 * @param {EffectCallback} effect An effect to run on mount
 * @param {any} dependencies Dependencies
 * @param {object}   [options]
 * @param {Comparison}  [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {void}
 * @example js
 *  const ref = useRef<HTMLInput>(null);
 *
 *  // focuses an element only if the focus changes, and not on mount
 *  useUpdateEffect(() => {
 *    const element = ref.current?.children[focusedIdx] as HTMLElement
 *
 *    element?.focus()
 *
 *  }, [focusedIndex])
 */
export default function useUpdateEffect (effect, dependencies, { comparison = false } = {}) {
  const isFirst = useRef(true);

  useSmartEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return undefined;
    }
    return effect();
  }, dependencies, { comparison });
  useEffect(() => () => {
    isFirst.current = true;
  }, []);
}
