
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
      store.setItem(key, JSON.stringify(newValue));
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

export default function useLocalStorage (key, defaultValue) {
  return useWebStorage(window.localStorage, key, defaultValue);
}
useLocalStorage.keys = () => Array.from(storageKeys(window.localStorage));

export function useSessionStorage (key, defaultValue) {
  return useWebStorage(window.sessionStorage, key, defaultValue);
}
useSessionStorage.keys = () => Array.from(storageKeys(window.sessionStorage));
