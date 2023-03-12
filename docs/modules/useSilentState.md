# Module: useSilentState

## Table of contents

### Functions

- [default](useSilentState.md#default)

## Functions

### default

▸ **default**(`initial?`, `dependencies`): [state: any, setState: Function, getState: Function]

Identical to `useState` _except_ that it does not trigger an update when
the state is updated.

**`Function`**

useSilentState

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `initial` | `any` | `null` | The initial value to set the state to. |
| `dependencies` | `any`[] | `undefined` | A dependency array. If provided, the state will be reset to the passed initial value if a dependency changes. |

#### Returns

[state: any, setState: Function, getState: Function]

A three item
array containing: state, setState, getState

#### Defined in

[hooks/useSilentState.js:16](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSilentState.js#L16)
