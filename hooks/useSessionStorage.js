import { useWebStorageApi, storageKeys } from './webStorageApi.js';

/** @typedef {import('./types').WebStorageStateHookInterface} WebStorageStateHookInterface */

/**
 * Creates a state store that is connected to the browser sessionStorage
 *
 * @function useSessionStorage
 * @param  {string} key          Name of the key to store the value into
 * @param  {any} defaultValue    The initial value to use if the key does not exist.
 * @param  {object} options
 * @param  {boolean} options.isJSON Controls if the value should be
 * serialized/deserialized as JSON. Defaults to true.
 * @returns {import('./types').WebStorageStateHookInterface} A three item array
 * containing: state, setState, getState
 */
export default function useSessionStorage (key, defaultValue, options) {
  return useWebStorageApi(window.sessionStorage, key, defaultValue, options);
}

/**
 * Returns an array of the keys present in sessionStorage
 *
 * @function useSessionStorage.keys
 * @returns {Array<string>}
 */
useSessionStorage.keys = () => Array.from(storageKeys(window.sessionStorage));
