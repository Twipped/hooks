
import { useRef } from 'react';
import usePrevious from './usePrevious.js';

/**
 * Returns an integer that increments any time the passed value changes
 *
 * @function useIncrementer
 * @param  {any}      value Value to watch for changes
 * @param  {number} step  Amount to increment by.
 * @returns {[number, () => void]} The incrementing value
 */
export default function useIncrementer (value, step = 1) {
  const ref = useRef(-step);
  /** @type {ReturnType<typeof usePrevious<number>>} */
  const prev = usePrevious(value);
  const resetRef = useRef(() => { ref.current = 0; });

  if (value !== prev) {
    ref.current += step;
  }

  return [ ref.current, resetRef.current ];
}
