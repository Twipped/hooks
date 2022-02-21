
/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * Attempts to resolve a value from the passed ref
 *
 * @param  {Ref} ref A React ref object
 * @returns {*}     [description]
 */
export default function resolveRef (ref) {
  if (typeof document === 'undefined' || !ref) { return null; }
  if (typeof ref === 'function') { ref = ref(); }
  if (ref && 'current' in ref) { ref = ref.current; }
  if (ref?.nodeType) { return ref || null; }
  return null;
}
