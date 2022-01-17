
import { useState, useCallback } from 'react';
import { jsonSoftParse } from '@twipped/utils';
import { useWindowEventListener } from './useGlobalListener';

export default function useLocalStorage (key, defaultValue) {
  const [ value, writeValue ] = useState(() => {
    const stored = jsonSoftParse(window.localStorage.getItem(key));
    return stored || stored === 0 ? stored : defaultValue;
  });

  const setValue = useCallback((newValue) => {
    writeValue(() => {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  }, [ key ]);

  useWindowEventListener('storage', (ev) => {
    if (ev.storageArea === window.localStorage && ev.key === key) {
      writeValue(ev.newValue === null ? defaultValue : JSON.parse(ev.newValue));
    }
  });

  return [ value, setValue ];
}

