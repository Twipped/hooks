# Module: useDerivedState

## Table of contents

### Functions

- [default](useDerivedState.md#default)

## Functions

### default

▸ **default**(`fn`, `dependencies?`, `options?`): [state: any, setState: Function, getState: Function]

Creates a state hook populated by a value derived from dependencies.
If the dependencies change, the state will be repopulated based on the
new dependencies, IF the results differ.
Invoking setState.reset() will change the state back to the last derived value.

**`Function`**

useDerivedState

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `Function` | Handler to run at initialization and when a dependency changes |
| `dependencies` | `any`[] | A dependency array |
| `options?` | `Object` |  |
| `options.alwaysMerge` | `boolean` | Always merge the new state into the old. |
| `options.alwaysUpdate` | `boolean` | Always trigger an update even if state matches. |
| `options.comparator` | `boolean` \| { `Function`: (`a`: `any`, `b`: `any`) => `any`  } | A function to evaluate if the result of the handler differs from current state. Pass true to perform a deep equal, otherwise the comparison will be shallow. |
| `options.comparison` | `boolean` \| { `Function`: (`a`: `any`, `b`: `any`) => `any`  } | When alwaysUpdate is false, the comparison function provided will evaluate if the new state differs from the old state. Pass true to perform a deep equal, otherwise the comparison will be shallow. |

#### Returns

[state: any, setState: Function, getState: Function]

A three item
array containing: state, setState, getState

#### Defined in

[hooks/useDerivedState.js:32](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useDerivedState.js#L32)
