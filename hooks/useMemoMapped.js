
import { useRef } from 'react';
import { map, iteratee } from '@twipped/utils';

/**
 * Memoizes the results of mapping a collection (array, object, map, set) per value,
 * thus if the collection is changed, only the values that change will be recomputed.
 *
 * @param {object|Map|Set|Array} collection
 * @param {Function|object|string} predicate A function or iteratee identity (key name, or truthy evaluating pairing)
 * @returns {object|Map|Set|Array}
 */
export default function useMemoMapped (collection, predicate) {
  predicate = iteratee(predicate);

  const valueRef = useRef(new Map);

  const cache = valueRef.current;
  const recache = new Map();

  const results = map(collection, (v, k, i) => {
    const res = cache.has(v) ? cache.get(v) : predicate(v, k, i);
    recache.set(v, res);
    return res;
  });
  valueRef.current = recache;

  return results;
}
