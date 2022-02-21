
import { useRef } from 'react';
import dft from './default';

/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * Exactly the same as `useRef` except it accepts a function to produce the initial value.
 * Useful when the default is relatively costly to construct.
 *
 * @name useLazyRef
 * @param {Function|*} fn A function to execute on ref initialization.
 * @returns {Ref}
 */
export default function useLazyRef (fn) {
  const ref = useRef(dft);
  if (ref.current === dft) ref.current = (typeof fn === 'function' ? fn() : fn);
  return ref;
}
