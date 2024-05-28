import { isPromise } from '@twipped/utils/types';

/**
 * Basic little wrapper that ensures we always get a promise back.
 *
 * @param {Function} fn
 * @param {...any} args
 * @returns {Promise<any>}
 * @internal
 */
async function wrapPromise (fn, ...args) {
  const res = await fn(...args);
  return res;
}
const suspensions = new Map();

/**
 * Error wrapper that allows us to detect a failed promise in the cache
 *
 * @internal
 */
class Failed {
  constructor (/** @type {Error} */ err) {
    this.err = err;
  }
}

/**
 * @callback TaskCallback
 * @param {string} key The operation name.
 * @returns {Promise<any>}
 */

/**
 * Performs an asynchronous task in a manner compatible with
 * the React Suspension API.
 *
 * Note, if you don't know how Suspension works, you probably
 * shouldn't use this function.
 *
 * This will execute the given function and throw the promise it
 * produces so that React.Suspense can await its completion, dismounting
 * your component while it completes. When the promise finishes,
 * React.Suspense will remount your component, invoking this function again.
 * At that point, this function returns the resolved value for the rest of
 * the life of the application.
 *
 * @param {string} key A name for this operation that is unique across
 * your entire application (including multiple instances of your component).
 * @param {TaskCallback} fn The async task to perform.
 * @returns {any}
 */
export default function useSuspense (key, fn) {
  if (typeof key !== 'string') throw new Error('suspend must receive a string key to test against.');

  const cached = suspensions.get(key);

  // nothing suspended yet, create the promise and throw it to suspend
  if (!suspensions.has(key)) {
    const p = wrapPromise(fn, key).then((m) => {
      suspensions.set(key, m);
      return m;
    }, (err) => {
      const failure = new Failed(err);
      suspensions.set(key, failure);
      throw err;
      // we deliberately eat the error here so that it can be
      // rethrown within the render pipeline.
    });
    suspensions.set(key, p);

    throw p;
  }

  if (cached instanceof Failed) {
    throw cached.err;
  }

  // a promise is already suspended, throw it again to maintain suspense.
  if (isPromise(cached)) {
    throw cached;
  }

  // promise has finished, return the actual result
  return cached;
}

/**
 * Removes a stored async result from the suspense cache, allowing
 * it to be invoked again on next render.
 *
 * @param {string} key The operation name to remove.
 */
export function resetSuspension (key) {
  suspensions.delete(key);
}

useSuspense.reset = resetSuspension;

/**
 * Removes all stored async results from the suspense cache.
 */
export function resetAllSuspensions () {
  suspensions.clear();
}

useSuspense.resetAll = resetAllSuspensions;
