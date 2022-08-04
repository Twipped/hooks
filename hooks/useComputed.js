
import { computed } from 'mobx';
import { useRef } from 'react';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';
import { DEFAULT } from '@twipped/utils/types';

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

  const depsRef = useRef(DEFAULT);
  const computedRef = useRef(DEFAULT);
  // fn = useEventCallback(fn);

  if (computedRef.current === DEFAULT) {
    computedRef.current = computed(fn);
  }
  const c = computedRef.current;

  c.derivation = fn;

  if (depsRef.current === DEFAULT) {
    depsRef.current = dependencies;
  } else if (c.dependenciesState_ === 0 && !comparison(depsRef.current, dependencies)) {
    depsRef.current = dependencies;

    // invalidate the computed
    c.dependenciesState_ = 2;
  }

  return c;
}
