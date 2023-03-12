# Module: useStableCallback

## Table of contents

### Functions

- [default](useStableCallback.md#default)

## Functions

### default

▸ **default**(`fn`, `dependencies`, `options`): `Function`

Identical to `useCallback` _except_ that it provides a semantic guarantee that
function will not be invalidated unless the dependencies change. Dependencies may
be an array or an object.

**`Function`**

useStableCallback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `Function` | A function that returns a value to be memoized |
| `dependencies` | `any`[] | A dependency array |
| `options` | `Object` |  |
| `options.comparison` | `boolean` \| `Function` | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

#### Returns

`Function`

#### Defined in

[hooks/useStableCallback.js:19](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useStableCallback.js#L19)
