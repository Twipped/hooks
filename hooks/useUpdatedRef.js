import { useRef } from 'react';

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @template T
 * @function useUpdatedRef
 * @param {any} value The Ref value
 * @returns {import('react').MutableRefObject<T>}
 */
export default function useUpdatedRef (value) {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}
