
import { useState, useCallback, useRef } from 'react';
import { isObject, deepEqual } from '@twipped/utils';

/**
 * Functions identical to useState, except the state is retrievable
 * via a callback passed as the third return element. This always returns
 * the current state regardless of where we are in the render process.
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
export default function useGettableState (initial, { alwaysMerge, alwaysUpdate, onlyUpdateOnDiff } = {}) {
  const [ state, setState ] = useState(initial);
  const ref = useRef(state);
  ref.current = state;

  const getter = useCallback(() => ref.current, [ ref ]);
  const setter = useCallback((value, merge = alwaysMerge, forceUpdate = alwaysUpdate) => {
    if (merge && isObject(value, true)) {
      value = { ...ref.current, ...value };
    }
    if (!forceUpdate && onlyUpdateOnDiff && deepEqual(value, ref.current)) return;
    ref.current = value;
    setState(value);
  }, [ ref, setState ]);

  setter.reset = useCallback(() => setter(initial));

  return [ state, setter, getter ];
}
