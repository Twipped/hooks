
0.3.1 / 2022-02-22
==================

  * BREAKING: `useComputed` now receives an options object as a third parameter, with `comparison` as a configurable.
  * BREAKING: `useWhenElementRefReady` now uses useLayoutEffect if available and accepts a callback return to invoke when the ref changes again.
  * BREAKING: `useGettableState` no longer recognizes the `onlyUpdateOnDiff` option. This is instead inferred if alwaysUpdate is false.
  * BREAKING: `useIncrementer` now returns an array with the incrementing value, and a reset function.
  * BREAKING: `useTripWire` now returns an array with the wire status and a reset function.
  * BREAKING: `usePageFocus` now returns an array with the focus state, an alias to Window.focus(), and a getter function.
  * BREAKING: The third argument of `useSmartEffect` is now an options object containing the `comparison` key.
  * BREAKING: `useSmartEffect` now defaults to shallow equality, instead of an array comparison. Dependencies may now be an object.
  * DELETED: `useCallbackHook`    (use useState)
  * DELETED: `useIsFocusVisible`  (use @mui/utils)
  * DELETED: `useLocalObservable` (use mobx-react-lite)
  * DELETED: `usePageHashContext` (moved to @twipped/react-utils/page-hash-map)
  * DELETED: `useDerivedSet`      (use mobx, this never worked right, anyway)
  * DELETED: `useSafeState`       (Always felt redundant, and I hated the DX of it)
  * DELETED: `usePosition`        (use useComponentPosition, I somehow ended up with two of these)
  * FIX: `useEventHandlerOn` now detaches if the ref changes.
  * ADD: `useIsomorphicEffect`
  * ADD: `useProxyRef`
  * FEATURE: `useLocalStorage` and `useSessionStorage` will now delete the key from storage if the passed value is `undefined`.
  * FEATURE: `usePromisedState` now returns an error value that updates if a request fails.
  * DOCS: They exist!
  * FIX: The package now includes index.js (oops, thought it did that automatically)


0.2.0 / 2022-01-17
==================

  * Initial Release
