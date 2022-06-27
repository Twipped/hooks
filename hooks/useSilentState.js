
import { useRef, useCallback } from 'react';
import useStableMemo from './useStableMemo.js';

/**
 * Identical to `useState` _except_ that it does not trigger an update when
 * the state is updated.
 *
 * @function useSilentState
 * @param {any}          initial             The initial value to set the state to.
 * @param {Array}   dependencies        A dependency array. If provided, the state
 * will be reset to the passed initial value if a dependency changes.
 * @returns {StateHookInterface} A three item array containing: state, setState, getState
 */
export default function useSilentState (initial = null, dependencies) {
  const ref = useRef();

  // if the dependencies change, then the state will be reset to the initial value
  useStableMemo(() => {
    ref.current = (typeof initial === 'function' ? initial() : initial);
  }, dependencies);

  const setter = useCallback((value) => {
    ref.current = value;
    return value;
  }, []);

  const getter = useCallback(() => ref.current, [ ref ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  setter.reset = useCallback(() => setter(initial), []);

  return [ ref.current, setter, getter ];
}
