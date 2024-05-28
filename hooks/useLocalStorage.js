import { useWebStorageApi, storageKeys } from './webStorageApi.js';

/** @typedef {import('./types').WebStorageStateHookInterface} WebStorageStateHookInterface */

/**
 * Creates a state store that is connected to the browser localStorage
 *
 * @function useLocalStorage
 * @param  {string} key          Name of the key to store the value into
 * @param  {any} [defaultValue]    The initial value to use if the key does not exist.
 * @param  {object} [options]
 * @param  {boolean} [options.isJSON] Controls if the value should be
 * serialized/deserialized as JSON. Defaults to true.
 * @returns {import('./types').WebStorageStateHookInterface}
 */
export default function useLocalStorage (key, defaultValue, options) {
  return useWebStorageApi(window.localStorage, key, defaultValue, options);
}

/**
 * Returns an array of the keys present in localStorage
 *
 * @function useLocalStorage.keys
 * @returns {Array<string>}
 */
useLocalStorage.keys = () => Array.from(storageKeys(window.localStorage));
