/* global StateHookInterface */
import { useCallback } from 'react';
import jsonSoftParse from '@zenbusiness/application-commons-utils/jsonSoftParse';
import { useWindowEventListener } from './useGlobalListener.js';
import useDerivedState from './useDerivedState.js';

/**
 * @typedef {Object} Storage
 */

/**
 * Abstract function for WebStorage API
 *
 * @function useWebStorage
 * @param {Storage} store Which API to use
 * @param {string} key Name of the key to store the value into
 * @param {any} [defaultValue] The initial value to use if the key does not exist
 * @returns {StateHookInterface} A three item array containing: state, setState, getState
 * @private
 */
export function useWebStorageApi (store, key, defaultValue) {
  const [ value, writeValue, getValue ] = useDerivedState(() => {
    const stored = jsonSoftParse(store.getItem(key));
    return stored || stored === 0 ? stored : defaultValue;
  }, [ store, key ]);

  const setValue = useCallback((newValue) => {
    writeValue(() => {
      if (newValue === undefined) {
        store.removeItem(key);
      } else {
        store.setItem(key, JSON.stringify(newValue));
      }
      return newValue;
    });
  }, [ key, store, writeValue ]);

  useWindowEventListener('storage', (ev) => {
    if (ev.storageArea === store && ev.key === key) {
      writeValue(ev.newValue === null ? defaultValue : JSON.parse(ev.newValue));
    }
  });

  return [ value, setValue, getValue ];
}

/**
 * Generator that lists all stored keys.
 *
 * @param {Storage} store WebStorage API
 * @yields {string} Iterates each available key
 * @private
 */
export function* storageKeys (store) {
  for (let i = 0; i < store.length; i += 1) {
    yield store.key(i);
  }
}
