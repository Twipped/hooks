/* eslint-disable no-param-reassign */
// No, eslint, this is just how you use refs

import { useMemo } from 'react';
import noop from '@twipped/utils/noop';

/**
 * @template T
 * @typedef {import('react').MutableRefObject<T> | import('react').RefCallback<T>} Ref
 */

/**
 * Assigns a value to a Ref or Ref Functions
 *
 * @template T
 * @param {Ref<T>} ref Ref to assign to.
 * @param {T} value Value to assign.
 * @private
 */
export function assignRef (ref, value) {
  if (typeof ref === 'function') ref(value);
  if (ref && 'current' in ref) ref.current = value;
}

/**
 * Converts a Ref to a Ref Function
 *
 * @template T
 * @param {Ref<T>} ref
 * @returns {(value: T) => void}
 * @private
 */
function toFnRef (ref) {
  if (typeof ref === 'function') return ref;
  if (ref && 'current' in ref) return (value) => { ref.current = value; };
  return noop;
}

/**
 * Merges multiple refs
 *
 * @template T
 * @param {...Ref<T>} refs Refs
 * @returns {(value: T) => void}
 * @private
 */
export function mergeRefs (...refs) {
  const reffns = refs.map(toFnRef);
  return (value) => {
    for (const r of reffns) r(value);
  };
}

/**
 * Creates a single callback ref composed from two other Refs.
 *
 * @function useMergedRefs
 * @template T
 * @param {...Ref<T>} refs Two or more callback or mutable Refs
 * @example
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * @returns {(value: T) => void}
 */
export default function useMergedRefs (...refs) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refs), refs);
}
