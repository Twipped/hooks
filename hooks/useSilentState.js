
import { useRef, useCallback } from 'react';
import useStableMemo from './useStableMemo';

/**
 * Identical to `useState` _except_ that it does not trigger a redraw when
 * the state is updated.
 *
 * @param initial The initial value to set the state to.
 * @param {Array<mixed>} deps A dependency array. If provided, the state
 * will be reset to the passed initial value if a dependency changes.
 */
export default function useSilentState (initial = null, deps) {
  const ref = useRef(initial);

  // if the deps change, then the state will be reset to the initial value
  useStableMemo(() => {
    if (deps) ref.current = initial;
  }, deps);

  const setter = useCallback((value) => {
    ref.current = value;
    return value;
  }, [ ref ]);

  const getter = useCallback(() => ref.current, [ ref ]);

  setter.reset = useCallback(() => setter(initial));

  return [ ref.current, setter, getter ];
}
