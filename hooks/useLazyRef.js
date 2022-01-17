
import { useRef } from 'react';
import dft from './default';

/**
 * Exactly the same as `useRef` except it accepts a function to produce the initial value.
 * Useful when the default is relatively costly to construct.
 *
 * @param value The `Ref` value
 */
export default function useLazyRef (fn) {
  const ref = useRef(dft);
  if (ref.current === dft) ref.current = (typeof fn === 'function' ? fn() : fn);
  return ref;
}
