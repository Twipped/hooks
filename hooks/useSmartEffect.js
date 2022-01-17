
import { useEffect, useRef } from 'react';
import { shallowEqual, deepEqual } from '@twipped/utils';
import areHookInputsEqual from './areHookInputsEqual';
import dft from './default';

/**
 * Runs an effect only when the dependencies have changed, using whatever comparison
 * function is provided, or a shallow equal if none is provided.
 *
 * @category effects
 */
export default function useSmartEffect (fn, deps, comparison = areHookInputsEqual) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  const depsRef = useRef(dft);
  const exitFn = useRef();

  useEffect(() => {
    if (depsRef.current === dft || !comparison(depsRef.current, deps)) {
      // update deps to newest value
      depsRef.current = deps;

      // run exit function from last evocation
      if (exitFn.current) exitFn.current();

      // run the effect, saving the exit function
      exitFn.current = fn();
    }
  });

  // when the component unmounts, run the last exitFn
  useEffect(() => () => exitFn.current && exitFn.current(), []);
}
