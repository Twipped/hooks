
import { useCallback } from 'react';
import { jsonSoftParse } from '@twipped/utils';
import { useWindowEventListener } from './useGlobalListener';
import useDerivedState from './useDerivedState';

function useWebStorage (store, key, defaultValue) {
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
  }, [ key ]);

  useWindowEventListener('storage', (ev) => {
    if (ev.storageArea === store && ev.key === key) {
      writeValue(ev.newValue === null ? defaultValue : JSON.parse(ev.newValue));
    }
  });

  return [ value, setValue, getValue ];
}

function* storageKeys (store) {
  for (var i = 0; i < store.length; i++) {
    yield store.key(i);
  }
}

/**
 * Creates a state store that is connected to the browser localStorage
 * @param  {string} key          Name of the key to store the value into
 * @param  {any} defaultValue    The initial value to use if the key does not exist.
 * @return {[ value, setValue, getValue]} A three item array.
 */
export default function useLocalStorage (key, defaultValue) {
  return useWebStorage(window.localStorage, key, defaultValue);
}

/**
 * Returns an array of the keys present in localStorage
 */
useLocalStorage.keys = () => Array.from(storageKeys(window.localStorage));

/**
 * Creates a state store that is connected to the browser sessionStorage
 * @param  {string} key          Name of the key to store the value into
 * @param  {any} defaultValue    The initial value to use if the key does not exist.
 * @return {[ value, setValue, getValue]} A three item array.
 */
export function useSessionStorage (key, defaultValue) {
  return useWebStorage(window.sessionStorage, key, defaultValue);
}

/**
 * Returns an array of the keys present in sessionStorage
 */
useSessionStorage.keys = () => Array.from(storageKeys(window.sessionStorage));
