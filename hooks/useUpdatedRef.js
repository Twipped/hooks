
import { useRef } from 'react';
/** @typedef {import('@types/react').Ref} Ref */

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @function useUpdatedRef
 * @param {any} value The Ref value
 * @returns {Ref}
 */
export default function useUpdatedRef (value) {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}
