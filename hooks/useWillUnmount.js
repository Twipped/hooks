
import { useEffect, useRef } from 'react';

/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */
export default function useWillUnmount (fn) {
  const onUnmount = useRef(fn);
  onUnmount.current = fn;

  useEffect(() => () => onUnmount.current(), []);
}
