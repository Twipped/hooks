# Module: useGettableState

## Table of contents

### Functions

- [default](useGettableState.md#default)

## Functions

### default

▸ **default**(`initial`, `options?`): [state: any, setState: Function, getState: Function]

Functions identical to useState, except the state is retrievable
via a callback passed as the third return element. This always returns
the current state regardless of where we are in the render process.

**`Function`**

useGettableState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initial` | `any` | Default value passed to useState |
| `options?` | `Object` | Options |
| `options.alwaysMerge` | `boolean` | Always merge the new state into the old. |
| `options.alwaysUpdate` | `boolean` | Always trigger an update even if state matches. |
| `options.comparison` | `boolean` \| `Function` | When alwaysUpdate is false, the comparison function provided will evaluate if the new state differs from the old state. Pass true to perform a deep equal, otherwise the comparison will be shallow. |

#### Returns

[state: any, setState: Function, getState: Function]

A three item
array containing: state, setState, getState

#### Defined in

[hooks/useGettableState.js:24](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGettableState.js#L24)
