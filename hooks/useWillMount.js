

import { useRef, useEffect } from 'react';

/**
 * Executes the passed function only on mount, storing the result
 * and returning it during every render until unmounted.
 *
 * @function useWillMount
 * @param  {Function} onMount
 * @param  {Function} onWillUnmount
 * @returns {any} Returns the result of the onMount function.
 */
export default function useWillMount (onMount, onWillUnmount) {
  const mounted = useRef(null);

  // create a ref that always contains the latest unmount function
  const owu = useRef(onWillUnmount);
  owu.current = onWillUnmount;

  if (!mounted.current) {
    mounted.current = [ onMount() ];
  }

  useEffect(
    () => () => {
      mounted.current = null;
      owu.current && owu.current();
    },
    []
  );

  return mounted.current[0];
}
