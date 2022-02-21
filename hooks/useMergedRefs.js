import { useMemo } from 'react';
import { noop, isFunction } from '@twipped/utils';

/**
 * @typedef {object|Function} Ref
 * @property {*} current The contents of the ref
 */

/**
 * @param {Ref} ref
 * @param {*} value
 * @private
 */
export function assignRef (ref, value) {
  if (isFunction(ref)) ref(value);
  if (ref && 'current' in ref) ref.current = value;
}

/**
 * @param {Ref} ref
 * @returns {Function}
 * @private
 */
function toFnRef (ref) {
  if (isFunction(ref)) return ref;
  if (ref && 'current' in ref) return (value) => { ref.current = value; };
  return noop;
}

/**
 * @param {...Ref} refs
 * @returns {Function}
 * @private
 */
export function mergeRefs (...refs) {
  refs = refs.map(toFnRef);
  return (value) => {
    for (const r of refs) r(value);
  };
}

/**
 * Creates a single callback ref composed from two other Refs.
 *
 * @name useMergedRefs
 * @param {...Ref} refs Two or more callback or mutable Refs
 * @example
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * @returns {Function}
 */
export default function useMergedRefs (...refs) {
  return useMemo(() => mergeRefs(...refs), refs);
}
