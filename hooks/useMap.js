
import useStableMemo from './useStableMemo.js';
import useForceUpdate from './useForceUpdate.js';

export class HookedMap extends Map {
  constructor (listener, ...args) {
    super(...args);

    this.listener = listener;
  }

  set (key, value) {
    super.set(key, value);
    // When initializing the Set, the base Set calls this.add() before the
    // listener is assigned so it will be undefined
    if (this.listener) this.listener(this);
    return this;
  }

  delete (key) {
    const result = super.delete(key);
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
 * @function useMap
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
