/* global StateHookInterface */
import { useWebStorageApi, storageKeys } from './webStorageApi.js';

/**
 * Creates a state store that is connected to the browser sessionStorage
 *
 * @function useSessionStorage
 * @param  {string} key          Name of the key to store the value into
 * @param  {any} defaultValue    The initial value to use if the key does not exist.
 * @returns {StateHookInterface} A three item array containing: state, setState, getState
 */
export default function useSessionStorage (key, defaultValue) {
  return useWebStorageApi(window.sessionStorage, key, defaultValue);
}

/**
 * Returns an array of the keys present in sessionStorage
 *
 * @function useSessionStorage.keys
 * @returns {Array<string>}
 */
useSessionStorage.keys = () => Array.from(storageKeys(window.sessionStorage));
