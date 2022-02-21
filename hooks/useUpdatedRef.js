
import { useRef } from 'react';

/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @name useUpdatedRef
 * @param {*} value The Ref value
 * @returns {Ref}
 */
export default function useUpdatedRef (value) {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}
