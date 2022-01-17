
import useStableMemo from './useStableMemo';
import useWillUnmount from './useWillUnmount';
import { useRef } from 'react';

/**
 * An _immediate_ effect that runs an effect callback when its dependency array
 * changes. This is helpful for updates should must run during render, most
 * commonly state derived from props; a more ergonomic version of https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
 *
 * ```ts
 * function Example({ value }) {
 *   const [intermediaryValue, setValue] = useState(value);
 *
 *   useImmediateUpdateEffect(() => {
 *     setValue(value)
 *   }, [value])
 * ```
 *
 * @category effects
 */
export default function useImmediateUpdateEffect (effect, deps) {
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
  }, deps);
}
