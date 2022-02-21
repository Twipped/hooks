
import { useRef } from 'react';

/**
 * Returns false as long as the passed value remains falsy. Once the value becomes
 * truthy, the return will also become truthy and remain so until reset.
 *
 * @param  {*} value  The triggering value.
 * @returns {boolean}
 */
export default function useTripWire (value) {
  const ref = useRef(false);
  const resetRef = useRef(() => { ref.current = false; });

  ref.current = !!ref.current || !!value;

  return [ ref.current, resetRef.current ];
}
