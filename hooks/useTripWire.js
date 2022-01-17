
import { useRef } from 'react';

/**
 * Creates a ref which initializes as false and remains false until a truthy
 * value is provided on the hook. The value will then always be true for the
 * life of the component.
 *
 * @param value The `Ref` value
 */
export default function useTripWire (value, wReset = false) {
  const ref = useRef(false);
  ref.current = !!ref.current || !!value;
  if (wReset) return [ ref.current, () => { ref.current = false; } ];
  return ref.current;
}
