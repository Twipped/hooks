import { useRef } from 'react';
import { DEFAULT } from '@twipped/utils/types';
import useStableMemo from './useStableMemo.js';
import useWillUnmount from './useWillUnmount.js';

/**
 * A synchronous pseudo-effect that evaluates immediately, and after that only when
 * its dependency array changes. This is helpful for reacting to prop changes.
 * Note that state updates within this function will trigger an error from react.
 *
 * @function useImmediateEffect
 * @param {Function} effect Effect callback
 * @param {Array} dependencies Dependencies
 * @param {Object} [options] Options
 * @param {boolean} [options.skipMount] Pass true to skip execution on component mount
 * @example js
 * function Example({ value }) {
 *   const [intermediaryValue, setValue] = useState(value);
 *
 *   useImmediateUpdateEffect(() => {
 *     setTimeout(() => setValue(value));
 *   }, [value])
 */
export default function useImmediateEffect (effect, dependencies = [], { skipMount } = {}) {
  const tearDown = useRef();
  const dependencyCache = useRef(DEFAULT);

  useWillUnmount(() => {
    if (tearDown.current) tearDown.current();
  });

  useStableMemo(() => {
    if (tearDown.current) {
      tearDown.current();
    }
    if (dependencyCache.current === DEFAULT) {
      // first invocation, on component mount
      if (!skipMount) {
        tearDown.current = effect();
      }
    } else {
      tearDown.current = effect(...dependencyCache.current);
    }
    dependencyCache.current = dependencies;
  }, dependencies);
}
