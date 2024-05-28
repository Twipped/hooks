import { useEffect, useLayoutEffect } from 'react';

/** @typedef {import('./types').EffectCallback} EffectCallback */

/**
 * Resolves to useEffect when "window" is not in scope and useLayoutEffect in the browser
 *
 * @function useIsomorphicEffect
 * @param {EffectCallback} callback Callback function to be called on mount
 */
const useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default useIsomorphicEffect;
