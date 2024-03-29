/** @typedef {import('@types/react').Ref} Ref */

import { useRef, useEffect } from 'react';

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @function useCommittedRef
 * @param {Ref|HTMLElement} value The `Ref` value
 * @returns {any} The committed value
 */
export default function useCommittedRef (value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [ value ]);
  return ref;
}
