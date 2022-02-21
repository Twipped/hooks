import { useEffect, useLayoutEffect } from 'react';

/**
 * Resolves to useEffect when "window" is not in scope and useLayoutEffect in the browser
 *
 * @function useIsomorphicEffect
 * @param {Function} callback Callback function to be called on mount
 */
const useIsomorphicEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default useIsomorphicEffect;
