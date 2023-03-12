# Changelog

## [1.0.0](https://github.com/Twipped/hooks/compare/v0.6.2...v1.0.0) (2023-03-12)


### ⚠ BREAKING CHANGES

* Deleted the root export. All hooks should be imported directly from their named subpath imports
* Deleted all mobx hooks.

### New Hook!

* **useScrollToElement:** Smoothly tweens the page scroll until the target element is in view. ([7ba08e9](https://github.com/Twipped/hooks/commit/7ba08e99bad8631aad7cc9a1030d2d193573d9a4))

### Features

* **useLocalStorage:** Now accepts a third argument for options. Pass `isJSON: false` to treat the state as plain text without JSON serialization. ([1aa4a9d](https://github.com/Twipped/hooks/commit/1aa4a9db9d0e32c15e655ce4b13c2e22930a25d4))

### Bug Fixes

* **useToggledState:** Fixed the state just never changing from its default ([96be6d5](https://github.com/Twipped/hooks/commit/96be6d5ac66dac35e8898e67f4605ce7f321449a))
* **useWhenElementRefReady:** Now actually works! ([0b5202b](https://github.com/Twipped/hooks/commit/0b5202b335cfed9facd07b22526da0510a02aed1))

## [0.6.2](https://github.com/Twipped/hooks/compare/v0.6.1...v0.6.2) (2022-10-10)


### Bug Fixes

* Bump @twipped/utils to 7.0.0 ([f27aaa6](https://github.com/Twipped/hooks/commit/f27aaa6a12ea7c585e748cac7e5ecae04c0feb02))

## [0.6.1](https://github.com/Twipped/hooks/compare/v0.6.0...v0.6.1) (2022-10-10)


### Bug Fixes

* **useLazyRef:** Fixed incorrect loading of DEFAULT from @twipped/utils ([f701034](https://github.com/Twipped/hooks/commit/f70103420e80ff0220b689086e35746ac41e3275))

## [0.6.0](https://github.com/Twipped/hooks/compare/v0.5.0...v0.6.0) (2022-10-07)


### ⚠ BREAKING CHANGES

* **useAsyncCallback:** Now throws caught errors up the component tree

### Features

* **useAsyncCallback:** Now throws caught errors up the component tree ([24eb92f](https://github.com/Twipped/hooks/commit/24eb92f6484d70c9f067754eaa3fbc3273748e4b))
* **useAsyncEffect:** New hook for running async effect functions ([d40a114](https://github.com/Twipped/hooks/commit/d40a11439af2f35681463c128d9a88c41a51f1f8))


### Bug Fixes

* Clean up duplicate imports ([8e48306](https://github.com/Twipped/hooks/commit/8e483065d364e985e4141f04177d7c4c091f2613))
* Fixed a whole bunch of little bugs caught by react-hooks linter ([76986a2](https://github.com/Twipped/hooks/commit/76986a29b05da1b185ed63b06b168ff6c77ee7d2))

## [0.5.0](https://github.com/Twipped/hooks/compare/v0.4.0...v0.5.0) (2022-03-17)


### Features

* **useChildren:** Now supports a third argument for options, with a comparison option. ([8866860](https://github.com/Twipped/hooks/commit/88668606e1cb8c96b5f0214f3069078ad67d01d7))


### Bug Fixes

* Corrected a whole host of broken includes. ([251238a](https://github.com/Twipped/hooks/commit/251238a5eb8beeb3827b35b3f6c3ed40c14513dc))
* **useComputed:** Now uses shallowEqual by default, as the docs say. ([45ae67c](https://github.com/Twipped/hooks/commit/45ae67c5b96e40b4257a481afc353d2fc68bc685))

## [0.4.0](https://github.com/Twipped/hooks/compare/v0.3.1...v0.4.0) (2022-03-16)


### Bug Fixes

* Removed the bad import from index.js ([dddf0a0](https://github.com/Twipped/hooks/commit/dddf0a04ec78494a7a56b9574bc5b20a658d9078))
* **useStableMemo:** Use shallowEqual for default comparison, as the docs say. ([1a1b572](https://github.com/Twipped/hooks/commit/1a1b5726b52f04d69d4e75734766915c28bd1c6a))


### Features

* **useAsyncCallback:** New hook to handle errors coming out of an async callback function ([6028208](https://github.com/Twipped/hooks/commit/60282080b1f09a535ab88f1d905f32cc83f991f6))
* **useElementInViewport:** New hook to check if an element is visible within a viewport. ([ffcf012](https://github.com/Twipped/hooks/commit/ffcf01284886c15b25d19b19cb084a89ba9f3d15))
* **useMemoObject:** Added options object to pass through to useStableMemo, giving means of changing comparison function ([799e46a](https://github.com/Twipped/hooks/commit/799e46ab9e919164c2a870628ec382eac5670f82))

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
