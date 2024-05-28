import { useRef } from 'react';
import DEFAULT from '@twipped/utils/default';

/**
 * @template T
 * @callback RefDispatch
 * @returns {T}
 */

/**
 * Exactly the same as `useRef` except it accepts a function to produce the initial value.
 * Useful when the default is relatively costly to construct.
 *
 * @template L
 * @param {L | RefDispatch<L>} fn A function to execute on ref initialization.
 * @returns {import('react').MutableRefObject<L>}
 */
export default function useLazyRef (fn) {
  const ref = useRef(DEFAULT);
  if (ref.current === DEFAULT) {
    // @ts-ignore
    ref.current = (typeof fn === 'function' ? fn() : fn);
  }
  // @ts-ignore
  return ref;
}
