import { useRef } from 'react';

/**
 * Returns false as long as the passed value remains falsy. Once the value becomes
 * truthy, the return will also become truthy and remain so until reset.
 *
 * @function useTripWire
 * @param  {any} value  The triggering value.
 * @returns {[state: boolean, reset: () => void]} Returns an array containing the current
 * value and a function to reset to false.
 */
export default function useTripWire (value) {
  const ref = useRef(false);
  const resetRef = useRef(() => { ref.current = false; });

  ref.current = !!ref.current || !!value;

  return [ ref.current, resetRef.current ];
}
