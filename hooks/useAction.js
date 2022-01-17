
import { useCallback } from 'react';
import { action } from 'mobx';

export default function useAction (fn, deps) {
  return useCallback(action(fn), deps);
}
