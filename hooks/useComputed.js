
import { computed } from 'mobx';
import { useRef } from 'react';
import { shallowEqual, deepEqual } from '@twipped/utils';
import areHookInputsEqual from './areHookInputsEqual';
import dft from './default';

/*
  Produces a MobX computed observable that invalidates when the dependencies change
 */
export default function useComputed (fn, deps, comparison = areHookInputsEqual) {
  if (comparison === false) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;

  const depsRef = useRef(dft);
  const computedRef = useRef(dft);
  // fn = useEventCallback(fn);

  if (computedRef.current === dft) {
    computedRef.current = computed(fn);
  }
  const c = computedRef.current;

  c.derivation = fn;

  if (depsRef.current === dft) {
    depsRef.current = deps;
  } else if (c.dependenciesState_ === 0 && !comparison(depsRef.current, deps)) {
    depsRef.current = deps;

    // invalidate the computed
    c.dependenciesState_ = 2;
  }

  return c;
}
