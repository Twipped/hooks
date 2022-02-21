
import { useEffect, useRef } from 'react';

/**
 * Attach a callback that fires when a component unmounts
 *
 * @param {Function} fn Callback to execute when the component unmounts
 * @returns {void}
 */
export default function useWillUnmount (fn) {
  const onUnmount = useRef(fn);
  onUnmount.current = fn;

  useEffect(() => () => onUnmount.current(), []);
}
