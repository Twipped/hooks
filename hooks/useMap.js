
import useStableMemo from './useStableMemo';
import useForceUpdate from './useForceUpdate';

export class HookedMap extends Map {
  constructor (listener, ...args) {
    super(...args);

    this.listener = listener;
  }

  set (...args) {
    super.set(...args);
    // When initializing the Set, the base Set calls this.add() before the
    // listener is assigned so it will be undefined
    if (this.listener) this.listener(this);
    return this;
  }

  delete (...args) {
    const result = super.delete(...args);
    this.listener(this);
    return result;
  }

  clear () {
    super.clear();
    this.listener(this);
  }
}


/**
 * Create and return a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * that triggers rerenders when it is updated.
 *
 * @name useMap
 * @param {...any} args initial Map entries
 * @returns {Map}
 * @example
 * const customerAges = useMap<number>([
 *   ['john', 24],
 *   ['betsy', 25]
 * ]);
 *
 * return (
 *  <>
 *    {Array.from(ids, ([name, age]) => (
 *      <div>
 *        {name}: {age}. <button onClick={() => ids.delete(name)}>X</button>
 *      </div>
 *    )}
 *  </>
 * )
 */
export default function useMap (...args) {
  const forceUpdate = useForceUpdate();
  return useStableMemo(() => new HookedMap(forceUpdate, ...args), []);
}
