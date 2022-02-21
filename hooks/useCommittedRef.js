
import { useRef, useEffect } from 'react';

/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @name useCommittedRef
 * @param {Ref} value The `Ref` value
 * @returns {*} The committed value
 */
export default function useCommittedRef (value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [ value ]);
  return ref;
}
