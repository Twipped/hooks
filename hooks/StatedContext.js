/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import {
  useCallback, useContext, createContext,
} from 'react';
import useMemoObject from './useMemoObject.js';
import useDerivedState from './useDerivedState.js';

/**
 * @template T = any
 * @typedef StatedContextObject
 * @property {T} contextState
 * @property {(value: T) => void} setContextState
 * @property {() => T} getContextState
 */

/** @type {import('react').Context<StatedContextObject<any>>} */
export const StatedContext = createContext(null);
StatedContext.displayName = 'StatedContext';

/**
 * Hook to retrieve the selection context
 *
 * @template T = any
 * @returns {StatedContextObject<T>}
 */
export function useStatedContext () {
  return useContext(StatedContext);
}

/**
 * @template T = any
 * @typedef StatedProviderProps
 * @property {T} value The input and default selected value
 * @property {(value: T) => void} onChange Callback to invoke with the value is changed
 * @property {import('react').ReactNode | ((context: StatedContextObject<T>) => import('react').ReactNode)} children
 */

/**
 * Context provider that creates a managed state for storing a single target selection value.
 * Use this for custom components that need to have child elements manipulate a stored state.
 * @template T
 * @param {StatedProviderProps<T>} props
 * @returns {import('react').ReactComponentElement<any,any> | import('react/jsx-dev-runtime').JSX.Element}
 */
export function StatedProvider ({
  value,
  onChange,
  children,
}) {
  /** @type {ReturnType<typeof useDerivedState<T>>} */
  const [ contextState, setStated, getContextState ] = useDerivedState(() => value, [ value ]);
  const setContextState = useCallback((v) => {
    setStated(v);
    onChange?.(v);
  }, [ setStated, onChange ]);

  /** @type {ReturnType<typeof useMemoObject<StatedContextObject<T>>>} */
  const context = useMemoObject({
    contextState,
    setContextState,
    getContextState,
  });

  // if we receive a function, execute it and pass in the client
  if (typeof children === 'function') {
    // eslint-disable-next-line no-param-reassign
    children = /** @type {import('react').ReactNode} */ (children(context));
  }

  return (
    <StatedContext.Provider value={context}>{children}</StatedContext.Provider>
  );
}
StatedProvider.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};
