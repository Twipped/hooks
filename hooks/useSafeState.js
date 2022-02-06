import { useCallback } from 'react';
import useMounted from './useMounted';

/**
 * `useSafeState` takes the return value of a `useState` hook and wraps the
 * setter to prevent updates once the component has unmounted. Can used
 * with `useMergeState` and `useStateAsync` as well
 *
 * @param state The return value of a useStateHook
 *
 * ```js
 * const [show, setShow] = useSafeState(useState(true));
 * ```
 */
export default function useSafeState ([ state, setState, ...rest ]) {
  const isMounted = useMounted();

  return [
    state,
    useCallback(
      (nextState) => {
        if (!isMounted()) return;
        return setState(nextState);
      },
      [ isMounted, setState ],
    ),
    ...rest,
  ];
}
