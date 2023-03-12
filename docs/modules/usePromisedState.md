# Module: usePromisedState

## Table of contents

### Type Aliases

- [PromisedState](usePromisedState.md#promisedstate)

### Functions

- [default](usePromisedState.md#default)

## Type Aliases

### PromisedState

Ƭ **PromisedState**<\>: `any`

#### Defined in

[hooks/usePromisedState.js:14](https://github.com/Twipped/hooks/blob/86a2b07/hooks/usePromisedState.js#L14)

## Functions

### default

▸ **default**(`fn`, `dependencies?`, `options?`): `any`

Creates a state hook populated by a value produced by a promise returning function.
If the dependencies change, the function will be re-run, and IF the results differ then the state will be updated.
Invoking setState.reset() will re-evaluate the function and force update with the results.
Note: State will always be empty at initial invocation until the promise resolves.

**`Function`**

usePromisedState

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | `Function` | `undefined` | Handler to run at initialization and when a dependency changes |
| `dependencies` | `any`[] | `[]` | A dependency array |
| `options` | `Object` | `{}` |  |
| `options.comparator` | `Function` | `undefined` | A function to evaluate if the result of the handler differs from current state |
| `options.initial` | `any` | `undefined` | Default value of the state before first fetch. |
| `options.skipFirst` | `boolean` | `undefined` | Should the state me fetched on first render |

#### Returns

`any`

#### Defined in

[hooks/usePromisedState.js:76](https://github.com/Twipped/hooks/blob/86a2b07/hooks/usePromisedState.js#L76)
