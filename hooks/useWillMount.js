

import { useRef, useEffect } from 'react';

/**
 * Executes the passed function only on mount, storing the result
 * and returning it during every render until unmounted.
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
export default function useWillMount (fn, unFn) {
  const mounted = useRef(null);

  if (!mounted.current) {
    mounted.current = [ fn() ];
  }

  useEffect(
    () => () => {
      mounted.current = null;
      unFn && unFn();
    },
    [],
  );

  return mounted.current[0];
}
