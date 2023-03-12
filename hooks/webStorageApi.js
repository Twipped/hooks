/* global StateHookInterface */
import { useCallback } from 'react';
import jsonSoftParse from '@twipped/utils/jsonSoftParse';
import DEFAULT from '@twipped/utils/default';
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
 * @param {Object} options
 * @param {boolean} options.isJSON
 * @returns {StateHookInterface} A three item array containing: state, setState, getState
 * @private
 */
export function useWebStorageApi (store, key, defaultValue = DEFAULT, { isJSON = true } = {}) {
  if (defaultValue !== DEFAULT && defaultValue !== null && !isJSON && typeof defaultValue !== 'string') {
    throw new TypeError('defaultValue cannot be anything other than string when using isJSON=false');
  }
  const [ value, writeValue, getValue ] = useDerivedState(() => {
    let stored = isJSON
      ? jsonSoftParse(store.getItem(key))
      : store.getItem(key);

    if (
      defaultValue !== DEFAULT
      && defaultValue !== null
      && (stored === null || stored === undefined)
    ) {
      stored = defaultValue;
      if (isJSON) {
        store.setItem(key, JSON.stringify(defaultValue));
      } else {
        store.setItem(key, defaultValue);
      }
    }

    return stored;
  }, [ store, key ]);

  const setValue = useCallback((newValue) => {
    if (newValue && !isJSON && typeof newValue !== 'string') {
      throw new TypeError('setValue cannot receive anything other than string or undefined when using isJSON=false');
    }

    writeValue(() => {
      if (newValue === undefined || newValue === null) {
        store.removeItem(key);
      } else if (isJSON) {
        store.setItem(key, JSON.stringify(newValue));
      } else {
        store.setItem(key, newValue);
      }
      return newValue;
    });
  }, [ key, store, writeValue, isJSON ]);

  useWindowEventListener('storage', (ev) => {
    if (ev.storageArea === store && ev.key === key) {
      setValue(ev.newValue === null ? defaultValue : JSON.parse(ev.newValue));
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
