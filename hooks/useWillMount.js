import { useRef, useEffect } from 'react';

/**
 * Executes the passed function only on mount, storing the result
 * and returning it during every render until unmounted.
 *
 * @function useWillMount
 * @deprecated use useMountEffect instead
 * @param  {Function} onMount Callback to invoke on mount
 * @param  {Function} [onWillUnmount] Callback to invoke on Unmount
 * @returns {any} Returns the result of the onMount function.
 */
export default function useWillMount (onMount, onWillUnmount) {
  const mounted = useRef(null);

  if (!mounted.current) {
    mounted.current = [ onMount() ];
  }

  useEffect(() => () => {
    mounted.current = null;
    if (onWillUnmount) onWillUnmount();
  }, [ onWillUnmount ]);

  return mounted.current[0];
}
