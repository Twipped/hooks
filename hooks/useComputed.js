
import { computed } from 'mobx';
import { useRef } from 'react';
import { shallowEqual, deepEqual } from '@twipped/utils';
import dft from './default.js';

/**
 * @typedef {Object} Observable
 */

/**
 * Produces a MobX computed observable that invalidates when the dependencies change
 *
 * @function useComputed
 * @param  {Function}  fn         Factory function for generating the observable.
 * @param  {Array}  dependencies       Dependencies array
 * @param  {Object}    [options]        Behavioral options
 * @param  {Function|boolean}   options.comparison The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {Observable<*>} Returns a MobX Observable containing the derived values
 */
export default function useComputed (fn, dependencies, { comparison = shallowEqual } = {}) {
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
