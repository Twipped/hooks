
import useStableMemo from './useStableMemo';
import useForceUpdate from './useForceUpdate';
import useDerivedState from './useDerivedState';

export class HookedSet extends Set {
  constructor (listener, ...args) {
    super(...args);

    this.listener = listener;
  }

  add (value) {
    super.add(value);
    // When initializing the Set, the base Set calls this.add() before the
    // listener is assigned so it will be undefined
    if (this.listener) this.listener(this);
    return this;
  }

  delete (value) {
    const result = super.delete(value);
    this.listener(this);
    return result;
  }

  clear () {
    super.clear();
    this.listener(this);
  }
}

/**
 * Create and return a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) that triggers rerenders when it's updated.
 *
 * ```jsx
 * const ids = useSet([1,2,3,4]);
 *
 * return (
 *  <>
 *    {Array.from(ids, id => (
 *      <div>
 *        id: {id}. <button onClick={() => ids.delete(id)}>X</button>
 *      </div>
 *    )}
 *  </>
 * )
 * ```
 *
 * @param init initial Set values
 */
export default function useSet (...args) {
  const forceUpdate = useForceUpdate();
  return useStableMemo(() => new HookedSet(forceUpdate, ...args), []);
}

export function useDerivedSet (fn, deps) {
  const forceUpdate = useForceUpdate();
  return useDerivedState(() => new HookedSet(forceUpdate, fn()), deps);
}
