import { useRef, useEffect } from 'react';

/**
 * Always returns the value that was defined during the previous render,
 * storing the current value for the next render
 *
 * @function usePrevious
 * @template T
 * @param {T} value Value
 * @param {T} [initialDefault] Value at mount time.
 * @returns {T}
 */
export default function usePrevious (value, initialDefault) {
  const ref = useRef(initialDefault);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
