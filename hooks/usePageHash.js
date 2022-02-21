
import { useStore } from 'react';
import useEventHandler from './useEventHandler';

/**
 * State hook that tracks the page hash (#), triggering an update if it changes.
 *
 * @name usePageHash
 * @returns {string} The contents of the url hash, minus the leading hash symbol.
 */
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
