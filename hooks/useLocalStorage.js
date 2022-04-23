/* global StateHookInterface */
import { useWebStorageApi, storageKeys } from './webStorageApi.js';

/**
 * Creates a state store that is connected to the browser localStorage
 *
 * @function useLocalStorage
 * @param  {string} key          Name of the key to store the value into
 * @param  {any} defaultValue    The initial value to use if the key does not exist.
 * @returns {StateHookInterface} A three item array containing: state, setState, getState
 */
export default function useLocalStorage (key, defaultValue) {
  return useWebStorageApi(window.localStorage, key, defaultValue);
}

/**
 * Returns an array of the keys present in localStorage
 *
 * @function useLocalStorage.keys
 * @returns {Array<string>}
 */
useLocalStorage.keys = () => Array.from(storageKeys(window.localStorage));
