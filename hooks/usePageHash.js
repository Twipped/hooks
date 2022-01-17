
import { useStore } from 'react';
import useEventHandler from './useEventHandler';

export default function usePageHash () {

  const [ hashState, setHash ] = useStore({
    hash: window.location.hash.slice(1),
    prevHash: null,
  });

  useEventHandler('hashchange', () => {
    setHash({
      hash: window.location.hash.slice(1),
      prevHash: hashState.hash,
    });
  }).attach(window);

  return hashState;
}
