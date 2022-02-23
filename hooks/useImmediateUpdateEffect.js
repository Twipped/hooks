
import useStableMemo from './useStableMemo';
import useWillUnmount from './useWillUnmount';
import { useRef } from 'react';

/**
 * A synchronous effect that evaluates only when its dependency array changes.
 * This is helpful for reacting to prop changes. Note that state updates within this function
 * will trigger an error from react.
 *
 * @function useImmediateUpdateEffect
 * @param {Function} effect
 * @param {Array} dependencies
 * @example js
 * function Example({ value }) {
 *   const [intermediaryValue, setValue] = useState(value);
 *
 *   useImmediateUpdateEffect(() => {
 *     setTimeout(() => setValue(value));
 *   }, [value])
 */
export default function useImmediateUpdateEffect (effect, dependencies) {
  const firstRef = useRef(true);
  const tearDown = useRef();

  useWillUnmount(() => {
    if (tearDown.current) tearDown.current();
  });

  useStableMemo(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }

    if (tearDown.current) tearDown.current();
    tearDown.current = effect();
  }, dependencies);
}
