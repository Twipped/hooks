import { useRef } from 'react';
import useChanged from './useChanged.js';

/** @typedef {import('./types').Comparison} Comparison */

/**
 * Identical to `useMemo` _except_ that it provides a semantic guarantee that
 * values will not be invalidated unless the dependencies change. This is unlike
 * the built in `useMemo` which may discard memoized values for performance reasons.
 *
 * useStableMemo also provides the ability to perform a deep equality check on dependencies,
 * and also allows you pass an object as the dependencies value.
 *
 * @function useStableMemo
 * @template T
 * @param {() => T}  factory      A function that returns a value to be memoized
 * @param {any} dependencies A dependency array or object
 * @param {object} [options] Options
 * @param {Comparison} [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {T}
 */
export default function useStableMemo (factory, dependencies, { comparison = false } = {}) {
  /** @type {import('react').MutableRefObject<T>} */
  const valueRef = useRef();

  const [ , hasChanged ] = useChanged(dependencies, { comparison });

  if (hasChanged) {
    valueRef.current = factory();
  }

  return valueRef.current;
}
