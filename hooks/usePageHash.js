
import { useState } from 'react';
import { useWindowEventListener } from './useGlobalListener.js';

/**
 * State hook that tracks the page hash (#), triggering an update if it changes.
 *
 * @function usePageHash
 * @returns {string} The contents of the url hash, minus the leading hash symbol.
 */
export default function usePageHash () {

  const [ hashState, setHash ] = useState({
    hash: window.location.hash.slice(1),
    prevHash: null,
  });

  useWindowEventListener('hashchange', () => {
    setHash({
      hash: window.location.hash.slice(1),
      prevHash: hashState.hash,
    });
  });

  return hashState.hash;
}
