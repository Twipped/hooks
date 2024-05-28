/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import {
  useCallback, useContext, createContext,
} from 'react';
import { isUndefinedOrNull } from '@twipped/utils/types';
import useMemoObject from './useMemoObject.js';
import useDerivedState from './useDerivedState.js';

/**
 * @template T = any
 * @typedef SelectionContextObject
 * @property {Array<T>} selection
 * @property {(value: T | Array<T>) => void} setSelection
 * @property {(value: T) => boolean} hasSelection
 * @property {() => Array<T>} getSelection
 * @property {() => void} clearSelection
 * @property {(value: T) => void} addSelection
 * @property {(value: T) => void} deleteSelection
 * @property {(value: T, enabled?: boolean) => void} toggleSelection
 */

/** @type {import('react').Context<SelectionContextObject<any>>} */
export const SelectionContext = createContext(null);
SelectionContext.displayName = 'SelectionContext';

/**
 * Hook to retrieve the selection context
 *
 * @template T = any
 * @returns {SelectionContextObject<T>}
 */
export function useSelectionContext () {
  return useContext(SelectionContext);
}

/**
 * @template T = any
 * @typedef SelectionProviderProps
 * @property {T|Array<T>} value The input and default selected value
 * @property {(value: Array<T>) => void} onChange Callback to invoke with the value is changed
 * @property {import('react').ReactNode | ((context: SelectionContextObject<T>) => import('react').ReactNode)} children
 */

/**
 * Normalizes the input value to a unique array absent any nil values
 *
 * @param {any | Array<any>} input
 * @returns {Array<any>}
 * @internal
 */
function normalize (input) {
  if (!Array.isArray(input)) {
    return isUndefinedOrNull(input) ? [] : [ input ];
  }

  // pass through a Set to uniq the contents and then filter nil values
  return Array.from(new Set(input)).filter((v) => !isUndefinedOrNull(v));
}

/**
 * Context provider that creates a managed state for storing a multiple selection values, such as in a toggle group.
 * Use this for custom components that need to have child elements manipulate a stored multi-item state.
 * @template T
 * @param {SelectionProviderProps<T>} props
 * @returns {import('react').ReactComponentElement<any,any> | import('react/jsx-dev-runtime').JSX.Element}
 */
export function SelectionProvider ({
  value,
  onChange,
  children,
}) {
  value = normalize(value);

  /** @type {ReturnType<typeof useDerivedState<Array<any>>>} */
  const [ selection, setSelectionState, getSelection ] = useDerivedState(
    () => value,
    value,
    { comparator: true }
  );

  // eslint-disable-next-line no-shadow
  const addSelection = useCallback((value) => {
    const state = normalize(getSelection().concat([ value ]));

    setSelectionState(state);
    onChange?.(state);
  }, [ getSelection, onChange, setSelectionState ]);

  // eslint-disable-next-line no-shadow
  const deleteSelection = useCallback((value) => {
    const set = new Set(getSelection());
    set.delete(value);

    const state = Array.from(set);

    setSelectionState(state);
    onChange?.(state);
  }, [ getSelection, onChange, setSelectionState ]);

  // eslint-disable-next-line no-shadow
  const hasSelection = useCallback((value) => getSelection().includes(value), [ getSelection ]);

  const clearSelection = useCallback(() => {
    const state = [];
    setSelectionState(state);
    onChange?.(state);
  }, [ onChange, setSelectionState ]);

  // eslint-disable-next-line no-shadow
  const toggleSelection = useCallback((value, enabled = !hasSelection(value)) => {
    if (isUndefinedOrNull(value)) return;

    if (enabled) {
      addSelection(value);
    } else {
      deleteSelection(value);
    }
  }, [ addSelection, hasSelection, deleteSelection ]);

  const setSelection = useCallback((v) => {
    v = normalize(v);
    setSelectionState(v);
    onChange?.(v);
  }, [ setSelectionState, onChange ]);

  /** @type {ReturnType<typeof useMemoObject<SelectionContextObject<T>>>} */
  const context = useMemoObject({
    selection,
    getSelection,
    setSelection,
    hasSelection,
    clearSelection,
    addSelection,
    deleteSelection,
    toggleSelection,
  });

  // if we receive a function, execute it and pass in the client
  if (typeof children === 'function') {
    // eslint-disable-next-line no-param-reassign
    children = /** @type {import('react').ReactNode} */ (children(context));
  }

  return (
    <SelectionContext.Provider value={context}>{children}</SelectionContext.Provider>
  );
}
SelectionProvider.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};
