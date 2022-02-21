
import { useRef, useEffect } from 'react';

/**
 * Always returns the value that was defined during the previous render,
 * storing the current value for the next render
 *
 * @name usePrevious
 * @param {*} value
 * @param {*} initialDefault
 * @returns {*}
 */
export default function usePrevious (value, initialDefault) {
  const ref = useRef(initialDefault);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
