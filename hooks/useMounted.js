
import { useRef, useEffect } from 'react';

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @name useMounted
 * @returns {Function} Function that returns the current isMounted state of the component
 * @example js
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 */
export default function useMounted () {
  const mounted = useRef(true);
  const isMounted = useRef(() => mounted.current);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );
  return isMounted.current;
}
