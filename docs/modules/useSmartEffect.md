# Module: useSmartEffect

## Table of contents

### Functions

- [default](useSmartEffect.md#default)

## Functions

### default

▸ **default**(`effect`, `dependencies`, `options?`): `void`

Identical to useEffect, except dependencies may be compared deeply.

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

[hooks/useSmartEffect.js:18](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useSmartEffect.js#L18)
