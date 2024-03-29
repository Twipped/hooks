
import { useRef } from 'react';
import DEFAULT from '@twipped/utils/default';
/** @typedef {import('@types/react').Ref} Ref */

/**
 * Exactly the same as `useRef` except it accepts a function to produce the initial value.
 * Useful when the default is relatively costly to construct.
 *
 * @function useLazyRef
 * @param {Function|*} fn A function to execute on ref initialization.
 * @returns {Ref}
 */
export default function useLazyRef (fn) {
  const ref = useRef(DEFAULT);
  if (ref.current === DEFAULT) ref.current = (typeof fn === 'function' ? fn() : fn);
  return ref;
}
