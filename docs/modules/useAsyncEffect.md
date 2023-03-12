# Module: useAsyncEffect

## Table of contents

### Functions

- [default](useAsyncEffect.md#default)

## Functions

### default

▸ **default**(`effect`, `dependencies`, `options?`): `void`

Identical to useEffect, except the effect can be an async function, the returned
disposer may be async, and it supports deep dependency comparison.

**`Function`**

useSmartEffect

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `effect` | `Function` | The function to execute after render. |
| `dependencies` | `any` | An object or array of values to compare for changes. |
| `options` | `Object` |  |
| `options.comparison` | `boolean` \| `Function` | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

#### Returns

`void`

#### Defined in

[hooks/useAsyncEffect.js:43](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useAsyncEffect.js#L43)
