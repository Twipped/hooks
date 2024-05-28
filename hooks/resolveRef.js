/* eslint-disable no-param-reassign */

/**
 * @template T
 * @typedef {T | import('react').MutableRefObject<T>|((value: any) => T)} Resolvable
 */

/**
 * Attempts to resolve a value from the passed ref
 *
 * @param  {Resolvable<any>} ref
 * @returns {any}
 * @private
 */
export default function resolveRef (ref) {
  if (!ref) { return null; }
  if (typeof ref === 'function') { ref = ref(); }
  if (ref && 'current' in ref) { ref = ref.current; }
  if (ref && 'nodeType' in ref) { return ref || null; }
  return null;
}
