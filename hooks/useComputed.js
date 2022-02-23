
import { computed } from 'mobx';
import { useRef } from 'react';
import { shallowEqual, deepEqual } from '@twipped/utils';
import areHookInputsEqual from './areHookInputsEqual';
import dft from './default';

/**
 * @typedef {object} Observable
 */

/**
 * Produces a MobX computed observable that invalidates when the dependencies change
 *
 * @function useComputed
 * @param  {Function}  fn         Factory function for generating the observable.
 * @param  {Array}  dependencies       Dependencies array
 * @param  {object}    [options]        Behavioral options
 * @param  {Function|boolean}   options.comparison A comparison method, false for shallow equality, or true for deep equality
 * @returns {Observable<*>} Returns a MobX Observable containing the derived values
 */
export default function useComputed (fn, dependencies, { comparison = areHookInputsEqual } = {}) {
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
    depsRef.current = dependencies;
  } else if (c.dependenciesState_ === 0 && !comparison(depsRef.current, dependencies)) {
    depsRef.current = dependencies;

    // invalidate the computed
    c.dependenciesState_ = 2;
  }

  return c;
}
